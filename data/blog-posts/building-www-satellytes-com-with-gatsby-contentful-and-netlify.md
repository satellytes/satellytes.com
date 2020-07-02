---
path: "/blog/building-www-satellytes-com-with-gatsby-contentful-and-netlify"
date: "2018-10-10"
title: "Building satellytes.com with Gatsby, Contentful & Netlify"
previewImage: true
---

This page's sources are hosted on GitHub if you want to look into the sources. We are using Gatsby 2 already.

---

When we started building this website we created a static website with webpack and html-loader to get things online quickly. Netlify was already involved so deploying was no problem but updating itself was a cumbersome as only us developers were able to do so through code & git.

There was no really human readable source files. I decided to look into some static page generators. I used ruby-based middleman years ago but I knew there are more powerful and recent generators out there. Ghost, Hugo, Jekyll and Gatsby are the ones I wanted to checkout for a long time. I ended up with Gatsby.

# Gatsby & JAMstack

Gatsby is a static website generator based on React with a rich plugin ecosystem. It's based on the JAMstack. The name comes from JavaScript (J) that access APIs (A) to create static markup (M). There is more behind the JAMstack philosophy so make sure you check the website.

Gatsby uses GraphQL to access any API you can imagine. We use contentful for example but you can also use your local disk as an API to read in markdown files for example. Or do you have a Wordpress blog? You can use it as a data source too!

If you have never seen GraphQL, here a quick example (from our Event Overview on our start page)

```javascript
allContentfulEvents(sort: {fields: [date], order: ASC}) {
    edges {
      node {
        id
        title
        link
        tagline
        dateShort: date(formatString: "MMM DD")
        dateTitle: date(formatString: "MMM DD, YYYY")
        date
      }
    }
  }
```

That query returns JSON and the data structure will be exactly as you see it. Gatsby and its plugins are doing the necessary work that you are only left writing GraphQL queries. It's really amazing!