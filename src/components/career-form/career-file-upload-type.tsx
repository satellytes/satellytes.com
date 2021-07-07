import React, { useEffect } from 'react';
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
import {
  ListboxButton,
  ListboxInput,
  ListboxList,
  ListboxOption,
  ListboxPopover,
} from '@reach/listbox';
import { SelectArrow } from '../icons/select-arrow';
import '@reach/listbox/styles.css';
import { up } from '../breakpoint/breakpoint';
import { rgba } from 'polished';

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
  const state = watch(name, 'default');

  useEffect(() => {
    register(name, {
      validate: (value) => {
        return Boolean(value) && value !== 'default';
      },
    });
    setValue(name, 'default', {
      shouldDirty: true,
    });
  }, []);

  const onChange = (event) => {
    setValue(name, event, {
      shouldDirty: true,
    });
    clearError(name);
  };

  return (
    <SelectWrapper>
      <StyledListboxInput
        id={name}
        aria-labelledby={name}
        value={state || 'default'}
        onChange={onChange}
      >
        <ListboxButton arrow={<SelectArrow />} />
        <ListboxPopover portal={false}>
          <ListboxList>
            <ListboxOption value={'default'} disabled>
              File category
            </ListboxOption>
            <ListboxOption value="cv">CV</ListboxOption>
            <ListboxOption value="cover-letter">Cover-Letter</ListboxOption>
            <ListboxOption value="other">other</ListboxOption>
          </ListboxList>
        </ListboxPopover>
      </StyledListboxInput>
      {errors.category_select?.[fileName[0]] && (
        <FormErrorWrapper>
          <FormError
            error={{ message: 'Deine Auswahl fehlt' }}
            lineHeight={90}
          />
        </FormErrorWrapper>
      )}
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  display: block;
  position: relative;

  background: none;
  border: none;
  width: 100%;
  margin-top: 10px;

  ${up('md')} {
    width: 144px;
    margin-top: 0px;
  }
`;

const FormErrorWrapper = styled.div`
  margin-left: 16px;
`;

const StyledListboxInput = styled(ListboxInput)`
  position: relative;
  background: ${rgba('#ffffff', 0.1)};
  border-radius: 20px;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;  
  width: calc(100% + 25px);
  line-height: 110%;
  
  &:hover{
    background: ${rgba('#ffffff', 0.2)};
  }
  
  ${up('md')} {
    width: 144px;   
    height: 32px;
  }
  
  [data-reach-listbox-button] {
    border: none;
    padding: 9px 16px 8px 16px;
    cursor: pointer;
    line-height: 1.15;
    position: relative;
    width: 100%;
  }
  
  [data-reach-listbox-arrow] {
    position: absolute;
    right: 0px;
    top: 13px;
    right: 16px;
    color: white;
    width: 10px;
  }
  
  [data-reach-listbox-popover] {
     position: absolute;
     top: 0px;
     width: 100%;
     background: ${rgba('#212940', 1)};
     border: none;
     border-radius: 10px;
     padding: 0px;
     z-index: 10;
     
     &:focus-within {
      box-shadow: none;
      outline: none;
     }
  }
  
  [data-reach-listbox-option] {  
     padding: 8px 16px 8px 24px;
     cursor: pointer;
     line-height: 1.15;      
     border-radius: 10px;
     position: relative;
    
    &:hover{
      background: ${rgba('#303B5C', 0.9)};
    }
    
    &[aria-disabled="true"]:hover{
      background: ${rgba('#212940', 1)};          
    }
    
    &[data-current-selected]{
        padding-left: 0px;  
        &::before{
          content: url("data:image/svg+xml;utf8,<svg width='10' height='11' viewBox='0 0 10 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1 6.33333L3.46154 9L9 1' stroke='white' stroke-width='1.5' stroke-linecap='round'/></svg>");  
          display: inline-block;     
          width: 24px;
          position: relative;
          top: 0px;
          left: 8px;          
        }      
    }
  }
}
`;
