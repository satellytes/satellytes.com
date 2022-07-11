import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TextInput } from '../../forms/text-input/text-input';
import { SIMPLE_EMAIL_PATTERN } from '../../forms/constants';
import { TextArea } from '../../forms/text-area/text-area';
import React from 'react';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';

const TextInputContainer = styled.div`
  grid-column-start: span 2;

  ${up('md')} {
    grid-column-start: span 1;
  }
`;

export const FirstName = ({ control }) => {
  const { t } = useTranslation();
  return (
    <TextInputContainer>
      <TextInput
        name={'first_name'}
        label={t('contact.name')}
        control={control}
        rules={{ required: t<string>('contact.error.name') }}
      />
    </TextInputContainer>
  );
};

export const Email = ({ control }) => {
  const { t } = useTranslation();
  return (
    <TextInputContainer>
      <TextInput
        name={'email'}
        label={t('contact.email')}
        control={control}
        rules={{
          required: t<string>('contact.error.email'),
          pattern: {
            value: SIMPLE_EMAIL_PATTERN,
            message: t<string>('contact.error.email-undefined'),
          },
        }}
      />
    </TextInputContainer>
  );
};

const MessageContainer = styled.div`
  grid-column: -1/1;
`;

export const MessageArea = ({ control }) => {
  const { t } = useTranslation();
  return (
    <MessageContainer>
      <TextArea
        name={'message'}
        label={t('contact.message')}
        control={control}
        rules={{ required: t<string>('contact.error.message') }}
      />
    </MessageContainer>
  );
};
