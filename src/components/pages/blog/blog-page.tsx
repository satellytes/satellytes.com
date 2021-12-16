import React from 'react';

import styled from 'styled-components';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { Layout } from '../../layout/layout';
import { SectionHeader } from '../../content/section-header/section-header';
import { NotAvailableInGerman } from './not-avilable-in-german';
import { Posts } from './posts';
import { ContentBlockContainer } from '../../layout/content-block-container';

interface BlogPageProps {
  posts: any[];
}

const BlogHeader = styled(SectionHeader)`
  margin-bottom: 80px;
`;

export const BlogPage = ({ posts }: BlogPageProps) => {
  const { t } = useTranslation();
  const { language } = useI18next();

  const BREADCRUMB = [
    { pathname: '/', label: 'Satellytes' },
    { pathname: '/blog', label: t('navigation.blog') },
  ];

  return (
    <Layout light showLanguageSwitch={false} breadcrumb={BREADCRUMB}>
      <ContentBlockContainer>
        <BlogHeader headline={t('navigation.blog')}>
          {t('blog.info')}

          {language != 'en' && <NotAvailableInGerman />}
        </BlogHeader>
      </ContentBlockContainer>

      <ContentBlockContainer>
        {language == 'en' && <Posts posts={posts} />}
      </ContentBlockContainer>
    </Layout>
  );
};
