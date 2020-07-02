---
path: "/blog/getting-a-feel-for-nestjs"
date: "2019-07-29"
title: "Getting a feel for Nest.js"
---

_(the hero cat is from Nest.js's website, in case you were wondering)_

*To follow along you should be at least somewhat familiar with TypeScript, the command line and npm. Having experience with Angular definitely helps but is not a requirement.*

# Background

TypeScript is the language of choice for most popular Frontend Frameworks. For Backend frameworks however there still are not a lot of options that let you enjoy TypeScript. One well established framework based on express.js and koa.js is routing-controller but it's stuck at v0.7.0 since June 2017 and hasn't seen a lot of activity from the original maintainers since. Coincidentally that is around the time when Nest emerged.

# Nest.js

Nest.js (Nest) has surpassed routing-controller's success (measured in GitHub stars) manyfold already and is still under heavy active development (v6.2.0 shipped two days ago at the time of writing this). Like routing-controller, Nest is built on top of express.js but can also be setup to run with fastify and other server frameworks.

# What is this post about?

In this project and blog post we are going to build a server that manages university students.

We will setup a new Nest server, teach it to read students from an (external) source and to return these students. In a second step we will teach the server to accept new students that can be served later on. To finish off we will integrate the template engine handlebars to serve rendered HTML on specific requests.

Sidenote: For the sake of brevity we won't cover database connections, though. All data will be fetched once and then held in memory afterwards.