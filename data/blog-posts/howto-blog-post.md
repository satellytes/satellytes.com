---
path: "/blog/howto-blog-post"
date: "2021-05-01"
title: "How to do a blog post"
previewImage: true
image: https://res.cloudinary.com/satellytes/image/upload/v1594992283/satellytes-website/blog-how-to-do-a-blogpost_h5txir.jpg
author: "Georgios & Fabian"
authorSummary: "Developers at Satellytes" 
---



Dear colleagues,


learn how to properly write a blog post – in terms of formatting – so that everything is rendered properly & our blog looks super shiny. 💫

<!-- stop excerpt -->

## Excerpt
See the comment `<!-- stop excerpt -->` in the markdown file above this section? That's the stop word for the excerpt. You don't need to use it as gatsby will extract an excerpt from the given markdown content with some heuristic, but that code word gives you the power to shorten it.

## Accessibility
Keep in mind that blog posts do always start with a `h1` to show the blog post title.
This means you should not use any heading with the level 1. Always start at level 2 to keep the document outline valid. Everything in the markdown file should belong to that foremost `h1` so there are no valid reasons to use another one inside your content.

## Markdown Syntax
Here examples of common formatting with markdown. We use [GitHub Flavored Markdown](https://github.github.com/gfm/) so you can enjoy the usual formatting you know from interacting with github.com or any enterprise edition. We will not highlight every possible formatting but the most important or let's say common ones to author a blog post.

### General Text

> 💡 I love quotes with some icons to highlight stuff

We can **make text bold**, *display it in italic*, use double tildes (` ~~ `) around your text ~~to strike through~~
and we can have [links](https://satellytes.com/) too!


Let's also make lists beautiful. Here some facts to stress test the list feature.

+ Apollo 11 Astronauts Had to Go Through Customs After Returning from the Moon
+ The [Bortle Scale, 1-9](https://astrobackyard.com/the-bortle-scale/) tells you how dark the sky is.
    1. Range **1-2** is a pitch black night where you can see literally everything in the sky. Most people have never witnessed such a sky due to our permanent light pollution.
    2. Range **3-4** is the sky in rural landscape. You can still see the milky way with many details.
    3. Range **5-7** is suburban sky. The city gets closer, the sky slowly disappears. You can see the moon, some larger stars and bright planets (Venus, Mars). Clouds appear brighter and brighter.
    4. Range **8-9** city and inner city sky. Sadly the reality for many people. Moon and some planets are left. 
+ Thirty-five percent of people are born without wisdom teeth.
+ A Shot of Espresso Contains Less Caffeine Than a Cup of Coffee

### Images & Files
Here a 4MB picture that should get prepared by gatsby properly.
We don't want to load 4MB but the processed image:

![twilight coloured imaginary planet where the surface shows some pink crystals growing and three planets visible in the sky](./images/space.jpg)
<a href='https://www.freepik.com/vectors/star'>Star vector created by upklyak</a>

This is a PDF file that should get processed and copied to `public/`:
[My PDF Download](./images/test.pdf)

### Code
Super important for developers writing about code. We want our code to look as beautiful as in our own editor. 

You can use a fenced code block with backticks ` ``` ` or tilde  `~~~`
and add the language identifier to help the syntax highlighter to probably 
determine the expected syntax. If you omit 

```
~~~javascript
cosnt myJavaScrip = true;
~~~
```

I can highlight `css±.some-class { background-color: red }` with CSS syntax.

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```

Inline code works too: `const works = true`

#### JavaScript

```javascript
function add(x, y) {
  const answer = x + y;
  return answer;
}

for (let i = 0; i < 10; i++){
  console.log(3, i); // prints in console
}
```

#### bash

```shell
$: cowsay I love Satellytes ✨

 _______________________
< I love Satellytes ✨ >
 -----------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

#### CSS

```css
@import url(https://fonts.googleapis.com/css?family=Questrial);
@import url(https://fonts.googleapis.com/css?family=Arvo);

@font-face {
	src: url(https://lea.verou.me/logo.otf);
	font-family: 'LeaVerou';
}

/*
 Shared styles
 */

section h1,
#features li strong,
header h2,
footer p {
	font: 100% Rockwell, Arvo, serif;
}

```

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>

<script>
	// Just a lil’ script to show off that inline JS gets highlighted
	window.console && console.log('foo');
</script>
<meta charset="utf-8" />
<link rel="icon" href="assets/favicon.png" />
<title>Prism</title>
<link rel="stylesheet" href="assets/style.css" />
<link rel="stylesheet" href="themes/prism.css" data-noprefix />
<script src="assets/vendor/prefixfree.min.js"></script>

<script>var _gaq = [['_setAccount', 'UA-33746269-1'], ['_trackPageview']];</script>
<script src="https://www.google-analytics.com/ga.js" async></script>
</head>
<body>

```


### Tables (tbd)
Super cheap design that we might want to update.

Header1 |Header2  | Header3|
--- | --- | ---
|data1|data2|data3|
|data11|data12|data13|
|data11|data12|data13|
|data11|data12|data13|
|data11|data12|data13|
|data11|data12|data13|
