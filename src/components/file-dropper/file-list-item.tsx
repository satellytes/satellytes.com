import React from 'react';
import styled from 'styled-components';
import { theme } from '../layout/theme';
import { TextStyles } from '../typography/typography-v2';

interface FileListItemProps {
  fileName: string;
  fileCategories?: string[];
  index: number;
  onRemove: (index: number) => any;
  onFileCategorySelect: (index: number, category: string) => any;
}

const FileListItemContainer = styled.div`
  margin-top: 1px;
  padding: 12px 16px;

  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  align-items: center;

  background-color: ${theme.palette.background.leadbox};
`;

const FileName = styled.p`
  ${TextStyles.headlineXS};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: none;
`;

const Actions = styled.div`
  display: flex;
  margin-left: auto;
  padding-top: 1px;
`;

const FileCategoryDropdown = styled.select`
  ${TextStyles.textR}
  color: ${theme.palette.text.topline};

  appearance: none;
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 24px;
  box-sizing: border-box;

  &:hover {
    border-bottom: ${theme.palette.text.topline} 1px solid;
  }
`;

const RemoveButton = styled.button`
  ${TextStyles.textR}
  color: ${theme.palette.text.topline};

  border: none;
  background: none;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    border-bottom: ${theme.palette.text.topline} 1px solid;
  }
`;

export const FileListItem = ({
  fileName,
  fileCategories,
  index,
  onRemove,
  onFileCategorySelect,
}: FileListItemProps): JSX.Element => {
  return (
    <FileListItemContainer>
      <FileName>{fileName}</FileName>
      <Actions>
        {fileCategories && (
          <FileCategoryDropdown
            onChange={(event) =>
              onFileCategorySelect(index, event.target.value)
            }
          >
            <option value="" disabled selected>
              Select file category
            </option>
            {fileCategories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </FileCategoryDropdown>
        )}
        <RemoveButton onClick={() => onRemove(index)}>Remove</RemoveButton>
      </Actions>
    </FileListItemContainer>
  );
};
