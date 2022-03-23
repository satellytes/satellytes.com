import React from 'react';
import { Control } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionHeader } from '../../../content/section-header/section-header';
import { Checkbox } from '../../../forms/checkbox/checkbox';
import { StyledErrorMessage } from '../../../forms/text-input/text-input';
import { ContentBlockContainer } from '../../../layout/content-block-container';
import { Button } from '../../../ui/buttons/button';
import { StyledLink } from '../../contact/contact-form';

const PRIVACY_POLICY = 'https://satellytes.jobs.personio.de/privacy-policy';

const StyledButton = styled(Button)`
  margin-top: 48px;
`;

export const CareerDetailsCheckboxLabel = () => {
  return (
    <Trans i18nKey={'career.privacy-policy'}>
      <span>
        Hiermit bestätige ich, dass ich die
        <StyledLink to={PRIVACY_POLICY}>Datenschutzerklärung</StyledLink>
        zur Kenntnis genommen habe
      </span>
    </Trans>
  );
};

export const CareerDetailsSuccess = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <SectionHeader
        kicker={t<string>('career.thank')}
        headline={t<string>('career.email-confirmation')}
      >
        {t<string>('career.success-text')}
      </SectionHeader>
      <StyledButton to="/">{t<string>('career.action.home')}</StyledButton>
    </ContentBlockContainer>
  );
};

export const CareerDetailsError = () => {
  return (
    <StyledErrorMessage>
      <Trans id="career.action.again-text">
        <span>
          Versuch es bitte noch einmal. Klappt es nicht dann schicke deine
          Bewerbung direkt an{' '}
          <StyledLink to="mailto:career@satellytes.com">
            career@satellytes.com
          </StyledLink>
        </span>
      </Trans>
    </StyledErrorMessage>
  );
};
