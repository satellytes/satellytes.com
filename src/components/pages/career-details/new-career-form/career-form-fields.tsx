import React from 'react';
import { ErrorCode, FileError } from 'react-dropzone';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { SectionHeader } from '../../../content/section-header/section-header';
import { Checkbox } from '../../../forms/checkbox/checkbox';
import { FileDropper } from '../../../forms/file-dropper/file-dropper';
import { StyledErrorMessage } from '../../../forms/text-input/text-input';
import { ContentBlockContainer } from '../../../layout/content-block-container';
import { TextStyles } from '../../../typography';
import { Button } from '../../../ui/buttons/button';
import { StyledLink } from '../../contact/contact-form';
import { up } from '../../../support/breakpoint';

const MAX_SIZE = 20 * 1024 * 1024;

const StyledButton = styled(Button)`
  margin-top: 48px;
`;

const TextWrapper = styled.div`
  margin: 24px 0;

  ${TextStyles.textSR}

  ${up('sm')} {
    ${TextStyles.textR}
  }
`;

export const CareerDetailsSubmitButton = ({ isSubmitting, errors }) => {
  const { t } = useTranslation();
  return (
    <Button type="submit" disabled={isSubmitting}>
      {!errors?.api ? t('career.action.send') : t('career.action.again')}
    </Button>
  );
};

export const MandatoryFieldText = () => {
  return (
    <TextWrapper>
      <Trans i18nKey={'career.mandatory-field'} />
    </TextWrapper>
  );
};

export const CareerDetailsFileText = () => {
  return (
    <TextWrapper>
      <Trans i18nKey={'career.info-text'} />
    </TextWrapper>
  );
};

export const CareerDetailsCheckbox = ({ control, errors }) => {
  const { t } = useTranslation();

  return (
    <Checkbox
      name="privacy"
      label={
        <Trans i18nKey={'career.privacy-policy'}>
          <span>
            Hiermit bestätige ich, dass ich die
            <StyledLink to="/data-privacy">Datenschutzerklärung</StyledLink>
            zur Kenntnis genommen habe
          </span>
        </Trans>
      }
      control={control}
      rules={{ required: t('career.error.approval') }}
      errors={errors}
    />
  );
};

export const CareerDetailsFileUpload = ({
  register,
  setValue,
  setError,
  clearErrors,
  errors,
}) => {
  const { t } = useTranslation();

  const fileCategories = [
    {
      value: 'cv',
      label: t('career.cv'),
    },
    {
      value: 'cover-letter',
      label: t('career.cover-letter'),
    },
    {
      value: 'other',
      label: t('career.other'),
    },
  ];

  const fileValidator = (file: File): FileError | null => {
    if (file.size > MAX_SIZE)
      return {
        message: t('career.error.max-size'),
        code: ErrorCode.FileTooLarge,
      };

    return null;
  };

  return (
    <FileDropper
      register={register}
      setValue={setValue}
      setError={setError}
      clearErrors={clearErrors}
      errors={errors}
      name="documents"
      fileCategories={fileCategories}
      acceptedFileTypes={{
        'application/pdf': ['.pdf'],
      }}
      illustration="monitor_024"
      maxFiles={3}
      validator={fileValidator}
    />
  );
};

export const CareerDetailsSuccess = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <SectionHeader
        kicker={t('career.thank')}
        headline={t('career.email-confirmation')}
      >
        {t('career.success-text')}
      </SectionHeader>
      <StyledButton to="/">{t('career.action.home')}</StyledButton>
    </ContentBlockContainer>
  );
};

export const CareerDetailsError = () => {
  return (
    <StyledErrorMessage>
      <Trans id="career.action.again-text">
        <span>
          Versuch es bitte noch einmal. Klappt es nicht dann schicke deine
          Bewerbung direkt an{' '}
          <StyledLink to="mailto:career@satellytes.com">
            career@satellytes.com
          </StyledLink>
        </span>
      </Trans>
    </StyledErrorMessage>
  );
};
