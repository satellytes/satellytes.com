---
path: "/blog/monorepo-codeowner-github-enterprise/"
date: "2021-07-09"
title: Every big monorepo needs the CODEOWNERS feature
featuredImage: images/chang-duong-Sj0iMtq_Z4w-unsplash.jpg
shortSummary: CODEOWNERS file help to split the code responsibilities & ownership in a monorepo.
attribution:
   creator: Chang Duong
   source: https://unsplash.com/photos/Sj0iMtq_Z4w
author: Georgios Kaleadis
authorSummary: "CTO at Satellytes"
---


Monorepos are en vogue these days for good reasons. It's also a heated debate, but I want to spare you that discussion for now. Once you have decided to go for monorepos with your team and collaborators, you might want to know about the CODEOWNERS feature of your favorite version control services (being mostly [GitHub.com](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-code-owners), [GitHub Enterprise](https://docs.github.com/en/enterprise-server@3.1/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-code-owners) or [GitLab](https://docs.gitlab.com/ee/user/project/code_owners.html)).

<!-- stop excerpt -->

I'm speaking with my experience coming from a GitHub Enterprise environment, but the features are either identical (GitHub.com) or very similar (GitLab).

## How to use (place & syntax)
You place a file named `CODEOWNERS` in one of the places where your other "metafiles" are usually placed being the repository root, `.github` or `docs/`. You use the file to describe who owns a specific part in your repository, and that code ownership knowledge will be used to automatically assign the responsible individual or team for a pull request you open.

Here a carefully crafted example file showing a list of files and folders and their matching owners on the right side.

```bash
# EXAMPLE FILE
# Some comment to clarify
# the content of this file
# this is a constructed example leaning towards reality only

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
# belongs to a specific cross-cutting team to review any changes
package.json				@my-namespace/package-maintainers

# some individual assignments
/experimental/john/			john@example.com
/experimental/jane/			@external-jane
```

There are only ownership statements and the comments.

The ownership is expressed as the combination of a files glob pattern (think of your `.gitignore` file) and the owner being a defined GitHub team (`@my-namespace/frontend-team`) or an individual user identified by email (`john@example.com`) or username (`@external-jane`). Comments are introduced with a starting hash sign (`#`).  If you need to know all details please read the [manual](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/about-code-owners).

You can't make many mistakes, but I want to share two things that happened to me.

1. Before introducing it, I tried it in a private repo in the GitHub Enterprise environment, and it didn't work. I guessed I made some basic syntax errors in the file and tinkered around for quite some time. In the end, I recognized that my private repo wasn't accessible by any of the assigned teams. This means GitHub and its CODEOWNER algorithm could not assign the required people and teams **while their UI did not tell me about that fact**.
2. Be careful with paths. I wanted to assign `docs` and all nested files and folders in the repository's root to a team.
   Is it `docs`, `docs/*`,`/docs/` or `docs/**/*` assuming glob-like support? Nothing worked, and GitHub UI never showed any indications of a problem. The problem was combined with the first problem outlined here. Long story short, if you want to match any file in the root folder named `docs`, your correct matcher is `/docs/` and nothing else. Read the manual not to waste time like me.

## The effect

You don't have to add reviewers manually anymore. Instead, you leave the assignment of reviewers empty. You will get the matching code owners assigned and notified once you have the PR created. Unfortunately, there is no preview for the assignment or indication in the UI that this will happen. You need to have explicit contribution guidelines so people won't continue to assign people manually.

We combine this with the requirements to have at least a specific amount of code reviews to ensure that the code owners review every change to their share of files. This is important for monorepos; otherwise, some team members could change the code of an area they are not suitable for by a mutual review within the team without informing the actually responsible team.

- Show actual ownership in the diff
- Assign reviewers
- Display which individual acted for which team

## Conclusion

That's it. The file doesn't do anything besides this. While this sounds very simple, the knowledge and the favorable implications of this feature, especially for monorepos, are not evident.
Once you know it, you won't ever miss it again but reaching that point is pure luck of having the right peers telling you about that or stumbling over this feature on some other place because it's not common knowledge.
