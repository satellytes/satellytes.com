---
path: "/blog/scoped-registry/"
date: "2021-12-30"
title: "How to access protected npm registries with scoped packages and scoped registries"
featuredImage: images/npm-scoped-registry.jpg
attribution:
    creator: Paul Esch-Laurent
    source: https://unsplash.com/photos/oZMUrWFHOB4
seoMetaText: Access protected registries with npm scoped packages and scoped registries
teaserText: If you use multiple registries (public and private) you can use npm and scoped registries to configure access to multiple registries even if they are protected.
author: Mark Altmann
authorSummary: dev(ops)@satellytes, ❤️ for Wombats

---
## What is this all about?

Nowadays almost every programming language comes with its own package management solution, so developers can easily share packages with other developers around the world. For Python it is pip, for .NET it's nuget. npm is the package manager solution for Javascript based languages. It is used to create and use node packaged modules and is built into the Javascript platform [Node.js](http://www.nodejs.org/). The central component behind these package managers is a registry. A registry is a database of packages, each comprised of software and metadata. For example the public registry for npm is [registry.npmjs.org](http://registry.npmjs.org).

Beside using public registries, companies can establish their own private registries in their company network. [Nexus](https://www.sonatype.com/products/repository-pro), [Artifactory](https://jfrog.com/artifactory/) or [verdaccio](https://github.com/verdaccio/verdaccio) only to name some of the well-known. The advantage is that the published packages of that company never leave the company networks. Another advantage is that you can setup authentication to additionally secure your internally published packages.

Jeff Wombat Jr.[^1] is a Frontend developer at **"Working Wombats"** and got a letter from his boss that due to security reasons, from now on, the developers have to use the internal company registry for their npm packages. The internal registry can be accessed via username and password. The problem here arises that Jeff knows that in npm you can only set one main registry where to get the packages from.

[^1]: Imaginary person which does not reflect any persons in the real world.

## Scopes and scoped registries to the resuce

> All npm packages have a name. Some package names also have a scope. A scope follows the usual rules for package names (URL-safe characters, no leading dots or underscores). When used in package names, scopes are preceded by an `@` symbol and followed by a slash, e.g. `@somescope/somepackagename` Scopes are a way of grouping related packages together, and also affect a few things about the way npm treats the package.
> -- <cite>[npm](https://docs.npmjs.com/cli/v8/using-npm/scope)</cite>

Packages can be grouped together with scopes and for scopes we can set alternative registries named `scoped registries` where npm will lookup the packages instead of the main registry.

> 💡 The usage of scoped packages and scoped registries can also greatly diminish your attack surface for the dependency confusion attack [dependency confusion attack](https://snyk.io/blog/detect-prevent-dependency-confusion-attacks-npm-supply-chain-security/)

## Where to configure scoped registries

.npmrc is a configuration file that configures how npm works in your environment. It can be used globally or on a user or project level. [Here](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc) are the docs for npmrc.

*Working wombats* already set up the new registry and moved all packages from the public registry into the private registry. Fortunately for the internal packages they already used scopes (`@workingwombats`). The registry can be found internally via the url `registry.working-wombats.rocks`. So they could add a scoped registry with the following line to .npmrc:

```
@workingwombats:registry=https://registry.working-wombats.rocks/
```
## 401 Unauthorized... what? 😱

Jeff fontunately found out, that he could easily add scoped registries to the .npmrc file and thought he could knock off work early today and enjoy the rest of the day but then he saw the dreaded 401 error message...

Even if the registry is hosted internally, it is good practice to add authentication to prevent anonymous access to the packages. This can be in form of username and password or via an access token. For username and password normally basic authentication ([Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)) is used. To create the authentication string we take the username and password, separated with a colon and then encode it with base64:

`username:password` ⇒ base64 encoded ⇒ `dXNlcm5hbWU6cGFzc3dvcmQ=`

For encoding you can use the command line `echo -n 'my-string' | base64` (Linux) or an IDE (vscode with plugin) or search for an online base64 encoder.

>💡 Use online encoder only for testing purposes. Never enter a productive username and / or password there.

Jeff remembered, that the mail of his boss also contained the username and password in plaintext to access the registry (yes, even in the best imaginary companies security isn't always perfect 🤷‍♂️):

`sirWombat:theCudd1er!` ⇒ base64 encoded ⇒ `c2lyV29tYmF0OnRoZUN1ZGQxZXIh`

So to add basic authentication to the registry, Jeff encodes the username and password with base64 and goes back to the .npmrc file and adds the following line below the corresponding scoped registry:

```
@workingwombats:registry=https://registry.working-wombats.rocks/
//registry.working-wombats.org/:_auth=c2lyV29tYmF0OnRoZUN1ZGQxZXIh
```

>💡 Note the // without the https: at the beginning

Alternatively, if you have an access token you can put the access token after `_authToken`:

```
@workingwombats:registry=https://registry.working-wombats.rocks/
//registry.working-wombats.org/:_authToken=c2lyd29tYmF0OnRoZWN1ZGQxZXIh
```

Jeff tried it again et voilà it worked! He almost commited the new additions of the project-level .npmrc to git but then his old mentor "Sir Wombat" came into his mind:

>💡 Remember that it is not a good practice to add credentials to version control e.g. if you have versioned your npmrc file.

and Jeff was asking himself...
## But where should I put the credentials then? 🤷‍♂️

If you have a project level .npmrc file and have added it in your version control then you could do the following:

**Use environment variables**

we could export the authentication string as environment variable:

e.g. for linux `$ export NPM_TOKEN=<base64-string>`

We can then add the env variable in our npmrc file:

```
//registry.wombatcorp.org/:_auth=${NPM_TOKEN}
```

The npm cli will replace this value with the contents of the NPM_TOKEN environment variable
    
**Add scoped registry to user-level instead of project-level**

There are different npmrc files as explained here ([npmrc](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc)). 
Each of these files is loaded, and config options are resolved in priority order. For example, a setting in the userconfig file would override the setting in the globalconfig file. So we could put the scoped registry into the userconfig file instead of the project config file.

## Conclusion

Finally Jeff could shutdown his computer and leave work. Today he learned how to use scoped registries to access different registries for different scoped packages including how to use authentication. On his way home he quickly recapped what he has learned today:

Packages in npm can be grouped together with scopes. Scopes are preceded by a `@` followed by the scope name and the package name separated by `/` e.g. `@scope/package`. To set a specific registry for a scope you can use scoped registries. To set a scoped registry open up the .npmrc file and enter the following:

```
@scope:registry=https://<your registry>
```

where `@scope` is the scope name and `<your registry>` is the registry where the scoped packages are hosted. 

If authentication is needed it is possible to add an additional line below the scoped registry with `_auth` and the basic authentication string for username and password (`username:password` ⇒ base64 encoded) or `_authToken` for an access token:

```
@scope:registry=https://<your registry>
//<your registry>:_auth=<base64-string>
```

Mhh, thought Jeff, in the end this wasn't too hard. He put on his headphones and started hearing music and enjoyed the rest of the day.