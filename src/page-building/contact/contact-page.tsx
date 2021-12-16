import React from 'react';
import { Layout } from '../../components/layout/layout';
import { Leaflet } from '../../components/leaflet/leaflet';
import { Address } from './address';
import { Form } from './form';
import { ContentBlockContainer } from '../../components/layout/content-block-container';

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
