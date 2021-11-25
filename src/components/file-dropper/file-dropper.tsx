import React from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { theme } from '../layout/theme';
import { Illustration, IllustrationSize } from '../illustration/illustration';
import { IllustrationType } from '../illustration/illustration-set';
import { Trans } from 'gatsby-plugin-react-i18next';
import { TextStyles } from '../typography/typography-v2';

interface FileDropperProps {
  /**
   * (Optional) Pass in a valid illustration keyword to show the according illustration.
   */
  illustration?: IllustrationType;
  /**
   * (Optional) comma-separated list of unique content type specifiers (e.g. `'image/jpeg, image/png, .pdf'`) or `undefined` to allow all files. See also: [react-dropzone: accepting specific file types](https://react-dropzone.js.org/#section-accepting-specific-file-types)
   */
  acceptedFileTypes?: string;
  /**
   * (Optional) Set a maximum number of files that can be uploaded. If this number is exceeded, `onDropRejected()` is called with all uploaded files and `onDrop()` is called with an empty array.
   */
  maxFiles?: number;
  /**
   * Called when files are uploaded and all conditions (e.g. `acceptedFileTypes` or `maxFiles`) are fulfilled.
   */
  onDrop: (acceptedFiles: File[]) => any;
  /**
   * (Optional) Called when files are uploaded and a condition (e.g. wrong file type) is not fulfilled.
   */
  onDropRejected?: (rejectedData: FileRejection[]) => any;
  /**
   * (Optional) Allows custom validation of uploaded files. If the file is accepted, the `validator()` function must return null. Otherwise the function returns a FileError object. See also: [react-dropzone: custom validation](https://react-dropzone.js.org/#section-custom-validation)
   */
  validator?: (file: File) => FileError | FileError[] | null;
}

const FileDropperContainer = styled.div<{ isDragActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 0;
  background-color: ${theme.palette.background.leadbox};
  border: 3px solid
    ${(props) =>
      props.isDragActive
        ? theme.palette.text.link.default
        : theme.palette.background.leadbox};
`;

const Description = styled.p`
  ${TextStyles.timestamp};
  letter-spacing: 0;
`;

const Highlight = styled.span`
  color: ${theme.palette.text.link.default};
`;

export const FileDropper = ({
  illustration,
  acceptedFileTypes,
  validator,
  onDropRejected,
  onDrop,
  maxFiles,
}: FileDropperProps): JSX.Element => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    validator,
    onDropRejected,
    maxFiles,
  });

  return (
    <FileDropperContainer {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      {illustration && (
        <Illustration show={illustration} size={IllustrationSize.NORMAL} />
      )}
      <Trans i18nKey="career.action.upload">
        <Description>
          Drop files to upload or <Highlight>browse</Highlight>
        </Description>
      </Trans>
    </FileDropperContainer>
  );
};
