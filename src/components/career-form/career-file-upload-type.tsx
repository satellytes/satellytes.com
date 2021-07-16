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
import { up } from '../breakpoint/breakpoint';
import { SelectArrow } from '../icons/select-arrow';

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
  const selectedFileType = watch(name);

  const onChange = (event) => {
    setValue(name, event.target.value, {
      shouldDirty: true,
    });
    clearError(name);
  };

  return (
    <Wrapper>
      <SelectContainer>
        <StyledSelect
          id={name}
          {...register(name, {
            validate: (value) => value !== 'default',
          })}
          aria-labelledby={name}
          value={selectedFileType || 'default'}
          onChange={onChange}
        >
          <option value={'default'} disabled>
            File category
          </option>
          <option value="cv">CV</option>
          <option value="cover-letter">Cover-Letter</option>
          <option value="other">other</option>
        </StyledSelect>
        <SelectArrow />
      </SelectContainer>
      {errors.category_select?.[fileName[0]] && (
        <FormErrorWrapper>
          <FormError
            error={{ message: 'Deine Auswahl fehlt' }}
            lineHeight={90}
          />
        </FormErrorWrapper>
      )}
    </Wrapper>
  );
};

const StyledSelect = styled.select`
  appearance: none;
  position: relative;
  width: 100%;
  height: 32px;

  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 20px;
  padding: 9px 37px 8px 16px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  ${up('md')} {
    width: 144px;
    margin-top: 0px;
  }
`;

const Wrapper = styled.div`
  display: block;
  position: relative;

  background: none;
  border: none;
  width: calc(100% + 25px);
  margin-top: 10px;

  ${up('md')} {
    width: 144px;
    margin-top: 0px;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;

  > svg {
    position: absolute;
    right: 16px;
    height: 32px;
    z-index: -1;
  }
`;

const FormErrorWrapper = styled.div`
  margin-left: 16px;
`;
