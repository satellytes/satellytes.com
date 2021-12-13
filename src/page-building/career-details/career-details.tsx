import React from 'react';
import { LayoutV2 } from '../../components/layout/layout-v2';
import { Aurora } from '../../components/aurora/aurora';
import { CareerForm } from '../../components/career-form/career-form';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { JobDescription } from './job-description';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { SyPersonioJob } from '../../types';

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
    <LayoutV2
      siteTitleUrl="/career/"
      light={true}
      transparentHeader={true}
      translation={complementPath}
      hero={<Aurora />}
      breadcrumb={breadcrumb}
      showLanguageSwitch={Boolean(complementPath)}
    >
      <SectionHeader kicker="Stelle" headline={position.name}>
        {position.short}
      </SectionHeader>

      <JobDescription sections={position.sections} />

      <CareerForm
        company_id="41230"
        recruiting_channel_id="329206"
        access_token="89b2acfa3a239b75c7d6"
        job_position_id={position.jobId + ''}
        scrollToStart={scrollToStart}
      />
    </LayoutV2>
  );
};
