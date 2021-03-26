import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckmarkIcon } from '../icons/buttons-icons/checkmark';
import { RightArrowIcon } from '../icons/buttons-icons/right-arrow';
import {
  ButtonText,
  ErrorMessage,
  ErrorMessageSend,
  Input,
  InputContainer,
  InputWrapper,
  RequestStatusMessage,
  SendButton,
  SentButton,
  TextArea,
} from './controls';

//https://www.codegrepper.com/code-examples/basic/form+validation+in+gatsby
const IS_EMAIL_REGEX = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type RequestStatus = 'pending' | 'success' | 'error';

export const ContactForm: React.FC = () => {
  const initialFormData = { name: '', email: '', message: '' };
  const [formData, setFormData] = useState(initialFormData);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('pending');

  const { register, errors, handleSubmit } = useForm();

  const onSubmit: FormEventHandler = () => {
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
      .then(() => {
        setRequestStatus('success');
        setFormData(initialFormData);
      })
      .catch((error) => {
        console.error(error);
        setRequestStatus('error');
      });
  };

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setRequestStatus('pending');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputContainer>
        <InputWrapper>
          <Input
            placeholder="Ihr Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            ref={register({ required: true })}
            hasError={errors.name}
          />

          {errors.name && (
            <ErrorMessage>
              <strong>Name: </strong>
              <span>Bitte geben Sie einen Namen ein</span>
            </ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder="Ihre E-Mail-Adresse"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            ref={register({
              required: true,
              pattern: IS_EMAIL_REGEX,
            })}
            hasError={errors.email}
          />

          {errors.email && (
            <ErrorMessage>
              <strong>E-Mail-Adresse: </strong>
              <span>Bei dieser Adresse scheint etwas nicht zu stimmen</span>
            </ErrorMessage>
          )}
        </InputWrapper>
      </InputContainer>
      <TextArea
        placeholder="Ihre Nachricht an uns"
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        ref={register({ required: true })}
        hasError={errors.message}
      />

      {errors.message && (
        <ErrorMessage>Diese Nachricht ist ein bisschen zu kurz</ErrorMessage>
      )}
      <div>
        {requestStatus === 'pending' && (
          <SendButton type="submit">
            <ButtonText>Send</ButtonText> <RightArrowIcon />
          </SendButton>
        )}
        {(errors.name || errors.email || errors.message) && (
          <ErrorMessageSend>Bitte füllen Sie alle Felder aus</ErrorMessageSend>
        )}
        {requestStatus === 'success' && (
          <SentButton type="button">
            <ButtonText>Sent</ButtonText> <CheckmarkIcon />
          </SentButton>
        )}
        {requestStatus === 'error' && (
          <RequestStatusMessage>
            Sorry, but something went wrong. Please try again later.
          </RequestStatusMessage>
        )}
      </div>
    </form>
  );
};
