import React, { useState } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/buttons/button';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { theme } from '../../layout/theme';
import { Link } from '../../legacy/links/links';
import { HoneypotField } from './honeypot';
import { Email, FirstName, MessageArea } from './form-fields';
import { up } from '../../support/breakpoint';

const API_ENDPOINT = '/api/contact-form';
type RequestStatus = 'pending' | 'submitting' | 'success' | 'error';

export const FormLayout = styled.div`
  margin-bottom: 24px;
  gap: 24px;
  display: grid;
  grid-template-columns: repeat(1, 2fr);

  ${up('sm')} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MandatoryNotes = styled.p`
  ${TextStyles.textS}
  margin: 16px 0 48px;
`;

const ErrorMessage = styled.p`
  ${TextStyles.textXS}
  font-weight: 700;
  display: inline-block;

  color: ${theme.palette.text.errorMessage};
`;

const Submit = styled(Button)`
  margin-right: 16px;
`;

export interface FormData {
  first_name: string;
  email: string;
  message: string;

  //Honeypot fields
  firstName: string;
  phone: string;
}

export const Form = ({ onSuccess }: { onSuccess: () => any }) => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<FormData>({
    mode: 'onTouched',
  });
  const { t } = useTranslation();
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('pending');

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
          onSuccess();
        }
      })
      .catch((error) => {
        console.error(error);
        setRequestStatus('error');
      });
  };

  return (
    <form name="contact" onSubmit={handleSubmit(onSubmit)}>
      <FormLayout>
        <FirstName control={control} />
        <Email control={control} />
        <MessageArea control={control} />
      </FormLayout>

      <HoneypotField name="firstName" label="First Name" control={control} />
      <HoneypotField name="phone" label="Phone" control={control} />

      <MandatoryNotes>* {t('contact.mandatory-field')}</MandatoryNotes>
      <Submit disabled={requestStatus === 'submitting'} type={'submit'}>
        {t('contact.action.send')}
      </Submit>

      {isSubmitted && !isValid && (
        <ErrorMessage>{t('contact.action.missing')}</ErrorMessage>
      )}
      {requestStatus === 'error' && (
        <ErrorMessage>
          {t('contact.action.again-text')}{' '}
          <Link to="mailto:info@satellytes.com">info@satellytes.com</Link>
        </ErrorMessage>
      )}
    </form>
  );
};
