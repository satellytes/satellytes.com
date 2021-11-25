import React from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { theme } from '../layout/theme';
import { Illustration, IllustrationSize } from '../illustration/illustration';
import { IllustrationType } from '../illustration/illustration-set';
import { Trans } from 'gatsby-plugin-react-i18next';

interface FileDropperProps {
  illustration?: IllustrationType;

  acceptedFileTypes?: string; //comma-separated list of unique content type specifiers (e.g. 'image/jpeg, image/png, .pdf') or undefined to allow all files
  maxFiles?: number;

  onDrop: (acceptedFiles: File[]) => any;
  onDropRejected?: (rejectedData: FileRejection[]) => any;
  validator?: (file: File) => FileError | FileError[] | null;
}

const FileDropperContainer = styled.div<{ isDragActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 0;
  background-color: ${theme.palette.background.leadbox};

  color: ${(props) => props.isDragActive && theme.palette.text.link.default};
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
        <p>
          Drop files to upload or <Highlight>browse</Highlight>
        </p>
      </Trans>
    </FileDropperContainer>
  );
};
