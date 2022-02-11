---
path: "/blog/cache-gatsby-ssr-page-on-gatsby-cloud/"
date: "2022-02-11"
title: "Cache Gatsby SSR pages on Gatsby Cloud"
featuredImage: images/gatsby-ssr-caching.jpg
author: "Fabian Dietenberger"
authorSummary: "Senior Developer at Satellytes"
teaserText: Learn how to cache Gatsby SSR page on Gatsby Cloud
seoMetaText: Lean how to cache Gatsby SSR pages on Gatsby Cloud to boost page speed. Your users won't see a difference to SSG or DSG pages anymore.
leadboxText: Want to learn more about creating blazing fast pages? Then join us to learn more!
attribution:
    creator: Shiro Hatori
    source: https://unsplash.com/photos/WR-ifjFy4CI
---

Since Gatsby 4 you can do [server side rendering](https://www.gatsbyjs.com/docs/how-to/rendering-options/using-server-side-rendering/) 
of pages. This means, the page gets rendered at runtime, and not at buildtime.

When serving a page via SSR, efficient caching becomes crucial as the browser won’t show anything until the whole page 
is rendered on the server and delivered to the browser. Caching can be done on multiple levels in your architecture, in 
this article we will focus on caching at the edge with a CDN.

If you host your Gatsby page with Gatsby Cloud, you have a CDN out of the box. The CDN is powered by Fastly, but that’s 
just an implementation detail. Caching for your static (SSG) or deferred (DSG) pages is done automatically, so no need 
to configure anything here. But if you want to do SSR, you need to take care of the correct caching behavior by yourself.

> This post was inspired by the excellent video from [Remix on Youtube](https://www.youtube.com/watch?v=bfLFHp7Sbkg) 
> If you want to deep dive to CDN caching with SSG and SSR, you should have a look! 

## The Cache Control Header

Caching in Gatsby Cloud can be controlled via the HTTP caching header `Cache-Control`. This header has multiple 
[directives](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#directives), the most important are:

- `max-age`: The time in seconds for how long the page should be cached by the browser. Use this to determine how long the page should be cached  in the browser after the user fetched it. This cache is per user.
- `s-maxage`: The time in seconds for how long the page should be cached by the CDN. If not set, the CDN will use `max-age`. Use this to determine how long a page can be cached globally. You may want to set the time lower for new and often changing content and higher for old or less frequently changed content.
- `stale-while-revalidate` : The time in seconds for how long the page should be stored by the CDN and a new page should be requests in the background when a visitor hits it. Once the new page is requests, the stale page will be replaced by it. Use this to serve an old version of a page before the new page has been rendered. This is very powerful to keep your page fast while updating it in the background. If the content is not crucial, you can make this time very high.

With those 3 directives, you can make your page as fast as with SSG or DSG. If the values are set correctly, only the 
very first user after a deployment will have to wait for the rendering. Everyone else will see a lightning fast page.

> This header can also be used on any other framework to speed up SSR. It's not limited to Gatsby or Gatsby Cloud.

## Enable Caching

Now let’s dive into the code and set the `Cache-Control` header:

```jsx
// pages/ssr.jsx
export default function Cache() {
  return (
      <h1>SSR: Server Side Rendering</h1>
  )
}

export async function getServerData() {
  return {
    headers: {
      'Cache-Control': 'public, max-age=10, s-maxage=60, stale-while-revalidate=240',
    }
  }
}
```

Gatsby SSR pages export the `getServerData()`  function, which you can use to do all kinds of stuff with it (like 
fetching external data). Besides the props that can be injected into the page itself, this function returns a `headers` 
object. This object is used to set the `Cache-Control` header.

In our case, we set the browser cache to 10 seconds and the CDN cache for 1 minute. After 1 minute, the CDN will 
server stale content for a maximum of 4 additional minutes. If there is one request within these 4 minutes, a 
new page will be rendered in background while the old page gets served. After the new page is rendered, it will replace 
the old one and the caching time starts again. Let’s check the network tab to see if it works:

![Chrome network tab with proper caching header. Everything works as expected.](gatsby-ssr-caching-network-tab.png)

You can see: The very first pages took 5 seconds (there is an artificial delay of 5 seconds to make the server rendered 
page more obvious). All other requests were served from CDN within 30ms. That’s super fast! Also, after the stale page 
was served, the page was re-rendered in the background and replaced. The request after the stale one was super fast 
again but served the new page.

## Conclusion

SSR with proper CDN caching is very powerful and can be used for a lot of scenarios, especially where you hit the 
limits of SSG and DSG. The integration within Gatsby and Gatsby Cloud is seamless, you can introduce in on a per-page basis.

Some things to keep in mind:

- SSR functionality is quite new in Gatsby and may not be as mature as in other frameworks.
- Same is for Gatsby Cloud, it’s quite new and my not be as mature as other hosting services.
- SSR officially only works with Gatsby Cloud for now. You cannot host it somewhere else. There are third-party plugins though for [Fastify](https://github.com/gatsby-uc/plugins/tree/main/packages/gatsby-plugin-fastify) (self-hosting) or [Netlify](https://github.com/netlify/netlify-plugin-gatsby) (SAAS).
- `gatsby-plugin-image` doesn’t work with SSR.

Other than that: Have fun working with Gatsby SSR! Thanks for reading.

Checkout the repository with a full example here [https://github.com/feedm3/learning-gatsby-cloud-ssr-caching](https://github.com/feedm3/learning-gatsby-cloud-ssr-caching)