import React from 'react';
import { Layout } from '../../layout/layout';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { SectionHeader } from '../../content/section-header/section-header';
import { Consulting } from './consulting';
import { Platforms } from './platforms';
import { ProductsServices } from './products-services';
import { AuroraHero } from '../../content/heroes';
import { ProductDesign } from './product-design';
import {
  ContentfulLeadBox,
  ContentfulList,
  ContentfulPage,
  ContentfulSectionHeader,
} from '../../../types';

interface ServiceProps {
  page: ContentfulPage;
  leadbox: ContentfulLeadBox;
  servicesHeader: ContentfulSectionHeader;
  platformsHeader: ContentfulSectionHeader;
  productsServicesHeader: ContentfulSectionHeader;
  consultingHeader: ContentfulSectionHeader;
  productDesignHeader: ContentfulSectionHeader;
  platformsList: ContentfulList;
  productsServicesList: ContentfulList;
  consultingList: ContentfulList;
}

export const Service = ({
  page,
  leadbox,
  servicesHeader,
  platformsHeader,
  productsServicesHeader,
  consultingHeader,
  productDesignHeader,
  platformsList,
  productsServicesList,
  consultingList,
}: ServiceProps) => {
  return (
    <Layout
      transparentHeader={true}
      light={true}
      leadbox={leadbox}
      hero={
        <AuroraHero title={page.title}>
          {page.description?.description}{' '}
        </AuroraHero>
      }
    >
      <ContentBlockContainer>
        <SectionHeader
          headline={servicesHeader.headline as string}
          kicker={servicesHeader.kicker}
        >
          {servicesHeader.paragraphs?.[0].paragraph.paragraph}
          {''}
        </SectionHeader>
      </ContentBlockContainer>

      <Platforms header={platformsHeader} list={platformsList} />
      <ProductsServices
        header={productsServicesHeader}
        list={productsServicesList}
      />
      <Consulting header={consultingHeader} list={consultingList} />
      <ProductDesign header={productDesignHeader} />
    </Layout>
  );
};
