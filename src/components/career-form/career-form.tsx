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
import { FileUpload } from './career-file-upload';
import { CareerTextFields } from './career-textfields';
import { Upload } from '../icons/upload';
import styled from 'styled-components';
import { CheckboxMark } from '../icons/checkbox';

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
  category_select: any;
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
        for (let i = 0; i < formValues.documents.length; i++) {
          const keyName = `categorised_documents[${i}][file]`;
          const fileName = formValues.documents[i].name.split('.')[0];
          const category = formValues.category_select[fileName];
          formData.append(keyName, formValues.documents[i]);
          const nameCategory = `categorised_documents[${i}][category]`;
          formData.append(nameCategory, category);
        }
      } else {
        formData.append(key, value as any); // formdata doesn't take objects
      }
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
          <FileUpload
            setValue={setValue}
            clearErrors={clearErrors}
            name="documents"
            register={register}
            selectedFiles={selectedFiles}
            errors={errors}
            setError={setError}
            watch={watch}
          >
            <>
              {(!selectedFiles || selectedFiles.length === 0) && <Upload />}
              <div>
                Drop files to upload or <span>browse</span>
              </div>
            </>
          </FileUpload>

          <GridItem>
            <DocumentContainer>
              Lade hier bitte deine relevanten Dokumente hoch, wie zb Lebenslauf
              (CV), Motivationschreiben oder Referenzen. Erlaubt sind
              ausschließlich 3 PDF Dateien, die maximale Größe pro Datei beträgt
              20MB.
            </DocumentContainer>
          </GridItem>

          <GridItem>
            <FileContainer>
              <CaptionText>
                <Sup>*</Sup> Pflichtfeld
              </CaptionText>
            </FileContainer>
          </GridItem>

          {/*Privacy-Policy Checkbox*/}
          <GridItem>
            <Container>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id={'privacy-policy'}
                  {...register('privacy', {
                    required: 'Deine Zustimmung fehlt',
                  })}
                />
                <CheckboxLabel htmlFor="privacy-policy">
                  {privacyChecked && <CheckboxMark />}
                  <div>
                    Hiermit bestätige ich, dass ich die{' '}
                    <TextLink to={PRIVACY_POLICY}>
                      Datenschutzerklärung
                    </TextLink>{' '}
                    zur Kenntnis genommen habe. <Sup aria-hidden={true}>*</Sup>
                  </div>
                </CheckboxLabel>
              </CheckboxContainer>
              {errors.privacy && <FormError error={errors.privacy} />}
            </Container>
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

const Container = styled.div`
  margin-bottom: 24px;
`;

const DocumentContainer = styled.div`
  display: flex;
  align-items: left;
  flex-direction: row;
  margin: 24px 0px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  flex-direction: row;
  cursor: pointer;

  div {
    width: calc(100% - 40px);
  }

  &:before {
    content: '';
    display: inline-block;
    position: relative;
    top: 2px;
    width: 20px;
    height: 20px;
    margin-right: 20px;
    background: rgba(122, 143, 204, 0.3);
    border-radius: 4px;
  }

  &:hover {
    &:before {
      background: rgba(122, 143, 204, 0.5);
    }
  }
`;

const CheckboxContainer = styled.div`
  position: relative;
  cursor: pointer;

  svg {
    position: absolute;
    top: 7px;
    left: 5px;
    width: 11px;
    height: 11px;
  }
`;
