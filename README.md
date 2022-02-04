# satellytes.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/c8d8c7d1-444a-4b8c-b31a-9d5531e48c9b/deploy-status)](https://app.netlify.com/sites/satellytes-website/deploys)

This repository contains the https://satellytes.com website.

## Run

To run the project:

```sh
# install dependencies
yarn

# start local dev server
yarn start

# create production bundle
yarn build
```

## Component development with Storybook

This repository comes with [storybook](https://storybook.js.org/). Storybook helps to develop and understand the single components of the website by showing them in isolation.

```sh
# start storybook
yarn storybook

# build storybook
yarn build-storybook
```

The storybook for the `main` branch automatically gets deployed to https://satellytes-website-storybook.netlify.app. Pull Requests on 
Github will also be updated with a separate deployment URL.

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
