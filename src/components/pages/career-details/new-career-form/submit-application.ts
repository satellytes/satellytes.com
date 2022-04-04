import axios, { AxiosResponse } from 'axios';
import { FormDataProps } from './career-form';

interface PersonioApiResponse {
  success: string;
}

const API_ENDPOINT = 'https://api.personio.de/recruiting/applicant';

export const submitApplication = async (
  props,
  formValues,
  setError,
  errors,
  clearErrors,
  errorMessages,
) => {
  // to allow re send after api error
  // there should not be an old api error when pressing submit
  if (errors.api) {
    clearErrors('api');
  }

  if (formValues.phone) {
    // Mhh honey...
    // Field is visually hidden and filters bots
    setError('api', { type: 'manual', message: 'This field should be empty' });
    return;
  }

  // since documents is not controlled, it has to be validated manually
  if (formValues?.documents?.length === 0 || !formValues?.documents) {
    setError(
      'documents',
      { type: 'manual', message: errorMessages.cv },
      { shouldFocus: true },
    );
    return;
  }

  for (let i = 0; i < formValues?.documents?.length; i++) {
    if (!formValues?.documents[i]?.fileCategory) {
      setError('documents', {
        type: 'manual',
        message: errorMessages.category,
      });
      return;
    }
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
      /*
        if we would like to add a progress State this would be needed again
        {
          onUploadProgress: (progressEvent) => (
            setUploadProgress(progressEvent.loaded / progressEvent.total),
        },*/
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
