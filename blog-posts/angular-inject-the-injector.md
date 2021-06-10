---
path: "/blog/angular-inject-the-injector"
date: "2021-06-08"
title: "The \"Inject the Injector\" pattern"
featuredImage: images/georgios-kaleadis-aBTfTMsOCOI-unsplash.jpg 
imageCredits: We want to credit people for their work
author: "Georgios Kaleadis"
authorSummary: "CTO at Satellytes"
---

We maintain a successful proprietary enterprise library based on Angular. One challenge while doing so are breaking changes. Those occur naturally while we improve and extend the library. There was one particular type of breaking change that caused us some trouble, and we want to show you how we tackled it for good.

<!-- stop excerpt -->


## In a nutshell
We have discovered a pattern specific to Angular's dependency injection system in combination with subclasses. The pattern makes our `constructor` signature more generic and by doing so, it prevents future breaking changes on subclasses, as we change our constructor signature less often. This pattern is used in our enterprise project since Angular version 10, so we consider it safe for production.

**The pattern**<br>
> Replace your injected content (being a service, token etc.) with the injector itself and manually retrieve the singleton instance through `injector.get(TOKEN)`. That way, your constructor signature is more stable which will prevent breaking changes on your subclasses.

**Example**<br>
Instead of injecting the services through the constructor we inject the Injector
and derive the actual instances in the body of the constructor. 

```typescript
import { Directive, Inject, Injector } from '@angular/core';

@Directive()
export class MyAbstractBaseComponent implements OnInit {
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

Every subclass can safely extend from `MyAbstractBaseComponent` and define additional services. The base class itself can add additional injected services without ever breaking the subclass. We literally inject every possible value by providing the injector itself which acts as the bucket for any future service we might want to access. That generalization is the core of this pattern.   

```typescript
@Component({
  selector: 'my-selector',
  template: `...`
})
export class UnsubscribeToolComponent extends MyAbstractBaseComponent {
  constructor(
    @Inject(Injector) injector: Injector,
    @Inject(MyService) myService: MyService
  ) {
    super(injector)
  }
}
```

## Our starting point
In order to understand the problem we will look at the following Angular base class that act as the functional foudnation for derived explicit components.

```typescript
@Directive()
export class MyAbstractBaseComponent implements OnInit {
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
That base class provides a set of default functionality for any other component extending from it in the future. This not only saves repeated work on the side of the component authors. This acts as an alignment & contract between all derived components. 

The `MyAbstractBaseComponent` will be delivered through a core library and extended by dozens of other components.
Like the following imaginary subscription component:

```typescript
@Component({
  selector: 'my-subscription',
  template: `<button (click)="subscribe()">subscribe now</button>`
})
export class SubscriptionComponent extends MyAbstractBaseComponent {
}
```

The `SubscriptionComponent` is guaranteed to invoke the one service through `ngOnInit` as described by the parent class plus it can access the `subscribe` method from the parent class as the service `mySubscribeService` is readily available to be invoked by `subscribe()`.

Things get complicated the moment library authors starts to get a little more advanced. 
Look at the following slightly more advanced component.

```typescript
@Component({
  selector: 'my-unsubscribe-tool',
  template: `<button (click)="unsubscribe()">unsubscribe</button>`
})
export class UnsubscribeToolComponent extends MyAbstractBaseComponent {
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
export class MyAbstractBaseComponent implements OnInit {
  constructor(
    @Inject(MySubscribeService) private mySubscribeService: MySubscribeService,
    @Inject(MyTrackingService) private  myTrackingService: MyTrackingService,
+   @Inject(MyRemoteHomeService) public  myRemoteHomeService: MyRemoteHomeService
  ) { }
  
   /* [... redacted methods] */
  
+  lightsOff() {
+    this.myRemoteHomeService.lightsOff();
+  }
}
```
You can clearly see the appearance of `MyRemoteHomeService` and the method `lightsOff()` using it.

The team decides not to mark it as a `BREAKING CHANGE`, because, well it can't break anything because it **adds** functionality. They will ship it as version `V1.1`. Soon after the release the maintainers of the advanced component `UnsubscribeToolComponent` complain that their component fails to compile.

The reason gets obvious pretty quickly. The local team didn't know about the service added by the core team. On the other side they rely on repeating the constructor signature in order to provide all expected dependencies.

The team's fix is simple, but it came by surprise, and it created a lot of confusion.

```diff-typescript
@Component({
  selector: 'my-unsubscribe-tool',
  template: `<button (click)="unsubscribe()">unsubscribe</button>`
})
export class UnsubscribeToolComponent extends MyAbstractBaseComponent {
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
What did they do? They had to repeat the injection of `MyUnsubscribeService` to forward the instance through the `super()` invocation. 

The core team created a breaking change by adding an innocent new feature because they did not recognize that slightly more advanced users of their library are overriding the constructor. The team could stop here, because they are now aware of the problem, and the next change of the constructor will be marked as a breaking change.

This will still create trouble for the local team, because they would have to update their components for every upstream change in the constructor. Luckily there is a solution. 


## The solution
We have gone through this various times in different places. We announced the breaking change carefully, we even wrote migrations to automatically fix or at least warn the user about the problem. It remained a cumbersome experience, so we pursued another solution: **Inject the Injector**.

Let's start with the solution:

```typescript
import { Directive, Inject, Injector } from '@angular/core';

@Directive()
export class MyAbstractBaseComponent implements OnInit {
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

The injector has the correct typing, that the result might be undefined, that's why we convince TypeScript with the [non-null assertion operator (!)](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator) that we guarantee to receive a value. That's possible because we control the environment, and the services are guaranteed to be available as they are provided in the root (`@Injectable({providedIn: 'root' })`).

In case we decide to add a fourth of fifth service in the base class, we can now add it and request it directly from the injector without breaking any subclass as the constructor signature stays the same. See how many lines of random services the team are not even interested in, can now be replaced:

```diff-typescript
@Component({
  selector: 'my-unsubscribe-tool',
  template: `<button (click)="unsubscribe()">unsubscribe</button>`
})
export class UnsubscribeToolComponent extends MyAbstractBaseComponent {
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

resulting in this much more compact version of a constructor.

```typescript
@Component(/*...*/)
export class UnsubscribeToolComponent extends MyAbstractBaseComponent {
  constructor(
    @Inject(Injector) injector: Injector
    @Inject(MyUnsubscribeService) myUnsubscribeService: MyUnsubscribeService
  ) {
    super(injector)
  }
  
  /*...*/
}
```

## Conclusion
Handling breaking changes is an act of empathy 💛. You want to protect your users from struggling with your changes. The "inject the injector" pattern we have introduced here helped us a lot and made it very easy to extend our base class without breaking things anymore.

It's always advisable to be more specific instead of using generalized concepts like described in this blog post. Your code will be less abstract, better readable and maintainable. Use this approach only if you have very good reasons to do so 👍 This is a highly specific pattern for our distributed library project. In case you're developing individual components that are not distributed to other developers you most probably should not care for breaking changes and patterns like that.
