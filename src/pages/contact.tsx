import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { SubTitle, Text, TextLink } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { ContactForm } from '../components/form/contact';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { Aurora, AuroraType } from '../components/aurora/aurora';

const ContactTitle = styled(SubTitle)`
  margin-top: 40px;

  ${up('md')} {
    margin-top: 120px;
  }
`;

const ContactPage: React.FC = () => {
  return (
    <>
      <Aurora type={AuroraType.Pink} />
      <Layout>
        <SEO
          title="Kontakt | Satellytes"
          description="Nutzen Sie unser Kontaktformular oder schreiben Sie uns eine E-Mail an beep@satellytes.com"
        />
        <Grid center>
          <GridItem xs={0} md={2} />
          <GridItem xs={12} md={8}>
            <ContactTitle>Adresse</ContactTitle>
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
              <SubTitle>E-Mail</SubTitle>

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
    </>
  );
};

export default ContactPage;
