import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { up } from '../../components/style-utils/breakpoint';

import { LayoutV2 } from '../../components/layout/layout-v2';
import { LeadboxProps } from '../../new-components/leadbox/leadbox';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import { OfficePreview } from './office-preview';
import { Team } from './team';

import HeroImage from './../../images/office/sy-office-01.jpg';

const Hero = styled.div`
  height: 520px;

  ${up('md')} {
    height: 640px;
  }

  background-image: url(${HeroImage});
  background-position: center;
  background-size: cover;
`;

export const OfficePage = () => {
  const { t } = useTranslation();

  const leadbox: LeadboxProps = {
    illustration: 'astronaut_020',
    title: t('office.leadbox.title'),
    link: {
      title: t('office.leadbox.link'),
      href: '/career',
    },
  };

  return (
    <LayoutV2
      transparentHeader={true}
      light={true}
      leadbox={leadbox}
      hero={<Hero />}
    >
      <ContentBlockContainer>
        <SectionHeader
          headline={t('office.heading')}
          kicker={t('office.title')}
        >
          Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
          vestibulum. Etiam porta sem malesuada magna mollis euismod. Fusce
          dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
          fermentum massa justo sit amet risus. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
          <br />
          Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent
          commodo cursus magna, vel scelerisque nisl consectetur et. Morbi leo
          risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio
          dui. Integer posuere erat a ante venenatis dapibus posuere velit
          aliquet. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
          venenatis vestibulum.
        </SectionHeader>
      </ContentBlockContainer>

      <ContentBlockContainer>
        <OfficePreview />
      </ContentBlockContainer>

      <ContentBlockContainer>
        <Team />
      </ContentBlockContainer>
    </LayoutV2>
  );
};
