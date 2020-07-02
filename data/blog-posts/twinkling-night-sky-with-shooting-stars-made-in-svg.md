---
path: "/blog/twinkling-night-sky-with-shooting-stars-made-in-svg"
date: "2018-10-27"
title: "Twinkling night sky with shooting stars made in SVG"
---

Have you seen the stars background effect on our start page? Here a quick post how we built it.

Also look at our startpage as long it's still there.

There are three parts you should notice. A night sky full of tiny stars, occasionally a shooting star and a parallax effect when you scroll. I will talk about how we created those effects. We use JavaScript to create them but you can actually follow without writing JavaScript but this will involve some manual labour. The parallax effect won't work without JavaScript as we need to read the scroll position.

# Night Sky

The night sky is a set of tiny SVG circles. They are created from an array of random coordinates. We had no need of randomness during runtime so it's a static list that looks like this:

```javascript
const STAR_COORDS = [
  {
    "x": 1596,
    "y": 578
  },
  {
    "x": 609,
    "y": 379
  },
  //...
]
```

To create the actuals stars, iterate of this list, create a group (to hold the translation) and your actual circle element inside. Assign the CSS class .star so we can modify it later with CSS. To create any SVG element with JS you need to use document.createElementNS which looks pretty long combined with the involved namespace. This always looks uncomfortable to me — so you're not alone.