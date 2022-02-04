---
path: "/blog/cloudfront-cache-efficiency/"
date: "2022-02-02"
title: "Improve cache efficiency between CloudFront and the browser"
featuredImage: images/cloudfront-cache-efficiency/cover.jpg 
attribution:
    creator: Faris Mohammed 
    source: https://unsplash.com/photos/d30sszrW7Vw
author: Fabian Dietenberger 
authorSummary: "Senior Frontend Developer at Satellytes"
seoMetaText: Learn how to improve Caching Headers in CloudFront to reduce traffic and increase page speed.
teaserText: Learn how to improve Caching Headers in CloudFront to reduce traffic and increase page speed.
---



If you use the `Cache-Control` header to set the caching behavior in CloudFront, it might not work as you wish.

Let’s test the following header: `Cache-Control: max-age=10, s-maxage=60`

This header means: The browser should cache the resource for 10 seconds, and the CDN should cache it for 60 seconds.
This means, every 10 seconds, the browser would fetch the resource from the CDN, and every 60 seconds the request would
hit the origin and not the CDN.

To test this header, we created a small sample application within AWS Lambda with CloudFront as CDN. The Lambda returns
the given caching header and a small JSON. Let’s check within the browsers network console what happens when we do
multiple requests within 70 seconds:

![Requests are only partially cached](images/cloudfront-cache-efficiency/1-problem.png)

What do we see here?

1. The first request hit’s the Lambda function. This is takes around 1 second, as the function is cold and uncached by
   CloudFront. The response get’s now cached by the browser and CloudFront.
2. The next 3 requests are not send, as they are within 10 seconds, which is the `max-age`. The browser just returns the
   cache. The request time is therefore 0 seconds.
3. The next 7 requests are all done the next 50 seconds. They hit the CloudFront cache, the response time is therefore
   around 20ms.
4. 60 seconds after the first requests, CloudFront clears the cache. Therefore, this request now again hits the lambda
   function. It takes around 700ms. After that requests, the same procedure starts again.

What is wrong here?

1. After 10 seconds the browser requests the same resource again. This resource has the same header as the first one,
   which means the browser should cache it for 10 seconds. But as we can clearly see, the browser doesn’t cache the
   resources as long as it stays in CloudFront.
2. After 10 seconds the browser requests the same resource again. As there was no change, CloudFront should only
   return `304` with an empty body. Instead, the whole body gets return with a status `200`.

Those 2 problems will result in

- A lot more **traffic you have to pay** between the browser and your CDN. Don’t forget you have to pay for that traffic
  and CloudFront isn’t cheap.
- A **slower website**, as the browser has to wait for the request to complete. Especially with a large response body on
  mobile devices.
- Traffic your **customer has to pay** if the data is not free (mobile plans).

## Fixing the caching browsers behavior

I spend hours and hours of figuring out what is the problem here. As it turns out, I’m not the first one how found this
problem:

- [https://www.cdnplanet.com/blog/cloudfront-cachability-date-header/](https://www.cdnplanet.com/blog/cloudfront-cachability-date-header/)
- [https://forums.aws.amazon.com/thread.jspa?messageID=807813](https://forums.aws.amazon.com/thread.jspa?messageID=807813)
- h[ttps://stackoverflow.com/a/61493383/3141881](https://stackoverflow.com/a/61493383/3141881)

The problem that the browser only caches the response once, is that the `date` header returned by CloudFront doesn’t
change on upcoming requests. As the caching date is relative to the response `date` header, the browser doesn’t cache
the response anymore.

There is no easy way to fix this within some CloudFront settings. Only recently it is possible to solve this problem at
all: With a custom CloudFront Function. CloudFront Functions are Javascript functions that are executed with every
requests. You can use them to do simple changes to the request or response object. Read more about the possibilities and
limit in the official AWS docs
here: [https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-features.html](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-features.html)

We can use those functions to update the `date` header with every request. This is the code to do this:

```js
function handler(event) {
  var response = event.response;

  response.headers['date'] = {
    value: new Date().toUTCString()
  };
  delete response.headers['age'];

  return response;
}
```

This code updates the `date` header with the current time. It also deletes the `age` header, as it turns out that
CloudFront is also setting it. The [age header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Age) is used
to tell how long the cached object is in the cache. If it is set, the browser will compare it against the `max-age` time
and decide to not cache the object. Which is not what we want.

After deploying the CloudFront function, let’s check the browser console:

![Requests are cached by the browser](images/cloudfront-cache-efficiency/2-improved.png)

What do we see here:

1. The first request hits Lambda. This is why it takes around 700ms.
2. The next requests are cached for 10 seconds. After that, one request hits CloudFront. This request takes around 30ms
   and is cached again for 10 seconds by the browser. CloudFront returns the full response.
3. Only after 1 minute, the requests hits Lambda again and gets then cached again by CloudFront.

This is the behavior we want! Nice!

Next, let’s see how we can return `304` if we hit CloudFront with the same file as we have currently saved in the
browsers cache.

## Return 304 if the object hasn’t changed in CloudFront

CloudFront always returns `200` with the full response body. This results in a lot of unnecessary data send between the
browser and CloudFront. To fix this, we need to set the `ETag` header in our Lambda function.

The `ETag` is a hash for the response body. The browser will send this hash with alongside with all upcoming requests to
the same resource. The server can then decide if the resource has changed and either return `200` with a new resource
or `304` .

Luckily, when the `ETag` header is set, CloudFront will handle `200` and `304` automatically. The `ETag` need to be
created in our lambda function. This is how it could look like:

```js
const createEtag = (body: string) => {
  const hash = createHash('md5').update(body).digest('hex');
  return `W/"${hash}"`
}
```

Depending on your usage, you may want to use different hashing algorithms that are more performat.

Now let’s check again our browser console:

![CloudFront even returns 304](images/cloudfront-cache-efficiency/3-solution.png)

Now it’s perfect!

1. The first request hits Lambda. The response gets cached by the browser for 10 seconds and 60 seconds by CloudFront.
2. The next 3 requests are within 10 seconds, so they are not send over the network.
3. After 10 seconds, the request get’s send to CloudFront. CloudFront return `304` with an empty response body.
4. After 60 seconds the requests hits Lambda again.

## Conclusion

CloudFront is a very good CDN, but you should always test if your requests are cached correctly. Especially if you 
use CloudFront to cache your API, you should make sure that the response is cached correctly in the browser and that
CloudFront returns a `304` if there was no change in the API.

If you have a different `s-maxage` and `maxage` you need to overwrite the `Date` and `Age` header in CloudFront.

If you want to return `304` if the response hasn't changed since the last request, you need to set the `ETag` header in
your origin.

> Checkout the full CloudFormation template on Github: [https://github.com/feedm3/learning-caching-headers/blob/main/serverless.yml#L19-L88](https://github.com/feedm3/learning-caching-headers/blob/main/serverless.yml#L19-L88)