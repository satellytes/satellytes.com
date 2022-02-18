---
path: "/blog/boosting-developer-productivity-with-github-actions/"
date: "2022-02-25"
title: Boosting developer productivity with GitHub Actions
featuredImage: images/github-actions/hero.jpg
author: "Felix Hamann"
authorSummary: "Senior Developer at Satellytes"
teaserText: How to integrate GitHub Actions for some serious productivity boost
---

This is going to be a brief introduction to GitHub Actions, followed by a closer look at the two main elements of GitHub Actions: Workflows and Actions.

We will then look at a few examples of how we are using them in one of our client's project, followed by the attempt to inspire you to start thinking about automation yourself.

## Terminology
Let’s start with everyone’s favorite when it comes to new technology: terminology.

Even though it’s called "GitHub Actions", the main thing that you will deal with are going to be "Workflows".

#### Workflow
Workflows are what other automation platforms most often refer to as "pipelines". They are the biggest logical chunk in this architecture and they themselves are made up of 1 or more "jobs".

#### Job
Each job is itself made up of 1 or more "steps".

#### Step
These steps can be either arbitrary CLI commands like `yarn install` or they can use an "Action".

#### Action
Actions can be either pure JavaScript or Docker-based and you can mix them however you like in a single job. So you can easily have a job that runs a CLI command as a first step, then uses a JavaScript action followed by a Docker action.

#### Event
What we also need is a way to trigger workflows. These are called events and there are different types of them:
- "Internal events": These are events that fire when someone pushes to GitHub or adds a comment to a Pull Request or similar
- "Manual events": You can manually trigger events by clicking a button in a workflow that says "Run workflow now"
- "Scheduled events": You can also have scheduled events based on a cron job that will for example trigger a workflow once a week, every Tuesday morning or whenever you like.

#### Runner
There is one more thing missing to make this whole thing work and that is the actual Runner that runs your workflows. The runners are mere applications, running somewhere on a server, listening for your jobs to execute them.
GitHub.com provides a lot of these Runners that you can use right away. With a free github account you can use up to 2000 minutes of runner time per month, which should be plenty enough for private projects so you can start experimenting with them right away.

In case you need a very special environment or would like to have more control over the runner you can also host them yourself. With custom runners you can very specialized environments to run your Windows 95 jobs or that integrate particularly well with your existing infrastructure.

Runners can have different labels so they can be targeted in a workflow. All publicly available runners have labels like `ubuntu-latest` or `windows-latest` to reveal the underlying operating system. There can also be other labels like `x64` or `gpu` to reveal information about the architecture.

## Workflows
With all that terminology out of the way, let's talk about workflows. Where are they stored, what do they look like from the inside and the outside?

### Location of a GitHub Workflow
Workflows are stored in your repository in a folder called `.github/workflows/` in the form of YAML files. Here you can see a schema of this:
```sh
.github
├── ...
└── workflows
    ├── create-release.yml
    ├── housekeeping.yml
    ├── new-issues.yml
    ├── pr-checks.yml
    ├── release-comment-in-issues.yml
    └── stale.yml
...
```

When you add a `*.yml` file in that folder it will be picked up by GitHub automatically and added to the workflows in your repository. There is no additional configuration required.

### Anatomy of a Workflow
As already mentioned, Workflows are written in the YAML format. Let's look at a workflow that runs checks on Pull Requests:
```yaml
name: Pull Request checks (1)

on: (2)
  pull_request: (3)
    types: [opened, reopened, edited, synchronize] (4)
    branches: [main] (5)

jobs: (6)
  commitlint-pr-title:
    name: Ensure proper PR title (7)
    runs-on: ubuntu-latest (8)
    steps: (9)
      - uses: actions/checkout@v2 (10)

      - uses: actions/setup-node@v2 (11)
        with: (12)
          node-version: '16' (13)

      - name: manually install config-conventional commitlint preset (14)
        run: npm install --no-save @commitlint/config-conventional (15)

      - uses: satellytes/commitlint-pr-title@v1 (16)
```
First we add a human-readable name to the workflow (1). In this case this Workflow is called "Pull Request checks". Next we define a list of events that trigger this workflow with the "on" property (2). In this case we want this workflow to be triggered whenever there is something happening that is related to a Pull Request (3). We want this particular workflow to be run for a specific set of types of pull_request events (4). To do this we specify a list of types: "opened", "reopened", "synchronize", and "edited". We also want to only run this workflow when the target branch of the PR is `main` so we add another filter for that (5).

