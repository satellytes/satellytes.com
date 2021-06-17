---
path: "/blog/typescript-ast-type-checker"
date: "2021-06-08"
title: "Going beyond the Abstract Syntax Tree (AST) with the TypeScript Type Checker"
featuredImage: images/johann-siemens-EPy0gBJzzZU-unsplash.jpg
shortSummary: How to analyze a typescript file beyond AST (Abstract Syntax Tree) with the tpe checker. 
attribution:
    creator: Johann Siemens
    source: https://unsplash.com/photos/EPy0gBJzzZU
author: Georgios Kaleadis
authorSummary: "CTO at Satellytes"
---

For a recent Angular project we had to analyze an unknown set of components and list involved types with the name of each property (like `today`) and the type name itself (like `Date`). This post is about how to collect that data and explains why the AST can't help us.

<!-- stop excerpt -->

## Our expectations

Given a file that contains a single type of interest, we want to output all properties and their type names.

```typescript
type ImportantValue = {
  value1: string;
  value2: number;
  value3: Date;
};

type Output = {
  somePrimitiveValue: string;
  someComplexValue: ImportantValue;
};
```

The ideal output we want to get for the above content looks like the following list. Types `collectedValue:ImportantValue` needs to be normalized and resolved into the underlying values. Atomic types like `string` and `number` should be output as you can't further process them and standard library types like `value3: Date` should be not further processed even though there are plenty of types hidden in them- we are simply not interested in them.

```typescript
Output:
  somePrimitiveValue: string
  someComplexValue: ImportantValue
        value1: string
        value2: number
        value3: Date
```

## Can we use the AST?

