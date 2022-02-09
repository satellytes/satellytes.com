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
# install dependencies
yarn

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
metadata in the frontmatter header. The blog post files live in [`blog-posts`](/blog-posts) folder.

The metadata contains:
- `path`: The URL Path to the blog post. It should start with `/blog/`
- `date`: The date of the blog post, like `2022-01-27`
- `title`: The title of the blog post
- `featuredImage`: path to the image that should be used as preview, for example when you share the link or in the RSS reader
- `author`: The author of the blog post
- `authorSummary`: Job description of the author
- `teaserText`: Used on teasers on the website 
- `seoMetaText`: Used as meta description in the HTML header. The meta description gets shown when you share the link.
- `leadboxText`: Used at the end of your blog post above the link to our career page
- `attribution`: Hero image attribution object
  - `creator`: Name of the hero image author
  - `source`: Link to the hero image source

> If a component is missing (like a table), get in touch with the developers.

