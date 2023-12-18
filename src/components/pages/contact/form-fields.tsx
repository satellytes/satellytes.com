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
        placeholder={t('contact.name-placeholder')}
        control={control}
        rules={{ required: t('contact.error.name') }}
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
        placeholder={t('contact.email-placeholder')}
        control={control}
        rules={{
          required: t('contact.error.email'),
          pattern: {
            value: SIMPLE_EMAIL_PATTERN,
            message: t('contact.error.email-undefined'),
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
        placeholder={t('contact.message-placeholder')}
        control={control}
        rules={{ required: t('contact.error.message') }}
      />
    </MessageContainer>
  );
};
