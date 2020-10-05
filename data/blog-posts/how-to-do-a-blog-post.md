---
path: "/blog/how-to-do-a-blog-post"
date: "2020-08-06"
title: "How to do a blog post"
previewImage: true
image: https://res.cloudinary.com/satellytes/image/upload/v1594992283/satellytes-website/blog-how-to-do-a-blogpost_h5txir.jpg
author: "Max Mustermann"
authorSummary: "Developer Satellytes" 
---

Dear colleagues,

learn how to properly write a blog post – in terms of formatting – so that everything is rendered properly & our blog looks super shiny. 💫
<!-- end -->

In general, we use Markdown to write our blog posts with the common formatting possibilities. If you need a refresher, feel free to check out the possible (& parsed) formats at the end of this blog post. 

* heading rendering
* frontmatter incl. date format
* all funky markdown formats

# General

In general we use markdown to write blog posts with the common formatting possibilities. So to write plain text, just get typing. An example of headings you see throughout the whole blog post. Keep in mind, that in the frontmatter, the date needs to be in the format "yyyy-mm-dd".

## Markdown

### Lists

There are numbered lists: 

1. Open project
2. Do stuff
3. Commit

And bulletpoint lists:

- point 1
- point 2
- point 3

### Images

You can add images to your markdown:

![Fancy font that shows 'A 25-step program for becoming a great designer'](https://res.cloudinary.com/satellytes/image/upload/v1592570224/satellytes-website/example-picture_crftva.png)

*Important note:* The image needs to be hosted on Cloudinary within the Satellytes account!

### Code

You can add code with syntax highlighting. Simply add the language after the first three backticks of a codeblock for example `` ```js``

```js
const test = 1;
console.log("Hi", test);
```


Inline code also works: `inline code`

### Blockquote

Text before the blockquote.

> Block scope stuff

Text after the blockquote.

# Headers

# H1

This is H1. It gets rendered as H2.

## H2

This is H2.

### H3

This is H3.

#### H4

This is H4.

##### H5

This is H5.

##### H6

This is H6.