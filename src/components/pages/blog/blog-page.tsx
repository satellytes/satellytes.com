import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import styled from 'styled-components';
import { BlogPostTeaser } from '../../../types';
import { SectionHeader } from '../../content/section-header/section-header';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Layout } from '../../layout/layout';
import FollowPanel from '../blog-post/follow-panel';
import { NotAvailableInGerman } from './not-avilable-in-german';
import { Posts } from './posts';

interface BlogPageProps {
  posts: BlogPostTeaser[];
}

const BlogSharePanel = styled(FollowPanel)`
  margin-top: 48px;
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
        <SectionHeader as={'h1'} headline={t('navigation.blog')}>
          {t('blog.info')}

          {language != 'en' && <NotAvailableInGerman />}
        </SectionHeader>
      </ContentBlockContainer>
      {language == 'en' && <BlogSharePanel />}
      {language == 'en' && <Posts posts={posts} />}
    </Layout>
  );
};
