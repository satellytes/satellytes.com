import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { SubTitle, Text, TextLink } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { ContactForm } from '../components/form/contact';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';

const ContactSubTitle = styled(SubTitle)`
  margin-top: 80px;

  ${up('md')} {
    margin-top: 160px;
  }
`;

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Contact" />
      <Grid center>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <SubTitle>Adresse</SubTitle>
          <div>
            <Text>
              <b>Satellytes Digital Consulting GmbH</b>
              <br />
              Alpenplatz 3
              <br />
              81541 München
            </Text>
            <TextLink
              as="a"
              target="_blank"
              href="https://goo.gl/maps/sP2K4NUzqTS1zwVs9"
            >
              Google Maps &gt;
            </TextLink>
            <ContactSubTitle>Events</ContactSubTitle>
            <Text>
              Wir lieben es Neues zu entdecken und neue Kontakte zu knüpfen.
              Dort sind wir demnächst:
            </Text>
            <Text>Aktuell sind leider keine Events geplant.</Text>
            <Text>
              Sie haben ein Event für uns, das wir nicht verpassen sollten? Oder
              Sie hätten gerne, dass wir auf Ihrem einen Vortrag halten? Machen
              wir gerne.
            </Text>
            <TextLink as="a" href="mailto:ping@satellytes.com">
              Schreiben Sie uns &gt;
            </TextLink>
            <ContactSubTitle>E-Mail</ContactSubTitle>
            <Text style={{ marginBottom: '40px' }}>
              Nutzen Sie unser Kontaktformular oder schreiben Sie uns eine
              E-Mail an{' '}
              <TextLink as="a" href="mailto:ping@satellytes.com">
                ping@satellytes.com
              </TextLink>
              .
            </Text>
            <ContactForm />
          </div>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ContactPage;
