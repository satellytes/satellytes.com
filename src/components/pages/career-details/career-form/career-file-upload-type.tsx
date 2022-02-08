import React from 'react';
import { FormError } from './career-components';
import styled from 'styled-components';
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { up } from '../../../support/breakpoint';
import { SelectArrow } from '../../../legacy/icons/form-icons/select-arrow';
import { createFileId } from './utils';
import { CareerFormValue } from './career-form';

interface CareerFileUploadTypeProps {
  setValue: UseFormSetValue<CareerFormValue>;
  clearError: UseFormClearErrors<CareerFormValue>;
  register: UseFormRegister<CareerFormValue>;
  watch: UseFormWatch<CareerFormValue>;
  errors: FieldErrors;
  file: File;
}

const StyledSelect = styled.select`
  appearance: none;
  position: relative;
  width: 100%;
  height: 32px;
  background: #fff;
  border: none;
  border-radius: 20px;
  padding: 9px 37px 8px 16px;
  color: #000;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  ${up('md')} {
    width: unset;
    display: inline-block;
    min-width: 144px;
    margin-top: 0;
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
    display: inline-block;
    width: unset;
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

export const CareerFileUploadType = ({
  errors,
  file,
  register,
  setValue,
  clearError,
  watch,
}: CareerFileUploadTypeProps) => {
  const { t } = useTranslation();
  /**
   * Create a sanitized file id by replacing anything that's not a letter or a digit which can be safely used as an identifier.
   * Without this, a valid filename like `a,b.pdf` will cause an error.
   */
  const fileId = createFileId(file.name);
  // TODO: CareerFormValue contains a list of keys in field `category_select` which we should reflect here
  const name: any = `category_select.${fileId}`;
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
            {t('career.file-category')}
          </option>
          <option value="cv">{t('career.cv')}</option>
          <option value="cover-letter">{t('career.cover-letter')}</option>
          <option value="other">{t('career.other')}</option>
        </StyledSelect>
        <SelectArrow />
      </SelectContainer>
      {errors.category_select?.[fileId] && (
        <FormErrorWrapper>
          <FormError
            error={{ message: t<string>('career.error.selection') }}
            lineHeight={100}
          />
        </FormErrorWrapper>
      )}
    </Wrapper>
  );
};
