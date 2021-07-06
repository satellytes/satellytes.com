import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckmarkIcon } from '../icons/buttons-icons/checkmark';
import { RightArrowIcon } from '../icons/buttons-icons/right-arrow';
import {
  ButtonText,
  ErrorMessageSend,
  SendButton,
  SentButton,
  Sup,
} from './controls';
import { Grid, GridItem } from '../grid/grid';
import { InputField } from '../career-form/career-components';
import { SIMPLE_EMAIL_PATTERN } from '../career-form/career-form';
import { Link } from '../links/links';
import { CaptionText } from '../typography/typography';

type RequestStatus = 'pending' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
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
          setRequestStatus('success');
        }
      })
      .catch((error) => {
        console.error(error);
        setRequestStatus('error');
      });
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid nested>
        {/*First Name*/}
        <GridItem xs={12} md={6}>
          <InputField
            required={true}
            inputRef={register('name', { required: 'Ihr Name fehlt' })}
            error={errors.name}
            name="name"
            label="Name"
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <InputField
            required={true}
            inputRef={register('email', {
              required: 'Ihre E-Mail fehlt',
              pattern: {
                value: SIMPLE_EMAIL_PATTERN,
                message: `Irgendwas stimmt an dieser E-Mail nicht`,
              },
            })}
            error={errors.email}
            name="email"
            label="E-Mail-Adresse"
          />
        </GridItem>
        <GridItem>
          <InputField
            required={true}
            inputRef={register('message', { required: 'Ihre Nachricht fehlt' })}
            error={errors.message}
            name="message"
            label="Ihre Nachricht an uns"
            type={'text-area'}
          />
        </GridItem>
        <GridItem>
          <CaptionText>
            <Sup>*</Sup> Pflichtfeld
          </CaptionText>
        </GridItem>
        <GridItem>
          {requestStatus === 'pending' && (
            <SendButton type="submit">
              <ButtonText>Senden</ButtonText> <RightArrowIcon />
            </SendButton>
          )}
          {(errors.name || errors.email || errors.message) && (
            <ErrorMessageSend>
              Bitte füllen Sie alle Felder aus
            </ErrorMessageSend>
          )}
          {requestStatus === 'success' && (
            <SentButton type="button">
              <ButtonText>Gesendet</ButtonText> <CheckmarkIcon />
            </SentButton>
          )}
          {requestStatus === 'error' && (
            <>
              <p>
                Leider gab es einen Fehler. Bitte versuche es noch einmal.
                Klappt das nicht, schicke deine Nachricht bitte direkt an{' '}
                <Link to="mailto:beep@satellytes.com">beep@satellytes.com</Link>
              </p>
              <SendButton type="submit">
                <ButtonText>Nochmal senden</ButtonText> <RightArrowIcon />
              </SendButton>
            </>
          )}
        </GridItem>
      </Grid>
    </form>
  );
};
