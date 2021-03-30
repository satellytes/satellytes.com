import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, GridItem } from '../grid/grid';
import axios from 'axios';
import {
  Actions,
  CareerFormStyled,
  Fieldset,
  InputField,
  ProgressBar,
  SuccessMessage,
} from './career-components';

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
export const SIMPLE_EMAIL_PATTERN = /.+@.+\..+/;

export const CareerForm: React.FC<CareerFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    errors,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useForm();

  const [uploadProgress, setUploadProgress] = useState(0);

  const onSubmit = async (formValues: FormData): Promise<void> => {
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
          {/*First Name*/}
          <GridItem xs={12} md={6}>
            <InputField
              inputRef={register({ required: 'Dein Vorname fehlt' })}
              error={errors.first_name}
              name="first_name"
              label="Vorname"
            />
          </GridItem>

          {/*Last Name*/}
          <GridItem xs={12} md={6}>
            <InputField
              inputRef={register({ required: 'Dein Nachname fehlt' })}
              error={errors.last_name}
              name="last_name"
              label="Nachname"
            />
          </GridItem>

          {/*E-Mail*/}
          <GridItem xs={12} md={6}>
            <InputField
              inputRef={register({
                required: 'Deine E-Mail fehlt',
                pattern: {
                  value: SIMPLE_EMAIL_PATTERN,
                  message: `Irgendwas stimmt an dieser E-Mail nicht`,
                },
              })}
              error={errors.email}
              name="email"
              label="E-Mail-Adresse"
            />
          </GridItem>

          {/*Location*/}
          <GridItem xs={12} md={6}>
            <InputField
              inputRef={register()}
              error={errors.location}
              name="location"
              label="Aktueller Wohnort"
            />
          </GridItem>

          {/*Available From*/}
          <GridItem xs={12} md={6}>
            <InputField
              inputRef={register()}
              error={errors.available_from}
              name="available_from"
              label="Verfügbar ab"
            />
          </GridItem>

          {/*Salary Expectations*/}
          <GridItem xs={12} md={6}>
            <InputField
              inputRef={register()}
              error={errors.salary_expectations}
              name="salary_expectations"
              label="Gehaltsvorstellung"
            />
          </GridItem>

          {/*Cover Letter*/}
          <GridItem>
            <InputField
              inputRef={register({ required: 'Dein Anschreiben fehlt' })}
              error={errors.message}
              name="message"
              label="Anschreiben"
              type={'text-area'}
            />
          </GridItem>

          {/*CV File */}
          <GridItem>
            <InputField
              inputRef={register({ required: 'Dein CV fehlt' })}
              error={errors.documents}
              name="documents"
              type={'file'}
            />
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
