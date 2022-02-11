import React from 'react';
import { Layout } from '../../layout/layout';
import { CareerForm } from './career-form/career-form';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { JobDescription } from './job-description';
import { SyPersonioJob } from '../../../types';
import { SectionHeader } from '../../content/section-header/section-header';
import { ContentBlockContainer } from '../../layout/content-block-container';

interface CareerDetailsProps {
  originalPath: string;
  position: SyPersonioJob;
  complementPath: string;
}

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
      <ContentBlockContainer>
        <SectionHeader headline={position.name} kicker={t('career.position')}>
          {position.short}
        </SectionHeader>
      </ContentBlockContainer>

      <JobDescription sections={position.sections} />

      <CareerForm
        company_id="41230"
        recruiting_channel_id="329206"
        access_token="89b2acfa3a239b75c7d6"
        job_position_id={position.jobId + ''}
        scrollToStart={scrollToStart}
      />
    </Layout>
  );
};
