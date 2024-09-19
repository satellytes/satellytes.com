import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import styled from 'styled-components';
import { BlogPostTeaser, ContentfulSectionHeader } from '../../../types';
import { SectionHeader } from '../../content/section-header/section-header';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Layout } from '../../layout/layout';
import { Pagination } from '../../ui/pagination/pagination';
import FollowPanel from '../blog-post/follow-panel';
import { NotAvailableInGerman } from './not-avilable-in-german';
import { Posts } from './posts';

interface BlogPageProps {
  posts: BlogPostTeaser[];
  header: ContentfulSectionHeader;
  pagination: {
    numberOfPages: number;
    currentPage: number;
  };
}

const BlogSharePanel = styled(FollowPanel)`
  margin-top: 48px;
  margin-bottom: 80px;
`;

const StyledPagination = styled(Pagination)`
  margin-top: 80px;
`;

export const BlogPage = ({ posts, header, pagination }: BlogPageProps) => {
  const { t } = useTranslation();
  const { language } = useI18next();

  const { currentPage, numberOfPages } = pagination;

  const BREADCRUMB = [
    { pathname: '/', label: 'Satellytes' },
    { pathname: '/blog', label: t('navigation.blog') },
  ];

  const nextLink = `/blog/page/${currentPage + 1}`;
  const previousLink = `/blog/${currentPage !== 2 ? `page/${currentPage - 1}` : ''}`;

  return (
    <Layout light showLanguageSwitch={false} breadcrumb={BREADCRUMB}>
      <ContentBlockContainer>
        <SectionHeader as={'h1'} headline={t('navigation.blog')}>
          {header.paragraphs?.[0]?.paragraph?.paragraph}

          {language != 'en' && <NotAvailableInGerman />}
        </SectionHeader>

        {language == 'en' && (
          <>
            <BlogSharePanel />
            <Posts posts={posts} />
            <StyledPagination
              amountOfPages={numberOfPages}
              currentPage={currentPage}
              nextLink={nextLink}
              previousLink={previousLink}
            />
          </>
        )}
      </ContentBlockContainer>
    </Layout>
  );
};
