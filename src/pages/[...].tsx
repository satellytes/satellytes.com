import React from 'react';
import SEO from '../components/layout/seo';
import {
  GetServerDataProps,
  GetServerDataReturn,
  graphql,
  PageProps,
} from 'gatsby';
import { SectionHeader } from '../components/content/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Layout } from '../components/layout/layout';
import { ContentBlockContainer } from '../components/layout/content-block-container';

/**
 * List of redirects.
 *
 * Always provide the `fromPath` with a trailing slash!
 */
const REDIRECTS: { fromPath: string; to: string; noIndex?: boolean }[] = [
  {
    fromPath: '/career/325433-senior-backend-engineer-m-w-x/',
    to: '/de/career/senior-backend-engineer/',
  },
  {
    fromPath: '/career/325433-senior-backend-engineer-(mwx)/',
    to: '/de/career/senior-backend-engineer/',
  },
  {
    fromPath: '/career/325420-senior-frontend-engineer-m-w-x/',
    to: '/de/career/senior-frontend-engineer/',
  },
  {
    fromPath: '/career/325420-senior-frontend-engineer-(mwx)/',
    to: '/de/career/senior-frontend-engineer/',
  },
  {
    fromPath: '/career/338504-frontend-engineer-w-m-x/',
    to: '/de/career/frontend-engineer/',
  },
  {
    fromPath: '/career/338504-frontend-engineer-(wmx)/',
    to: '/de/career/frontend-engineer/',
  },
  {
    fromPath: '/career/325493-senior-uxui-designer-m-w-x/',
    to: '/de/career/senior-ux-ui-designer/',
  },
  {
    fromPath: '/career/325493-senior-uxui-designer-(mwx)/',
    to: '/de/career/senior-ux-ui-designer/',
  },
  {
    fromPath: '/page/imprint/',
    to: '/de/imprint/',
  },
  {
    fromPath: '/office/',
    to: '/about-us/',
  },
  {
    fromPath: '/de/office/',
    to: '/about-us/',
  },
  {
    fromPath: '/blog/scoped-registry/',
    to: '/blog/enterprises-benefit-from-scoped-npm-registries/',
  },
  {
    fromPath: '/de/blog/monorepo-codeowner-github-enterprise/',
    to: '/blog/monorepo-codeowner-github-enterprise/',
  },
  {
    fromPath: '/blog/thoughts-on-collaborative-work/',
    to: '/blog/four-ways-to-improve-collaboration-in-your-team/',
  },

  /**
   * Blog posts have been moved from "/blog/[slug]" to "/blog/post/[slug]"
   */
  {
    fromPath: '/blog/we-work-remotely/',
    to: '/blog/post/we-work-remotely/',
  },
  {
    fromPath: '/blog/four-ways-to-improve-collaboration-in-your-team/',
    to: '/blog/post/four-ways-to-improve-collaboration-in-your-team/',
  },
  {
    fromPath: '/blog/boosting-developer-productivity-with-github-actions/',
    to: '/blog/post/boosting-developer-productivity-with-github-actions/',
  },
  {
    fromPath: '/blog/cache-gatsby-ssr-pages-on-gatsby-cloud/',
    to: '/blog/post/cache-gatsby-ssr-pages-on-gatsby-cloud/',
  },
  {
    fromPath: '/blog/cloudfront-cache-efficiency/',
    to: '/blog/post/cloudfront-cache-efficiency/',
  },
  {
    fromPath: '/blog/interview-felix-hamann/',
    to: '/blog/post/interview-felix-hamann/',
  },
  {
    fromPath: '/blog/getting-started-gatsby-next-remix/',
    to: '/blog/post/getting-started-gatsby-next-remix/',
  },
  {
    fromPath: '/blog/enterprises-benefit-from-scoped-npm-registries/',
    to: '/blog/post/enterprises-benefit-from-scoped-npm-registries/',
  },
  {
    fromPath: '/blog/gather-metaverse-bump-each-other-2021/',
    to: '/blog/post/gather-metaverse-bump-each-other-2021/',
  },
  {
    fromPath: '/blog/interview-daniel-eissing/',
    to: '/blog/post/interview-daniel-eissing/',
  },
  {
    fromPath: '/blog/the-modern-code-reviewer-2021/',
    to: '/blog/post/the-modern-code-reviewer-2021/',
  },
  {
    fromPath: '/blog/github-billing-dashboard/',
    to: '/blog/post/github-billing-dashboard/',
  },
  {
    fromPath: '/blog/how-consistency-helps-you-to-optimize-gatsby-urls/',
    to: '/blog/post/how-consistency-helps-you-to-optimize-gatsby-urls/',
  },
  {
    fromPath: '/blog/monorepo-codeowner-github-enterprise/',
    to: '/blog/post/monorepo-codeowner-github-enterprise/',
  },
  {
    fromPath: '/blog/typescript-ast-type-checker/',
    to: '/blog/post/typescript-ast-type-checker/',
  },
  {
    fromPath: '/blog/angular-inject-the-injector/',
    to: '/blog/post/angular-inject-the-injector/',
  },
  {
    fromPath: '/blog/angular-workshop-kaiserx-allianz-2018/',
    to: '/blog/post/angular-workshop-kaiserx-allianz-2018/',
  },

  /**
   * convenience URLs for our internal tools
   */
  {
    fromPath: '/orion/',
    to: 'https://gather.town/app/ea0xvXaHYWuWurME/satellytes',
    noIndex: true,
  },
  {
    fromPath: '/gather/',
    to: 'https://gather.town/app/ea0xvXaHYWuWurME/satellytes',
    noIndex: true,
  },
  {
    fromPath: '/github/',
    to: 'https://github.com/satellytes',
    noIndex: true,
  },
  {
    fromPath: '/slack/',
    to: 'https://app.slack.com/client/T9B7YFCC8',
    noIndex: true,
  },
  {
    fromPath: '/notion/',
    to: 'https://www.notion.so/satellytes',
    noIndex: true,
  },
  {
    fromPath: '/personio/',
    to: 'https://satellytes.personio.de',
    noIndex: true,
  },
  {
    fromPath: '/lattice/',
    to: 'https://satellytes.latticehq.com',
    noIndex: true,
  },
];

const NotFoundPage = ({ location }: PageProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title="404: Not found | Satellytes" location={location} />
      <Layout light={true}>
        <ContentBlockContainer>
          <SectionHeader headline={'404'}>{t('404')}</SectionHeader>
        </ContentBlockContainer>
      </Layout>
    </>
  );
};

export default NotFoundPage;

export const getServerData = async (
  context: GetServerDataProps,
): GetServerDataReturn => {
  console.log('404 page triggered with URL:', context.url);

  const redirect = REDIRECTS.find(({ fromPath }) => {
    return (
      context.url === fromPath ||
      // check without trailing slash
      context.url === fromPath.slice(0, -1)
    );
  });

  if (redirect) {
    return {
      status: 301,
      headers: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore gatsby types are wrong
        Location: redirect.to,

        // https://developers.google.com/search/docs/advanced/robots/robots_meta_tag#xrobotstag
        ...(redirect.noIndex && { 'X-Robots-Tag': 'noindex' }),
      },
    };
  }

  return {
    status: 404,
  };
};

export const NotFoundPageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
