import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { CheckmarkIcon } from '../icons/buttons-icons/checkmark';
import { RightArrowIcon } from '../icons/buttons-icons/right-arrow';
import { Text } from '../typography/typography';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${up('md')} {
    flex-direction: row;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;

  &:not(:last-of-type) {
    margin-right: 24px;

    ${up('md')} {
      margin-right: 24px;
    }
  }
`;

interface InputTextProps {
  hasError?: any;
}

const Input = styled.input<InputTextProps>`
  width: 100%;
  padding: 19px 16px;

  font-size: 16px;
  line-height: 110%;

  border-radius: 4px;
  border: 0;
  background: #f5f6f7;

  &:not(:last-of-type) {
    margin-right: 0;

    ${up('md')} {
      margin-right: 24px;
      margin-bottom: 0;
    }
  }

  ${({ hasError }) =>
    hasError &&
    `
    background: #f8cdd5;
    color: #dc052d;
    ::placeholder {
      color: #dc052d;
      opacity: 1;
    }
  `}
`;

const TextArea = styled.textarea<InputTextProps>`
  height: 190px;
  width: 100%;
  padding: 19px 16px;

  font-size: 16px;
  line-height: 110%;

  border-radius: 4px;
  border: 0;
  background: #f5f6f7;

  resize: vertical;

  ${({ hasError }) =>
    hasError &&
    `
  background: #f8cdd5;
  ::placeholder {
    color: #dc052d;
    opacity: 1;
  }
`}
`;

const Button = styled.button`
  margin-top: 40px;
  cursor: pointer;
  padding: 13px 18px;

  font-size: 20px;
  font-family: CocoGothic !important;
  font-weight: bold;
  text-align: left;
  line-height: 110%;

  border-radius: 28px;
  border: 0;
  width: 147px;
`;

const ButtonText = styled.span`
  margin-right: 40px;
`;

const SendButton = styled(Button)`
  color: #ffffff;
  background: #668cff;
`;

const SentButton = styled(Button)`
  color: #202840;
  background: #75f0c7;
`;

const RequestStatusMessage = styled(Text)`
  display: inline-block;
  margin-left: 24px;
  color: #668cff;
  font-size: 14px;
`;

const ErrorMessage = styled.p`
  color: #dc052d;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 0;
`;

const ErrorMessageSend = styled(ErrorMessage)`
  display: inline-block;
  margin-left: 24px;
`;

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
            placeholder="Your name"
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
            placeholder="Your email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            ref={register({
              required: true,
              pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
        placeholder="Your message to us"
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
