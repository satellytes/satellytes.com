import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ButtonText,
  ErrorMessageSend,
  InputField,
  SendButton,
  SentButton,
  Sup,
} from '../../legacy/form/controls';
import { Grid, GridItem } from '../../legacy/grid/grid';
import { Link } from '../../legacy/links/links';
import { CaptionText } from '../../legacy/typography';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { SIMPLE_EMAIL_PATTERN } from '../../legacy/form/constants';
import { CheckmarkIcon } from '../../legacy/icons/form-icons/checkmark';
import { RightArrowIcon } from '../../legacy/icons/form-icons/right-arrow';
import { HoneypotField } from './honeypot';

type RequestStatus = 'pending' | 'submitting' | 'success' | 'error';
const API_ENDPOINT = '/api/contact-form';

const StyledCaptionText = styled(CaptionText)`
  color: inherit;
`;
interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('pending');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <form name="contact" onSubmit={handleSubmit(onSubmit)}>
      <Grid nested>
        {/*First Name*/}
        <GridItem xs={12} md={6}>
          <InputField
            required={true}
            inputRef={register('name', {
              required: t<string>('contact.error.name'),
            })}
            error={errors.name}
            name="name"
            label={t('contact.name')}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <InputField
            required={true}
            inputRef={register('email', {
              required: t<string>('contact.error.email'),
              pattern: {
                value: SIMPLE_EMAIL_PATTERN,
                message: t<string>('contact.error.email-unknown'),
              },
            })}
            error={errors.email}
            name="email"
            label={t<string>('contact.email')}
          />
        </GridItem>
        <GridItem>
          <InputField
            required={true}
            inputRef={register('message', {
              required: t<string>('contact.error.message'),
            })}
            error={errors.message}
            name="message"
            label={t('contact.message')}
            type={'text-area'}
          />
        </GridItem>

        <HoneypotField label="First Name" control={register('firstName')} />
        <HoneypotField label="Phone" control={register('phone')} />

        <GridItem>
          <StyledCaptionText>
            <Sup>*</Sup> {t('contact.mandatory-field')}
          </StyledCaptionText>
        </GridItem>

        <GridItem>
          {requestStatus === 'pending' && (
            <SendButton type="submit">
              <ButtonText>{t('contact.action.send')}</ButtonText>{' '}
              <RightArrowIcon />
            </SendButton>
          )}
          {(errors.name || errors.email || errors.message) && (
            <ErrorMessageSend>{t('contact.action.missing')}</ErrorMessageSend>
          )}
          {requestStatus === 'success' && (
            <SentButton type="button">
              <ButtonText>{t('contact.action.sent')}</ButtonText>{' '}
              <CheckmarkIcon />
            </SentButton>
          )}
          {requestStatus === 'error' && (
            <>
              <Trans i18nKey="contact.action.again-text">
                Leider gab es einen Fehler. Bitte versuche es noch einmal.
                Klappt das nicht, schicke deine Nachricht bitte direkt an
                <Link to="mailto:beep@satellytes.com">beep@satellytes.com</Link>
              </Trans>
              <SendButton type="submit">
                <ButtonText>{t('contact.action.again')}</ButtonText>{' '}
                <RightArrowIcon />
              </SendButton>
            </>
          )}
        </GridItem>
      </Grid>
    </form>
  );
};
