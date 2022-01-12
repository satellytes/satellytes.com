---
path: "/blog/scoped-registry/"
date: "2021-12-30"
title: "How to set up multiple npm registries with scoped registries"
featuredImage: images/npm-scoped-registry.jpg
attribution:
    creator: Paul Esch-Laurent
    source: https://unsplash.com/photos/oZMUrWFHOB4
seoMetaText: How to set up multiple npm registries with scoped packages and scoped registries even if they are protected
teaserText: Learn with Jeff the Wombat, about npm scoped packages and scoped registries and how to configure access to multiple registries even if they are protected.
author: Mark Altmann
authorSummary: dev(ops)@satellytes, ❤️ for Wombats

---
## What is this all about?

Nowadays almost every programming language comes with its package management solution, so developers can easily share packages with other developers around the world. For Python it is pip, for .NET it's NuGet. npm is the package manager solution for Javascript-based languages. It is used to create and use node packaged modules and is built into the Javascript platform [Node.js](http://www.nodejs.org/). The central component behind these package managers is a registry. A registry is a database of packages, each comprised of software and metadata. For example, the public registry for npm is [registry.npmjs.org](http://registry.npmjs.org).

Besides using public registries, companies can establish their private registries in their company network. [Nexus](https://www.sonatype.com/products/repository-pro), [Artifactory](https://jfrog.com/artifactory/) or [verdaccio](https://github.com/verdaccio/verdaccio) only to name some of the well-known. The advantage is that the published packages of that company never leave the company network. Another advantage is that you can set up authentication to additionally secure your internally published packages.

Jeff the Wombat [^1] is a Frontend developer at **"Working Wombats"** and got a letter from his boss that due to security reasons, from now on, the developers have to use the internal company registry for their npm packages. The internal registry can be accessed via username and password. "This is an easy one," thinks Jeff and starts trying to add the new registry to the configuration. But soon he finds out, that he can only add one default registry. But how should he then get packages from the public npm registry and, on the other side, private packages from the newly setup internal registry at the same time? Time to google...

[^1]: Imaginary figure which does not reflect any certain person or animal in the real world.

## Scopes and scoped registries

While searching Jeff stumbles upon the following:

> All npm packages have a name. Some package names also have a scope. A scope follows the usual rules for package names (URL-safe characters, no leading dots or underscores). When used in package names, scopes are preceded by an `@` symbol and followed by a slash, e.g. `@somescope/somepackagename` Scopes are a way of grouping related packages together, and also affect a few things about the way npm treats the package.
> -- <cite>[npm](https://docs.npmjs.com/cli/v8/using-npm/scope)</cite>

Packages can be grouped with scopes and for scopes, we can set alternative registries named `scoped registries` where npm will lookup the packages instead of the main registry.

"Well, this sounds promising!" Jeff thinks.

> 💡 The usage of scoped packages and scoped registries can also greatly diminish your attack surface for the dependency confusion attack [dependency confusion attack](https://snyk.io/blog/detect-prevent-dependency-confusion-attacks-npm-supply-chain-security/)

## Where to configure scoped registries

.npmrc is a configuration file that configures how npm works in your environment. It can be used globally or on a user or project level. [Here](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc) are the docs for .npmrc.

**Working wombats** already set up the new registry and moved all packages from the public registry into the private registry. Fortunately for the internal packages, they already used scopes (`@workingwombats`). The registry can be found internally via the URL `registry.working-wombats.rocks`. So Jeff could add a scoped registry with the following line to .npmrc:

```
@workingwombats:registry=https://registry.working-wombats.rocks/
```
## 401 Unauthorized... what? 😱

Jeff quickly added the configuration for the scoped registries and thought he could knock off work early today and enjoy the rest of the day but then he saw the dreaded 401 error message...

Even if the registry is hosted internally, it is good practice to add authentication to prevent anonymous access to the packages. This can be in form of a username and password or via an access token. For username and password normally basic authentication ([Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)) is used. To create the authentication string Jeff takes the username and password, separated with a colon and then encode it with base64:

`username:password` ⇒ base64 encoded ⇒ `dXNlcm5hbWU6cGFzc3dvcmQ=`

For encoding you can use the command line `echo -n 'my-string' | base64` (Linux) or an IDE (vscode with plugin) or search for an online base64 encoder.

>💡 Use online encoder only for testing purposes. Never enter a productive username and/or password there.

Jeff remembered, that the mail of his boss also contained the username and password in plaintext to access the registry (yes, even in the best imaginary companies security isn't always perfect 🤷‍♂️):

`sirWombat:theCudd1er!` ⇒ base64 encoded ⇒ `c2lyV29tYmF0OnRoZUN1ZGQxZXIh`

So to add basic authentication to the registry, Jeff encodes the username and password with base64 and goes back to the .npmrc file, and adds the following line below the corresponding scoped registry:

```
@workingwombats:registry=https://registry.working-wombats.rocks/
//registry.working-wombats.org/:_auth=c2lyV29tYmF0OnRoZUN1ZGQxZXIh
```

>💡 Note the // without the HTTPS: at the beginning

Alternatively, if you have an access token you can put the access token after `_authToken`:

```
@workingwombats:registry=https://registry.working-wombats.rocks/
//registry.working-wombats.org/:_authToken=c2lyd29tYmF0OnRoZWN1ZGQxZXIh
```

Jeff tried it again et voilà it worked! He almost committed the new additions of the project-level .npmrc to git but then his old mentor "Sir Wombat" came into his mind:

>💡 Remember that it is not a good practice to add credentials to version control e.g. if you have versioned your .npmrc file.

and Jeff was asking himself...
## But where should I put the credentials then? 🤷‍♂️

If you have a project-level .npmrc file and have added it in your version control then you could do the following:

**Use environment variables**

we could export the authentication string as an environment variable:

e.g. for linux `$ export NPM_TOKEN=<base64-string>`

We can then add the env variable in our .npmrc file:

```
//registry.wombatcorp.org/:_auth=${NPM_TOKEN}
```

The npm CLI will replace this value with the contents of the NPM_TOKEN environment variable
    
**Add scoped registry to user-level instead of project-level**

There are different .npmrc files as explained here ([npmrc](https://docs.npmjs.com/cli/v8/configuring-npm/npmrc)). 
Each of these files is loaded, and config options are resolved in priority order. For example, a setting in the user config file would override the setting in the global config file. So we could put the scoped registry into the user config file instead of the project config file.

## Conclusion

Finally, Jeff could shut down his computer and leave work. Today he learned how to use scoped registries to access different scoped packages including how to use authentication. On his way home he quickly recapped what he has learned today:

Packages in npm can be grouped with scopes. Scopes are preceded by a `@` followed by the scope name and the package name separated by `/` e.g. `@scope/package`. To set a specific registry for a scope you can use scoped registries. To set a scoped registry open up the .npmrc file and enter the following:

```
@scope:registry=https://<your registry>
```

where `@scope` is the scope name and `<your registry>` is the registry where the scoped packages are hosted. 

If authentication is needed it is possible to add a line below the scoped registry with `_auth` and the basic authentication string for username and password (`username:password` ⇒ base64 encoded) or `_authToken` for an access token:

```
@scope:registry=https://<your registry>
//<your registry>:_auth=<base64-string>
```

"In the end...", thought Jeff, "...this wasn't too hard."

As a backend developer myself peeking into the world of frontend, I was standing before the same problem as Jeff. I wish I had found this blog post by then... 😌