import React from 'react';
import { Leaflet } from './leaflet/leaflet';
import { Address } from './address';
import { Form } from './form';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Layout } from '../../layout/layout';

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
