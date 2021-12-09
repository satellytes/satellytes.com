import React from 'react';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import SEO from '../components/seo';
import { LayoutV2 } from '../components/layout/layout-v2';
import { Leaflet } from '../components/leaflet/leaflet';
import { SectionHeader } from '../new-components/section-header/section-header';
import { Link } from '../components/links/links';
import { graphql } from 'gatsby';
import { ContentBlockContainer } from '../components/layout/content-block-container';
import { ContactForm } from '../components/form/contact';
import styled from 'styled-components';
import { theme } from '../components/layout/theme';

const StyledLink = styled(Link)`
  color: ${theme.palette.text.link.default};

  &:hover {
    border-bottom: 1px solid ${theme.palette.text.link.default};
  }
`;

interface ContactPageProps {
  location: Location;
}

const ContactPage = ({ location }: ContactPageProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={`${t('contact.title')} | Satellytes`}
        description={t('contact.info')}
        location={location}
      />
      <LayoutV2 transparentHeader={true} light={true} hero={<Leaflet />}>
        <ContentBlockContainer>
          <SectionHeader
            headline={t('contact.address')}
            kicker={t('contact.title')}
          >
            Satellytes Digital Consulting GmbH
            <br />
            Sendlinger Straße 52
            <br />
            80331 München
            <br />
            <br />
            <StyledLink to="https://g.page/satellytes?share">
              Google Maps &gt;
            </StyledLink>
          </SectionHeader>
        </ContentBlockContainer>

        <ContentBlockContainer>
          <SectionHeader headline={'E-Mail'}>
            <Trans i18nKey="contact.info-link">
              <p>
                Nutzen Sie unser Kontaktformular oder schreiben Sie uns eine
                E-Mail an
                <StyledLink to="mailto:info@satellytes.com">
                  info@satellytes.com
                </StyledLink>
              </p>
            </Trans>
          </SectionHeader>
        </ContentBlockContainer>

        <ContactForm />
      </LayoutV2>
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
