# satellytes.com

This repository contains the new https://satellytes.com website.

> Note: The default branch is `main`

## Run

To run the project:

```
# install dependencies
yarn

# start local dev server
yarn start

# create production bundle
yarn build
```

## Writing a blog post

You can add a blog post by adding a single markdown file. The markdown file contains the blog post itself and 
metadata in the frontmatter header. The blog post files live in [/data/blog-posts](/data/blog-posts).

The metadata contains:
- `path`: The URL Path to the blog post. It should start with `/blog/`
- `date`: The date of the blog post
- `title`: The title of the blog post'

After the frontmatter metadata, the blog post itself starts. All markdown features can be used, although not all might
be mapped to our components. 

> If a component is missing (like a table), get in touch with the developers.

An example of a markdown file:

```markdown
---
path: "/blog/your_blog_post_url"
date: "YYYY-MM-DD"
title: "Your title"
---

# Level 1 Heading

Some text

- some list item
- some list item
```
