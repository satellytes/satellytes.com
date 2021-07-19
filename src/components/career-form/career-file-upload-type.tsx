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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
          {t('career.file-category')}
        </option>
        <option value="cv">{t('career.cv')}</option>
        <option value="cover-letter">{t('career.cover-letter')}</option>
        <option value="other">{t('career.other')}</option>
      </StyledSelect>
      {errors.category_select?.[fileName[0]] && (
        <FormError
          error={{ message: t<string>('career.error.selection') }}
          lineHeight={100}
        />
      )}
    </div>
  );
};

const StyledSelect = styled.select`
  border-radius: 4px;
`;
