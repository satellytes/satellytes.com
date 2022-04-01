import React from 'react';
import { Layout } from '../../layout/layout';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { JobDescription } from './job-description';
import { SyPersonioJob } from '../../../types';
import { SectionHeader } from '../../content/section-header/section-header';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Form } from './new-career-form/career-form';
import { useLocation } from 'react-use';

interface CareerDetailsProps {
  originalPath: string;
  position: SyPersonioJob;
  complementPath: string;
}

const DEFAULT_CHANNEL_ID = '329206';

const UTM_CHANNEL_MAP = {
  google_jobs_apply: '713571',
};

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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personioChannel = searchParams.get('_pc');
  const utmChannel = UTM_CHANNEL_MAP[searchParams.get('utm_source')!];

  const recruitingChannel = utmChannel ?? personioChannel ?? DEFAULT_CHANNEL_ID;

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

      <Form
        company_id="41230"
        recruiting_channel_id={recruitingChannel}
        access_token="89b2acfa3a239b75c7d6"
        job_position_id={position.jobId + ''}
        scrollToStart={scrollToStart}
      />
    </Layout>
  );
};
