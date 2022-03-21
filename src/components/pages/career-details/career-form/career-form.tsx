import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Grid, GridItem } from '../../../legacy/grid/grid';
import axios, { AxiosResponse } from 'axios';

import {
  Actions,
  Fieldset,
  FileContainer,
  FormError,
  ProgressBar,
  SuccessMessage,
} from './career-components';
import { CaptionText, TextLink, TextTitle } from '../../../legacy/typography';
import { Checkbox, Sup } from '../../../legacy/form/controls';
import { FileUpload } from './career-file-upload';
import { CareerTextFields } from './career-textfields';
import styled from 'styled-components';
import { up } from '../../../support/breakpoint';
import { rgba } from 'polished';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { Upload } from '../../../legacy/icons/form-icons/upload';
import { CheckboxMark } from '../../../legacy/icons/form-icons/checkbox';
import { createFileId } from './utils';

interface CareerFormProps {
  recruiting_channel_id: string;
  job_position_id: string;
  access_token: string;
  company_id: string;
  scrollToStart?: () => void;
}

interface CategorySelect {
  [key: string]: string;
}

export type CareerFormValue = {
  first_name: string;
  last_name: string;
  email: string;
  documents: FileList;
  message: string;
  phone?: string;
  category_select?: CategorySelect;
  privacy: boolean;
  location: string;
  available_from: string;
  salary_expectations: string;
};

type FormErrors = { api?: never };

const API_ENDPOINT = 'https://api.personio.de/recruiting/applicant';
const PRIVACY_POLICY = 'https://satellytes.jobs.personio.de/privacy-policy';

const Container = styled.div`
  margin-bottom: 24px;
`;

export const Headline = styled(TextTitle)`
  margin-top: 40px;
  margin-bottom: 29px;

  ${up('md')} {
    margin-top: 80px;
  }
`;

const InfoTextContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin: 24px 0;
  line-height: 24px;
`;

const PolicyText = styled.div`
  width: calc(100% - 40px);
  font-size: 14px;
  line-height: 130%;

  .policy-link {
    font-size: 14px;
    line-height: 110%;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  position: relative;
  flex-direction: row;
  cursor: pointer;

  &::before {
    content: '';
    display: inline-block;
    position: relative;
    top: -2px;
    width: 20px;
    height: 20px;
    margin-right: 20px;
    background: ${rgba('#7A8FCC', 0.3)};
    border-radius: 4px;
  }

  &:hover::before {
    background: ${rgba('#7A8FCC', 0.5)};
  }
`;

const CheckboxContainer = styled.div`
  position: relative;
  cursor: pointer;

  svg {
    position: absolute;
    top: 2px;
    left: 5px;
    width: 11px;
    height: 11px;
  }
`;

interface PersonioApiResponse {
  success: string;
}

export const CareerForm = (props: CareerFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<CareerFormValue & FormErrors>();

  const { t } = useTranslation();
  const [uploadProgress, setUploadProgress] = useState(0);
  const selectedFiles = watch('documents');
  const privacyChecked = watch('privacy');

  useEffect(() => {
    if (selectedFiles?.length > 0) {
      clearErrors('documents');
    }
  }, [selectedFiles]);

  const onSubmitHandler: SubmitHandler<CareerFormValue> = async (
    formValues,
  ): Promise<void> => {
    if (selectedFiles?.length === 0) {
      setError(
        'documents',
        { type: 'manual', message: t<string>('career.error.cv') },
        { shouldFocus: true },
      );
      return;
    }
    if (!privacyChecked) {
      setError(
        'privacy',
        { type: 'manual', message: t('career.approval') },
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
          const fileId = createFileId(formValues.documents[i].name);
          const category = formValues.category_select?.[fileId];
          formData.append(keyName, formValues.documents[i]);
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
      .post<FormData, AxiosResponse<PersonioApiResponse>>(
        API_ENDPOINT,
        formData,
        {
          onUploadProgress: (progressEvent) =>
            setUploadProgress(progressEvent.loaded / progressEvent.total),
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

  const onErrorHandler = (event) => {
    if (selectedFiles?.length === 0 || !selectedFiles) {
      setError(
        'documents',
        { type: 'manual', message: t<string>('career.error.cv') },
        { shouldFocus: true },
      );
    }
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
  const onSubmit = handleSubmit(onSubmitHandler, onErrorHandler);

  return (
    <form onSubmit={onSubmit}>
      <Headline>{t('career.headline')}</Headline>
      <Fieldset disabled={isSubmitting}>
        <Grid nested>
          <CareerTextFields register={register} errors={errors} />

          {/*File-Upload*/}
          <FileUpload
            name="documents"
            setValue={setValue}
            clearErrors={clearErrors}
            register={register}
            selectedFiles={selectedFiles}
            errors={errors}
            setError={setError}
            watch={watch}
          >
            <>
              {(!selectedFiles || selectedFiles.length === 0) && <Upload />}
              <Trans i18nKey="career.action.upload">
                <div>
                  Drop files to upload or <span>browse</span>
                </div>
              </Trans>
            </>
          </FileUpload>

          <GridItem>
            <ProgressBar
              isSubmitting={isSubmitting}
              progress={uploadProgress}
            />
          </GridItem>

          <GridItem>
            <InfoTextContainer>{t('career.info-text')}</InfoTextContainer>
          </GridItem>

          {/*Privacy-Policy Checkbox*/}
          <GridItem>
            <Container>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  id={'privacy-policy'}
                  {...register('privacy', {
                    required: t<string>('career.error.approval'),
                  })}
                />
                <CheckboxLabel htmlFor="privacy-policy">
                  {privacyChecked && <CheckboxMark />}
                  <Trans i18nKey={'career.privacy-policy'}>
                    <PolicyText>
                      Hiermit bestätige ich, dass ich die
                      <TextLink to={PRIVACY_POLICY} className={'policy-link'}>
                        Datenschutzerklärung
                      </TextLink>{' '}
                      <Sup aria-hidden={true}>*</Sup>
                    </PolicyText>
                  </Trans>
                </CheckboxLabel>
              </CheckboxContainer>
              {errors.privacy && <FormError error={errors.privacy} />}
            </Container>
          </GridItem>

          <GridItem>
            <Actions
              tryAgainFn={tryAgain}
              isSubmitting={isSubmitting}
              error={errors.api}
              fieldErrors={errors}
            />
          </GridItem>

          <GridItem>
            <FileContainer>
              <CaptionText>
                <Sup>*</Sup> {t('career.mandatory-field')}
              </CaptionText>
            </FileContainer>
          </GridItem>
        </Grid>
      </Fieldset>
    </form>
  );
};
