import React from 'react';
import { LayoutV2 } from '../../components/layout/layout-v2';
import { Leaflet } from '../../components/leaflet/leaflet';
import { Address } from './address';
import { ContactSection } from './contact-section';

export const ContactPage = () => (
  <LayoutV2 transparentHeader={true} light={true} hero={<Leaflet />}>
    <Address />
    <ContactSection />
  </LayoutV2>
);
