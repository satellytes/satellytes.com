import React from 'react';
import styled from 'styled-components';
import { PrevArrow } from '../icons/buttons-icons/prev-arrow';
import { NextArrow } from '../icons/buttons-icons/next-arrow';
import { theme } from '../layout/theme';
import { PaginationDropdown } from '../typography/typography';
import { useTranslation } from 'gatsby-plugin-react-i18next';

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
  justify-content: space-between;
`;

const Dropdown = styled(PaginationDropdown)`
  background: none;
  border: none;
  color: ${theme.palette.text.link.default};
  cursor: pointer;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:disabled {
    opacity: 50%;
    cursor: default;
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

  const options: JSX.Element[] = [];
  for (let i = 1; i <= amountOfPages; i++) {
    options.push(<option value={i}>{`${t('blog.pagination')} ${i}`}</option>);
  }

  const handleDropdownChange = (event) => {
    const selectedPage = parseInt(event.target.value);
    onDropdownSelect(selectedPage);
  };

  return (
    <PaginationContainer>
      <StyledButton onClick={onPreviousClick} disabled={currentPage == 1}>
        <PrevArrow />
      </StyledButton>
      <Dropdown onChange={handleDropdownChange} value={currentPage}>
        {options}
      </Dropdown>
      <StyledButton
        onClick={onNextClick}
        disabled={currentPage == amountOfPages}
      >
        <NextArrow />
      </StyledButton>
    </PaginationContainer>
  );
};
