import styled, { css } from 'styled-components';
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

export const Label = styled.label<{ required?: boolean }>`
  position: relative;
  display: block;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 110%;
  color: #668cff;
  margin-bottom: 8px;
`;

export const Sup = styled.sup`
  font-size: 1em;
  top: -0.3em;
`;

export const Input = styled.input<ValidationProps>`
  color: #fff;
  width: 100%;
  padding: 19px 16px;

  font-size: 16px;
  line-height: 110%;

  border-radius: 4px;
  border: 0;
  background: rgba(122, 143, 204, 0.2);

  &:hover {
    background: rgba(122, 143, 204, 0.5);
  }

  &:not(:last-of-type) {
    margin-right: 0;

    ${up('md')} {
      margin-right: 24px;
      margin-bottom: 0;
    }
  }

  ${({ hasError }) =>
    hasError &&
    css`
      background: #f8cdd5;
      color: #dc052d;
    `}
`;

export const TextArea = styled.textarea<ValidationProps>`
  height: 190px;
  width: 100%;
  padding: 19px 16px;
  color: #fff;

  font-size: 16px;
  line-height: 110%;

  border-radius: 4px;
  border: 0;
  background: rgba(122, 143, 204, 0.2);

  resize: vertical;

  &:hover {
    background: rgba(122, 143, 204, 0.5);
  }

  ${({ hasError }) =>
    hasError &&
    css`
      background: #f8cdd5;
      color: #dc052d;
    `}
`;

export const Button = styled.button`
  margin-top: 16px;
  cursor: pointer;
  padding: 11px 16px;
  color: #ffffff;

  font-size: 16px;
  font-weight: bold;
  text-align: left;
  line-height: 110%;

  border-radius: 30px;
  border: 0;

  svg {
    transition: transform 0.2s ease-in;
  }
  :hover {
    svg {
      transform: translateX(2px);
    }
  }
`;

export const ButtonText = styled.span`
  margin-right: 20px;
`;

export const SendButton = styled(Button)`
  background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);

  &:hover {
    background: linear-gradient(275.41deg, #432bd7 0%, #0038fd 100%);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background: #aaaaaa;
      cursor: wait;
    `}
`;

export const Checkbox = styled.input`
  opacity: 0;
  width: 1px;
  height: 1px;
  &:focus {
    + label::before {
      border: 2px solid #4d79ff;
    }
  }
`;

export const SentButton = styled(Button)`
  cursor: default;
  background: linear-gradient(275.41deg, #29cccc 0%, #29cc96 100%);
`;

export const RequestStatusMessage = styled(Text)`
  display: inline-block;
  margin-left: 24px;
  color: #668cff;
  font-size: 12px;
`;

export const ErrorMessage = styled.p<{
  marginBottom?: number;
  lineHeight?: number;
}>`
  color: #f19bab;
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
  line-height: ${({ lineHeight }) => lineHeight && `${lineHeight}%`};
`;

export const ErrorMessageSend = styled(ErrorMessage)`
  display: inline-block;
  margin-left: 24px;
`;
