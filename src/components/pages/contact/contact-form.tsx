import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../../legacy/form/controls';
import { Grid, GridItem } from '../../legacy/grid/grid';
import { Link } from '../../legacy/links/links';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { SIMPLE_EMAIL_PATTERN } from '../../legacy/form/constants';
import { TextStyles } from '../../typography';
import { Button } from '../../ui/buttons/button';
import { SectionHeader } from '../../content/section-header/section-header';

type RequestStatus = 'pending' | 'success' | 'error';

const CaptionText = styled.p`
  ${TextStyles.textXS}
  margin: 16px 0 48px;
`;

const ErrorMessageSend = styled.p`
  ${TextStyles.textXS}
  font-weight: 700;
  display: inline-block;
  margin: 0 16px;

  /*todo add color path*/
  color: #ff0d35;
`;

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormDataProps {
  onSuccess: () => void;
}

export const ContactForm = ({ onSuccess }: FormDataProps) => {
  const { t } = useTranslation();
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('pending');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData: FormData) => {
    // partialy taken from the Netlify Blog:
    // - https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/
    const encodeForNetlify = (data: any): string => {
      return Object.keys(data)
        .map(
          (key) =>
            encodeURIComponent(key) + '=' + encodeURIComponent(data[key]),
        )
        .join('&');
    };

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeForNetlify({ 'form-name': 'contact', ...formData }),
    })
      .then((response) => {
        if (!response.ok) {
          setRequestStatus('error');
        } else {
          onSuccess();
          setRequestStatus('success');
        }
      })
      .catch((error) => {
        console.error(error);
        setRequestStatus('error');
      });
  };

  if (requestStatus === 'success') {
    return (
      <SectionHeader headline={t('contact.action.sent.headline')}>
        {t('contact.action.sent.text')}
      </SectionHeader>
    );
  } else {
    return (
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid nested>
          {/*Name*/}
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

          {/*Email*/}
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
        </Grid>

        {/*Message*/}
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

        <CaptionText>
          <span>*</span> {t('contact.mandatory-field')}
        </CaptionText>

        {requestStatus === 'pending' && (
          <Button type="submit">{t('contact.action.send')}</Button>
        )}
        {(errors.name || errors.email || errors.message) && (
          <ErrorMessageSend>{t('contact.action.missing')}</ErrorMessageSend>
        )}
        {requestStatus === 'error' && (
          <>
            <Trans i18nKey="contact.action.again-text">
              Leider gab es einen Fehler. Bitte versuche es noch einmal. Klappt
              das nicht, schicke deine Nachricht bitte direkt an
              <Link to="mailto:beep@satellytes.com">beep@satellytes.com</Link>
            </Trans>
            <Button type="submit">{t('contact.action.again')}</Button>
          </>
        )}
      </form>
    );
  }
};
