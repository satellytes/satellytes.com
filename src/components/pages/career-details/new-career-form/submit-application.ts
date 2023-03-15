const API_ENDPOINT = '/api/career-form';

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

  const payload = {
    jobName: props.jobName,
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

  fetch(API_ENDPOINT, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        setError('api', {
          type: 'server',
          message: `Irgendetwas ist schief gelaufen.`, //todo add error message
        });
      } else {
        props.scrollToStart?.();
      }
    })
    .catch((error) => {
      console.error(error);
      setError('api', {
        type: 'server',
        message: `Irgendetwas ist schief gelaufen.`, //todo add error message
      });
    });
};
