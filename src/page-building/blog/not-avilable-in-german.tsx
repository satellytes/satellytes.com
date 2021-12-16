import { useI18next } from 'gatsby-plugin-react-i18next';
import { ButtonText, SendButton } from '../../components/form/controls';
import { RightArrowIcon } from '../../components/icons/form-icons/right-arrow';
import React from 'react';

/**
 * This is deliberately without i18n as it's a Germany-only
 * component.
 */
export const NotAvailableInGerman = () => {
  const { changeLanguage } = useI18next();
  const switchToEnglish = async (event) => {
    event.preventDefault();
    await changeLanguage('en');
  };

  return (
    <div>
      <p>Der Blog ist nur auf Englisch verfügbar.</p>
      <SendButton onClick={switchToEnglish}>
        <ButtonText>Zum Blog</ButtonText> <RightArrowIcon />
      </SendButton>
    </div>
  );
};
