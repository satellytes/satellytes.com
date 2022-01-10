import React, { useState } from 'react';
import { TextInput } from '../../forms/text-field/text-input';
import { TextArea } from '../../forms/text-field/text-area';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/buttons/button';
import { SIMPLE_EMAIL_PATTERN } from '../../forms/constants';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { theme } from '../../layout/theme';
import { Link } from '../../legacy/links/links';
import { up } from '../../support/breakpoint';
import { HoneypotField } from './honeypot';

const API_ENDPOINT = '/api/contact-form';

const Grid = styled.div`
  margin-bottom: 24px;
  gap: 24px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const Caption = styled.p`
  ${TextStyles.textS}
  margin: 16px 0 48px;
`;

const ErrorMessage = styled.p`
  ${TextStyles.textXS}
  font-weight: 700;
  display: inline-block;

  color: ${theme.palette.text.errorMessage};
`;

const StyledButton = styled(Button)`
  margin-right: 16px;
`;

const GridItem = styled.div`
  grid-column-start: span 12;

  ${up('md')} {
    grid-column-start: span 6;
  }
`;

const FirstName = ({ control }) => {
  const { t } = useTranslation();
  return (
    <TextInput
      name={'name'}
      label={t('contact.name')}
      control={control}
      rules={{ required: t<string>('contact.error.name') }}
    />
  );
};

const Email = ({ control }) => {
  const { t } = useTranslation();
  return (
    <TextInput
      name={'email'}
      label={t('contact.email')}
      control={control}
      rules={{
        required: t<string>('contact.error.email'),
        pattern: {
          value: SIMPLE_EMAIL_PATTERN,
          message: t<string>('contact.error.email-undefined'),
        },
      }}
    />
  );
};

const MessageArea = ({ control }) => {
  const { t } = useTranslation();
  return (
    <TextArea
      name={'message'}
      label={t('contact.message')}
      control={control}
      rules={{ required: t<string>('contact.error.message') }}
    />
  );
};

interface FormData {
  name: string;
  email: string;
  message: string;

  //Honeypot fields
  firstName: '';
  phone: '';
}

export const ContactForm = ({ onSuccess }: { onSuccess: () => any }) => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      firstName: '',
      phone: '',
    },
    mode: 'onSubmit',
  });
  const { t } = useTranslation();
  const [apiError, setApiError] = useState<boolean>(false);

  const onSubmit = (formData: FormData) => {
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          setApiError(true);
        } else {
          onSuccess();
        }
      })
      .catch((error) => {
        console.error(error);
        setApiError(true);
      });
  };

  return (
    <form name="xontact" onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <GridItem>
          <FirstName control={control} />
        </GridItem>
        <HoneypotField name="firstName" label="First Name" control={control} />
        <HoneypotField name="phone" label="Phone" control={control} />
        <GridItem>
          <Email control={control} />
        </GridItem>
      </Grid>
      <MessageArea control={control} />
      <Caption>* {t('career.mandatory-field')}</Caption>
      <StyledButton type={'submit'}>{t('contact.action.send')}</StyledButton>

      {isSubmitted && !isValid && (
        <ErrorMessage>{t('contact.action.missing')}</ErrorMessage>
      )}
      {apiError && (
        <ErrorMessage>
          {t('contact.action.again-text')}{' '}
          <Link to="mailto:info@satellytes.com">info@satellytes.com</Link>
        </ErrorMessage>
      )}
    </form>
  );
};
