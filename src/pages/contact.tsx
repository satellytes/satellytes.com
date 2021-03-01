import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { SubTitle, Text, TextLink } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { ContactForm } from '../components/form/contact';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';

const ContactSubTitle = styled(SubTitle)<{ short?: boolean }>`
  margin-top: ${(props) => (props.short ? '40px' : '80px')};
  margin-bottom: 40px !important;

  ${up('md')} {
    margin-top: ${(props) => (props.short ? '80px' : '160px')};
  }
`;

const ContactPage: React.FC = () => {
  return (
    <Layout heroImage="https://res.cloudinary.com/satellytes/image/upload/v1611566922/satellytes-website/sy-contact_bo49en.jpg">
      <SEO
        title="Kontakt | Satellytes Digital Consulting GmbH"
        description="Nutzen Sie unser Kontaktformular oder schreiben Sie uns eine E-Mail an beep@satellytes.com"
      />
      <Grid center>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <ContactSubTitle short>Unsere Adresse</ContactSubTitle>
          <div>
            <Text>
              <b>Satellytes Digital Consulting GmbH</b>
              <br />
              Sendlinger Straße 52
              <br />
              80331 München
            </Text>
            <TextLink
              as="a"
              target="_blank"
              href="https://goo.gl/maps/EGTh9xqgR7P871aC9"
            >
              Google Maps &gt;
            </TextLink>
            <ContactSubTitle>Schreiben Sie uns</ContactSubTitle>

            <Text style={{ marginBottom: '40px' }}>
              Nutzen Sie unser Kontaktformular oder schreiben Sie uns eine
              E-Mail an{' '}
              <TextLink as="a" href="mailto:beep@satellytes.com">
                beep@satellytes.com
              </TextLink>
            </Text>
            <ContactForm />
          </div>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ContactPage;
