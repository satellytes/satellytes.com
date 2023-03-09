import React from 'react';
import { Layout } from '../../layout/layout';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { ContentfulVacancy } from '../../../types';
import { SectionHeader } from '../../content/section-header/section-header';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Form } from './new-career-form/career-form';
import { useLocation } from 'react-use';
import { ContentfulRichText } from '../../content/rich-text/rich-text';

interface CareerDetailsProps {
  originalPath: string;
  position: ContentfulVacancy;
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
  const utmChannel = UTM_CHANNEL_MAP[searchParams.get('utm_source') ?? ''];

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
        <SectionHeader
          as={'h1'}
          headline={position.name}
          kicker={t<string>('career.position')}
        >
          {position.shortDescription.shortDescription}
        </SectionHeader>
      </ContentBlockContainer>

      {/*todo check if ContentfulRichText is correct here*/}
      <ContentfulRichText data={position.content} />

      <Form
        company_id="41230"
        recruiting_channel_id={recruitingChannel}
        access_token="89b2acfa3a239b75c7d6"
        // todo check if id can be used here
        job_position_id={position.id + ''}
        scrollToStart={scrollToStart}
      />
    </Layout>
  );
};
