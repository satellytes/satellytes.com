import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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

  return (
    <>
      <SectionHeadline>Apply</SectionHeadline>
      <form name="career" onSubmit={handleSubmit(onSubmitHandler)}>
        <FormLayout>
          <TextInput
            name="firstName"
            label="First Name"
            control={control}
            rules={{ required: t<string>('career.error.first-name') }}
          />
          <TextInput
            name="lastName"
            label="Last Name"
            control={control}
            rules={{ required: t<string>('career.error.last-name') }}
          />

          <TextInput
            name="email"
            label="Email"
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
            label="Place of Residence"
            control={control}
          />
          <TextInput
            name="available"
            label="Available From"
            control={control}
          />
          <TextInput
            name="salaryExpectation"
            label="Salary Expectation"
            control={control}
          />
        </FormLayout>
        <TextArea name="coverLetter" label="Cover letter" control={control} />
        <br />
        <Checkbox
          name="privacyPolicy"
          label="I hereby confirm that I have read and understood the privacy policy."
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
          name="documents"
          fileCategories={['CV', 'Letter']}
          acceptedFileTypes={'.pdf'}
          illustration="monitor_024"
        ></FileDropper>
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};
