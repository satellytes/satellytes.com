import React from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { SIMPLE_EMAIL_PATTERN } from '../../../forms/constants';
import { FileDropperType } from '../../../forms/file-dropper/file-dropper';
import { TextArea } from '../../../forms/text-area/text-area';
import { TextInput } from '../../../forms/text-input/text-input';
import { FormLayout } from '../../contact/form';
import { SectionHeadline } from '../job-description';
import {
  CareerDetailsCheckbox,
  CareerDetailsError,
  CareerDetailsFileText,
  CareerDetailsFileUpload,
  CareerDetailsSubmitButton,
  CareerDetailsSuccess,
} from './career-form-fields';
import { submitApplication } from './submit-application';

interface CareerFormProps {
  company_id: string;
  access_token: string;
  job_position_id: string;
  recruiting_channel_id: string;
  scrollToStart: () => void;
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
    cv: t<string>('career.error.cv'),
    category: t<string>('career.error.category'),
  };

  const selectedFiles = watch('documents');

  const onErrorHandler = () => {
    // since documents is not controlled, it has to be validated manually
    if (selectedFiles?.length === 0 || !selectedFiles) {
      setError(
        'documents',
        { type: 'manual', message: t<string>('career.error.cv') },
        { shouldFocus: true },
      );
    }

    for (let i = 0; i < selectedFiles?.length; i++) {
      if (!selectedFiles[i].fileCategory)
        setError('documents', {
          type: 'manual',
          message: t<string>('career.error.category'),
        });
    }
  };

  if (isSubmitSuccessful) return <CareerDetailsSuccess />;

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
            label={t<string>('career.first-name')}
            control={control}
            rules={{ required: t<string>('career.error.first-name') }}
          />
          <TextInput
            name="last_name"
            label={t<string>('career.last-name')}
            control={control}
            rules={{ required: t<string>('career.error.last-name') }}
          />

          <TextInput
            name="email"
            label={t<string>('career.email')}
            control={control}
            rules={{
              required: t<string>('career.error.email'),
              pattern: {
                value: SIMPLE_EMAIL_PATTERN,
                message: t<string>('career.error.email-undefined'),
              },
            }}
          />
          <TextInput
            name="location"
            label={t<string>('career.location')}
            control={control}
          />
          <TextInput
            name="available_from"
            label={t<string>('career.available-from')}
            control={control}
          />
          <TextInput
            name="salary_expectations"
            label={t<string>('career.salary-expectations')}
            control={control}
          />
        </FormLayout>
        <TextArea
          name="message"
          label={t<string>('career.cover-letter')}
          control={control}
          rules={{
            required: t<string>('career.error.cover-letter'),
            minLength: {
              value: 100,
              message: t<string>('career.error.cover-letter-length'),
            },
          }}
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
        <CareerDetailsCheckbox control={control} />
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
