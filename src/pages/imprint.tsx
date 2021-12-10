import React from 'react';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Text } from '../components/typography/typography';
import { MarkdownAst } from '../components/markdown/markdown-ast';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { LayoutV2 } from '../components/layout/layout-v2';
import { SectionHeader } from '../new-components/section-header/section-header';
import { ContentBlockContainerWithoutHero } from '../components/layout/content-block-container';
import { LocalesQuery } from '../types';

const BottomNote = styled(Text)`
  margin-top: 80px;
  opacity: 0.8;
`;

interface ImprintPageProps {
  data: {
    locales: LocalesQuery;
    markdownRemark: {
      htmlAst: string;
    };
  };
  location: Location;
}

const ImprintPage = ({ data, location }: ImprintPageProps) => {
  const { t } = useTranslation();
  return (
    <LayoutV2 light={true}>
      <SEO
        title={`${t('imprint.title')} | Satellytes`}
        description={t('imprint.info')}
        location={location}
        noIndex={true}
      />
      <ContentBlockContainerWithoutHero>
        <SectionHeader headline={t('navigation.imprint')} />
        <MarkdownAst htmlAst={data.markdownRemark.htmlAst} />
        <BottomNote>{t('imprint.updated')}</BottomNote>
      </ContentBlockContainerWithoutHero>
    </LayoutV2>
  );
};

export default ImprintPage;

export const ImprintPageQuery = graphql`
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
    markdownRemark(
      fileAbsolutePath: { regex: "/(pages/imprint)/" }
      frontmatter: { language: { eq: $language } }
    ) {
      htmlAst
    }
  }
`;
