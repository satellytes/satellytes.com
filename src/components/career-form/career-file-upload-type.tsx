import React from 'react';
import { FormError } from './career-components';
import styled from 'styled-components';
import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

interface CareerFileUploadTypeProps {
  setValue: UseFormSetValue<FieldValues>;
  clearError: UseFormClearErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  errors: FieldErrors;
  file: File;
}

export const CareerFileUploadType = ({
  errors,
  file,
  register,
  setValue,
  clearError,
  watch,
}: CareerFileUploadTypeProps) => {
  const fileName = file.name.split('.');
  const name = `category_select.${fileName[0]}`;
  const state = watch(name);

  const onChange = (event) => {
    setValue(name, event.target.value);
    clearError(name);
  };

  return (
    <div>
      <StyledSelect
        id={name}
        {...register(name, {
          validate: (value) => value !== 'default',
        })}
        value={state || 'default'}
        onChange={onChange}
      >
        <option value={'default'} disabled>
          File category
        </option>
        <option value="cv">CV</option>
        <option value="cover-letter">Cover-Letter</option>
        <option value="other">other</option>
      </StyledSelect>
      {errors.category_select?.[fileName[0]] && (
        <FormError
          error={{ message: 'Deine Auswahl fehlt' }}
          lineHeight={100}
        />
      )}
    </div>
  );
};

const StyledSelect = styled.select`
  border-radius: 4px;
`;
