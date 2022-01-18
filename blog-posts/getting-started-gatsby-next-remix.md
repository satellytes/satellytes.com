---
path: "/blog/getting-started-gatsby-next-remix/"
date: "2022-01-13"
title: "Getting Started: Gatsby vs. Next.js vs. Remix"
featuredImage: images/gatsby-next-remix-hero.jpg
author: "Felix Hofmann and Fabian Dietenberger"
authorSummary: "Working Student and Senior Developer at Satellytes"
teaserText: We developed a simple blog application in Gatsby, Next.js and Remix. Learn about the differences in the development process and the technical concepts behind these three frameworks.
seoMetaText: We developed a simple blog application in Gatsby, Next.js and Remix. Learn about the differences in the development process and the technical concepts behind these three frameworks.
leadboxText: Have you learned something about Gatsby, Next.js or Remix? Then join us to learn more!
attribution:
    creator: Daniel Kudela
    source: https://unsplash.com/photos/K59MPijxRh0
---




Before starting a React based project, the same question often arises: Which framework should be used? Of course, this question cannot be answered in a general way, since each framework has its advantages and disadvantages for specific use cases. Nevertheless, you can compare the frameworks, especially the concepts behind them.

That's why we decided to develop a simple blog application in Gatsby, Next.js and Remix to compare the frameworks. This application can read data from markdown files, display them and create dynamic routes depending on them. This article will discuss the differences in the development process, as well as the basic technical concepts in the frameworks. The three versions of the comparison blog project were each deployed on Vercel or Netlify and have a public GitHub repository.


> 💡 For simplification, style and images are not included in the examples. The detailed versions are available in the GitHub repositories for the comparison blog project.


