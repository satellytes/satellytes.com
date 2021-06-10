---
path: "/blog/angular-inject-the-injector"
date: "2021-06-08"
title: "The \"Inject the Injector\" pattern"
featuredImage: images/georgios-kaleadis-aBTfTMsOCOI-unsplash.jpg 
imageCredits: We want to credit people for their work
author: "Georgios Kaleadis"
authorSummary: "CTO at Satellytes"
---

We maintain a successful proprietary enterprise library based on Angular. One challenge while doing so are breaking changes. Those occur naturally while we improve and extend the library. One particular type of breaking change caused us some trouble and we want to show you how we tackled it for good.

<!-- stop excerpt -->

## Summary
In case you are short on time:
We have discovered a pattern specific to the dependency injection system of Angular. The pattern makes our `constructor` signature more generic and by doing so, it prevents future breaking changes on subclasses, as we change our constructor signature less often. This pattern is production proof and widely used in our enterprise environment.

Replace your injected content with the injector itself and manually retrieve the instances by acessing the injector. That way, your constructor signature is more stable as you don't have to add new injection for new external dependencies to services, tokens etc.

Example:

```typescript
import { Directive, Inject, Injector } from '@angular/core';

@Directive()
export class MyBaseComponent implements OnInit {
  private mySubscribeService: MySubscribeService;
  private myTrackingService: MyTrackingService;
  public myRemoteHomeService: MyRemoteHomeService;
  
  constructor(@Inject(Injector) injector: Injector) {
    this.mySubscribeService = injector.get<AclService>(MySubscribeService)!;
    this.myTrackingService = injector.get<AclService>(MyTrackingService)!;
    this.myRemoteHomeService =  injector.get<AclService>(MyRemoteHomeService)!;
  }
}
```
Next the resilient subclass with custom injections. We can safely extend the base class with additional services without breaking that subclass anymore. 

```typescript
@Component({
  selector: 'my-selector',
  template: `...`
})
export class UnsubscribeToolComponent extends MyBaseComponent {
  constructor(
    @Inject(Injector) injector: Injector,
    @Inject(MyService) myService: MyService
  ) {
    super(injector)
  }
}
```


## Our starting point
Look at the following Angular base class:

```typescript
@Directive()
export class MyBaseComponent implements OnInit {
  constructor(
    @Inject(MySubscribeService) private mySubscribeService: MySubscribeService,
    @Inject(MyTrackingService) private  myTrackingService: MyTrackingService
  ) { }
  
  ngOnInit(){
    this.myTrackingService.trigger();
  }
  
  subscribe() {
    this.mySubscribeService.doSomething();
  }
}
```
That base class provides a set of default functionality for any other component extending from it in the future. This not only saves repeated work on the side of the component authors. You can see this as an alignment or contract between all derived components. 

That `MyBaseComponent` will be delivered through a core library and extended by dozens of other components.
Like the following imaginary subscription component:

```typescript
@Component({
  selector: 'my-subscription',
  template: `<button (click)="subscribe()">subscribe now</button>`
})
export class SubscriptionComponent extends MyBaseComponent {
}
```

The `SubscriptionComponent` is guaranteed to invoke the one service through `ngOnInit` as described by the parent class plus it can access the `subscribe` method from the parent class as the service `mySubscribeService` is readily available to be invoked by `subscribe()`.

Things get complicated the moment library authors starts to get a little more advanced. 
Look at the following nifty component:

```typescript
@Component({
  selector: 'my-unsubscribe-tool',
  template: `<button (click)="unsubscribe()">unsubscribe</button>`
})
export class UnsubscribeToolComponent extends MyBaseComponent {
  constructor(
    @Inject(MySubscribeService) mySubscribeService: MySubscribeService,
    @Inject(MyTrackingService)  myTrackingService: MyTrackingService,
    @Inject(MyUnsubscribeService) private myUnsubscribeService: MyUnsubscribeService
  ) {
    super(mySubscribeService, myTrackingService)
  }
  
  unsubscribe() {
    this.myUnsubscribeService.trigger();
  }
}
```

The class `UnsubscribeToolComponent` is in desperate need to access a custom service `MyUnsubscribeService` whose functionality is not provided by the base class. Fair enough, they chose to inject that service. The injection itself looks complicated though, because the author needs to repeat the injection to forward the two service instances `mySubscribeService` & `myTrackingService` to the parent class. 

Otherwise, the solution works pretty well. Great.

## The problem

The core team decides to extend the functionality of the base class. They want to ship a new service `MyRemoteHomeService` to all subclasses and offer a new method `lightsOff` ready to be used. This is adding some new feature and shouldn't cause much trouble, should it ?

Let's look at the base class again and its added functionality in the following diff.

