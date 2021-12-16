import React from 'react';
import { Leaflet } from '../../components/leaflet/leaflet';
import { Address } from './address';
import { Form } from './form';
import { ContentBlockContainer } from '../../new-components/layout/content-block-container';
import { Layout } from '../../new-components/layout/layout';

export const ContactPage = () => (
  <Layout transparentHeader={true} light={true} hero={<Leaflet />}>
    <ContentBlockContainer>
      <Address />
    </ContentBlockContainer>
    <ContentBlockContainer>
      <Form />
    </ContentBlockContainer>
  </Layout>
);
