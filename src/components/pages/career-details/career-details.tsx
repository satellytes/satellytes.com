import React from 'react';
import { Layout } from '../../layout/layout';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { ContentfulVacancy } from '../../../types';
import { SectionHeader } from '../../content/section-header/section-header';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Form } from './new-career-form/career-form';
import { ContentfulRichText } from '../../content/rich-text/rich-text';
import styled from 'styled-components';

interface CareerDetailsProps {
  originalPath: string;
  position: ContentfulVacancy;
  complementPath: string;
}
const StyledContentBlockContainer = styled(ContentBlockContainer)`
  margin-bottom: 48px;
`;
export const CareerDetails = ({
  position,
  complementPath,
  originalPath,
}: CareerDetailsProps) => {
  const { t } = useTranslation();

  const ref = React.useRef<HTMLDivElement | null>(null);

  const breadcrumb = [
    { pathname: '/', label: 'Satellytes' },
    { pathname: '/career', label: t('navigation.career') },
    {
      pathname: originalPath,
      label: position.name,
    },
  ];

  const scrollToStart = () => {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Layout
      siteTitleUrl="/career/"
      light={true}
      translation={complementPath}
      breadcrumb={breadcrumb}
      showLanguageSwitch={Boolean(complementPath)}
    >
      <StyledContentBlockContainer>
        <SectionHeader
          large
          as={'h1'}
          headline={position.name}
          kicker={t('career.position')}
        >
          {position.shortDescription.shortDescription}
        </SectionHeader>
      </StyledContentBlockContainer>

      <ContentfulRichText data={position.content} />

      <Form scrollToStart={scrollToStart} jobName={position.name} />
    </Layout>
  );
};
