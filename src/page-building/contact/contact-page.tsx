import React from 'react';
import { Layout } from '../../components/layout/layout';
import { Leaflet } from '../../components/leaflet/leaflet';
import { Address } from './address';
import { ContactSection } from './contact-section';

export const ContactPage = () => (
  <Layout transparentHeader={true} light={true} hero={<Leaflet />}>
    <Address />
    <ContactSection />
  </Layout>
);
