---
path: "/blog/typescript-ast-type-checker"
date: "2021-06-18"
title: "Going beyond the Abstract Syntax Tree (AST) with the TypeScript Type Checker"
shortSummary: How to analyze a typescript file beyond AST (Abstract Syntax Tree) with the tpe checker.
author: Georgios Kaleadis
authorSummary: "CTO at Satellytes"
featuredImage: images/johann-siemens-EPy0gBJzzZU-unsplash.jpg
attribution:
    creator: Johann Siemens
    source: https://unsplash.com/photos/EPy0gBJzzZU

---

We currently develop a [low-code platform](https://en.wikipedia.org/wiki/Low-code_development_platform) for an enterprise client where Angular components are arranged and connected based on a given configuration file. The components define *data contracts* based on [generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) so the platform always knows what data can flow between them. In order to perform the actual type check we use a json file that already contains all relevant typing information. We collect the typing data by recursively resolving typescript types down to their primitives and then store the found property names along with their typing name. This post is about how to collect the typing information and why we need to go beyond the AST to achieve this.

<!-- stop excerpt -->

You can find the repository on [github.com/georgiee/typescript-type-checker-beyond-ast](https://github.com/georgiee/typescript-type-checker-beyond-ast) and you can directly run the given example in your browser with [code sandbox](https://githubbox.com/georgiee/typescript-type-checker-beyond-ast)


## Expectations

Look at the two types below. You can find primitives like `string` and `number`, types from the standard library such as `Date` and type aliases like `NestedObjectType` that refer to object types which are assembled types that can contain primitives and other object types.

```typescript

// we will start our inspection here
type MainObjectType = {
  primitiveValue: string;
  propertyWithTypeAlias: NestedObjectType;
};

type NestedObjectType = {
  value1: string;
  value2: number;
  value3: Date;
};

```

The ideal output we want to get for the above content is a list of property names and type names separated by a colon including the hierarchy to visualize where a property belongs to. 

```
MainObjectType:
  primitiveValue: string
  propertyWithTypeAlias: NestedType
        value1: string
        value2: number
        value3: Date
```

Those are our rules for the processing:

+ [Type aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases) such as `someComplexValue: ImportantValue` needs to be resolved into the types that are referred to. This can be other type aliases or primitives.
+ Primitives itself can't be processed anymore and should be output as is such as `value1: string` and `value2: number`.
+ We have no interest in type details from the [standard library](https://github.com/microsoft/TypeScript/tree/5afe42e14e61d7e4df5d75cc0022283711cb593a/lib) such as `Date` or `string` with the `length` property. They potentially bring dozens of properties we don't want to see in our output list. 

Let's find out how we can approach this problem.

## Can we use the AST?
The [AST (Abstract Syntax Tree)](https://en.wikipedia.org/wiki/Abstract_syntax_tree) quickly comes to your mind to approach this problem. The AST is a data structure to represent the structure of your source file in a format readable by machines. Indeed, if I throw the above example in the [TypeScript AST Viewer](https://ts-ast-viewer.com) I get immediate access to the AST. 

![](images/ast-viewer.png)

That output looks promising. I guess this could work for very simple types 👍

The problem with the AST: it's a static analysis, which means you're processing code without executing it. That's why you are missing information from the runtime. Typescript needs to run the code to understand it and to add additional semantics. You will encounter the following problems when you try to approach the problem with the AST:

+ The AST can't see imported files as `import` statements are not processed
+ [Created types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) with operands like `keyof`& `typeof` are constructed only during runtime.
+ [Advanced types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) like [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types) or [conditional types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#conditional-types) also rely on being processed by typescript otherwise you have no chance to understand and process them.


This means, the AST approach is a dead end. 

There must be another solution 🤔 Your favourite IDE does this type of processing all day, for instance when you are presented a list of inspections or completions for a given type. See the screenshot below, where I hovered over a type `ImportantValue` in IntelliJ. IntelliJ somehow knows the details of that type which is exactly what we want to achieve here.

![](images/type-check-intellij.png)

That's something we expect from any IDE for any language that is supported. I couldn't believe that the IDEs develop some magic analysis for every language. There must be some tool to support the IDE given by the maintainers of the languages, in our case from the makers of TypeScript.

## Language Services & Checker

I researched the topic for a few exciting hours and found something important for my cause.

Your favourite IDE can support Typescript because TypeScript offers the [tsserver](https://github.com/Microsoft/TypeScript/wiki/Standalone-Server-%28tsserver%29) which is a 
> *node executable that encapsulates the TypeScript compiler and language services*

Now I've found this I remember that I restarted an ominous *Typescript Server* in IntelliJ or VSCode from time to time when debugging type problems in the past. `tsserver` is a server and not suited to process a single file though. There must be some tool inside that I can use for my own purpose.

While looking through the  [architecture overview](https://github.com/microsoft/TypeScript/wiki/Architectural-Overview) where tsserver is listed I noticed the `checker.ts` down in the core level of typescript. [checker.ts](https://github.com/microsoft/TypeScript/blob/5afe42e14e61d7e4df5d75cc0022283711cb593a/src/compiler/checker.ts) is a huge file in the typescript repository. Right now there are 42.000 lines of code and it has a size of 2.5MB 😳 This is probably the amount of code I would need to write atop of AST to properly process a given TypeScript file. 

I'm glad I finally found this magic ingredient, let's explore it.

![](images/typescript-architecture.png)

## The Type Checker (checker.ts)

Let's dive into the type checker and see how it can help us with the given challenge. Unfortunately I couldn't find any documentation about the type checker which made it pretty difficult to get started. I mostly search github.com for some code examples, glimpsed through the file `checker.ts` itself and used the `debugger` a lot to examine the content of the involved data. 

The following code shows the most important parts of type checking with TS. Create a program, derive the checker and then use that checker for your analysis.

```typescript

const program: ts.Program = ts.createProgram(files, tsConfig);
const checker: ts.TypeChecker = program.getTypeChecker();

// Later use the checker, this is a random example involving the checker 
const classSymbol = checker.getSymbolAtLocation(node.name);
```

## Type Checker Usage
Getting the checker setup is pretty straightforward, as usually it gets complicated with all the details. Let's tackle it step by step. We start by preparing the following file.


```typescript
// file-with-types.ts

type ImportantValue = {
  value1: string;
  value2: number;
  value3: Date;
};

type Output = {
  collectedValue: ImportantValue;
};
```

We want to answer this question:

> Using `checker.ts`, how can we access the details of the type `ImportantValue` so we know that `collectedValue` has three distinctive nested properties?

First step is to create our type checker and make the involved file accessible by retrieving the file as an instance of `ts.SourceFile`

```typescript
import * as ts from "typescript";

const files: string[] = ['file-with-types.ts']
const program: ts.Program = ts.createProgram(files, {});
const checker: ts.TypeChecker = program.getTypeChecker();

const mySourceFile: ts.SourceFile = program.getSourceFile('file-with-types.ts');
```
Interestingly, before we can use the type checker we will use the AST to reach the specific parts in the file we want to dive into with the type checker. When you invoke `ts.forEachChild((node: ts.Node) => {/*...*/})` you create a loop over all nodes of your AST. Each node represents a specific position in the file together with the information about that place (is it a variable, a bracket etc).

> 👉 You should tinker around with [ts-ast-viewer.com](ts-ast-viewer.com) to get a better feeling for the AST 

We want to start our type analysis at the type named `Output`. We can accomplish this by looking for the AST node named `Output`, see the following loop.

```typescript
ts.forEachChild(mySourceFile, node => {
  if (ts.isTypeAliasDeclaration(node) && node.name.escapedText === "Output") {
    // [...process that type]
  }
});
```
By finding that node we have found the exact place in the source file to ask the type checker for more information. We can do this with the method `checker.getTypeAtLocation` and passing in the node, in return we get an instance of `ts.Type` from the checker.

```typescript
// Don't get confused, the `name` is not a string but an object with many more information
// That's why this works even for things that are named the same
const outputType = checker.getTypeAtLocation(node.name);
```

This is it, we arrive in type checking land 🌈

We can access every property of the given type through `outputType.getProperties()`.

```typescript
const [collectedValueProperty] = outputType.getProperties();
/**
 * `propertyType` will contain & reference everything
 * we can know about the type `ImportantValue`
 */
const propertyType = checker.getTypeOfSymbolAtLocation(collectedValueProperty, node);
const propertyTypeName = checker.typeToString(propertyType);

// prints `collectedValue: ImportantValue`
console.log(`${collectedValueProperty.name}: ${propertyTypeName}`)
```

On that level we only have one property `collectedValue: ImportantValue` in our original type definition, so we can save us one loop and simply extract the first element and name it `collectedValueProperty`. The value has the type `ts.Symbol` which is similar to `ts.Type` a value with added semantics compared to the AST-related `ts.Node`.

We can use that symbol, to access the name of the variable and the actual name of the type. The type checker gives us the methods `getTypeOfSymbolAtLocation` and `typeToString` to do that and we can print the final result to the console.

```typescript
// prints `collectedValue: ImportantValue`
console.log(`└── ${collectedValueProperty.name}: ${propertyTypeName}`)
```
What's left is to dive one level deeper to finally extract the types from the nested `ImportantValue`. This is basically *"rinse & repeat"* as you will see in the following code example. Instead of extracing the first element we use a for-loop though in order to find all properties.

```typescript
// remember we are now processing `ImportantValue` which is stored in `propertyType`
for (const nestedProperty of propertyType.getProperties()) {
  const nestedPropertyType = checker.getTypeOfSymbolAtLocation(nestedProperty, node);
  const nestedPropertyTypeName = checker.typeToString(nestedPropertyType);
  /** prints the following
   ├── value1: string
   ├── value2: number
   ├── value3: Date
   */
  console.log(`  ├── ${nestedProperty.name}: ${nestedPropertyTypeName}`)
}
```

<details>
    <summary>Full Source Example</summary>

````typescript
/**
 Given the following file 'my.component.ts'
 
  ```
  type ImportantValue = {
    value1: string;
    value2: number;
    value3: Date;
  };
  
  type Output = {
    collectedValue: ImportantValue;
  };
  ```
  
 This file will print the following information to the console.
    
  ```
  ── collectedValue: ImportantValue
  ├── value1: string
  ├── value2: number
  ├── value3: Date
 ```

 */

import * as ts from "typescript";

const files: string[] = ['my.component.ts']
const program: ts.Program = ts.createProgram(files, {});
const checker: ts.TypeChecker = program.getTypeChecker();

const myComponentSourceFile = program.getSourceFile('my.component.ts')!;

ts.forEachChild(myComponentSourceFile, node => {
  if (ts.isTypeAliasDeclaration(node) && node.name.escapedText === "Output") {
    const outputType = checker.getTypeAtLocation(node.name);
    const [collectedValueProperty] = outputType.getProperties();

    /**
     * `propertyType` will contain & reference everything
     * we can know about the type `ImportantValue`
     */
    const propertyType = checker.getTypeOfSymbolAtLocation(collectedValueProperty, node);
    const propertyTypeName = checker.typeToString(propertyType);
    // prints `collectedValue: ImportantValue`
    console.log(`── ${collectedValueProperty.name}: ${propertyTypeName}`)

    for (const nestedProperty of propertyType.getProperties()) {
      const nestedPropertyType = checker.getTypeOfSymbolAtLocation(nestedProperty, node);
      const nestedPropertyTypeName = checker.typeToString(nestedPropertyType);
      /** prints the following
       ├── value1: string
       ├── value2: number
       ├── value3: Date
       */
      console.log(`     ├── ${nestedProperty.name}: ${nestedPropertyTypeName}`)
    }
  }
});
````

</details>

## Real-world adjustments

The basic demonstration was specifically crafted to demonstrate the type extraction process, but there are some important real-world issues when doing so.

- We don't know the depth of our analysis, so it's a perfect match for recursion although you could construct a loop too I guess.
- We need to prevent diving into properties that are coming from the standard library like `Date` and methods or values of primitives like `string` because we are usually not interested in those properties. Same for external libraries (think of rxjs & friends).

### Recursion

First, let's make the analysis recursive to find every property in any given file.

```typescript
function processProperty(type: ts.Type, node: ts.Node, level = 0) {
  if(level === 0) {
    console.group(`.\n└──Processing '${checker.typeToString(type)}'`)
  }

  for (const property of type.getProperties()) {
    const propertyType = checker.getTypeOfSymbolAtLocation(property, node);
    const propertyTypeName = checker.typeToString(propertyType);

    processProperty(propertyType, node, level + 1)
    console.log(`  ├── ${property.name}: ${propertyTypeName}`)

  }
  console.groupEnd();

}

ts.forEachChild(myComponentSourceFile, node => {
  if (ts.isTypeAliasDeclaration(node) && node.name.escapedText === "Output") {
    const outputType = checker.getTypeAtLocation(node.name);
    processProperty(outputType, node);
  }
});
```

This will find every single property, no matter how deep it's nested. That's because `processProperty()` is used recursively on all nested properties.

When you run this code, you will be lost in noise. See the following log and try to spot our types within the ocean of properties pouring in from the standard library.

<details>
<summary>Output</summary>

```
.
└──Processing 'Output'
  ├── toString: () => string
  ├── charAt: (pos: number) => string
  ├── charCodeAt: (index: number) => number
  ├── concat: (...strings: string[]) => string
  ├── indexOf: (searchString: string, position?: number) => number
  ├── lastIndexOf: (searchString: string, position?: number) => number
  ├── localeCompare: { (that: string): number; (that: string, locales?: string | string[], options?: CollatorOptions): number; }
  ├── match: { (regexp: string | RegExp): RegExpMatchArray; (matcher: { [Symbol.match](string: string): RegExpMatchArray; }): RegExpMatchArray; }
  ├── replace: { (searchValue: string | RegExp, replaceValue: string): string; (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string; (searchValue: { ...; }, replaceValue: string): string; (searchValue: { ...; }, replacer: (substring: string, ...args: any[]) => string): string; }
  ├── search: { (regexp: string | RegExp): number; (searcher: { [Symbol.search](string: string): number; }): number; }
  ├── slice: (start?: number, end?: number) => string
  ├── split: { (separator: string | RegExp, limit?: number): string[]; (splitter: { [Symbol.split](string: string, limit?: number): string[]; }, limit?: number): string[]; }
  ├── substring: (start: number, end?: number) => string
  ├── toLowerCase: () => string
  ├── toLocaleLowerCase: (locales?: string | string[]) => string
  ├── toUpperCase: () => string
  ├── toLocaleUpperCase: (locales?: string | string[]) => string
  ├── trim: () => string
  ├── toString: (radix?: number) => string
  ├── toFixed: (fractionDigits?: number) => string
  ├── toExponential: (fractionDigits?: number) => string
  ├── toPrecision: (precision?: number) => string
  ├── valueOf: () => number
  ├── toLocaleString: (locales?: string | string[], options?: NumberFormatOptions) => string
  ├── length: number
  ├── substr: (from: number, length?: number) => string
  ├── valueOf: () => string
  ├── codePointAt: (pos: number) => number
  ├── includes: (searchString: string, position?: number) => boolean
  ├── endsWith: (searchString: string, endPosition?: number) => boolean
  ├── normalize: { (form: "NFC" | "NFD" | "NFKC" | "NFKD"): string; (form?: string): string; }
  ├── repeat: (count: number) => string
  ├── startsWith: (searchString: string, position?: number) => boolean
  ├── anchor: (name: string) => string
  ├── big: () => string
  ├── blink: () => string
  ├── bold: () => string
  ├── fixed: () => string
  ├── fontcolor: (color: string) => string
  ├── fontsize: { (size: number): string; (size: string): string; }
  ├── italics: () => string
  ├── link: (url: string) => string
  ├── small: () => string
  ├── strike: () => string
  ├── sub: () => string
  ├── sup: () => string
  ├── padStart: (maxLength: number, fillString?: string) => string
  ├── padEnd: (maxLength: number, fillString?: string) => string
  ├── trimLeft: () => string
  ├── trimRight: () => string
  ├── trimStart: () => string
  ├── trimEnd: () => string
  ├── __@iterator@596: () => IterableIterator<string>
👉├── value1: string
  ├── toString: (radix?: number) => string
  ├── toFixed: (fractionDigits?: number) => string
  ├── toExponential: (fractionDigits?: number) => string
  ├── toPrecision: (precision?: number) => string
  ├── valueOf: () => number
  ├── toLocaleString: (locales?: string | string[], options?: NumberFormatOptions) => string
👉├── value2: number
  ├── toString: () => string
  ├── toDateString: () => string
  ├── toTimeString: () => string
  ├── toLocaleString: { (): string; (locales?: string | string[], options?: DateTimeFormatOptions): string; }
  ├── toLocaleDateString: { (): string; (locales?: string | string[], options?: DateTimeFormatOptions): string; }
  ├── toLocaleTimeString: { (): string; (locales?: string | string[], options?: DateTimeFormatOptions): string; }
  ├── valueOf: () => number
  ├── getTime: () => number
  ├── getFullYear: () => number
  ├── getUTCFullYear: () => number
  ├── getMonth: () => number
  ├── getUTCMonth: () => number
  ├── getDate: () => number
  ├── getUTCDate: () => number
  ├── getDay: () => number
  ├── getUTCDay: () => number
  ├── getHours: () => number
  ├── getUTCHours: () => number
  ├── getMinutes: () => number
  ├── getUTCMinutes: () => number
  ├── getSeconds: () => number
  ├── getUTCSeconds: () => number
  ├── getMilliseconds: () => number
  ├── getUTCMilliseconds: () => number
  ├── getTimezoneOffset: () => number
  ├── setTime: (time: number) => number
  ├── setMilliseconds: (ms: number) => number
  ├── setUTCMilliseconds: (ms: number) => number
  ├── setSeconds: (sec: number, ms?: number) => number
  ├── setUTCSeconds: (sec: number, ms?: number) => number
  ├── setMinutes: (min: number, sec?: number, ms?: number) => number
  ├── setUTCMinutes: (min: number, sec?: number, ms?: number) => number
  ├── setHours: (hours: number, min?: number, sec?: number, ms?: number) => number
  ├── setUTCHours: (hours: number, min?: number, sec?: number, ms?: number) => number
  ├── setDate: (date: number) => number
  ├── setUTCDate: (date: number) => number
  ├── setMonth: (month: number, date?: number) => number
  ├── setUTCMonth: (month: number, date?: number) => number
  ├── setFullYear: (year: number, month?: number, date?: number) => number
  ├── setUTCFullYear: (year: number, month?: number, date?: number) => number
  ├── toUTCString: () => string
  ├── toISOString: () => string
  ├── toJSON: (key?: any) => string
  ├── getVarDate: () => VarDate
  ├── __@toPrimitive@755: { (hint: "default"): string; (hint: "string"): string; (hint: "number"): number; (hint: string): string | number; }
👉├── value3: Date
👉├── collectedValue: ImportantValue
```
</details>

That's the "standard library" issue described earlier. The `Date` and `string` types causes this drama and we need to stop our processing before entering those types.

### Exclude the standard types

TypeScript gives us plenty of tools to do that. Here is a helper method `isTypeLocal` I have build for our use cases.

```typescript
function isTypeLocal(symbol: ts.Symbol) {
  const sourceFile = symbol?.valueDeclaration?.getSourceFile();
  const hasSource = !!sourceFile;
  const isStandardLibrary = hasSource && program.isSourceFileDefaultLibrary(sourceFile!)
  const isExternal = hasSource && program.isSourceFileFromExternalLibrary(sourceFile!);
  const hasDeclaration = !!symbol?.declarations?.[0];

  return !(isStandardLibrary || isExternal) && hasDeclaration;
}
```

The method will detect if a given symbol belongs to a [standard library](https://www.typescriptlang.org/tsconfig#lib) (`Date`), to an external library (whatever you use from `node_modules`) and everything that doesn't have an actual declaration like primitive types (`string`, `number`).

We will use that helper to prevent our recursion from branching into those unwanted types:

```typescript
if(isTypeLocal(propertySymbol)) {
  // It's a type we have defined, so print it
  // and then process its nested properties
  console.group(`  └── ${property.name}: ${propertyTypeName}`)
  processProperty(propertyType, node, level + 1)
}else {
  // It's not a local type, so print it but don't do anything further
  console.log(`  ├── ${property.name}: ${propertyTypeName}`)
}
```

The updated code can process the initial file but it's much more flexible. Let's process a much deeper nested type `Output` and watch the console.

<details>
    <summary>Updated file `file-with-types.ts`</summary>

```typescript
type ImportantValue = {
  value1: string;
  value2: number;
  value3: Date;
  value4: SomethingElse;
};

type SomethingElse = {
  value2: PrettyNestedType;
};

type PrettyNestedType = {
  value1: string;
  value2: number;
  value3: Date;
};

type Output = {
  value1: string;
  value2: number;
  value3: Date;
  collectedValue: ImportantValue;
};
```
</details>

The following values are printed for the given file. Every standard library type is skipped, but the values are probably traversed and listed with the correct name and type name.


```
.
└──Processing 'Output'
    ├── value1: string
    ├── value2: number
    ├── value3: Date
    └── collectedValue: ImportantValue
      ├── value1: string
      ├── value2: number
      ├── value3: Date
      └── value4: SomethingElse
        └── value2: PrettyNestedType
          ├── value1: string
          ├── value2: number
          ├── value3: Date
```

Task completed ✅ 


<details>
    <summary>Full Source Example</summary>

```typescript
import * as ts from "typescript";

const files: string[] = ['file-with-types.ts']
const program: ts.Program = ts.createProgram(files, {});
const checker: ts.TypeChecker = program.getTypeChecker();

const myComponentSourceFile = program.getSourceFile('file-with-types.ts')!;

/**
 * Typescript can help us to spot types from outside of our local source files
 * which we don't want to process like literals string (think of trim(), length etc) or entire classes like Date.
 */
function isTypeLocal(symbol: ts.Symbol) {
  const sourceFile = symbol?.valueDeclaration?.getSourceFile();
  const hasSource = !!sourceFile;
  const isStandardLibrary = hasSource && program.isSourceFileDefaultLibrary(sourceFile!)
  const isExternal = hasSource && program.isSourceFileFromExternalLibrary(sourceFile!);
  const hasDeclaration = !!symbol?.declarations?.[0];

  return !(isStandardLibrary || isExternal) && hasDeclaration;
}

function processProperty(type: ts.Type, node: ts.Node, level = 0) {
  if(level === 0) {
    console.group(`.\n└──Processing '${checker.typeToString(type)}'`)
  }

  for (const property of type.getProperties()) {
    const propertyType = checker.getTypeOfSymbolAtLocation(property, node);
    const propertySymbol = propertyType.getSymbol()!;
    const propertyTypeName = checker.typeToString(propertyType);

    const localType = isTypeLocal(propertySymbol);

    /**
     * If it's a local type belonging to our sources we are interested in
     * further analysis, so we process all properties again like we did for the current given property.
     */
    if(localType) {
      console.group(`  └── ${property.name}: ${propertyTypeName}`)

      processProperty(propertyType, node, level + 1)
    }else {
      console.log(`  ├── ${property.name}: ${propertyTypeName}`)
    }

  }
  console.groupEnd();

}

ts.forEachChild(myComponentSourceFile, node => {
  if (ts.isTypeAliasDeclaration(node) && node.name.escapedText === "Output") {
    const outputType = checker.getTypeAtLocation(node.name);
    processProperty(outputType, node);
  }
});

```

</details>

## Conclusion

Interacting with the type checker is similar difficult as interacting with the AST. Usually you don't have a complete visual representation in your mind what data is given to you by typescript. To this day I still rely on `debugger` and `console.log` to find my way through solving a specific challenge with the type checker. That's mainly because it's not our daily job. It's an individual requirements but the majority of tasks is still writing typescript and not introspecting written code.

After a while you are more fluent handling `ts.Symbol`, `ts.Type` and `ts.Node` and then it's more and more fun to interact with your own written code from such a refreshing and exciting perspective ✨
