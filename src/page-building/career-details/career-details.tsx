import React from 'react';
import { SyPersonioJob } from '../../@types/personio';
import { LayoutV2 } from '../../components/layout/layout-v2';
import { Aurora } from '../../components/aurora/aurora';
import { Grid, GridItem } from '../../components/grid/grid';
import { CareerForm } from '../../components/career-form/career-form';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../components/header/header';
import { up } from '../../components/breakpoint/breakpoint';
import { TextTitle } from '../../components/typography/typography';
import { useTranslation } from 'gatsby-plugin-react-i18next';

interface CareerDetailsProps {
  originalPath: string;
  position: SyPersonioJob;
  complementPath: string;
}

const Title = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 110%;

  margin-top: calc(60px + ${HEADER_HEIGHT});
  margin-bottom: 40px;

  ${up('md')} {
    margin-top: calc(120px + ${HEADER_HEIGHT});
    font-size: 48px;
  }
`;

export const SectionHeadline = styled(TextTitle)`
  margin-top: 40px;
  margin-bottom: 16px;

  ${up('md')} {
    margin-top: 80px;
  }
`;

export const PersonioHtml = styled.div`
  font-size: 16px;
  line-height: 150%;

  margin-top: 0;
  margin-bottom: 16px;

  & > ul {
    list-style: none;
    line-height: 150%;

    padding-left: 0;

    > li:before {
      content: '·';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
    }

    > li {
      position: relative;
      padding-left: 16px;
      margin-bottom: 16px;
    }
  }
`;

const IntroText = ({ text }) => {
  if (!text) {
    return null;
  }
  return <PersonioHtml dangerouslySetInnerHTML={{ __html: text }} />;
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
      <Grid>
        <GridItem xs={12} md={8}>
          <Title>{position.name}</Title>
          <IntroText text={position.short} />
          {position.sections.map(({ headline, descriptionHtml }, index) => {
            return (
              <div key={index}>
                <SectionHeadline>{headline}</SectionHeadline>
                <PersonioHtml
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              </div>
            );
          })}
        </GridItem>

        <GridItem xs={12} md={8} ref={ref}>
          <CareerForm
            company_id="41230"
            recruiting_channel_id="329206"
            access_token="89b2acfa3a239b75c7d6"
            job_position_id={position.jobId + ''}
            scrollToStart={scrollToStart}
          />
        </GridItem>
      </Grid>
    </LayoutV2>
  );
};
