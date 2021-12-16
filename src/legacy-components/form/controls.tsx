import styled, { css } from 'styled-components';
import { up } from '../../components/support/breakpoint';
import { Text } from '../typography';
import React from 'react';
import { FormError } from '../../page-building/career-details/career-form/career-components';

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
  margin-bottom: 8px;
`;

export const Sup = styled.sup`
  font-size: 1em;
  top: -0.3em;
`;

export const Input = styled.input<ValidationProps>`
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
  position: absolute;
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

export interface InputFieldProps {
  label?: string;
  name: string;
  error: any;
  inputRef: any;
  required?: boolean;
  type?: 'text' | 'text-area';
}

export const InputField = (props: InputFieldProps) => {
  return (
    <InputContainer>
      <InputWrapper>
        {props.label && (
          <Label htmlFor={props.name}>
            {props.label} {props.required && <Sup aria-hidden={true}>*</Sup>}
          </Label>
        )}
        {props.type && props.type === 'text-area' ? (
          <TextArea
            {...props.inputRef}
            hasError={props.error}
            id={props.name}
            aria-required={props.required}
          />
        ) : (
          <Input
            type={'text'}
            id={props.name}
            {...props.inputRef}
            hasError={props.error}
            aria-required={props.required}
          />
        )}
        <FormError error={props.error} />
      </InputWrapper>
    </InputContainer>
  );
};