- **Blog app Gatsby Version:** [Preview](https://gatsby-comparison-blog.vercel.app/) and [Repository](https://github.com/hofmann-felix/gatsby-comparison-blog)
- **Blog app Next.js Version:** [Preview](https://next-js-comparison-blog.vercel.app/) and [Repository](https://github.com/hofmann-felix/next.js-comparison-blog)
- **Blog app Remix Version:** [Preview](https://remix-comparison-blog.netlify.app/) and [Repository](https://github.com/hofmann-felix/remix-comparison-blog)

  ![blog-overview.png](images/gastby-next-remix-screenshot-blog-overview.png)


## Setting up a project

#### Gatsby

To start a Gatsby project you have to run `npx gatsby new`. The setup process offers many individualization possibilities: Besides the project name and path, a CMS, a styling system (e.g. styled-components, emotion, ...), and additional features with other plugins (e.g. mdx support) can be added optionally. Gatsby has built-in out-of-the-box TypeScript support, so there is no distinction between TypeScript and JavaScript in the project setup.

#### Next.js

The command `npx create-next-app@latest` can additionally be extended with the flag `--ts` to add direct TypeScript support to a new Next.js project. The following setup process does not provide any customization options apart from the project name.

#### Remix

A Remix project can be set up with the command `npx create-remix@latest`. Then you can specify the project name, choose between different host options (e.g. Netlify or Vercel) and between TypeScript and JavaScript.

## Static Site Generation

With static site generation (SSG), the HTML is generated once at built time and reused for each request. Of the three frameworks in this article, only Remix does not support SSG.


> ⚡ The options shown below for loading data only works in page/template components (they are bound to a certain url path or directory). To load data in components that do not have their own route, you must use other methods


#### **Gatsby**

In general, there are two ways to create data-dependent pages in Gatsby. In our comparison blog project, pages are implicitly created using the file-based API. Alternatively, you can create pages manually using the `create-pages` function in `gatsby-node.js`. In the following an example is given for both variants:

**With file-based API**

A static generated page with the file-based API consists of two parts: A GraphQL query and the actual React component (here `BlogPost`), which must be exported as default. In the GraphQL query, the required data is fetched. In this example, the Gatsby plugin [gatsby-transformer-remark](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark/) is used to get the content of the corresponding markdown file.
In the actual component, the results of the query can then be accessed via `data`.

In our Gatsby blog project, we created a file named `{markdownRemark.frontmatter__path}.tsx` to create a route for each blogpost. It is important that the filename consists of the path with the relevant key from the GraphQL query (here: `path`), which later determines the route of the page. In addition, the filename must be enclosed in curly brackets.

```tsx
const BlogPost = ({data}) => {
    return (
        <div dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}/>
    )
}

export const query = graphql`
    query ($id: String) {
        markdownRemark(id: {eq: $id}) {
            frontmatter {
                title
                path
            }
            html
        }
    }
`

export default BlogPost
```

**With create-pages API**

To create a page with the create-pages API, a `createPages` function must be defined in `gatsby-node.js`. In this function, the data is then loaded with a GraphQL query and passed into a template page. For each entry from the result of the `query` the `createPage` action is called, in which `path`, template `component`, and `context` are provided. An example from the [Gatsby documentation](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs) is given here:

```tsx
const path = require("path")

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each markdown file.
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const path = node.frontmatter.path
    createPage({
      path,
      component: blogPostTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        pagePath: path,
      },
    })
  })
}
```


#### **Next.js**

The roots of Next.js are in SSR, but relatively soon they also supported SSG. Thus, this framework supports both approaches well. To create a static generated page in Next.js the `async` function `getStaticPaths` has to be exported. In the code snippet below, this function calls `getAllPostPaths()`, which returns a path for each markdown file. `getStaticPaths` must return an object with the keys:

- `path`: This key determines which path will be pre-rendered. In the in-code comment below the structure of `path` is given as an example.
- `fallback`: You can set the value of fallback to `true`, `false` or `blocking`
    - `false` → Any paths not returned by `getStaticPaths` will end up in a 404 page
    - `true` → On the first request to a not generated path, Next.js will serve a fallback version of the page, instead of a 404 page. The HTML and JSON of this path is now generated in the background and and then the JSON is sent to the requesting browser. Now the fallback page changes into the full page. Next.js will add this path to the pre-rendered pages in order to be able to provide the already generated page for further requests.
      This is useful if you have a page with a lot of static pages because then not all pages have to be generated at built time, which makes the built much faster.
    - `blocking` → Same procedure as for `fallback: true`, except that there is no fallback while the HTML is being generated. There are only very special uses cases in which this makes sense, such as AMP.

Remember to name the file after the relevant key from the `params` object with square brackets, in our case `[path].tsx`. As long as the two names match, you can choose it as you wish.
To load the data for a blogpost the function `getStaticProps` is needed. This function now receives `{params}`, which can be used to determine the path and the depending data. Finally, in the actual page component, the data can be accessed via props (here via `{postData}`). The following source code shows how we built our comparison blog project using SSG and the methods just described.

```tsx
export async function getStaticPaths() {
    //     paths: [
    //         {params: {path: 'first-blogpost'}},
    //         {params: {path: 'second-blogpost'}},
    //         ...
    //         {params: {path: 'fifth-blogpost'}}
    //     ],
    const paths = getAllPostPaths()

    return {
        paths,
        fallback: false
    }

export async function getStaticProps({params}: { params: PostsData }) {
    const postData = await getPostData(params.path)
    return {
        props: {
            postData
        }
    }
}

export default function Post({postData}: { postData: PostData }) {
    return (
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
    )
}
```


> 💡 The object returned by `getStaticProps` can include other keys besides `props`, such as `revalidate`. `revalidate` is set to `false` by default, but can also contain the amount in seconds after which a page re-generation can occur. In this way, individual static pages can be changed at a certain interval after being built. This is called [Incremental Static Regeneration (ISR)](https://vercel.com/docs/concepts/next.js/incremental-static-regeneration).


#### **Remix**

Remix supports only server side rendering. An example of this can be found in the section below.

## Server Side Rendering (SSR)

With server side rendering (SSR), the HTML is rebuilt for each request. All three frameworks support SSR.

#### **Gatsby**

Besides static site generation (SSG) you can also use server side rendering (SSR) for certain use cases in Gatsby since version 4. For this, the function `getServerData` must be built into a page, in which the data is requested from the server. This data can then be accessed in the actual page component with `serverData`. In the following the example from the [Gatsby documentation](https://www.gatsbyjs.com/docs/how-to/rendering-options/using-server-side-rendering/) is considered:

```tsx
import * as React from "react"

const SSRPage = ({ serverData }) => (
  <main>
    <h1>SSR Page with Dogs</h1>
    <img alt="Happy dog" src={serverData.message} />
  </main>
)

export default SSRPage

export async function getServerData() {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`)

    if (!res.ok) {
      throw new Error(`Response failed`)
    }

    return {
      props: await res.json(),
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {}
    }
  }
}
```

#### **Next.js**

To use SSR in Next.js you have to use `getServerSideProps` instead of `getStaticProps` in the SSG variant. This function must load the data and return it, too. The data can then be accessed in the page component (in the example via `data`). The following example shows a simple SSR implementation from the [Next.js documentation](https://nextjs.org/docs/basic-features/pages#server-side-rendering).

```tsx
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Page
```

#### **Remix**

Remix has an exported `loader` function in which the data (e.g. local markdown file) is loaded (similar to `getStaticProps` in Next.js). This `loader` function can receive a `{params}` object. `{params}` can be used to access the path with `params.slug` and load the corresponding data. If you use the `params` object and want to build the route depending on the data, it is important to name your file with a `$` character and the key of the pathname. So in our example, it is `$slug.tsx`.
In the page component (here `PostSlug`) the data can then be accessed via the `useLoader` hook.

```tsx
export const loader: LoaderFunction = async ({params}) => {
    invariant(params.slug, "expected params.slug");
    return getPost(params.slug);
};

export default function PostSlug() {
    const post = useLoaderData();
    return (
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
    );
}
```

## Adding Page Metadata

The page header data, such as the html title, meta description and structural data like [open graph](https://ogp.me/) are especially important for SEO. In the following examples, a title should be added to the pages. For this, each framework offers its own solution.

#### **Gatsby**

To add page metadata in Gatsby, the `gatsby-plugin-react-helmet` and `React Helmet` are recommended. Generally, Gatsby plugins are installed via a package manager and then have to be added to `gatsby-config.js`.
So in our example blog we first had to run `npm install gatsby-plugin-react-helmet react-helmet` and then add the plugin to `gatsby-config.js`:

```jsx
{
  plugins: [`gatsby-plugin-react-helmet`]
}
```

After that, you can access the `React Helemet` within the JSX of a component, like for example in the index page.

```tsx
//...
import { Helmet } from "react-helmet"

const Index = () => {
    return (
        <Layout>
            <Helmet>
                <title>Gatsby Blog</title>
            </Helmet>
						{/*content goes here*/}
        </Layout>
    );
}
```

#### **Next.js**

Next.js provides a `head` component that can be built into any page to add metadata.

```tsx
//...
import Head from "next/head";

const Home: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Next.js Blog</title>
								{/*content goes here*/}
            </Head>
        </Layout>
    );
}
```

#### **Remix**

To add metadata to Remix projects you have to add the `<Meta />` component in the `<head>` part of `root.tsx`. After that, a `meta` function can be exported to other pages. This must return an object with all relevant metadata. In our example, this is only the page `title`.

```tsx
//...
import {MetaFunction} from "remix";

export const meta: MetaFunction = () => {
    return {
        title: "Remix Blog",
    };
};

export default function Index() {
  return (
    <Layout>
	      {/*content goes here*/}
    </Layout>
  );
}
```

## Conclusion

Next.js and Gatsby have quite a lot in common as they support both SSR and SSG. The differences are more in detail such as incremental static generation in Next.js or incremental builds in Gatsby. However, it is noticeable that SSR in Gatsby is still a relatively new and not as developed feature as it is in Next.js. 

Remix is the newest of these three frameworks and only supports SSR. However, with the appropriate headers, SSG is approached very closely, which means that it may be possible to completely replace real SSG. The developers of Remix have published an interesting [video](https://www.youtube.com/watch?v=bfLFHp7Sbkg) about this.

![blog-overview.png](images/gastby-next-remix-screenshot-twitter.png)

Thanks for reading my article about the different frameworks. I hope you learned something about the basic concepts behind Gatsby, Next.js and Remix. As I mentioned in the introduction, there is no clear answer to the question "Which framework should be used in my next project?" because every project has its individual requirements. Maybe now you know which framework can implement certain requirements well.