import React, { useEffect } from 'react';
import { ErrorCode, FileError } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { Checkbox } from '../../../forms/checkbox/checkbox';
import { SIMPLE_EMAIL_PATTERN } from '../../../forms/constants';
import {
  FileDropper,
  FileDropperType,
} from '../../../forms/file-dropper/file-dropper';
import { TextArea } from '../../../forms/text-area/text-area';
import { TextInput } from '../../../forms/text-input/text-input';
import { Button } from '../../../ui/buttons/button';
import { FormLayout } from '../../contact/form';
import { SectionHeadline } from '../job-description';
import {
  CareerDetailsCheckboxLabel,
  CareerDetailsError,
  CareerDetailsFileText,
  CareerDetailsSuccess,
} from './career-form-fields';
import { uploadToPersonio } from './upload';

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

const MAX_SIZE = 20 * 1024 * 1024;

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
  const selectedFiles = watch('documents');

  useEffect(() => {
    if (selectedFiles?.length > 0) {
      clearErrors('documents');
    }
  }, [selectedFiles]);

  const fileCategories = [
    {
      value: 'cv',
      label: t<string>('career.cv'),
    },
    {
      value: 'cover-letter',
      label: t<string>('career.cover-letter'),
    },
    {
      value: 'other',
      label: t<string>('career.other'),
    },
  ];

  const fileValidator = (file: File): FileError | null => {
    if (file.size > MAX_SIZE)
      return {
        message: t<string>('career.error.max-size'),
        code: ErrorCode.FileTooLarge,
      };

    return null;
  };

  const onValidateForm = () => {
    // to allow re send after api error
    // there should not be an old api error when pressing submit
    if (errors.api) {
      clearErrors('api');
    }

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
          (formValues) => uploadToPersonio(props, formValues, setError),
          onValidateForm,
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
        />

        <br />
        <FileDropper
          register={register}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          errors={errors}
          name="documents"
          fileCategories={fileCategories}
          acceptedFileTypes={'.pdf'}
          illustration="monitor_024"
          maxFiles={3}
          validator={fileValidator}
        />
        <CareerDetailsFileText />
        <br />
        <Checkbox
          name="privacy"
          label={<CareerDetailsCheckboxLabel />}
          control={control}
          rules={{ required: t<string>('career.error.approval') }}
        />
        <br />
        <Button type="submit" disabled={isSubmitting}>
          {!errors?.api
            ? t<string>('career.action.send')
            : t<string>('career.action.again')}
        </Button>
        {errors?.api && <CareerDetailsError />}
      </form>
    </>
  );
};
