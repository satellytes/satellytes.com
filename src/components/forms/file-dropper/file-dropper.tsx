import React, { useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';
import { theme } from '../../layout/theme';
import {
  Illustration,
  IllustrationSize,
} from '../../ui/illustration/illustration';
import { IllustrationType } from '../../ui/illustration/illustration-set';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { TextStyles } from '../../typography';
import { FileListItem } from './file-list-item';
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { FormData } from '../../pages/career-details/new-career-form/career-form';
import { StyledErrorMessage } from '../text-input/text-input';

export interface FileDropperType {
  file: File;
  fileCategory: string | null;
}

interface FileDropperProps extends React.ComponentPropsWithRef<'input'> {
  /**
   * (Optional) Allows custom validation of uploaded files. If the file is accepted, the `validator()` function must return null. Otherwise the function returns a FileError object. See also: [react-dropzone: custom validation](https://react-dropzone.js.org/#section-custom-validation)
   */
  validator?: (file: File) => FileError | FileError[] | null;
  /**
   * (Optional) comma-separated list of unique content type specifiers (e.g. `'image/jpeg, image/png, .pdf'`) or `undefined` to allow all files. See also: [react-dropzone: accepting specific file types](https://react-dropzone.js.org/#section-accepting-specific-file-types)
   */
  acceptedFileTypes?: string;
  /**
   * (Optional) Set a maximum number of files that can be uploaded. If this number is exceeded, `onDropRejected()` is called with all uploaded files.
   */
  maxFiles?: number;
  /**
   * (Optional) Categories that the user can add to each uploaded file (e.g. 'CV' or 'Cover Letter')
   * */
  fileCategories?: string[];
  /**
   * (Optional) Pass in a valid illustration keyword to show the according illustration.
   */
  illustration?: IllustrationType;

  /**
   * Use Controller Props, to get the form to work
   */
  setValue: UseFormSetValue<FormData>;
  setError: UseFormSetError<FormData>;
  clearErrors: UseFormClearErrors<FormData>;
  register: UseFormRegister<FormData>;
  name: 'documents';
  errors?: FieldErrors;
}

const Highlight = styled.span`
  color: ${theme.palette.text.link.default};
`;

const FileDropperContainer = styled.div<{
  isDragActive: boolean;
  hasFiles: boolean;
  hasErrors: boolean;
}>`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  padding: 28px 0;
  background-color: ${theme.palette.background.leadbox};
  cursor: pointer;
  border: 1px solid
    ${(props) =>
      props.isDragActive
        ? theme.palette.text.link.default
        : theme.palette.background.leadbox};

  ${(props) =>
    props.hasErrors &&
    css`
      border-color: ${theme.palette.text.errorMessage};
    `}

  ${(props) =>
    props.hasFiles &&
    css`
      align-items: flex-start;
      padding: 12px 16px;
    `}

  &:hover ${Highlight} {
    border-bottom: 1px solid ${theme.palette.text.link.default};
  }

  &:hover {
    border: 1px solid ${theme.palette.text.default};
  }
`;

const Description = styled.p`
  ${TextStyles.timestamp};
  letter-spacing: 0;
  margin: 0;
`;

export const FileDropper = ({
  illustration,
  acceptedFileTypes,
  validator,
  maxFiles,
  fileCategories,
  setValue,
  setError,
  clearErrors,
  name,
  register,
  errors,
}: FileDropperProps): JSX.Element => {
  const [currentFiles, setCurrenFiles] = useState<FileDropperType[]>([]);
  const { t } = useTranslation();

  const onDrop = (acceptedFiles: File[]) => {
    if (maxFiles && currentFiles.length + acceptedFiles.length > maxFiles) {
      setError(name, {
        type: 'manual',
        message: t<string>('career.error.max-number'),
      });
      return;
    }

    const newFiles = acceptedFiles.map((acceptedFile) => ({
      file: acceptedFile,
      fileCategory: null,
    }));
    setCurrenFiles([...currentFiles, ...newFiles]);
    setValue(name, [...currentFiles, ...newFiles], { shouldDirty: true });
    clearErrors(name);
  };

  const onRemoveFile = (fileIndex) => {
    const newFiles = [...currentFiles];
    newFiles.splice(fileIndex, 1);
    setCurrenFiles(newFiles);
    setValue(name, [...currentFiles, ...newFiles], { shouldDirty: true });
    clearErrors(name);
  };

  const onFileCategorySelect = (fileIndex, selectedCategory) => {
    console.log(fileIndex, selectedCategory);
    const newFiles = [...currentFiles];
    newFiles[fileIndex] = {
      ...currentFiles[fileIndex],
      fileCategory: selectedCategory,
    };
    setCurrenFiles(newFiles);
    setValue(name, newFiles);
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
    accept: acceptedFileTypes,
    validator,
    onDropRejected,
    maxFiles,
  });

  const hasFiles = Boolean(currentFiles.length);

  return (
    <>
      <FileDropperContainer
        {...getRootProps()}
        isDragActive={isDragActive}
        hasFiles={hasFiles}
        hasErrors={errors?.documents}
      >
        <input {...getInputProps({ ...register(name) })} />
        {!hasFiles && illustration && (
          <Illustration show={illustration} size={IllustrationSize.NORMAL} />
        )}
        <Trans i18nKey="career.action.upload">
          <Description>
            Drop files to upload or <Highlight>browse</Highlight>
          </Description>
        </Trans>
      </FileDropperContainer>

      {currentFiles.map((currentFile, index) => (
        <FileListItem
          key={currentFile.file.name}
          fileName={currentFile.file.name}
          index={index}
          onRemove={onRemoveFile}
          fileCategories={fileCategories}
          onFileCategorySelect={onFileCategorySelect}
        />
      ))}

      {errors?.documents && (
        <StyledErrorMessage>{errors.documents.message}</StyledErrorMessage>
      )}
    </>
  );
};
