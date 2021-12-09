import React from 'react';
import { LayoutV2 } from '../../components/layout/layout-v2';
import { Aurora } from '../../components/aurora/aurora';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { LeadboxProps } from '../../new-components/leadbox/leadbox';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { TextStyles } from '../../components/typography/typography-v2';
import { Consulting } from './consulting';
import { Summary } from './summary';
import { Industries } from './industries';
import { Platforms } from './platforms';
import { ProductsServices } from './products-services';
import { up } from '../../components/style-utils/breakpoint';

const HeroContainer = styled.div`
  position: relative;

  margin: 0 auto;
  padding: 437px 24px 48px 24px;

  color: #ffffff;

  ${up('md')} {
    padding: 479px 0 108px 0;

    max-width: 816px;
  }
`;

const ServicesPageTitle = styled.h1`
  ${TextStyles.headlineL};

  ${up('md')} {
    ${TextStyles.headlineXL};
  }
  margin: 0;
`;

const SummaryStyled = styled(Summary)`
  margin-top: 40px;
`;
export const Service = () => {
  const { t } = useTranslation();

  const leadbox: LeadboxProps = {
    title: t('services.leadbox.title'),
    illustration: 'space_shuttle_043',
    contact: {
      headline: t('services.leadbox.subtitle'),
      title: t('services.leadbox.text'),
      email: t('services.leadbox.mail'),
    },
  };

  return (
    <LayoutV2
      transparentHeader={true}
      light={true}
      leadbox={leadbox}
      hero={
        <>
          <Aurora />
          <HeroContainer>
            <ServicesPageTitle>{t('services.hero')}</ServicesPageTitle>
          </HeroContainer>
        </>
      }
    >
      <ContentBlockContainer>
        <SectionHeader
          headline={t('services.title')}
          kicker={t('services.kicker')}
        >
          {t('services.text')}
        </SectionHeader>
      </ContentBlockContainer>

      <Platforms />
      <ProductsServices />
      <Consulting />

      <Industries />
    </LayoutV2>
  );
};
