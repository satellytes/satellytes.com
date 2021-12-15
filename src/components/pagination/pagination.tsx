import React from 'react';
import styled from 'styled-components';
import { theme } from '../layout/theme';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TextStyles } from '../typography/typography-v2';
import {
  Dropdown,
  DropdownOption,
} from '../../new-components/dropdown/dropdown';
import { Icon } from '../../new-components/icon/icon';

interface PaginationProps {
  onPreviousClick: () => any;
  onNextClick: () => any;
  onDropdownSelect: (selectedPage: number) => any;
  amountOfPages: number;
  currentPage: number;
}

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PaginationDropdown = styled(Dropdown)`
  ${TextStyles.toplineR}
  color: ${theme.palette.text.link.default};
  cursor: pointer;
`;

const StyledButton = styled.button`
  padding: 8px;
  border: none;
  background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  color: white;

  &:disabled {
    opacity: 50%;
    cursor: default;
  }

  &:hover:enabled {
    background: ${theme.palette.text.link.default};
  }
`;

export const Pagination = ({
  onPreviousClick,
  onNextClick,
  amountOfPages,
  onDropdownSelect,
  currentPage,
}: PaginationProps): JSX.Element => {
  const { t } = useTranslation();

  const options = new Array(amountOfPages)
    .fill(null)
    .map((_, index) => (
      <DropdownOption key={index} value={index.toString()}>{`${t(
        'blog.pagination',
      )} ${index + 1}`}</DropdownOption>
    ));

  const handleDropdownChange = (selectedOption) => {
    const selectedPage = parseInt(selectedOption);
    onDropdownSelect(selectedPage);
  };

  return (
    <PaginationContainer>
      <StyledButton onClick={onPreviousClick} disabled={currentPage === 0}>
        <Icon show={'arrow_left'} />
      </StyledButton>
      <PaginationDropdown
        onChange={handleDropdownChange}
        value={currentPage.toString()}
        arrow={<Icon show={'chevron_down'} />}
      >
        {options}
      </PaginationDropdown>
      <StyledButton
        onClick={onNextClick}
        disabled={currentPage + 1 === amountOfPages}
      >
        <Icon show={'arrow_right'} />
      </StyledButton>
    </PaginationContainer>
  );
};
