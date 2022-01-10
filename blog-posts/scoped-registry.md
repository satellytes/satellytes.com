---
path: "/blog/scoped-registry/"
date: "2021-12-30"
title: "How to access multiple protected npm registries"
featuredImage: images/npm-scoped-registry.jpg
attribution:
    creator: Paul Esch-Laurent
    source: https://unsplash.com/photos/oZMUrWFHOB4
seoMetaText: Access private protected registries with npm scoped packages and scoped registries
teaserText: If you use multiple registries (public and private) you can use npm and scoped registries to configure access to multiple registries even if they are protected.
author: Mark Altmann
authorSummary: dev@satellytes, ❤️ for Wombats

---
## What is this all about?

Nowadays almost every programming language comes with its own package management solution, so developers can easily share packages with other developers around the world. For Python it is pip, for .NET it's nuget. npm is the package manager solution for Javascript based languages. It is used to create and use node packaged modules and is built into the Javascript platform [Node.js](http://www.nodejs.org/). The central component behind these package managers is a registry. A registry is a database of packages, each comprised of software and metadata. For example the public registry for npm is [registry.npmjs.org](http://registry.npmjs.org).

Beside using public registries, companies can establish their own private registries in their company network. The advantage is that the published packages of that company never leave the company networks. Another advantage is that you can setup authentication to additionally secure your internally published packages.

## Scopes and scoped registries

If you are a javscripty/typescript developer in a company you certainly stumbled over the problem that you, on the one side, use official packages from the public npm registry but on the other side also need internal packages from the company internal registry. Unfortunately there cannot be two main registries in npm at the same time. But scoped packages come to the rescue.

> All npm packages have a name. Some package names also have a scope. A scope follows the usual rules for package names (URL-safe characters, no leading dots or underscores). When used in package names, scopes are preceded by an `@` symbol and followed by a slash, e.g. `@somescope/somepackagename` Scopes are a way of grouping related packages together, and also affect a few things about the way npm treats the package.
> -- <cite>[npm](https://docs.npmjs.com/cli/v8/using-npm/scope)</cite>


Packages can be grouped together with scopes and for scopes we can set alternative registries named `scoped registries` where npm will lookup the packages instead of the main registry.

> 💡 The usage of scoped packages and scoped registries can also greatly diminish your attack surface for the dependency confusion attack [dependency confusion attack](https://snyk.io/blog/detect-prevent-dependency-confusion-attacks-npm-supply-chain-security/)

## .npmrc

npmrc is a configuration file configures how npm works in your environment. It can be used globally or on a user or project level. [Here](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc) are the docs for npmrc.

Lets suppose we have a company named *Wombat Corp.* and have published our packages under the scope `@wombatcorp`. Our registry can be found under the url `registry.wombatcorp.org`. We could add a scoped registry with the following line:

```@scope:registry=https://<your registry>```

So to add our example registry we have to add the following line to npmrc:

```@wombatcorp:registry=https://registry.wombatcorp.org/```

## 401 Unauthorized... what? 😱

Even if the registry is hosted internally, it is good practice to add authentication to prevent anonymous access to the packages. This can be in form of username and password or via an access token. For username and password normally basic authentication ([Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)) is used. To create the authentication string we take the username and password, separated with a colon and then encode it with base64:

`username:password` ⇒ in our case `sirwombat:thecudd1er!` ⇒ base64 encoded ⇒ `c2lyd29tYmF0OnRoZWN1ZGQxZXIh`

For encoding you can use the command line `echo -n 'my-string' | base64` (Linux) or an IDE (vscode with plugin) or search for an online base64 encoder.

>💡 Use online encoder only for testing purposes. Never enter a productive username and / or password there.

To add basic authentication to our registry, we go back to the npmrc file and add the following line below the corresponding scoped registry:

```
@scope:registry=https://<your registry>
//<your registry>:_auth=<base64-string>
```

in our example: 

```//registry.wombatcorp.org/:_auth=c2lyd29tYmF0OnRoZWN1ZGQxZXIh```

>💡 Note the // without the https: at the beginning

Or if you have an access token:

```
@wombatcorp:registry=https://registry.wombatcorp.org/
//registry.wombatcorp.org/:_authToken=c2lyd29tYmF0OnRoZWN1ZGQxZXIh
``` 

>💡 Remember that it is not a good practice to add credentials to version control e.g. if you have versioned your npmrc file.

## But where should I put the credentials then? 🤷‍♂️

If you have a project level npmrc file and have added it in your version control then you could do the following:

**Use environment variables**

we could export the authentication string as environment variable:

e.g. for linux `$ export NPM_TOKEN=<base64-string>`

We can then add the env variable in our npmrc file:

```//registry.wombatcorp.org/:_auth=${NPM_TOKEN}```

The npm cli will replace this value with the contents of the NPM_TOKEN environment variable
    
**Add scoped registry to user-level instead of project-level**

There are different npmrc files as explained here ([npmrc](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc)). 
Each of these files is loaded, and config options are resolved in priority order. For example, a setting in the userconfig file would override the setting in the globalconfig file. So we could put the scoped registry into the userconfig file instead of the project config file.

## Summary

Packages in npm can be grouped together with scopes. Scopes are preceded by a `@` followed by the scope name and the package name separated by `/` e.g. `@scope/package`. To set a specific registry for a scope you can use scoped registries. To set a scoped registry open up the .npmrc file and enter the following:

```@scope:registry=https://<your registry>```

where `@scope` is your scope name and `<your registry>` is the registry where your scoped packages are hosted. 

If you need authentication you can add an additional line below the scoped registry with `_auth` and the basic authentication string for username and password (`username:password` ⇒ base64 encoded) or `_authToken` for an access token:

```
@scope:registry=https://<your registry>
//<your registry>:_auth=<base64-string>
```
