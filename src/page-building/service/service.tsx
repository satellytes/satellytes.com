import React from 'react';
import { Layout } from '../../components/layout/layout';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { LeadboxProps } from '../../new-components/leadbox/leadbox';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Consulting } from './consulting';
import { Industries } from './industries';
import { Platforms } from './platforms';
import { ProductsServices } from './products-services';
import { AuroraHero } from '../../new-components/heroes';

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
    <Layout
      transparentHeader={true}
      light={true}
      leadbox={leadbox}
      hero={<AuroraHero title={t('services.hero')} />}
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
    </Layout>
  );
};