The [AST (Abstract Syntax Tree)](https://en.wikipedia.org/wiki/Abstract_syntax_tree) quickly comes to your mind. The AST is a data structure to represent the structure of your source file in a format readable by machines. Indeed, if I throw the above example in the [TypeScript AST Viewer](https://ts-ast-viewer.com) I get immediate access to the AST. 

![](images/ast-viewer.png)

That output looks promising and it would definitely work for very simple types 👍

The problem with the AST: it's a static analysis. You are missing information from the runtime, after typescript "understood" the code and can add additional semantics. This means you will run into a dead end if you want to further expand the given type `ImportantValue` for example. You will find a `TypeReference(AST)`  for the value. This looks like it could be possible to identify the matching type, but it's probably super difficult to find the matching part if any. This will get impossible once your typings are just a little bit more advanced or you are covering multiple files. There is a good reason the TypeScript Checker exists, so don't waste your time trying to exploit the AST for what it's not suited.

There must be another solution, especially because your favourite IDE does this all the time when you are presented a list of inspections or completions for a given type.  See the following screenshot, where I hovered over a type `ImportantValue` in IntelliJ. IntelliJ somehow knows about the content of that type and shows me the correct properties.

![](images/type-check-intellij.png)


I entirely ignored this rather complex information gathering aspects of our IDEs in the past, but while working on our project I realized there must be some general solution. I simply couldn't believe that every IDE develops something special for each language they want to support.

## Language Services

---

After a few hours of research I had all relevant bits together. Your favourite IDE can easily support Typescript because TypeScript offers the [tsserver](https://github.com/Microsoft/TypeScript/wiki/Standalone-Server-%28tsserver%29) which is a ***"node executable that encapsulates the TypeScript compiler and language services".***

That makes sense because I remember that I restarted the Typescript Server in IntelliJ or VSCode from time to time when debugging type problems in the past.  `tsserver` is of course not the right tool for a file analysis. While looking through the  [architecture overview](https://github.com/microsoft/TypeScript/wiki/Architectural-Overview)  starting at the yellow `tsserver` block I spotted the `checker.ts`  far down in the core of typescript. That's what we were searching for. It's not part of the language service, it's part of the core of TypeScript.

![](images/typescript-architecture.png)

## The Type Checker (checker.ts)

Let's dive into the type checker and see how it can help us with the given challenge. The following code shows the most important parts of type checking with TS. Create a program, derive the checker and then use that checker for your analysis and type extraction.

```typescript

const program: ts.Program = ts.createProgram(files, tsConfig);
const checker: ts.TypeChecker = program.getTypeChecker();

// later which a given TS node
const classSymbol = checker.getSymbolAtLocation(node.name);
```

## Type Checker Usage

Of course, it's not that easy and gets pretty complicated with all the details. I will try to fill some of the details by answering one question. With the AST we are not able to extract type information. How can we access the details of the type `ImportantValue` so we know that `collectedValue` has three distinctive nested properties?

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

First step is to create our type checker and make the file accessible for the type checking.

```typescript
import * as ts from "typescript";

const files: string[] = ['file-with-types.ts']
const program: ts.Program = ts.createProgram(files, {});
const checker: ts.TypeChecker = program.getTypeChecker();

const mySourceFile = program.getSourceFile('file-with-types.ts');
```

Next we need to find the starting point for our analysis. We want to start at the `Output` type so we need to find the `ts.Node`. This is the plain AST representation of the entire `Output` definition. We can accomplish this by traversing the entire source file while looking for a node with the name `Output`. That's our type and once we found it we can ask for the specific `ts.Type` which is our entry point into the semantic world beyond the plain AST 🥳

```typescript
ts.forEachChild(mySourceFile, node => {
  if (ts.isTypeAliasDeclaration(node) && node.name.escapedText === "Output") {
    const outputType = checker.getTypeAtLocation(node.name);
    // [...process that type]
  }
});
```

What to do with `outputType` ? It's the type definition of `Output` and we can access every property through `outputType.getProperties()`.

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

On that level we only have one property `collectedValue: ImportantValue` in our original type definition so we can safe us one loop for now and simply extract the first element and name it `collectedValueProperty`. The value has the type `ts.Symbol` which is similar to `ts.Type` a value with added semantics compared to the rather raw `ts.Node`.

We can use that symbol, to access the name of the variable and the actual name of the type. The type checker gives us the methods `getTypeOfSymbolAtLocation` and `typeToString` to do that and we can print the final result to the console.

```typescript
// prints `collectedValue: ImportantValue`
console.log(`└── ${collectedValueProperty.name}: ${propertyTypeName}`)
```

We can now deep one level deeper into the analysis to finally extract the types from `ImportantValue` which we are aiming for. This is basically *"rinse & repeat"* as you will see in the following code example.

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

- We don't know the depth of our analysis so it's a perfect match for recursion although you could construct a loop too I guess.
- We need to stop diving into properties that are coming from the standard library like `Date` and methods or values of primitives like `string` because we are usually not interested in those properties. Same for external libraries (think of rxjs & friends).

### Recursion

First, let's make the analysis recursive first.

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

This will find every single property, no matter how deep it's nested but you will be lost in noise when you execute it as is. See the following log and try to spot our types within the ocean of properties pouring in from the standard library.

<details>

<summary>Output</summary>


    ```typescript
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
    👉 **├── value1: string**
      ├── toString: (radix?: number) => string
      ├── toFixed: (fractionDigits?: number) => string
      ├── toExponential: (fractionDigits?: number) => string
      ├── toPrecision: (precision?: number) => string
      ├── valueOf: () => number
      ├── toLocaleString: (locales?: string | string[], options?: NumberFormatOptions) => string
    👉  ├── value2: number
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
    👉  **├── value3: Date**
    👉  **├── collectedValue: ImportantValue**
    ```
</details>

That's the problem we described before. The `Date` and `string` types causes this drama and we need to stop our processing before entering those type.

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

The method will detect if a given symbol belongs to a standard library (`Date`), to an external library (whatever you use from `node_modules` for example) and everything that doesn't have an actual declaration like all primitive types (`string`, `number`).

We will use that helper to prevent our recursion to dive into those unwanted types:

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

With those changes we are back at the previous results being printed in the console but we are now much more flexible. Let's process a much deeper nested type `Output`. See the following file example:

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

The following values are printed for the given file. Every standard library type is skipped but the values are probably traversed and listed with the correct name and type name.


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

## Conclusion

Interacting with the type checker is similar difficult as interacting with the AST. Usually you don't have a complete visual representation in your mind what data is given to you by typescript. To this day I still rely on `debugger` and `console.log` to find my way through solving a specific challenge with the type checker. That's mainly because it's not our daily job. It's an individual requirements but the majority of tasks is still writing typescript and not introspecting written code.

After a while you are more fluent handling `ts.Symbol`, `ts.Type` and `ts.Node` and then it's more and more fun to interact with your own written code from such a refreshing and exciting perspective ✨
