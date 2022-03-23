import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Button } from '../../ui/buttons/button';

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
      <Button onClick={switchToEnglish}>Zum Blog</Button>
    </div>
  );
};
