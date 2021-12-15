import React from 'react';

import styled from 'styled-components';
import { ButtonText, SendButton } from '../../components/form/controls';
import { RightArrowIcon } from '../../components/career-form/icons/right-arrow';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import { BlogCard } from '../../components/cards/blog-card';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { formatDate } from '../../components/util/format-date';
import { Grid } from '../../components/grid/grid';
import { LayoutV2 } from '../../components/layout/layout-v2';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { Teaser } from '../../components/teasers/teaser';
import { useLocaleFormat } from '../../new-components/i18n-helpers';

interface BlogPageProps {
  posts: any[];
}

const OnlyEnglishNotice = () => {
  const { changeLanguage } = useI18next();
  const switchToEnglish = async (event) => {
    event.preventDefault();
    await changeLanguage('en');
  };

  return (
    <div>
      <SendButton onClick={switchToEnglish}>
        <ButtonText>Zum Blog</ButtonText> <RightArrowIcon />
      </SendButton>
    </div>
  );
};

const ExtraWideContainer = styled.div`
  /**
    Our layout has multiple tracks and we assign the wide one here.
   */
  && {
    grid-column: wide-start/wide-end;
  }
`;

const BlogTeaserGrid = styled.div`
  display: grid;
  gap: 24px;
  justify-items: stretch;
  // we fetch teaser of size 600px
  // this means we can search for a column size of 300px - 12px (half gap) = 288px
  // to auto fit our teasers
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
`;

const BlogHeader = styled(SectionHeader)`
  margin-bottom: 80px;
`;

export const BlogPage = ({ posts }: BlogPageProps) => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const dateFormatter = useLocaleFormat('dd. MMMM yyyy');

  const BREADCRUMB = [
    { pathname: '/', label: 'Satellytes' },
    { pathname: '/blog', label: t('navigation.blog') },
  ];

  return (
    <LayoutV2 light showLanguageSwitch={false} breadcrumb={BREADCRUMB}>
      <ExtraWideContainer>
        <BlogHeader headline={t('navigation.blog')}>
          {t('blog.info')}
        </BlogHeader>
      </ExtraWideContainer>

      <ExtraWideContainer>
        {language != 'en' && <OnlyEnglishNotice />}
        {/*{language == 'en' && <BlogPostOverview blogPosts={posts} />}*/}

        <BlogTeaserGrid>
          {posts.map((item) => {
            const image = getImage(item.frontmatter.featuredImage)!;

            return (
              <Teaser
                key={item.id}
                title={item.frontmatter.title}
                linkTo={item.frontmatter.path}
                dateFormatted={dateFormatter(item.frontmatter.date)}
                cover={image && <GatsbyImage alt="" image={image} />}
              >
                {item.frontmatter.teaserText}
              </Teaser>
            );
          })}
        </BlogTeaserGrid>
      </ExtraWideContainer>
    </LayoutV2>
  );
};
