import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { SubTitle, Text, TextLink } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { ContactForm } from '../components/form/contact';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { Leaflet } from '../components/leaflet/leaflet';
import { graphql } from 'gatsby';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

const ContactTitle = styled(SubTitle)`
  margin-top: 40px;

  ${up('md')} {
    margin-top: 120px;
  }
`;

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Layout transparentHeader={true} hero={<Leaflet />}>
        <SEO
          title={`${t('contact.title')} | Satellytes`}
          description={t('contact.info')}
        />

        <Grid center>
          <GridItem xs={0} md={2} />
          <GridItem xs={12} md={8}>
            <ContactTitle>{t('contact.title')}</ContactTitle>
            <div>
              <Text>
                <b>Satellytes Digital Consulting GmbH</b>
                <br />
                Sendlinger Straße 52
                <br />
                80331 München
              </Text>
              <TextLink to="https://goo.gl/maps/EGTh9xqgR7P871aC9">
                Google Maps &gt;
              </TextLink>
              <SubTitle>E-Mail</SubTitle>
              <Trans i18nKey="contact.info-link">
                <Text style={{ marginBottom: '40px' }}>
                  Nutzen Sie unser Koaktformular oder schreiben Sie uns eine
                  E-Mail an
                  <TextLink to="mailto:beep@satellytes.com">
                    beep@satellytes.com
                  </TextLink>
                </Text>
              </Trans>
              <ContactForm />
            </div>
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
};

export default ContactPage;

export const ContactPageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
