import axios, { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { ErrorCode, FileError } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Checkbox } from '../../../forms/checkbox/checkbox';
import { SIMPLE_EMAIL_PATTERN } from '../../../forms/constants';
import {
  FileDropper,
  FileDropperType,
} from '../../../forms/file-dropper/file-dropper';
import { TextArea } from '../../../forms/text-area/text-area';
import {
  StyledErrorMessage,
  TextInput,
} from '../../../forms/text-input/text-input';
import { TextStyles } from '../../../typography';
import { Button } from '../../../ui/buttons/button';
import { StyledLink } from '../../contact/contact-form';
import { FormLayout } from '../../contact/form';
import { SectionHeadline } from '../job-description';
import { Success } from './career-form-success';

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

type FormErrors = { api?: never };

interface PersonioApiResponse {
  success: string;
}

const API_ENDPOINT = 'https://api.personio.de/recruiting/applicant';
const PRIVACY_POLICY = 'https://satellytes.jobs.personio.de/privacy-policy';
const MAX_SIZE = 20 * 1024 * 1024;

const TextWrapper = styled.div`
  margin: 24px 0;

  ${TextStyles.textR}
`;

export const Form = (props: CareerFormProps) => {
  const {
    setValue,
    setError,
    clearErrors,
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitSuccessful },
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

  const onSubmitHandler = async (formValues) => {
    const apiData = {
      company_id: props.company_id,
      access_token: props.access_token,
      job_position_id: props.job_position_id, // dev test position
      recruiting_channel_id: props.recruiting_channel_id, //satellytes.com
    };

    const payload = {
      ...apiData,
      ...formValues,
    };

    const formData = new FormData();

    for (const [key, value] of Object.entries(payload)) {
      if (key === 'documents') {
        for (let i = 0; i < formValues.documents.length; i++) {
          const keyName = `categorised_documents[${i}][file]`;
          const category = formValues.documents[i].fileCategory;
          formData.append(keyName, formValues.documents[i].file);
          const nameCategory = `categorised_documents[${i}][category]`;

          if (category) {
            formData.append(nameCategory, category);
          }
        }
      } else {
        formData.append(key, value as any); // formdata doesn't take objects
      }
    }

    formData.append('gender', 'diverse');

    await axios
      .post<FormDataProps, AxiosResponse<PersonioApiResponse>>(
        API_ENDPOINT,
        formData,
        {
          onUploadProgress: console.log /*(progressEvent) => (
            setUploadProgress(progressEvent.loaded / progressEvent.total)*/,
        },
      )
      .then((response) => response.data)
      .then((data) => {
        // will contain 'Applicant successfully applied to the job position!'
        // from the Personio API.
        if (data.success) {
          // all good
          props.scrollToStart?.();
        } else {
          console.error('Something was wrong with the received response', data);
        }
      })
      .catch((error) => {
        // personio seems to deliver a different so the message can be inside the error object or the error object itself
        const personioErrorMessage =
          error?.response?.data?.error?.message ??
          error?.response?.data?.error ??
          error.message;

        setError('api', {
          type: 'server',
          message: `Irgendetwas ist schief gelaufen (${personioErrorMessage}).`,
        });
      });
  };

  const validator = (file: File): FileError | null => {
    if (file.size > MAX_SIZE)
      return {
        message: t<string>('career.error.max-size'),
        code: ErrorCode.FileTooLarge,
      };

    return null;
  };

  const onErrorHandler = () => {
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

  if (isSubmitSuccessful) return <Success />;

  return (
    <>
      <SectionHeadline>
        <Trans i18nKey={'career.headline'} />
      </SectionHeadline>
      <form
        name="career"
        onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
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
          validator={validator}
        />

        <TextWrapper>
          <Trans i18nKey={'career.info-text'} />
        </TextWrapper>
        <br />
        <Checkbox
          name="privacy"
          label={
            <Trans i18nKey={'career.privacy-policy'}>
              <span>
                Hiermit bestätige ich, dass ich die
                <StyledLink to={PRIVACY_POLICY}>
                  Datenschutzerklärung
                </StyledLink>
                zur Kenntnis genommen habe
              </span>
            </Trans>
          }
          control={control}
          rules={{ required: t<string>('career.error.approval') }}
        />
        <br />
        <Button type="submit">
          {!errors?.api
            ? t<string>('career.action.send')
            : t<string>('career.action.again')}
        </Button>
        {errors?.api && (
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
        )}
        <TextWrapper>
          <Trans i18nKey={'career.mandatory-field'} />
        </TextWrapper>
      </form>
    </>
  );
};
