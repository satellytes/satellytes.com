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
      <SEO title="Contact" />
      <Grid center>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <ContactSubTitle short>Adresse</ContactSubTitle>
          <div>
            <Text>
              <b>Satellytes Digital Consulting GmbH</b>
              <br />
              Carola-Neher-Str. 10
              <br />
              81379 München
            </Text>
            <TextLink
              as="a"
              target="_blank"
              href="https://goo.gl/maps/gRpvefWFBTe1DmAJ6"
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
