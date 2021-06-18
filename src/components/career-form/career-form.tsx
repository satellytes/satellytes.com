import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, GridItem } from '../grid/grid';
import axios from 'axios';
import {
  Actions,
  CareerFormStyled,
  Fieldset,
  FileContainer,
  FormError,
  ProgressBar,
  SuccessMessage,
} from './career-components';
import { CaptionText, TextLink } from '../typography/typography';
import { Checkbox, Sup } from '../form/controls';
import { FileInput } from './career-file-input';
import { CareerTextFields } from './career-textfields';
import { FilePreview } from './career-file-preview';
import { Upload } from '../icons/upload';
import styled from 'styled-components';

interface CareerFormProps {
  recruiting_channel_id: string;
  job_position_id: string;
  access_token: string;
  company_id: string;
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  documents: FileList;
  message: string;
  phone?: string;
}

const API_ENDPOINT = 'https://api.personio.de/recruiting/applicant';
const PRIVACY_POLICY = 'https://satellytes.jobs.personio.de/privacy-policy';
export const SIMPLE_EMAIL_PATTERN = /.+@.+\..+/;

export const CareerForm: React.FC<CareerFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();
  const [uploadProgress, setUploadProgress] = useState(0);
  const selectedFiles = watch('documents');
  const privacyChecked = watch('privacy');

  const onSubmit = async (formValues: FormData): Promise<void> => {
    if (!privacyChecked) {
      setError(
        'privacy',
        { type: 'manual', message: 'Deine Zustimmung fehlt' },
        { shouldFocus: true },
      );
      return;
    }

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
        formData.append(
          'documents',
          formValues.documents[0],
          formValues.documents[0].name,
        );
      }
      formData.append(key, value as any); // formdata doesn't take objects
    }
    // await new Promise(resolve => setTimeout(resolve, 2000));
    await axios
      .post(API_ENDPOINT, formData, {
        onUploadProgress: (progressEvent) =>
          setUploadProgress(progressEvent.loaded / progressEvent.total),
      })
      .then((res) => res.data)
      .then((json) => {
        if (json.success) {
          // all good
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

  const onError = (event) => {
    console.log('onError', event);
  };

  const unselectFile = (event, index) => {
    const dataTransfer = new DataTransfer();
    for (let i = 0; i < selectedFiles.length; i++) {
      if (i != index) {
        dataTransfer.items.add(selectedFiles[i]);
      }
    }
    setValue('documents', dataTransfer.files, { shouldDirty: true });
    event.stopPropagation();
    event.preventDefault();
  };

  // recover from some previous error
  const tryAgain = () => {
    setUploadProgress(0);
    clearErrors();
  };

  // early exit if we are done with the submission
  if (isSubmitSuccessful) {
    return <SuccessMessage />;
  }

  return (
    <CareerFormStyled onSubmit={handleSubmit(onSubmit, onError)}>
      <Fieldset disabled={isSubmitting}>
        <Grid nested>
          <CareerTextFields register={register} errors={errors} />

          {/*File-Upload*/}
          <GridItem>
            <FileInput
              setValue={setValue}
              clearErrors={clearErrors}
              name="documents"
              register={register}
              selectedFiles={selectedFiles}
              error={errors.documents}
            >
              <>
                {(!selectedFiles || selectedFiles.length === 0) && <Upload />}
                <div>
                  Drop files to upload or <span>browse</span>
                </div>
              </>
            </FileInput>
            <FormError error={errors.documents} />
          </GridItem>

          {/*File-Review*/}
          {selectedFiles &&
            selectedFiles.length > 0 &&
            Object.entries(selectedFiles).map(([index, file]) => {
              if (index !== 'length') {
                return (
                  <GridItem key={index}>
                    <FilePreview
                      file={file}
                      index={index}
                      onClick={unselectFile}
                    />
                  </GridItem>
                );
              }
            })}

          <GridItem>
            <FileContainer>
              <CaptionText>
                <Sup>*</Sup> Pflichtfeld
              </CaptionText>
            </FileContainer>
          </GridItem>

          {/*Privacy-Policy Checkbox*/}
          <GridItem>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                id={'privacy-policy'}
                {...register('privacy', {
                  required: 'Deine Zustimmung fehlt',
                })}
              />
              <div>
                <label htmlFor="privacy-policy">
                  Hiermit bestätige ich, dass ich die{' '}
                  <TextLink to={PRIVACY_POLICY}>Datenschutzerklärung</TextLink>{' '}
                  zur Kenntnis genommen habe. <Sup aria-hidden={true}>*</Sup>
                </label>
                {errors.privacy && <FormError error={errors.privacy} />}
              </div>
            </CheckboxContainer>
          </GridItem>

          <GridItem>
            <ProgressBar
              isSubmitting={isSubmitting}
              progress={uploadProgress}
            />
            <Actions
              tryAgainFn={tryAgain}
              isSubmitting={isSubmitting}
              error={errors.api}
            />
          </GridItem>
        </Grid>
      </Fieldset>
    </CareerFormStyled>
  );
};

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
`;
