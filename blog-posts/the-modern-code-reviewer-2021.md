---
path: "/blog/the-modern-code-reviewer-2021/"
date: "2021-09-20"
title: "The modern code reviewer"
featuredImage: images/IBM_Electronic_Data_Processing_Machine_-_GPN-2000-001881.jpg
seoMetaText: A differentiated way to conduct pull requests code reviews to improve the PR throughput. Let your people choose a code review intensity that matches their experience, confidence, involvement, role, available time and project timeline.
teaserText: A differentiated way to conduct pull requests code reviews to improve the PR throughput. Let your people choose a code review intensity that matches their experience, confidence, involvement, role, available time and project timeline.
attribution:
    creator: NASA
    source: https://de.m.wikipedia.org/wiki/Datei:IBM_Electronic_Data_Processing_Machine_-_GPN-2000-001881.jpg
author: Georgios Kaleadis
authorSummary: "CTO at Satellytes"
---

## Long story short

In this blog post I try to propose a differentiated way to conduct pull requests code reviews to improve their throughput. Let your people choose a code review intensity that matches their experience, confidence, involvement, role, available time and project timeline. You do this by offering three different pull request review types: **shallow review**, **common review** and **expert review.** This will make the review much more accessible to everyone of your team, including new team members and the rather shy ones. Additionally your most involved people, who are usually the bottleneck, will get an instrument to conduct code reviews with reduced intensities when it's not always required.

# Introduction

