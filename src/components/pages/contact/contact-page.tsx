import React from 'react';
import { Leaflet } from './leaflet/leaflet';
import { Address } from './address';
import { ContactForm } from './contact-form';
import { ContentBlockContainer } from '../../layout/content-block-container';
import { Layout } from '../../layout/layout';

export const ContactPage = () => (
  <Layout
    transparentHeader={true}
    light={true}
    hero={
      <div aria-hidden={true} tabIndex={-1}>
        <Leaflet />
      </div>
    }
  >
    <ContentBlockContainer>
      <Address />
    </ContentBlockContainer>
    <ContentBlockContainer>
      <ContactForm />
    </ContentBlockContainer>
  </Layout>
);
