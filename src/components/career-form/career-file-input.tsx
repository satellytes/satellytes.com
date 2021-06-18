import { Input, InputContainer } from '../form/controls';
import React, { ReactNode, useCallback } from 'react';
import { DropzoneRootProps, useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { theme } from '../layout/theme';
import {
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface FileInputProps {
  setValue: UseFormSetValue<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  name: string;
  selectedFiles: FileList;
  error: boolean;
  children: ReactNode | ReactNode[];
}

export const FileInput = ({
  setValue,
  clearErrors,
  name,
  register,
  selectedFiles,
  error,
  children,
}: FileInputProps) => {
  const onDrop = useCallback(
    (droppedFiles) => {
      // dropped files are appended to already selected files
      const dataTransfer = new DataTransfer();
      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          dataTransfer.items.add(selectedFiles[i]);
        }
      }
      for (let i = 0; i < droppedFiles.length; i++) {
        dataTransfer.items.add(droppedFiles[i]);
      }
      setValue(name, dataTransfer.files, { shouldDirty: true });
      clearErrors(name);
    },
    [selectedFiles, setValue],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.pdf',
  });

  return (
    <InputContainer>
      <FileInputLabel
        {...getRootProps({
          selectedFiles,
          isDragActive,
          onClick: (event) => event.stopPropagation(),
        })}
        hasError={error}
      >
        <Input
          id={name}
          type={'file'}
          {...getInputProps({
            ...register(name, { required: 'Dein CV fehlt' }),
          })}
          multiple
        />
        {children}
      </FileInputLabel>
    </InputContainer>
  );
};

const FileInputLabel = styled.label<FileInputProps & DropzoneRootProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ selectedFiles }) =>
    (!selectedFiles || selectedFiles.length === 0) && `align-items: center;`}
  border-radius: 4px;
  ${({ isDragActive }) =>
    isDragActive && `border: 2px solid ${theme.palette.primary.main};`}
  padding: ${({ selectedFiles }) =>
    !selectedFiles || selectedFiles.length === 0 ? `56px` : `24px`};
  margin-bottom: 2px;
  width: 100%;
  background: rgba(122, 143, 204, 0.2);
  cursor: pointer;

  ${({ hasError }) => hasError && `background-color: #f8cdd5; color: #202840;`};

  .file {
    display: none;
  }

  svg {
    margin-bottom: 18px;
  }

  span {
    display: inline;
    color: ${theme.palette.text.link.default};
    line-height: 150%;
    font-weight: bold;
  }
`;
