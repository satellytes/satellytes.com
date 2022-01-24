import React, { useState } from 'react';
import { SectionHeader } from '../../content/section-header/section-header';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { Link } from '../../legacy/links/links';
import { Form } from './form';
import { theme } from '../../layout/theme';
import { Button } from '../../ui/buttons/button';

const StyledLink = styled(Link)`
  color: ${theme.palette.text.link.default};

  &:hover {
    border-bottom: 1px solid ${theme.palette.text.link.default};
  }
`;

const StyledSectionHeader = styled(SectionHeader)`
  margin-bottom: 48px;
`;

export const ContactForm = () => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const { t } = useTranslation();

  if (formSubmitted) {
    return (
      <>
        <StyledSectionHeader
          kicker={t('contact.action.sent.kicker')}
          headline={t('contact.action.sent.headline')}
        >
          {t('contact.action.sent.info')}
        </StyledSectionHeader>
        <Button to={'/'}>{t('contact.action.sent.button')}</Button>
      </>
    );
  } else {
    return (
      <>
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
        <Form
          onSuccess={() => {
            setFormSubmitted(true);
          }}
        />
      </>
    );
  }
};
