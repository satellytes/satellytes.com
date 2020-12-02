import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { SubTitle, Text, TextLink } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { ContactForm } from '../components/form/contact';
import styled from 'styled-components';
import { up } from '../components/breakpoint/breakpoint';
import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';

const CONTACT_PAGE_QUERY = graphql`
  query {
    imagePlaceholder: file(relativePath: { regex: "/placeholder/" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const ContactSubTitle = styled(SubTitle)<{ short?: boolean }>`
  margin-top: ${(props) => (props.short ? '40px' : '80px')};
  margin-bottom: 40px !important;

  ${up('md')} {
    margin-top: ${(props) => (props.short ? '80px' : '160px')};
  }
`;

const ContactPage: React.FC = () => {
  const data = useStaticQuery<{
    imagePlaceholder: { childImageSharp: { fluid: FluidObject } };
  }>(CONTACT_PAGE_QUERY);

  return (
    <Layout heroImage={data.imagePlaceholder.childImageSharp.fluid}>
      <SEO
        title="Kontakt | Satellytes"
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
