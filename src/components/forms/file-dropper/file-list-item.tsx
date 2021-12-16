import React from 'react';
import styled from 'styled-components';
import { theme } from '../../layout/theme';
import { TextStyles } from '../../typography';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Dropdown, DropdownOption } from '../dropdown/dropdown';

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

const FileCategoryDropdown = styled(Dropdown)`
  ${TextStyles.textR}
  color: ${theme.palette.text.topline};
  cursor: pointer;

  margin-right: 24px;
  padding: 0;

  border-bottom: rgba(0, 0, 0, 0) 1px solid;
  &:hover {
    border-bottom: ${theme.palette.text.topline} 1px solid;
  }
`;

const RemoveButton = styled.button`
  ${TextStyles.textR}
  color: ${theme.palette.text.topline};

  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  border-bottom: rgba(0, 0, 0, 0) 1px solid;
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
  const { t } = useTranslation();
  return (
    <FileListItemContainer>
      <FileName>{fileName}</FileName>
      <Actions>
        {fileCategories && (
          <FileCategoryDropdown
            defaultValue={t('career.file-category').toString()}
            onChange={(selectedOption) =>
              onFileCategorySelect(index, selectedOption)
            }
          >
            <DropdownOption value={t('career.file-category')} disabled>
              {t('career.file-category')}
            </DropdownOption>
            {fileCategories.map((category) => (
              <DropdownOption value={category} key={category}>
                {category}
              </DropdownOption>
            ))}
          </FileCategoryDropdown>
        )}
        <RemoveButton onClick={() => onRemove(index)}>
          {t('career.remove-file')}
        </RemoveButton>
      </Actions>
    </FileListItemContainer>
  );
};
