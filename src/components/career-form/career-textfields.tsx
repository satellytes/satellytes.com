import React from 'react';
import { GridItem } from '../grid/grid';
import { InputField } from './career-components';
import { SIMPLE_EMAIL_PATTERN } from './career-form';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface CareerTextFieldsProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
}

export const CareerTextFields = ({
  register,
  errors,
}: CareerTextFieldsProps) => {
  return (
    <>
      {/*First Name*/}
      <GridItem xs={12} md={6}>
        <InputField
          required={true}
          inputRef={register('first_name', { required: 'Dein Vorname fehlt' })}
          error={errors.first_name}
          name="first_name"
          label="Vorname"
        />
      </GridItem>

      {/*Last Name*/}
      <GridItem xs={12} md={6}>
        <InputField
          required={true}
          inputRef={register('last_name', { required: 'Dein Nachname fehlt' })}
          error={errors.last_name}
          name="last_name"
          label="Nachname"
        />
      </GridItem>

      {/*E-Mail*/}
      <GridItem xs={12} md={6}>
        <InputField
          required={true}
          inputRef={register('email', {
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
          inputRef={register('location')}
          error={errors.location}
          name="location"
          label="Aktueller Wohnort"
        />
      </GridItem>

      {/*Available From*/}
      <GridItem xs={12} md={6}>
        <InputField
          inputRef={register('available_from')}
          error={errors.available_from}
          name="available_from"
          label="Verfügbar ab"
        />
      </GridItem>

      {/*Salary Expectations*/}
      <GridItem xs={12} md={6}>
        <InputField
          inputRef={register('salary_expectations')}
          error={errors.salary_expectations}
          name="salary_expectations"
          label="Gehaltsvorstellung"
        />
      </GridItem>

      {/*Cover Letter*/}
      <GridItem>
        <InputField
          required={true}
          inputRef={register('message', { required: 'Dein Anschreiben fehlt' })}
          error={errors.message}
          name="message"
          label="Anschreiben"
          type={'text-area'}
        />
      </GridItem>
    </>
  );
};
