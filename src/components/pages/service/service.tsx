import React from 'react';
import { Layout } from '../../layout/layout';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { SectionHeader } from '../../content/section-header/section-header';
import { LeadboxProps } from '../../content/leadbox/leadbox';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Consulting } from './consulting';
import { Industries } from './industries';
import { Platforms } from './platforms';
import { ProductsServices } from './products-services';
import { AuroraHero } from '../../content/heroes';

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
      hero={
        <AuroraHero title={t('services.hero')}>
          {t('services.hero.description')}{' '}
        </AuroraHero>
      }
    >
      <ContentBlockContainer>
        <SectionHeader
          headline={t<string>('services.title')}
          kicker={t<string>('services.kicker')}
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
