import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage, TextArea } from '../form/controls';
import { Grid, GridItem } from '../grid/grid';
import axios from 'axios';
import {
  Actions,
  Container,
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
const SIMPLE_EMAIL_PATTERN = /.+@.+\..+/;

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
    <Container>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Fieldset disabled={isSubmitting}>
          <Grid nested>
            {/*First Name*/}
            <GridItem xs={12} md={6}>
              <InputField
                inputRef={register({ required: 'Dein Vorname fehlt' })}
                error={errors.first_name}
                name="first_name"
                placeholder="Vorname"
              />
            </GridItem>

            {/*Last Name*/}
            <GridItem xs={12} md={6}>
              <InputField
                inputRef={register({ required: 'Dein Nachname fehlt' })}
                error={errors.last_name}
                name="last_name"
                placeholder="Nachname"
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
                placeholder="E-Mail-Adresse"
              />
            </GridItem>

            {/*CV File */}
            <GridItem>
              <InputField
                inputRef={register({ required: 'Dein CV fehlt' })}
                error={errors.documents}
                name="documents"
                type={'file'}
                placeholder="E-Mail-Adresse"
              />
            </GridItem>

            {/*Cover Letter*/}
            <GridItem>
              <TextArea
                placeholder="Dein Cover Letter"
                name="message"
                ref={register({ required: 'Dein Anschreiben fehlt' })}
                hasError={!!errors.message}
              />
              {errors.message && (
                <ErrorMessage>
                  <span>{errors.message.message}</span>
                </ErrorMessage>
              )}
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
      </form>
    </Container>
  );
};
