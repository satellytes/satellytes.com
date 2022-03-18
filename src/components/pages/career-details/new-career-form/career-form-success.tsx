import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SectionHeader } from '../../../content/section-header/section-header';
import { ContentBlockContainer } from '../../../layout/content-block-container';
import { Button } from '../../../ui/buttons/button';

const StyledButton = styled(Button)`
  margin-top: 48px;
`;

export const Success = () => {
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
