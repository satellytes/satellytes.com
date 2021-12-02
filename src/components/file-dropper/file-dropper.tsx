import React, { useState } from 'react';
import {
  ErrorCode,
  FileError,
  FileRejection,
  useDropzone,
} from 'react-dropzone';
import styled, { css } from 'styled-components';
import { theme } from '../layout/theme';
import { Illustration, IllustrationSize } from '../illustration/illustration';
import { IllustrationType } from '../illustration/illustration-set';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { TextStyles } from '../typography/typography-v2';
import { FileListItem } from './file-list-item';

interface FileDropperType {
  file: File;
  fileCategory: string | null;
}

interface FileDropperProps {
  /**
   * Called when files are uploaded and all conditions (e.g. `acceptedFileTypes` or `maxFiles`) are fulfilled or when a file changes (e.g. files gets removed or a fileCategory is added to a file). `acceptedFiles` always contains all valid files.
   */
  onFileChange: (acceptedFiles: FileDropperType[]) => any;
  /**
   * (Optional) Called when files are uploaded and a condition (e.g. wrong file type) is not fulfilled.
   */
  onDropRejected?: (rejectedData: FileRejection[]) => any;
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
}

const FileDropperContainer = styled.div<{
  isDragActive: boolean;
  hasFiles: boolean;
}>`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  padding: 28px 0;
  background-color: ${theme.palette.background.leadbox};
  cursor: pointer;
  border: 3px solid
    ${(props) =>
      props.isDragActive
        ? theme.palette.text.link.default
        : theme.palette.background.leadbox};

  ${(props) =>
    props.hasFiles &&
    css`
      align-items: flex-start;
      padding: 12px 16px;
    `}

  &:hover {
    span {
      border-bottom: 1px solid ${theme.palette.text.link.default};
    }
  }
`;

const Description = styled.p`
  ${TextStyles.timestamp};
  letter-spacing: 0;
  margin: 0;
`;

const Highlight = styled.span`
  color: ${theme.palette.text.link.default};
`;

export const FileDropper = ({
  illustration,
  acceptedFileTypes,
  validator,
  onDropRejected,
  onFileChange,
  maxFiles,
  fileCategories,
}: FileDropperProps): JSX.Element => {
  const [currentFiles, setCurrenFiles] = useState<FileDropperType[]>([]);
  const { t } = useTranslation();

  const onDrop = (acceptedFiles: File[]) => {
    if (maxFiles && currentFiles.length + acceptedFiles.length > maxFiles) {
      if (onDropRejected) {
        const rejectFiles = acceptedFiles.map((acceptedFile) => ({
          file: acceptedFile,
          errors: [
            {
              message: t('career.error.max-number'),
              code: ErrorCode.TooManyFiles,
            },
          ],
        }));
        onDropRejected(rejectFiles);
      }
      return;
    }

    const newFiles = acceptedFiles.map((acceptedFile) => ({
      file: acceptedFile,
      fileCategory: null,
    }));
    setCurrenFiles([...currentFiles, ...newFiles]);
    onFileChange(newFiles);
  };

  const onRemoveFile = (fileIndex) => {
    const newFiles = [...currentFiles];
    newFiles.splice(fileIndex, 1);
    setCurrenFiles(newFiles);
    onFileChange(newFiles);
  };

  const onFileCategorySelect = (fileIndex, selectedCategory) => {
    const newFiles = [...currentFiles];
    newFiles[fileIndex] = {
      ...currentFiles[fileIndex],
      fileCategory: selectedCategory,
    };
    onFileChange(newFiles);
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
      >
        <input {...getInputProps()} />
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
    </>
  );
};
