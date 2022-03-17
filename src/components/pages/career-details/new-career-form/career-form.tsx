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
import { TextInput } from '../../../forms/text-input/text-input';
import { SimpleLink } from '../../../legacy/markdown/custom-components';
import { TextStyles } from '../../../typography';
import { Button } from '../../../ui/buttons/button';
import { FormLayout } from '../../contact/form';
import { SectionHeadline } from '../job-description';

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  residence: string;
  availableFrom: string;
  salary: string;
  letter: string;
  documents: FileDropperType[];

  privacyPolicy: boolean;
};

const PRIVACY_POLICY = 'https://satellytes.jobs.personio.de/privacy-policy';
const MAX_SIZE = 20 * 1024 * 1024;

const TextWrapper = styled.div`
  margin: 24px 0;

  ${TextStyles.textR}
`;

export const Form = () => {
  const {
    setValue,
    setError,
    clearErrors,
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>({
    mode: 'onSubmit',
  });

  const { t } = useTranslation();
  const selectedFiles = watch('documents');

  useEffect(() => {
    if (selectedFiles?.length > 0) {
      clearErrors('documents');
    }
  }, [selectedFiles]);

  const onSubmitHandler = async (formValues) => {
    console.log(formValues);

    if (selectedFiles?.length === 0) {
      setError(
        'documents',
        { type: 'manual', message: t<string>('career.error.cv') },
        { shouldFocus: true },
      );
      return;
    }
  };

  const validator = (file: File): FileError | null => {
    if (file.size > MAX_SIZE)
      return {
        message: t<string>('career.error.max-size'),
        code: ErrorCode.FileTooLarge,
      };

    return null;
  };

  const onErrorHandler = (event) => {
    if (selectedFiles?.length === 0 || !selectedFiles) {
      setError(
        'documents',
        { type: 'manual', message: t<string>('career.error.cv') },
        { shouldFocus: true },
      );
    }
  };

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
            name="firstName"
            label={t<string>('career.first-name')}
            control={control}
            rules={{ required: t<string>('career.error.first-name') }}
          />
          <TextInput
            name="lastName"
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
            name="residence"
            label={t<string>('career.location')}
            control={control}
          />
          <TextInput
            name="available"
            label={t<string>('career.available-from')}
            control={control}
          />
          <TextInput
            name="salaryExpectation"
            label={t<string>('career.salary-expectations')}
            control={control}
          />
        </FormLayout>
        <TextArea
          name="coverLetter"
          label={t<string>('career.cover-letter')}
          control={control}
        />
        <br />
        <Checkbox
          name="privacyPolicy"
          label={
            <Trans i18nKey={'career.privacy-policy'}>
              <span>
                Hiermit bestätige ich, dass ich die
                <SimpleLink href={PRIVACY_POLICY}>
                  Datenschutzerklärung
                </SimpleLink>
                zur Kenntnis genommen habe
              </span>
            </Trans>
          }
          control={control}
          rules={{ required: t<string>('career.error.approval') }}
        />
        <br />
        <FileDropper
          register={register}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          errors={errors}
          label={t<string>('career.cv')}
          name="documents"
          fileCategories={['CV', 'Letter']}
          acceptedFileTypes={'.pdf'}
          illustration="monitor_024"
          maxFiles={3}
          validator={validator}
        ></FileDropper>
        <TextWrapper>
          <Trans i18nKey={'career.info-text'} />
        </TextWrapper>
        <br />
        <Button type="submit">{t<string>('career.action.send')}</Button>
        <TextWrapper>
          <Trans i18nKey={'career.mandatory-field'} />
        </TextWrapper>
      </form>
    </>
  );
};
