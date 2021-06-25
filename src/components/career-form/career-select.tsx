import React from 'react';
import { FormError } from './career-components';
import styled from 'styled-components';

export const CareerSelect = ({
  errors,
  file,
  register,
  setValue,
  clearError,
  watch,
}) => {
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
        name={name}
        id={name}
        {...register(name, {
          validate: (value) => value !== 'default',
        })}
        value={state || 'default'}
        onChange={onChange}
      >
        <option value={'default'} disabled>
          Please choose file category
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
