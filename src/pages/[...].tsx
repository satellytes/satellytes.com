import React from 'react';
import SEO from '../components/layout/seo';
import {
  GetServerDataProps,
  GetServerDataReturn,
  graphql,
  navigate,
  PageProps,
} from 'gatsby';
import { SectionHeader } from '../components/content/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Layout } from '../components/layout/layout';
import { ContentBlockContainer } from '../components/layout/content-block-container';

const REDIRECTS = [
  {
    fromPath: '/career/325433-senior-backend-engineer-m-w-x/',
    toPath: '/de/career/senior-backend-engineer/',
  },
  {
    fromPath: '/career/325433-senior-backend-engineer-(mwx)/',
    toPath: '/de/career/senior-backend-engineer/',
  },
  {
    fromPath: '/career/325420-senior-frontend-engineer-m-w-x/',
    toPath: '/de/career/senior-frontend-engineer/',
  },
  {
    fromPath: '/career/325420-senior-frontend-engineer-(mwx)/',
    toPath: '/de/career/senior-frontend-engineer/',
  },
  {
    fromPath: '/career/338504-frontend-engineer-w-m-x/',
    toPath: '/de/career/frontend-engineer/',
  },
  {
    fromPath: '/career/338504-frontend-engineer-(wmx)/',
    toPath: '/de/career/frontend-engineer/',
  },
  {
    fromPath: '/career/325493-senior-uxui-designer-m-w-x/',
    toPath: '/de/career/senior-ux-ui-designer/',
  },
  {
    fromPath: '/career/325493-senior-uxui-designer-(mwx)/',
    toPath: '/de/career/senior-ux-ui-designer/',
  },
  {
    fromPath: '/page/imprint/',
    toPath: '/de/imprint/',
  },
  {
    fromPath: '/office/',
    toPath: '/about-us/',
  },
  {
    fromPath: '/de/office/',
    toPath: '/about-us/',
  },
  {
    fromPath: '/blog/scoped-registry/',
    toPath: '/blog/enterprises-benefit-from-scoped-npm-registries/',
  },
  {
    fromPath: '/de/blog/monorepo-codeowner-github-enterprise/',
    toPath: '/blog/monorepo-codeowner-github-enterprise/',
  },
  {
    fromPath: '/blog/thoughts-on-collaborative-work/',
    toPath: '/blog/four-ways-to-improve-collaboration-in-your-team/',
  },
  /**
   * Blog posts have been moved from "/blog/[slug]" to "/blog/post/[slug]"
   */
  {
    fromPath: '/blog/we-work-remotely/',
    toPath: '/blog/post/we-work-remotely/',
  },
  {
    fromPath: '/blog/four-ways-to-improve-collaboration-in-your-team/',
    toPath: '/blog/post/four-ways-to-improve-collaboration-in-your-team/',
  },
  {
    fromPath: '/blog/boosting-developer-productivity-with-github-actions/',
    toPath: '/blog/post/boosting-developer-productivity-with-github-actions/',
  },
  {
    fromPath: '/blog/cache-gatsby-ssr-pages-on-gatsby-cloud/',
    toPath: '/blog/post/cache-gatsby-ssr-pages-on-gatsby-cloud/',
  },
  {
    fromPath: '/blog/cloudfront-cache-efficiency/',
    toPath: '/blog/post/cloudfront-cache-efficiency/',
  },
  {
    fromPath: '/blog/interview-felix-hamann/',
    toPath: '/blog/post/interview-felix-hamann/',
  },
  {
    fromPath: '/blog/getting-started-gatsby-next-remix/',
    toPath: '/blog/post/getting-started-gatsby-next-remix/',
  },
  {
    fromPath: '/blog/enterprises-benefit-from-scoped-npm-registries/',
    toPath: '/blog/post/enterprises-benefit-from-scoped-npm-registries/',
  },
  {
    fromPath: '/blog/gather-metaverse-bump-each-other-2021/',
    toPath: '/blog/post/gather-metaverse-bump-each-other-2021/',
  },
  {
    fromPath: '/blog/interview-daniel-eissing/',
    toPath: '/blog/post/interview-daniel-eissing/',
  },
  {
    fromPath: '/blog/the-modern-code-reviewer-2021/',
    toPath: '/blog/post/the-modern-code-reviewer-2021/',
  },
  {
    fromPath: '/blog/github-billing-dashboard/',
    toPath: '/blog/post/github-billing-dashboard/',
  },
  {
    fromPath: '/blog/how-consistency-helps-you-to-optimize-gatsby-urls/',
    toPath: '/blog/post/how-consistency-helps-you-to-optimize-gatsby-urls/',
  },
  {
    fromPath: '/blog/monorepo-codeowner-github-enterprise/',
    toPath: '/blog/post/monorepo-codeowner-github-enterprise/',
  },
  {
    fromPath: '/blog/typescript-ast-type-checker/',
    toPath: '/blog/post/typescript-ast-type-checker/',
  },
  {
    fromPath: '/blog/angular-inject-the-injector/',
    toPath: '/blog/post/angular-inject-the-injector/',
  },
  {
    fromPath: '/blog/angular-workshop-kaiserx-allianz-2018/',
    toPath: '/blog/post/angular-workshop-kaiserx-allianz-2018/',
  },
];

interface NotFoundPageProps {
  redirectToPath: string;
}

const NotFoundPage = ({
  location,
  serverData,
}: PageProps<any, any, any, NotFoundPageProps>): JSX.Element => {
  const { t } = useTranslation();

  if (serverData?.redirectToPath) navigate(serverData.redirectToPath);

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
): GetServerDataReturn<NotFoundPageProps> => {
  console.log(context.url);

  REDIRECTS.forEach(({ fromPath, toPath }) => {
    if (context.url === fromPath) {
      return {
        status: 301,
        headers: {
          Location: toPath,
        },
      };
    }
  });

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
