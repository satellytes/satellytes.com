import React from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { SIMPLE_EMAIL_PATTERN } from '../../../forms/constants';
import { FileDropperType } from '../../../forms/file-dropper/file-dropper';
import { TextArea } from '../../../forms/text-area/text-area';
import { TextInput } from '../../../forms/text-input/text-input';
import { FormLayout } from '../../contact/form';
import {
  CareerDetailsCheckbox,
  CareerDetailsError,
  CareerDetailsFileText,
  CareerDetailsFileUpload,
  CareerDetailsSubmitButton,
  CareerDetailsSuccess,
} from './career-form-fields';
import { submitApplication } from './submit-application';
import styled from 'styled-components';
import { TextStyles } from '../../../typography';
import { up } from '../../../support/breakpoint';

interface CareerFormProps {
  scrollToStart: () => void;
  jobName: string;
}

export type FormDataProps = {
  first_name: string;
  last_name: string;
  email: string;
  documents: FileDropperType[];
  message: string;
  phone?: string;
  location: string;
  available_from: string;
  salary_expectations: string;

  privacy: boolean;
};

const SectionHeadline = styled.h2`
  ${TextStyles.headlineM}

  margin-top: 40px;
  margin-bottom: 16px;

  ${up('md')} {
    margin-top: 80px;
  }
`;

export type FormErrors = { api?: never };

export const Form = (props: CareerFormProps) => {
  const {
    setValue,
    setError,
    clearErrors,
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormDataProps & FormErrors>({
    mode: 'onSubmit',
  });

  const { t } = useTranslation();
  const submitErrorMessages = {
    cv: t('career.error.cv'),
    category: t('career.error.category'),
  };

  const selectedFiles = watch('documents');

  const onErrorHandler = () => {
    // since documents is not controlled, it has to be validated manually
    if (selectedFiles?.length === 0 || !selectedFiles) {
      setError(
        'documents',
        { type: 'manual', message: t('career.error.cv') },
        { shouldFocus: true },
      );
    }

    for (let i = 0; i < selectedFiles?.length; i++) {
      if (!selectedFiles[i].fileCategory)
        setError('documents', {
          type: 'manual',
          message: t('career.error.category'),
        });
    }
  };

  if (isSubmitSuccessful && !errors?.api) return <CareerDetailsSuccess />;

  return (
    <>
      <SectionHeadline>
        <Trans i18nKey={'career.headline'} />
      </SectionHeadline>
      <form
        name="career"
        onSubmit={handleSubmit(
          (formValues) =>
            submitApplication(
              props,
              formValues,
              setError,
              errors,
              clearErrors,
              submitErrorMessages,
            ),
          onErrorHandler,
        )}
      >
        <FormLayout>
          <TextInput
            name="first_name"
            label={t('career.first-name')}
            control={control}
            rules={{ required: t('career.error.first-name') }}
            errors={errors}
          />
          <TextInput
            name="last_name"
            label={t('career.last-name')}
            control={control}
            rules={{ required: t('career.error.last-name') }}
            errors={errors}
          />

          <TextInput
            name="email"
            label={t('career.email')}
            control={control}
            rules={{
              required: t('career.error.email'),
              pattern: {
                value: SIMPLE_EMAIL_PATTERN,
                message: t('career.error.email-undefined'),
              },
            }}
            errors={errors}
          />
          <TextInput
            name="location"
            label={t('career.location')}
            control={control}
            errors={errors}
          />
          <TextInput
            name="available_from"
            label={t('career.available-from')}
            control={control}
            errors={errors}
          />
          <TextInput
            name="salary_expectations"
            label={t('career.salary-expectations')}
            control={control}
            errors={errors}
          />
        </FormLayout>
        <TextArea
          name="message"
          label={t('career.cover-letter')}
          control={control}
          rules={{
            required: t('career.error.cover-letter'),
            minLength: {
              value: 100,
              message: t('career.error.cover-letter-length'),
            },
          }}
          errors={errors}
        />

        <br />
        <CareerDetailsFileUpload
          register={register}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          errors={errors}
        />
        <CareerDetailsFileText />
        <br />
        <CareerDetailsCheckbox control={control} errors={errors} />
        <br />
        <CareerDetailsSubmitButton
          errors={errors}
          isSubmitting={isSubmitting}
        />
        {errors?.api && <CareerDetailsError />}
      </form>
    </>
  );
};