```diff-typescript
@Directive()
export class MyBaseComponent implements OnInit {
  constructor(
    @Inject(MySubscribeService) private mySubscribeService: MySubscribeService,
    @Inject(MyTrackingService) private  myTrackingService: MyTrackingService,
+   @Inject(MyRemoteHomeService) public  myRemoteHomeService: MyRemoteHomeService
  ) { }
  
-  /* [... redacted methods] */
  
+  lightsOff() {
+    this.myRemoteHomeService.lightsOff();
+  }
}
```
You can clearly see the appearance of `MyRemoteHomeService` and the method `lightsOff()` using it.

The team decides to ship this feature with `V1.2` but doesn't mark it as a `BREAKING CHANGE`, because, well it can't break anything because it **adds** functionality. Soon after the release the maintainers of the advanced component `UnsubscribeToolComponent` complain that their component fails to compile.

The reason gets obvious pretty quickly. The team didn't know about the added service while they rely on repeating the constructor signature in order to provide all expected dependencies.

THe team's fix is simple, but it came by surprise, and it created a lot of confusion.

```diff-typescript
@Component({
  selector: 'my-unsubscribe-tool',
  template: `<button (click)="unsubscribe()">unsubscribe</button>`
})
export class UnsubscribeToolComponent extends MyBaseComponent {
  constructor(
    @Inject(MySubscribeService) mySubscribeService: MySubscribeService,
    @Inject(MyTrackingService)  myTrackingService: MyTrackingService,
+   @Inject(MyRemoteHomeService) public  myRemoteHomeService: MyRemoteHomeService,
    @Inject(MyUnsubscribeService) myUnsubscribeService: MyUnsubscribeService
  ) {
+    super(mySubscribeService, myTrackingService, myRemoteHomeService)
  }
  
  unsubscribe() {
    this.myUnsubscribeService.trigger();
  }
}
```

They had to repeat the injection of `MyUnsubscribeService` to forward the instance through the `super()` invocation. THis clearly describes that the core team caused a breaking change by adding an innocent new feature.

## The solution
We have gone through this various times in different places. We announced the Breaking Change carefully, we even wrote migrations to automatically fix or at least warn the user about the problem. It remained a cumbersome experience, so we pursued another solution: Inject the Injector.

Let's start with the solution:

```typescript
import { Directive, Inject, Injector } from '@angular/core';

@Directive()
export class MyBaseComponent implements OnInit {
  private mySubscribeService: MySubscribeService;
  private myTrackingService: MyTrackingService;
  public myRemoteHomeService: MyRemoteHomeService;
  
  constructor(@Inject(Injector) injector: Injector) {
    this.mySubscribeService = injector.get<AclService>(MySubscribeService)!;
    this.myTrackingService = injector.get<AclService>(MyTrackingService)!;
    this.myRemoteHomeService =  injector.get<AclService>(MyRemoteHomeService)!;
  }
}
```

Can you see the elegance here? We inject the injector, which is the engine of the dependency injection (DI) system in Angular itself and then request the singleton instances of our desired services to assign them to the local variables as before.

The injector has the correct typing, that the result might be undefined, that's why we convince TypeScript with the [non-null assertion operator (!)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator) that we guarantee to receive a value. That's possible because we control the environment, and the services are provided in the `root`.

In case we decide to add a fourth of fifth service, we can now add it and request it directly from the injector
without breaking any subclass as the constructor signature stays the same. It's also much easier to extend our base class and use custom services. See how many lines of random services the team are not even interested in can now be replaced:

```diff-typescript
@Component({
  selector: 'my-unsubscribe-tool',
  template: `<button (click)="unsubscribe()">unsubscribe</button>`
})
export class UnsubscribeToolComponent extends MyBaseComponent {
  constructor(
    @Inject(Injector) injector: Injector
-   @Inject(MySubscribeService) mySubscribeService: MySubscribeService,
-   @Inject(MyTrackingService)  myTrackingService: MyTrackingService,
-   @Inject(MyRemoteHomeService) public  myRemoteHomeService: MyRemoteHomeService,
    @Inject(MyUnsubscribeService) myUnsubscribeService: MyUnsubscribeService
  ) {
-    super(mySubscribeService, myTrackingService, myRemoteHomeService)
+    super(injector)
  }
  
  unsubscribe() {
    this.myUnsubscribeService.trigger();
  }
}
```

## Conclusion
Handling breaking changes is an act of empathy. You progressive self wants to change things, but your mind constantly thinks of the poor souls who have to deal with those changes. The "inject the injector" pattern we have introduced here helped us a lot and made it very easy to extend our base class without breaking things anymore. 

This is a very specific problem from the Angular universe, but maybe just by following my thoughts already made you a more empathic programmer 💛
