# satellytes.com

This repository contains the https://satellytes.com website.

## Project setup

To run the project all you need is:

- Yarn
- Node >= 18

### Additional setup on Apple Silicon

If you are using a machine with Apple Silicon, the `canvas` dependency might not have prebuild binaries, therefore the installation fails.

To fix that, you need to [install the dependencies needed to compile](https://github.com/Automattic/node-canvas#compiling) the binaries first (using [Homebrew](https://brew.sh)):

```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg
```

### Environment Variables

It is necessary to create a dotenv (`.env.development`) to develop locally.

| Variable Name                     | Decription                              |
|-----------------------------------|-----------------------------------------|
| `CONTENTFUL_SPACE_ID`             | your Contentful space ID                |
| `CONTENTFUL_ACCESS_TOKEN`         | your  content delivery API access token |
| `CONTENTFUL_PREVIEW_ACCESS_TOKEN` | your  content preview API access token  |
| `CONTENTFUL_HOST`                 | preview.contentful.com                  |

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


## Writing a blog post

You can add a blog post by creating a new one in our [Satellytes.com Space on Contentful](https://app.contentful.com/).