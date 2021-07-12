---
path: "/blog/angular-inject-the-injector"
date: "2021-07-09"
title: Every big monorepo needs the "code owners" feature
featuredImage: images/kyle-glenn-cqvy_cag4gI-unsplash.jpg
shortSummary: CODEOWNERS file help to split the code responsibilities & ownership in a monorepo.
attribution:
   creator: Kyle Glenn
   source: https://unsplash.com/photos/cqvy_cag4gI
author: Georgios Kaleadis
authorSummary: "CTO at Satellytes"
---

Monorepos are en vogue these days for good reasons. I spare you the discussion. Once you have decided to go for monorepos with your team and collaborators you might want to know about the "code owners" feature of your favourite version control services (being mostly GitHub or GitLab).

I'm speaking with my experience coming from a GitHub Enterprise environment but the features are similar for [GitHub](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-code-owners) and [GitLab](https://docs.gitlab.com/ee/user/project/code_owners.html).

## How to use

You place a file named `CODEOWNERS` in one of the places where your other "meta files" are usually placed being the repository root , `.github` or `docs/`. You use the file to describe who owns a specific part in your repository and that code ownership knowledge will be used to automatically assign the responsible individual or team for a pull request you open.

Here a carefully crafted example file:

```bash
# EXAMPLE FILE
# Some comment to clarify
# the content of this file
# this is a constructed example leanign towards reality only

# MONO REPOSITORY OWNER
# everything that is not specified is owned by a specific team
*							@my-namespace/mono-repo-owner

# FRONTEND TEAM
/apps/						@my-namespace/frontend-team
/apps/angular-libraries		@my-namespace/collbaorators-angular
/apps/react-website			@my-namespace/collbaorators-react

# BACKEND FOLKS
/server/					@my-namespace/frontend-team
/docker/					@my-namespace/frontend-team

# DEV OPS
# That single file belongs to the dev ops folks
Jenkinsfile					@my-namespace/dev-ops

# PACKAGE MAINTAINERS
# And the root package.json, one of the most crucial parts in a monorepo
# belongs to a specific cross cutting team to review any changes
package.json				@my-namespace/package-maintainers

# some individual assignments
/experimental/john/			john@example.com
/experimental/jane/			@external-jane
```

There is really nothing more. There are comments and ownership statements. The ownership is expressed as the combination of a files glob pattern (think of your `.gitignore` file) and the owner being a defined GitHub team (`@my-namespace/frontend-team`) or an individual user identified by email (`john@example.com`) or username (`@external-jane`).  If you need to know all details please read the manual.

You can't make many mistakes but I want to share two things that happened to me:

1. When we first introduced it, I tried it in a private repo in the GitHub Enterprise environment and it didn't work. I expected to have some basic errors in the format and tinkered around with the file for quite some. In the end I recognized that my private repo wasn't accessible by any of the assigned teams which means the code ownership assigment in the code review I expected to happen will not work of course.
2. Be careful with the paths. Really. Read the manual carefully not to waste any time.I wanted to assign `docs` and all nested files and folders in the root of the repository. `docs/*` is different to `/docs/`. I somehow preferred `docs/*` and at some point of time I even wrote things like `docs/**/*` because it wasn't working as expected assuming it's real file globbing. It's not and GitHub won't tell you about errors in your statements. It will just not work.
   Long story short, if you want to match any file in the root folder `docs` then your correct matcher is `/docs/` and nothing else.

## The effect

You don't have to add reviewers manually anymore. Instead you leave the assignment of reviewers empty and you get the matching code owners assigned and notified.

We combine this with the requirements to have at least a specific amount of code reviews to ensure that the code owners review every change to their share of files. This is important for monorepos otherwise some team could change the code of an area they are not suitable by a mutual review within the team without informing the actual responsible team.

- Show actual ownership in the diff
- Assign reviewers
- Display which individual acted for which team

## Conclusion

That's it, the file doesn't do anything besides this. While this sounds very simple, the knowledge about this feature and the positive implications especially for monorepos are not that obvious. Once you know it you won't ever miss it again but reaching that point is pure luck of having the right peers telling you about that or stumbling over this feature on some other place because it's not common knowledge.
