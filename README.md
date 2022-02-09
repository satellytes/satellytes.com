# satellytes.com

This repository contains the https://satellytes.com website.

## Project setup

To run the project all you need is:

- Yarn
- Node >= 16

Then you can use the following commands to start development:

```sh
# install dependencies
yarn

# start local dev server
yarn start

# create a production build
yarn build

# serve the production build
yarn serve
```

A production build of the website gets created for every pull request. You will get the link as pull request comment.

## Component development with Storybook

This repository comes with [Storybook](https://storybook.js.org/). Storybook helps to develop and understand the single components of the website by showing them in isolation.

Use the following commands to start working with Storybook:

```sh
# start storybook
yarn storybook

# create a production build
yarn storybook:build

# serve the production buiöd
yarn storybook:serve
```

A production build of Storybook gets be created for every pull request. You will get the link as pull request comment. 
For the `main` branch, the build can be found here: https://satellytes-website-storybook.netlify.app

## Writing a blog post

You can add a blog post by adding a single markdown file. The markdown file contains the blog post itself and 
metadata in the frontmatter header. The blog post files live in [/data/blog-posts](/data/blog-posts).

The metadata contains:
- `path`: The URL Path to the blog post. It should start with `/blog/`
- `date`: The date of the blog post
- `title`: The title of the blog post
- `previewImage`: Set to true if you want to display a placeholder image in the blog post preview
-  `author`: The author of the blog post

The preview text on the blog overview page will be generated automatically by the first few sentences. You can also
manually set a breakpoint with `<!-- end -->` to create a preview text from the blog posts start until this marker.

After the frontmatter metadata, the blog post itself starts. All markdown features can be used, although not all might
be mapped to our components. For a demo of the markdown features, check out the post "[Hot to do a blog post](https://satellytes-website-new.netlify.app/blog/how-to-do-a-blog-post)".

> If a component is missing (like a table), get in touch with the developers.

An example of a markdown file:

```markdown
---
path: "/blog/your_blog_post_url"
date: "YYYY-MM-DD"
title: "Your title"
author: "Your author"
---

This is a demo post.
<!-- end -->

# Level 1 Heading

Some text

- some list item
- some list item
```
