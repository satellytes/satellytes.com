import React from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../../../forms/checkbox/checkbox';
import { SIMPLE_EMAIL_PATTERN } from '../../../forms/constants';
import { TextArea } from '../../../forms/text-area/text-area';
import { TextInput } from '../../../forms/text-input/text-input';
import { Button } from '../../../ui/buttons/button';
import { FormLayout } from '../../contact/form';
import { SectionHeadline } from '../job-description';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  residence: string;
  availableFrom: string;
  salary: string;
  letter: string;

  privacyPolicy: boolean;
}

export const Form = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitted },
  } = useForm<FormData>({
    mode: 'onSubmit',
  });

  return (
    <>
      <SectionHeadline>Apply</SectionHeadline>
      <form name="career" onSubmit={handleSubmit(console.log)}>
        <FormLayout>
          <TextInput
            name="firstName"
            label="First Name"
            control={control}
            rules={{ required: 'Dein Name fehlt' }}
          />
          <TextInput
            name="lastName"
            label="Last Name"
            control={control}
            rules={{ required: 'Dein Name fehlt' }}
          />

          <TextInput
            name="email"
            label="Email"
            control={control}
            rules={{
              required: 'Dein Name fehlt',
              pattern: {
                value: SIMPLE_EMAIL_PATTERN,
                message: 'Please provide a valid Email',
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
            rules={{
              required: 'Dein Name fehlt',
            }}
          />
          <TextInput
            name="salaryExpectation"
            label="Salary Expectation"
            control={control}
          />
        </FormLayout>
        <TextArea
          name="coverLetter"
          label="Cover letter"
          control={control}
          rules={{ required: 'Mandatory field!' }}
        />
        <br />
        <Checkbox
          name="privacyPolicy"
          label="I hereby confirm that I have read and understood the privacy policy."
          control={control}
          rules={{ required: 'Mandatory field!' }}
          defaultValue={true}
        />
        <br />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};
