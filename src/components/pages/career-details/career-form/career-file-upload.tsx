import { InputContainer } from '../../../legacy/form/controls';
import { Input } from '../../../legacy/form/input';

import React, { ReactNode, useCallback } from 'react';
import { DropzoneRootProps, useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';
import { theme } from '../../../layout/theme';
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { GridItem } from '../../../legacy/grid/grid';
import { FilePreview } from './career-file-preview';
import { FormError } from './career-components';
import { CareerFileUploadType } from './career-file-upload-type';
import { rgba } from 'polished';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { CareerFormValues } from './career-form';

interface FileUploadProps {
  setValue: UseFormSetValue<CareerFormValues>;
  setError: UseFormSetError<CareerFormValues>;
  clearErrors: UseFormClearErrors<CareerFormValues>;
  register: UseFormRegister<CareerFormValues>;
  watch: UseFormWatch<CareerFormValues>;
  name: string;
  selectedFiles: FileList;
  errors: FieldErrors;
  children: ReactNode | ReactNode[];
}

const MAX_NUMBER = 3;
const MAX_SIZE = 20000000; // maximal size per document of personio

const FileInputLabel = styled.label<FileUploadProps & DropzoneRootProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 24px;
  height: 56px;

  ${({ selectedFiles }) =>
    (!selectedFiles || selectedFiles.length === 0) &&
    css`
      align-items: center;
      padding: 56px;
      height: unset;
    `}

  border-radius: 4px;
  ${({ isDragActive }) =>
    isDragActive &&
    css`
      border: 2px solid ${theme.palette.primary.main};
    `}

  margin-bottom: 2px;
  width: 100%;
  background: ${rgba('#7A8FCC', 0.2)};
  cursor: pointer;

  ${({ hasError }) =>
    hasError &&
    css`
      background-color: #f8cdd5;
      color: #202840;
    `};

  &:hover {
    background: ${rgba('#7A8FCC', 0.5)};
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

const FileInput = styled(Input)`
  display: none;
`;

const FileNameWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FileName = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const FileUpload = ({
  setValue,
  setError,
  clearErrors,
  name,
  register,
  selectedFiles,
  errors,
  children,
  watch,
}: FileUploadProps) => {
  const { t } = useTranslation();
  const onDrop = useCallback(
    (droppedFiles) => {
      // maximal number of file being dropped
      const maximalOfFiles = selectedFiles
        ? MAX_NUMBER - selectedFiles.length
        : MAX_NUMBER;

      // dropped files are appended to already selected files
      const dataTransfer = new DataTransfer();
      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          dataTransfer.items.add(selectedFiles[i]);
        }
      }
      const numberOfDroppedFiles = Math.min(
        maximalOfFiles,
        droppedFiles.length,
      );
      for (let i = 0; i < numberOfDroppedFiles; i++) {
        dataTransfer.items.add(droppedFiles[i]);
      }
      setValue(name, dataTransfer.files, { shouldDirty: true });
      clearErrors(name);

      // in case not all file could be added, an error is set
      if (
        Math.min(maximalOfFiles, droppedFiles.length) !== droppedFiles.length
      ) {
        setError(
          name,
          {
            type: 'manual',
            message: t<string>('career.error.max-number'),
          },
          { shouldFocus: true },
        );
      }
    },
    [selectedFiles, setValue],
  );

  const validator = (file) => {
    clearErrors(name);
    if (selectedFiles) {
      // check if file was already uploaded
      for (let i = 0; i < selectedFiles.length; i++) {
        if (selectedFiles[i].name === file.name) {
          return {
            code: 'file was already uploaded',
            message: t<string>('career.error.uploaded', { name: file.name }),
          };
        }
      }
      // check maximal number of documents
      if (selectedFiles.length + file.length > MAX_NUMBER) {
        return {
          code: 'limit of files is reached',
          message: t<string>('career.error.max-number'),
        };
      }
    }
    if (file.length > MAX_NUMBER) {
      return {
        code: 'limit of files is reached',
        message: t<string>('career.error.max-number'),
      };
    }
    // check maximal size of documents
    if (file.size > MAX_SIZE) {
      return {
        code: 'file is too big',
        message: t<string>('career.error.max-size'),
      };
    }
    return null;
  };

  const onDropRejected = (file) => {
    setError(
      name,
      { type: 'manual', message: file[0].errors[0].message },
      { shouldFocus: true },
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.pdf',
    validator,
    onDropRejected,
  });

  const unselectFile = (event, index) => {
    const dataTransfer = new DataTransfer();
    for (let i = 0; i < selectedFiles.length; i++) {
      if (i != index) {
        dataTransfer.items.add(selectedFiles[i]);
      }
    }
    setValue('documents', dataTransfer.files, { shouldDirty: true });
    clearErrors(name);
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <>
      {/*File-Upload*/}
      <GridItem>
        <InputContainer>
          <FileInputLabel
            {...getRootProps({
              selectedFiles,
              isDragActive,
              onClick: (event) => event.stopPropagation(),
            })}
            hasError={errors.documents}
          >
            <FileInput
              id={name}
              type={'file'}
              {...getInputProps({
                ...register(name),
              })}
              multiple
            />
            {children}
          </FileInputLabel>
        </InputContainer>
        <FormError error={errors.documents} marginBottom={8} />
      </GridItem>

      {/*File-Review*/}
      <GridItem>
        {selectedFiles &&
          selectedFiles.length > 0 &&
          Object.entries(selectedFiles).map(([index, file]) => {
            if (index !== 'length') {
              return (
                <GridItem key={index}>
                  <FilePreview index={index} onClick={unselectFile}>
                    <FileNameWrapper>
                      <FileName>{file.name}</FileName>
                    </FileNameWrapper>
                    <CareerFileUploadType
                      errors={errors}
                      file={file}
                      register={register}
                      setValue={setValue}
                      clearError={clearErrors}
                      watch={watch}
                    />
                  </FilePreview>
                </GridItem>
              );
            }
          })}
      </GridItem>
    </>
  );
};
