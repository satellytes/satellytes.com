import React from 'react';
import { GridItem } from '../../../legacy/grid/grid';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { SIMPLE_EMAIL_PATTERN } from '../../../forms/constants';
import { InputField } from '../../../legacy/form/controls';
import { CareerFormValues } from './career-form';

interface CareerTextFieldsProps {
  register: UseFormRegister<CareerFormValues>;
  errors: FieldValues;
}

export const CareerTextFields = ({
  register,
  errors,
}: CareerTextFieldsProps) => {
  const { t } = useTranslation();
  return (
    <>
      {/*First Name*/}
      <GridItem xs={12} md={6}>
        <InputField
          required={true}
          inputRef={register('first_name', {
            required: t<string>('career.error.first-name'),
          })}
          error={errors.first_name}
          name="first_name"
          label={t('career.first-name')}
        />
      </GridItem>

      {/*Last Name*/}
      <GridItem xs={12} md={6}>
        <InputField
          required={true}
          inputRef={register('last_name', {
            required: t<string>('career.error.last-name'),
          })}
          error={errors.last_name}
          name="last_name"
          label={t('career.last-name')}
        />
      </GridItem>

      {/*E-Mail*/}
      <GridItem xs={12} md={6}>
        <InputField
          required={true}
          inputRef={register('email', {
            required: t<string>('career.error.email'),
            pattern: {
              value: SIMPLE_EMAIL_PATTERN,
              message: t<string>('career.error.email-undefined'),
            },
          })}
          error={errors.email}
          name="email"
          label={t('career.email')}
        />
      </GridItem>

      {/*Location*/}
      <GridItem xs={12} md={6}>
        <InputField
          inputRef={register('location')}
          error={errors.location}
          name="location"
          label={t('career.location')}
        />
      </GridItem>

      {/*Available From*/}
      <GridItem xs={12} md={6}>
        <InputField
          inputRef={register('available_from')}
          error={errors.available_from}
          name="available_from"
          label={t('career.available-from')}
        />
      </GridItem>

      {/*Salary Expectations*/}
      <GridItem xs={12} md={6}>
        <InputField
          inputRef={register('salary_expectations')}
          error={errors.salary_expectations}
          name="salary_expectations"
          label={t('career.salary-expectations')}
        />
      </GridItem>

      {/*Cover Letter*/}
      <GridItem>
        <InputField
          required={true}
          inputRef={register('message', {
            required: t<string>('career.error.cover-letter'),
          })}
          error={errors.message}
          name="message"
          label={t('career.cover-letter')}
          type={'text-area'}
        />
      </GridItem>
    </>
  );
};