With that set up we now define the jobs that make up this workflow (6). This workflow consists of only a single job that is called `commitlint-pr-title`, or, to make it more human-readable we can give it a "name" property, like "Ensure proper PR title" (7). This job demands to be run on a runner that is labeled `ubuntu-latest` (8). The job is made up of a list of steps (9). The first step `uses` an action called `actions/checkout` (10). This action will do a lightweight clone the repository on the runner. Judging by the name of this action you can infer that it can be found at https://github.com/actions/checkout. All actions that start with `actions/` are part of the "official" actions and are maintained by GitHub. The next step also uses one of the official Actions called `actions/setup-node` and provides an "input" for this action using the `with` property (12) to pass the specific `node-version` that we want installed on this runner (13).

While the previous two steps were using Actions, the next step runs a CLI command to install a dependency using the `run` property instead of `uses` (14). We will need this dependency in the final step of this job. To improve the readability of the workflow output we explicitly give this step a name (15). For he steps that don't receive a `name` property, the name in the output will simply be the name of the action or the raw CLI command that was run.

The final step in this job is using another action, called `satellytes/commitlint-pr-title` (16).

You might have noticed that whenever we use an action as a step we also specified some kind of version identifier alongside the name of the action: `actions/checkout@v2`. The name of the action is `actions/checkout` and the `@v2` in this case points to the tag `v2` in the repository of that action. These version identifiers can be any [Git Reference](https://git-scm.com/book/en/v2/Git-Internals-Git-References) that you want. It can be a branch name, a commit hash or a tag. The recommendation is to keep these as precise as possible, so avoid having a "version" of `@main`.

This workflow will produce output like this:
![The output of the workflow](./images/github-actions/workflow-output.jpg)

### Workflows in a GitHub repository
All the workflows in your repository can be found in a special tab called "Actions":
![The Actions tab](./images/github-actions/actions-tab.jpg)

In this tab you can take a look at any of the past or ongoing workflow runs and their outputs and results.

Workflows that are run as part of a PR will in addition appear in the "Checks" tab in a Pull Request:
![The Checks tab in a Pull Request](./images/github-actions/checks-tab.jpg)

## Actions
So now that we've talked about where workflows are located and what they look like, let's go into more detail about the things that make up these workflows: Actions.

### Location of a GitHub Action
Most of the time a single action corresponds to a single repository. The name of an action is simply its GitHub path. It’s made up of an owner and the name of the repository. Throughout the rest of this blog post we will be looking at an action called `satellytes/commitlint-pr-title`. It can be found at https://github.com/satellytes/commitlint-pr-title, note that the path in the URL matches the name of the action. You can also have multiple actions in a single repository, in which case you would add the subfolder to the name of the repository, like "satellytes/actions/my-action".

To browse available there is the [GitHub Marketplace](https://github.com/marketplace?type=actions) that has more than ten thousand publicly available Actions that are free for you to use. There are quite a lot of "official" actions like "actions/checkout" but there are far more community actions that basically cover everything that you could possibly want to do inside a workflow. That means that most of the time when you want to have a specific workflow it’s just a matter of putting together the right combination of public Actions in the right order.

> You can very well use actions that are not in the marketplace. Adding them to the marketplace is a voluntary step but it’s a mere button click away and it makes it easier for others to find your action.

### Anatomy of an Action
Actions are (usually) stored in a separate repository per action. Each action needs to provide a file called `action.yml` in its root folder that provides some metadata for the GitHub Actions Runner.

#### The `action.yml` file
Let's take a look at the `action.yml` file of the `satellytes/commitlint-pr-title` action:

```yaml
name: 'Commitlint PR title' (1)
description: 'This action runs your commitlint config against your Pull Request titles' (2)
author: 'Felix Hamann <felix.hamann@satellytes.com>' (3)
runs: (4)
  using: 'node16' (5)
  main: 'dist/index.js' (6)
inputs: (7)
  commitlintConfigFile: (8)
    description: path to commitlint config file (9)
    default: ./commitlint.config.js (10)
    required: false (11)
  helpUrl: (12)
    description: help url for users of this action
    default: 'https://www.conventionalcommits.org'
    required: false
```

This file contains things like a human-readable name of the action (1), a description (2) as well as an author (3).
This file also explains what is required to run this action. This is done using the `runs` property (4). In this case this action requires `node 16` (5) and states a `main` entry file of `dist/index.js` (6). That means that when this action is used, the Runner will need to provide node 16 to run this particular Action and it will execute the file `dist/index.js` from this action.

As mentioned, there are two main categories of actions. There are JavaScript actions and Docker-based actions. This specific action is a JavaScript action which is executed using the NodeJs runtime. A Docker based Action would specify a value of "docker" as the `using` property here and instead of an entry file it would point to a Dockerfile. [Here](https://docs.github.com/en/actions/creating-actions/creating-a-docker-container-action) you can find more information about docker-based actions.

Other things that this file also states are inputs that this action might accept (7) or outputs that it provides (not shown). In this case we have two inputs: `commitlintConfigFile` (8) and `helpUrl` (12). For each input we can specify a description (9), a default value (10) and whether or not this input is required (11).

#### The `main` entry file
This is where we can finally talk about some actual code. In the case of the `satellytes/commitlint-pr-title` action the entry file `dist/index.js` is compiled and minified TypeScript so it wouldn't be a lot of fun to look at.

Let's take a look at the actual TypeScript [source](https://github.com/satellytes/commitlint-pr-title/blob/main/src/main.ts):
```ts
import * as core from '@actions/core';
import * as github from '@actions/github';
import { lint, formatResult } from './lint';

(async function run() {
    const title = github.context.payload.pull_request?.title;
    const configFile = core.getInput('commitlintConfigFile');

    core.info(`🔎 Checking if the title of this PR "${title}" meets the requirements ...`);

    try {
        const lintResult = await lint(title, configFile);
        if (!lintResult.valid) {
            core.setFailed(`\n ${formatResult(lintResult)}`);
        } else {
            core.info('✔️ All good');
        }
    } catch (error) {
        core.setFailed(error as Error);
    }
})();
```

We won't go into a lot of detail about what this code does. I'll leave this for you to explore.

The main takeaway should be, that there are two important libraries that we are using: `@actions/core` and `@actions/github`. These two libraries provide a lot of utilities to interact with the process that is running on the GitHub runner. They allow you to fetch information about the event that triggered this workflow as well as make it easy to report the result of your action. You can get up close and personal with this code and explore the inner workings in [the repository](https://github.com/satellytes/commitlint-pr-title).

### Bundling an Action
As we've seen in the previous subsection we can have pretty much any code we want, as long as we provide a main entry point for the GitHub runner to execute. There are thousands of ways to turn TypeScript into JavaScript. The one way that I found most comfortable was to use [`@vercel/ncc`](https://github.com/vercel/ncc) to transpile, compile and bundle this action. `ncc` is a CLI tool that supports TypeScript out of the box and is meant to ship a single file that contains everything needed, from your handwritten source code to anything from inside the depths of your `node_modules` that is required by your action.

The file shown above is called `src/main.ts`. The bundling is done by calling `ncc build src/main.ts`. This will produce a file `dist/index.js` that we then point to in the `action.yml` file, as shown above.

There are a few pitfalls here:
- If your action involves a build step, you need to remember to include the bundle in your repository, in this case the `dist` folder. For regular projects this is most often not the case. Generally we don't want to include generated code in our repository. In this case you need to resist your urge to add `dist` to your `.gitignore` file.
- You need to remember to run your build/bundle step whenever you change your source code and commit this artifact with your code changes. This is important for the compiled code in your repository to not get outdated.

> 💡 Having a `pre-commit` hook that runs your build and bundle step is a great way to automate this.

## Inspiration: example workflows
Now that you know what workflows and actions look up close, let's take a look at some of the workflows that we are using to make our daily lives more comfortable. We are after all developers and we are known to be lazy, aren't we?

#### "Pull Request checks"
The workflow and the action that we've talked about so far in this blog post are of course one of these examples. Let me describe the problem that we are solving with this workflow.

**What problem does it solve?**
In a lot of our projects we are using the `squash` method to merge Pull Requests. That means that the title of a Pull Request will end up being the commit message of a commit in our `main` branch. For local development we've set up a tool called `commitlint` to make sure our developers adhere to the rules for commit messages that we agreed on. This is enforced using a git hook, which checks each commit and ensures that the developer provides a valid commit message. However, when creating a Pull Request in GitHub there is no straightforward way to enforce these same rules.

**How does it solve the problem?**
The configuration for `commitlint` is stored alongside our code, in the same repository. The action that we are using is using that same configuration that we are using in the git hooks on the developers' machines to lint the titles of our Pull Requests. In GitHub we've set up ["branch protection rules"](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule) that requires the workflow to pass successfully before a Pull Request is allowed to be merged. This way we ensure that any squashed commit that arrives in `main` will follow the same guidelines that we use during out local development.


#### "New issues"
This workflow is run for all new issues that are being opened in our repository.

**What problem does it solve?**
We are using a "Project" in GitHub, which is like a Kanban board to organize issues. We only have a single project that we use to organize all our issues. To make this work we need to add new issues to this project so that they appear on the project board. During our meetings we mostly look at this project board to triage new issues. Because we forgot to add some of the new issues from time to time, we forgot to talk about them during our refinements and so we never addressed some of them.

**How does it solve the problem?**
This workflow consists entirely of already available actions so it was pretty much a plug & play experience. All it does is, whenever there is a new issue, it adds it to our project. In every meeting in which we look at our project board we can now be sure that all new issues are listed in our backlog. This is especially relieving for issues that got created by some external party that is not aware of our GitHub project.

#### "Create release"
We are also making use of Releases in GitHub. These are meant to keep a neat history of released versions of our libraries. This is particularly nice because GitHub users can "subscribe" to our repository and choose to be notified if there is a new release.

**What problem does it solve?**
Creating releases, so far, has been a manual process. So every time our Jenkins release pipeline ran (yes, we also use Jenkins), it pushed a new release commit with the updated `CHANGELOG.md` file and a new tag to our repository but we then had to manually extract the changelog from the commit and manually create a GitHub release. We forgot to do this from time to time so our subscribers did not get notified and missed out on important updates.

**How does it solve the problem?**
The workflow that we are using to do this is a mixture of publicly available actions and a shell script to extract the change in the `CHANGELOG.md` file. It get's triggered whenever the repository receives a new `tag` and it automatically creates the release in GitHub. This is just one more thing off our minds, one less thing to worry about when the release panic hits.

#### "Housekeeping"
Housekeeping is an important aspect of the fast-paced frontend world. We used to have an issue to remind us to update our dependencies every once in a while. As with a lot of manual processes we forgot to do this from time to time. Especially when it comes to important vulnerability fixes it’s important to keep up to date. We now have a workflow to take care of that once a week using a scheduled event. With integrated tools like "Dependabot" this workflow might be obsolete soon, but so far we enjoy the fact that we are in full control of the workflow and can tweak and configure to our hearts content.

## Driven by laziness
Most of these examples are driven by laziness or the very human forgetfulness. It's the laziness to not assign a certain project to a new issue or the laziness to not run `yarn upgrade` once in a while. Basically the point of this blog post is to inspire you with the inherent laziness that I discovered in myself over the past few years. 

## It's not about the code
All these examples have one more thing in common: They are not necessarily related to the code in the repository. They rather deal with processes and metadata. They automate the things that we have to deal with on a daily basis that have to do with issue management, release cycles, vulnerabilities in third-party dependencies and so on.

Other external automation platforms like Jenkins, TravisCI or CircleCI are certainly splendid tools when it comes to automation, but from my experience, nothing integrates as smoothly into GitHub as "GitHub Actions" do. This is not particularly surprising, given the name - but it's still worth mentioning.

While external automation platforms sure provide a lot of value - and will continue to do so - there are aspects of a repository that are easiest automated using GitHub Actions (given that it lives inside GitHub).
The convenience with which you can interact with Projects, Issues, Releases and other non-code related features of GitHub have been a crucial deciding factor for me, when choosing _where_ to automate things. I won't advocate migrating all your pipelines to GitHub Actions. Instead I suggest to start small. Start with the things that would be hard to automate with your existing automation infrastructure and then slowly migrate whatever feels right.

## Think out of the box!
> "A repository is more than the sum of its code. Automate the repository, not the code."

There is a lot more to automation then the typical "continuous integration" and "continuous delivery" pipelines. Think outside of the box of CI/CD and be creative.
