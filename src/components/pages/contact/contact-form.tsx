import React, { useState } from 'react';
import { TextInput } from '../../forms/text-field/text-input';
import { TextArea } from '../../forms/text-field/text-area';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/buttons/button';
import { SIMPLE_EMAIL_PATTERN } from '../../forms/constants';
import { Grid, GridItem } from '../../legacy/grid/grid';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { theme } from '../../layout/theme';
import { Link } from '../../legacy/links/links';
import { SIMPLE_EMAIL_PATTERN } from '../../legacy/form/constants';

const StyledGrid = styled(Grid)`
  margin-bottom: 24px;
`;

const Caption = styled.p`
  ${TextStyles.textS}
  margin: 16px 0 48px;
`;

import { HoneypotField } from './honeypot';

type RequestStatus = 'pending' | 'submitting' | 'success' | 'error';
const API_ENDPOINT = '/api/contact-form';

const ErrorMessage = styled.p`
  ${TextStyles.textXS}
  font-weight: 700;
  display: inline-block;
  
  color: ${theme.palette.text.errorMessage};
`;

const StyledButton = styled(Button)`
  margin-right: 16px;
`;

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
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
      phone: ''
    },
    mode: 'onSubmit',
  });
  const { t } = useTranslation();
  const [requestStatus, setRequestStatus] = useState<
    'pending' | 'success' | 'error'
  >('pending');

  const onSubmit = (formData: FormData) => {
    setRequestStatus('submitting');

    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          setRequestStatus('error');
        } else {
          setRequestStatus('success');
        }
      })
      .catch((error) => {
        console.error(error);
        setRequestStatus('error');
      });
  };

  return (
    <>
      <form name="contact" onSubmit={handleSubmit(onSubmit)}>
        <StyledGrid nested>
          <GridItem xs={12} md={6}>
            <TextInput
              name={'name'}
              label={t('contact.name')}
              control={control}
              rules={{ required: t<string>('contact.error.name') }}
            />
          </GridItem>
          <HoneypotField name='firstName' label="First Name" control={control} />
          <HoneypotField name='phone' label="Phone" control={control} />
          <GridItem xs={12} md={6}>
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
          </GridItem>
        </StyledGrid>
        <TextArea
          name={'message'}
          label={t('contact.message')}
          control={control}
          rules={{ required: t<string>('contact.error.message') }}
        />
        <Caption>* {t('career.mandatory-field')}</Caption>
        <StyledButton type={'submit'}>{t('contact.action.send')}</StyledButton>
        {isSubmitted && !isValid && (
          <ErrorMessage>{t('contact.action.missing')}</ErrorMessage>
        )}
        {requestStatus === 'error' && (
          <ErrorMessage>
            {t('contact.action.again-text')}{' '}
            <Link to="mailto:beep@satellytes.com">beep@satellytes.com</Link>
          </ErrorMessage>
        )}
      </form>
    </>
  );
};
