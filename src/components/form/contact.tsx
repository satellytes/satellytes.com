import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import styled from 'styled-components';
import { Text } from '../typography/typography';

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 19px 16px;

  font-size: 16px;
  line-height: 110%;

  border-radius: 4px;
  border: 0;
  background: #f5f6f7;

  &:not(:last-of-type) {
    margin-right: 24px;
  }
`;

const TextArea = styled.textarea`
  height: 190px;
  width: 100%;
  padding: 19px 16px;
  margin-top: 24px;
  margin-bottom: 40px;

  font-size: 16px;
  line-height: 110%;

  border-radius: 4px;
  border: 0;
  background: #f5f6f7;
`;

const SendButton = styled.button`
  cursor: pointer;
  padding: 13px 18px;

  font-size: 20px;
  line-height: 110%;

  color: #ffffff;
  background: #668cff;
  border-radius: 28px;
  border: 0;

  &:disabled {
    cursor: auto;
    opacity: 0.7;
  }
`;

const RequestStatusMessage = styled(Text)`
  display: inline-block;
  margin-left: 24px;
`;

type RequestStatus = 'pending' | 'success' | 'error';

export const ContactForm: React.FC = () => {
  const initialSate = { name: '', email: '', message: '' };
  const [state, setState] = useState(initialSate);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('pending');

  const hasValidInput = (): boolean => {
    return Boolean(
      state.name &&
        state.name.length > 0 &&
        state.email &&
        state.email.length > 0 &&
        state.message &&
        state.message.length > 0,
    );
  };

  const handleSubmit: FormEventHandler = (e) => {
    // taken from the Netlify Blog:
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
      body: encodeForNetlify({ 'form-name': 'contact', ...state }),
    })
      .then(() => {
        setRequestStatus('success');
        setState(initialSate);
      })
      .catch((error) => {
        console.error(error);
        setRequestStatus('error');
      });

    e.preventDefault();
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
    >
      <InputContainer>
        <Input
          placeholder="Your name"
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <Input
          placeholder="Your email"
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
      </InputContainer>
      <TextArea
        placeholder="Your message to us"
        name="message"
        value={state.message}
        onChange={handleChange}
      />
      <div>
        <SendButton
          disabled={!hasValidInput()}
          type="submit"
          title={
            hasValidInput()
              ? 'Click to send us your message'
              : 'Please fill in all information'
          }
        >
          Send &#8594;
        </SendButton>
        {requestStatus === 'success' && (
          <RequestStatusMessage>Thanks for your message!</RequestStatusMessage>
        )}
        {requestStatus === 'error' && (
          <RequestStatusMessage>
            Something went wrong, please try again later.
          </RequestStatusMessage>
        )}
      </div>
    </form>
  );
};
