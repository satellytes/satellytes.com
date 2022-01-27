import React from 'react';
import { Layout } from '../../layout/layout';
import { CareerForm } from './career-form/career-form';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { JobDescription } from './job-description';
import { SyPersonioJob } from '../../../types';
import { AuroraHero } from '../../content/heroes';

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
      transparentHeader={true}
      translation={complementPath}
      hero={
        <AuroraHero kicker={t('career.position')} title={position.name}>
          {position.short}
        </AuroraHero>
      }
      breadcrumb={breadcrumb}
      showLanguageSwitch={Boolean(complementPath)}
    >
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
