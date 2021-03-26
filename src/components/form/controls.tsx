import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { Text } from '../typography/typography';

interface ValidationProps {
  hasError?: boolean;
}

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${up('md')} {
    flex-direction: row;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;

  &:not(:last-of-type) {
    margin-right: 24px;

    ${up('md')} {
      margin-right: 24px;
    }
  }
`;

export const Input = styled.input<ValidationProps>`
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

export const TextArea = styled.textarea<ValidationProps>`
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

export const Button = styled.button`
  margin-top: 40px;
  cursor: pointer;
  padding: 13px 18px;

  font-size: 20px;
  font-weight: bold;
  text-align: left;
  line-height: 110%;

  border-radius: 28px;
  border: 0;
  width: 147px;
`;

export const ButtonText = styled.span`
  margin-right: 40px;
`;

export const SendButton = styled(Button)`
  color: #ffffff;
  background: #668cff;

  ${({ disabled }) =>
    disabled &&
    `
    background: #aaaaaa;
    cursor: wait
`}
`;

export const SentButton = styled(Button)`
  cursor: default;
  color: #202840;
  background: #75f0c7;
`;

export const RequestStatusMessage = styled(Text)`
  display: inline-block;
  margin-left: 24px;
  color: #668cff;
  font-size: 14px;
`;

export const ErrorMessage = styled.p`
  color: #dc052d;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 0;
`;

export const ErrorMessageSend = styled(ErrorMessage)`
  display: inline-block;
  margin-left: 24px;
`;
