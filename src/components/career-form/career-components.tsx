import React from 'react';
import {
  ButtonText,
  ErrorMessage,
  Input,
  InputContainer,
  InputWrapper,
  Label,
  SendButton,
  SentButton,
  Sup,
  TextArea,
} from '../form/controls';
import { CheckmarkIcon } from '../icons/buttons-icons/checkmark';
import styled from 'styled-components';
import { rgba } from 'polished';
import { RightArrowIcon } from '../icons/buttons-icons/right-arrow';
import { FieldErrors } from 'react-hook-form';
import { Headline } from './career-form';

interface InputFieldProps {
  label?: string;
  name: string;
  error: any;
  inputRef: any;
  required?: boolean;
  type?: 'text' | 'text-area';
}

export const CareerFormStyled = styled.form`
  margin-top: 32px;
`;

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
interface FormErrorProps {
  marginBottom?: number;
  lineHeight?: number;
  error;
}
export const FormError = ({
  error,
  marginBottom,
  lineHeight,
}: FormErrorProps) => {
  if (!error) {
    return null;
  }

  return (
    <ErrorMessage marginBottom={marginBottom} lineHeight={lineHeight}>
      <span>{error.message}</span>
    </ErrorMessage>
  );
};

export const SuccessMessage = () => {
  return (
    <div>
      <Headline>Danke für deine Bewerbung! </Headline>
      <p>
        Wir haben dir eine E-Mail zur Bestätigung geschickt und melden uns bei
        dir.
      </p>
      <SentButton type="button">
        <ButtonText>Gesendet</ButtonText> <CheckmarkIcon />
      </SentButton>
    </div>
  );
};

const Track = styled.div`
  height: 4px;
  background: ${rgba('#202840', 0.1)};
  border-radius: 2px;
  margin-top: 24px;
`;

const Progress = styled.div<{ progress: number }>`
  ${({ progress }) =>
    `
        width: ${Math.ceil(progress * 100)}%;
    `}
  height: 100%;
  background: #668cff;
  border-radius: 2px;
`;

interface ProgressBarProps {
  progress: number;
  isSubmitting: boolean;
}

export const ProgressBar = ({ progress, isSubmitting }: ProgressBarProps) => {
  if (!isSubmitting) {
    return null;
  }

  return (
    <Track>
      <Progress progress={progress} />
    </Track>
  );
};

export const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`;

interface ActionsProps {
  tryAgainFn: () => void;
  error: Error;
  isSubmitting: boolean;
  fieldErrors: FieldErrors;
}

export const Actions = ({
  tryAgainFn,
  error,
  isSubmitting,
  fieldErrors,
}: ActionsProps) => {
  if (error) {
    return (
      <>
        <FormError error={error} />
        <p>
          Versuch es bitte noch einmal. Klappt es nicht dann schicke deine
          Bewerbung direkt an <strong>career@satellytes.com</strong>
        </p>
        <SendButton onClick={() => tryAgainFn()}>
          <ButtonText>Nochmal senden</ButtonText>
        </SendButton>
      </>
    );
  }

  return (
    <ButtonWrapper>
      <SendButton type="submit" disabled={isSubmitting}>
        <ButtonText>Senden</ButtonText>
        {!isSubmitting && <RightArrowIcon />}
        {isSubmitting && <span>...</span>}
      </SendButton>
      {Object.keys(fieldErrors).length > 0 && (
        <ErrorWrapper>
          <FormError
            error={{ message: 'Bitte fülle alle benötigten Felder aus' }}
          />
        </ErrorWrapper>
      )}
    </ButtonWrapper>
  );
};

export const FileContainer = styled.div`
  margin: 35px 0px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: left;
`;

const ErrorWrapper = styled.div`
  margin-left: 16px;
  margin-top: 22px;
`;
