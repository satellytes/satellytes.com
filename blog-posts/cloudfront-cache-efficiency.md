---
path: "/blog/cloudfront-cache-efficiency/"
date: "2022-02-02"
title: "Improve cache efficiency between CloudFront and the browser"
featuredImage: images/cover-cloudfront-cache-efficiency.jpg
attribution:
    creator: Faris Mohammed 
    source: https://unsplash.com/photos/d30sszrW7Vw
author: Fabian Dietenberger
authorSummary: "Senior Frontend Developer at Satellytes"
seoMetaText: A coding pattern to prevent breaking changes when dealing with injections in base classes used in distributed libraries 
---

If you use the `Cache-Control` header to set the caching behavior in CloudFront, it might not work as you wish.

Let’s test the following header:

`Cache-Control: max-age=10, s-maxage=60`

This header means: The browser should cache the resource for 10 seconds, and the CDN should cache it for 60 seconds.
This means, every 10 seconds, the browser would fetch the resource from the CDN, and every 60 seconds the request would
hit the origin and not the CDN.

To test this header, we created a small sample application within AWS Lambda with CloudFront as CDN. The Lambda returns
the given caching header and a small JSON. Let’s check within the browsers network console what happens when we do
multiple requests within 70 seconds: