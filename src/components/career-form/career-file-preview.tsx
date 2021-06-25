import styled from 'styled-components';
import React from 'react';
import { Clear } from '../icons/clear';
import { Checkmark } from '../icons/checkmark';
import { theme } from '../layout/theme';
import { up } from '../breakpoint/breakpoint';
import { CareerSelect } from './career-select';

export const FilePreview = ({
  index,
  file,
  onClick,
  errors,
  register,
  setValue,
  clearError,
  watch,
}) => {
  return (
    <Preview>
      <Wrapper>
        <Container>
          <CheckmarkBackground>
            <Checkmark />
          </CheckmarkBackground>
          <FileName className="name">{(file as File).name}</FileName>
        </Container>
        <CareerSelect
          errors={errors}
          file={file}
          register={register}
          setValue={setValue}
          clearError={clearError}
          watch={watch}
        />
      </Wrapper>
      <Button onClick={(event) => onClick(event, index)}>
        <Clear />
      </Button>
    </Preview>
  );
};

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  ${up('md')} {
    margin-left: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  justify-content: left;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 26px);
  ${up('md')} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const CheckmarkBackground = styled.div`
  width: 16px;
  height: 16px;
  background: ${theme.palette.primary.main};
  border-radius: 28px;

  svg {
    display: block;
    margin: auto;
    margin-top: 4px;
    width: 16px;
  }
`;

const FileName = styled.div`
  margin-left: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Preview = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  border-radius: 4px;
  padding: 25px 24px;
  background: rgba(122, 143, 204, 0.2);
  overflow: ellipsis;
  line-height: 150%;
`;