Have you ever heard about the [Fagan inspection](https://en.wikipedia.org/wiki/Fagan_inspection) ? It's the first formalized system of a **peer review** for documents which includes source code. Formal **peer code reviews** are probably the reason why [space rockets don't blow up](https://www.fastcompany.com/28121/they-write-right-stuff) and hopefully [prevent radiation therapy devices from giving overdoses to patients due to a software bug (Therac-25)](https://en.wikipedia.org/wiki/Therac-25).

Creating software for the web is less life-threatening, more forgiving and happens in much faster development cycles, so we can easily fix bugs and add more features. That's why we can use less formal ways to inspect the code we are writing day by day. Pair programming and over-the-shoulder are two very simple and powerful ways to review code, but they are synchronous and require some previous alignment. The majority of code changes we observe these days are going through [Pull Requests](https://martinfowler.com/bliki/PullRequest.html).

Pull Requests are also the breeding ground for toxic behavior though. When people nitpick and fight over small details like [code indentations](https://www.youtube.com/watch?v=SsoOG6ZeyUI), [semicolons](https://github.com/twbs/bootstrap/issues/3057) or [curlies](https://softwareengineering.stackexchange.com/questions/2715/should-curly-braces-appear-on-their-own-line) than it's probably caused by the text-based and asynchronous nature of this peer code review type. Thankfully you can agree on issues like that in beforehand and collect them in a [contribution guideline](https://mozillascience.github.io/working-open-workshop/contributing/) to focus on the real problem: Finding the defects in a given code change.

Unfortunately, Pull Requests can still get pretty frustrating, exhaustive and ineffective, especially when people are not trained to work with the informal nature of Pull Requests. The freedom of giving feedback seduces people to focus on too many details and spending too much time on a review or people give one-liner feedback, where a proper discussion would be desired.

In addition people can only spend a limited amount of time on code reviews and entire teams and projects can run into the situation that the Pull Requests are the bottle-neck of their entire development journey. In this post I want to propose a solution to the throughput problem of pull request code reviews and help people getting more comfortable reviewing code.

In order to keep things simple, I will use **pull request**, **code review**, **peer review, review** or the abbreviation **PR** interchangeably unless said otherwise even though a peer review or a code review represent much wider concepts than a pull request.

# The throughput problem

When talking about code reviews, then usually two roles are involved. The **reviewee** (author) and one or multiple **reviewers** (peers checking the code).

The reviewee creates the PR and has the duty to make sure that code changes are relevant, well described and ready to be reviewed. The reviewer on the other hand has the duty to check the code that is about to land in the shared codebase for functionality and code quality. Depending on the size of the team and their agreements the code review is conducted by one or multiple reviewers. There are two ways to assign reviewers: manual or automated.

The manual assignment is probably okay for very small teams, where people don't have many choices to decide anyway. The automated way is usually orchestrated by a [CODEOWNERS](https://satellytes.com/blog/monorepo-codeowner-github-enterprise/) file or you enable [auto assignment](https://docs.github.com/en/organizations/organizing-members-into-teams/managing-code-review-assignment-for-your-team) where you can decide between different [routing algorithms](https://docs.github.com/en/organizations/organizing-members-into-teams/managing-code-review-assignment-for-your-team) "Round robin" or "Load balance" to ensure people review the same amount of changes.

Regardless of the way you assign people, often you can observe one problem: the **limited throughput** of code reviews which will cause a large backlog of PRs in the end. The moment PRs start to pile up the team is in risk to get frustrated and overwhelmed by the situation. Smaller and less important code reviews obstruct the important PRs, people are blocked in progressing as their partial work is not discussed or approved and once the overall project progress is delayed, project owners will further increase the pressure on the team.

Although every team and project setup is different, there are similarities in why people struggle with code reviews and a limited throughput.

# The struggling reviewer

Many times you find the assigned reviewers struggling with their assignments for various reasons not always but often being time related. I have collected and grouped common problems that I encountered in the wild.

### **Lack of time**

The lack of time is a very obvious reason to struggle with code reviews. It's not always the pushing timeline of a project, often it's a lack of time management and a shifted perception of priorities & responsibilities.

- You are super busy in your project, so you **procrastinate** your duty to review. Because it's easier than starting yet another task.
- You are concerned (without even trying) about pull requests being too time consuming and preventing you from having a delivery of your actual development work that meets expectations.
- You are busy and you hope that someone else from the team spares some time for the pending PRs. You ignore your responsibility and rely on someone else's **conscientiousness**.
- You are deep into solving a code problem. You  just don't have time to **switch the context**. You procrastinate the duty to review a pending PR until you have solved the problem, which unfortunately ended up taking days and in the meantime a colleague helped out.
- You are a seasoned developer and you make sure to fulfill your duties. Sometimes it's also easier **just to do the review** instead of reminding the team again. This brings you into the situation that you are constantly busy with reviews and missing the crucial ones due to a lack of time.
- Your day is **full of meetings** while your colleagues are programming one new feature after the other. Although you use the breaks between the meetings to check mails and reading the review requests you will never ever be able to check the actual pull request. You trust your peers to review and you get back to your meeting.

### **Lack of knowledge**

You can observe a lack of knowledge and confidence usually among new team members, inexperienced colleagues or in general insecure persons.

- You're not **fully involved** in the topic, therefore you don't feel suited to review the code.
- You're **new to the team**. and you don't think it's appropriate to provide reviews in a codebase you don't fully understand.

### **Lack of confidence**

- You are an **inexperienced developer** and the things you see in a PR, they just scare you.
- You feel intimidated. You don't feel comfortable reviewing a given PR, because the PR is created by a seasoned colleague with a much **higher level.** Your feedback is not worth nor expected.
- It's a super **complex PR**. I don't even understand the problem it's solving. I feel **intimidated** and leave the fun to others.
- You're **new to the team**. It's **intimidating** to review and potentially criticize code of my new colleagues.

### **Lack of accessibility**

- There is either **no PR description** or just a single sentence for a rather complex change. You are unable to comprehend the changes with the lack of context given or at least some instructions to follow and to check. That's why you **procrastinate** and secretly hope for someone else to fulfil the review duty.
- An opened PR is **massive in size**, so you **procrastinate** that huge task for days.

### **Lack of empathy**

- You don't **feel other people's pain** when waiting for a PR review. Instead you focus on your work, create your own PR and expecting people to jump in the review right away.
- There are plenty of PRs open but you have your own important and urgent code changes. Instead of participating in the review to clear the review jam you have to create yet another one**.** In addition you explicitly ask people to review your PR to move to the front of the queue. ****You do this because otherwise your PR will lay around for days. Instead of solving or discussing the problem with the team you are **selfish and unfair** to your colleagues by trying to get your own stuff covered while ignoring the rest.
- The last time you reviewed a PR you debated and argued with the reviewee. That's why you don't feel comfortable to provide another review.

# The solution

Did you see yourself or your former self in some of the described situations? We are humans and not perfect. It simply happens that we procrastinate, that we are captured [in the zone](https://en.wikipedia.org/wiki/Flow_(psychology)) (for better or worse) or intimidated by changes. Instead of changing people we can offer a better approach to positively influence their habits. That's where I am keen to introduce different code review practices.

If you find your team regularly discussing codes style issues like [code indentations](https://www.youtube.com/watch?v=SsoOG6ZeyUI), [semicolons](https://github.com/twbs/bootstrap/issues/3057) or [curlies](https://softwareengineering.stackexchange.com/questions/2715/should-curly-braces-appear-on-their-own-line) you clearly missed to define a common code style through a contribution guideline. You are wasting precious review time. Fix this before optimizing anything else beyond this point.

There is a total of three code review approaches to help your team improving their reviewing throughput. We introduce the **shallow review**, the **common review** and the **expert review** which primarily differ in the reviewing intensity. The more intense the higher the amount of time you have to invest. Your average code review probably corresponds to the common review with some reviews being of the expert format.

The novelty of the approach is the explicitly given choice. A contribution guideline rarely describes how to conduct a review so people usually conduct code reviews following their gut feeling and to fit expectations. This means it highly depends on the person how a review is conducted. You are the alpha geek of your team? Of course you have to go into depth for every single PR which will make you a bottle neck if everyone relies on your reviews. Your are a less experienced developer? You will probably conduct a common review which takes high amounts of time for you, because of the overwhelming complexity or size of your project. You are new to the team and you fear to provide a common review so you decide not to take part in the review process at all.

This code review pattern gives you a choice so you can fit more reviews in the same amount of time while dedicating enough time to the important changes while reducing your investment on trivial changes or things that can easily be changed if not perfect.

## The shallow review

T**he shallow review** is best ****suited for peers who are in a hurry (lacking time), not deeply involved (lacking knowledge) or feel intimidated by the code or experience of the reviewee (lacking confidence). A majority of pull requests should be suitable for this code review type, as long and they have a small enough size. When a code change introduces major architectural changes, people with shallow reviews are still welcomed but the reviewee must additionally require in-depth reviews.

### The reviewer's cost

Typically such a shallow review should be completed within 5 to 10 minutes. That will allow you to conduct multiple pull request reviews per day. **The cognitive load is rather low**, so you can squeeze them in whenever you transition to another task or before or after breaks. The review type is ideal for small features and additions, fixes and code refactorings.

### How to conduct

- Carefully read the PR description or any linked ticket to understand the problem
- Glimpse through the PR to check in your mind if that indeed could solve the problem or deliver the feature.
- Leave some positive comments or any doubts.
- Feel free to ask a question for something you don't understand
- Phrase some summary and submit. done. feasible in some cases even in less than 5 minutes.
- You can always approve the changes. You should not block any code review though. This requires further interaction while you clearly decided not to invest much time and thoughts by choosing a shallow review. Leave your review as a comment instead. Take notes of your doubts so other reviewers can jump in or you can come back a second time if possible.
- Be transparent and make sure that you note, that you only conducted a shallow review.

### **What the reviewee gets**

The reviewee will get an overall confirmation that their solution works and that it's well tested if necessary. In addition people might be able to spot mistakes and code quality issues while glimpsing through the files. The reviewer will make sure that the code changes are working as intended.

### **What the reviewee w**on't get

The reviewee won't get detailed **f**eedback for their code, extensive discussions around the chosen methodology, people running your code. It's a confirmation of the validity and correctness of the change and the reviewee won't get many insights on [code elegance](https://blog.codinghorror.com/code-elegance-code-balance/), edge cases, or the architectural choices

## The common review

T**he common review** is, as the name says, probably the code review you usually conduct. It's great for people who are involved in the project and who can spend a larger amount of time for a thorough review to reveal logical errors, nasty bugs or challenge algorithms. Depending on the size of the PR this type of review can have a few iterations of feedback.

This type of review is ideal for people to learn more about details of a project by reading and understanding the issue at hand and the implementation to solve it. If you have problems to understand things you can easily ask questions in this format to force the reviewee to reflect on their choices while improving your knowledge.

This is probably the type of review most people conduct and which potentially could get individuals and entire teams into trouble because of the required invest of time, lengthy discussion and necessary feedback iterations.

### The reviewer's cost

Typically the common review costs you 20 to 30 minutes depending on the size of the PR of course. The cognitive load is medium. People have to know the context, ideally worked on similar parts of the project before. This type of review is ideal for difficult bugfixes, large or complex features and impactful refactorings or test improvements.

### How to conduct

- Carefully read the corresponding issue and the PR description
- Make sure to go over every single file. Your task is to have seen every single code change. Your review tool like GitHub or GitLab offers checkboxes to get through any amount of files without becoming lost.

![the%20modern%20code%20reviewer%20b58b707424b34cdda29c2540ae08c5cd/Screen_Shot_2021-08-10_at_14.48.19.png](the%20modern%20code%20reviewer%20b58b707424b34cdda29c2540ae08c5cd/Screen_Shot_2021-08-10_at_14.48.19.png)

- Make sure you understand every single change. If not ask through an inline comment.
- Lookout for careless mistakes (wrong signs, typos).
- Leave some praise for the good parts 👍
- Try to spot irregularities in code that jump to mind. Can be things that are too complex to understand, functions that are too big or simply things that seem not to fit the existing codebase. Provide a comment to share your doubts.
- Challenge the solution. Does it really fit the stated problem? Ask questions and fuel a discussion.
- Write a note about aspects that could be improved but that are not crucial of the acceptance of the PR
- Look out for tests. Do they test relevant things? Are they present at all?
- Optionally you run the code locally and verify the expected results. Can you break it?
- Write a summary of your findings and if required repeat the important things to change or future things to improve beyond this PR. Such a summary improves the accessibility of your feedback and makes the pull request more enjoyable.

This type of review requires quite some time and dedication. Depending on the size of a PR you can easily spend 20-45min for the initial review not counting in any required feedback iteration.

### **What the reviewee gets**

The reviewee will get a thorough review of their changes. People will happily discuss, ask questions and provide insights, tips & improvements. The reviewer will make sure that the code changes are good enough to land in the production branch and that the overall architecture is properly extended and obeyed.

### **What the reviewee w**on't get

The purpose of this type of review is to provide feedback in order to shape and approve a rocking solid code change which can include new and additional features but not drastic architectural changes or the introduction of other new concepts and approaches.

## The expert review

Use this mode wisely. It's not suited as your regular mode. Most people should stick to the common review. Whenever you introduce entirely new or very abstract concepts, security related changes or simply complex algorithms you want to have an in-depth review of your changes.

The involved expert reviews the code changes, carefully verifies the tests for relevance and also runs the code locally to verify the expected results.

### The reviewer's cost

Typically the common review costs you 30 to 60 minutes. The cognitive load is high and intense. People ideally know the in and outs of the affected code parts and they understand the business domain to put the changes into the right context for evaluation. This type of review is ideal for complex features with new architectural decisions which will influence and shape the future of the project.

The review is also a great candidate to educate and influence less seasoned developers. Give them a chance to work on some complex project and provide an expert review to accompany them in delivering a future-proof change.

### How to conduct

- Read the PR description carefully. Lookout for specific instructions to test the changes or different scenarios.
- Locate the interesting bits of changes & additions in the PR.
- You don't have to go through every single line of code, focus on the interesting details.
- Check out the code locally, verify it's working locally, tinker around with the code to provoke exceptions or specific edge cases.
- Make sure there are meaningful tests and try to run them locally in addition to the automated run to catch system specific differences. Try to fail the tests by modifying the runtime code to proof the tests's relevance.
- Probe the changes in your mind towards different scenarios and ask questions if necessary. "Does it work, if..", "Will it fail when.."

The expert review is an in-depth code review. You dedicate a large chunk of focus time to give the reviewee valuable feedback about the changes with details that go beyond the common review. You can spend up 45-60min on the initial code review depending on the complexity of the change. Be prepared for followup discussions & changes to review and comment on which will require your involvement. You can't do this often and changes with such a high impact and complexity ultimately should happen rarely.

### **What the reviewee gets**

In-depth discussion of the changes. Many possibilities to receive feedback and iterate changes. As a seasoned developer this is a great way to challenge your ideas and as a less experienced developer you can tackle a complex feature and work on it together with an expert through the PR format.

### **What the reviewee w**on't get

That's the dream package for less experienced and seasoned developers. This is a rare type of review so you won't get them for many changes.

# Which type is the right one for me?

Most people naturally pick the **common review** and don't realize that you can have differently sized reviews. You are easily overwhelmed by the amount of time you have to spend for such a regular code review if the PRs pile up. The common review can take 30 minutes to complete. If you have four reviews you have spend a quarter of your precious working day already.

Other folks exclude themselves from the **common review** because they feel intimidated by their lack of knowledge, the complexity of the code changes or the superior level of the reviewee. The **shallow review** is an excellent instrument to encourage those people in participating in the daily code review routines and start gaining knowledge and experience in that important field. But the shallow review is also a great tool for seasoned developers. You can pick it and quickly confirm a change with the expectation that you did not dug as deep as usually.

Finally the **expert review** is your instrument to ensure an **in-depth review** of content that is pioneering a new approach or introducing security relevant changes.

The moment you understand that you have a choice when you are requested for a code review, you can distribute your time more evenly and steer away from situations that would cause you to be the bottleneck. It's also great to clarify expectations as you can proclaim the way to reviewed. An "I only did a shallow review" makes clear that the PR will deliver a working change without everything being perfect in terms of code quality, architecture and more.

Being team, the knowledge of different code review depths helps you to prevent large backlogs of PRs and frustrated reviewees waiting for some feedback. You have a way to motivate people to take part in the review process who previously lacked the necessary confidence.

# Further improvements

We focused exclusively on the reviewer yet. Being a reviewee, you can enhance the chances that one of the review types will be seen feasible by the reviewer if you make your PR more accessible. Provide a clear description. Repeat parts of the Jira ticket, make the PR small enough, if it's big tell the reviewer why and tell where to focus on. Give clear instructions to run the code and to follow your changes.

This will greatly improve your chances to receive a review as you lower the effort to quickly check into your PR and you will encourage people who lack confidence or knowledge to provide their review too.

I'm planning to provide a followup to this blog post describing the ideal pull request which will focus on the reviewer's duty.

# Conclusion

If you want to use the described approach, you need a working code review environment where people trust each other. Shallow reviews won't magically solve your toxic environment. You have to fix the foundation before opimizing your PR throughput.

Encourage the less experienced colleagues to start with shallow code reviews to actively take part in shaping the future of your code base. Pick your own code review type wisely though. If everyone gets lazy and provides only shallow reviews, your overall coding quality might suffer, because nobody takes their time to check the important details of a code change.

Choose the common or even expert review too often and you will not only make yourself the bottleneck, but also will get stressed.
