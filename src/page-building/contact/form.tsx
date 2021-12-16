import React from 'react';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { Trans } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { Link } from '../../components/links/links';
import { ContactForm } from './contact-form';
import { theme } from '../../new-components/layout/theme';

const StyledLink = styled(Link)`
  color: ${theme.palette.text.link.default};

  &:hover {
    border-bottom: 1px solid ${theme.palette.text.link.default};
  }
`;

export const Form = () => (
  <>
    <SectionHeader headline={'E-Mail'}>
      <Trans i18nKey="contact.info-link">
        <p>
          Nutzen Sie unser Kontaktformular oder schreiben Sie uns eine E-Mail an
          <StyledLink to="mailto:info@satellytes.com">
            info@satellytes.com
          </StyledLink>
        </p>
      </Trans>
    </SectionHeader>
    <ContactForm />
  </>
);