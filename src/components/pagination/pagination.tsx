import React from 'react';
import styled from 'styled-components';
import { PrevArrow } from '../icons/buttons-icons/prev-arrow';
import { NextArrow } from '../icons/buttons-icons/next-arrow';
import { theme } from '../layout/theme';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TextStyles } from '../typography/typography-v2';

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

const Dropdown = styled.select`
  ${TextStyles.toplineR}
  background: none;
  border: none;
  color: ${theme.palette.text.link.default};
  cursor: pointer;
`;

const StyledButton = styled.button`
  padding: 14px 12px;
  border: none;
  background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);
  border-radius: 30px;
  cursor: pointer;
  display: flex;

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
      <option key={index} value={index}>{`${t('blog.pagination')} ${
        index + 1
      }`}</option>
    ));

  const handleDropdownChange = (event) => {
    const selectedPage = parseInt(event.target.value);
    onDropdownSelect(selectedPage);
  };

  return (
    <PaginationContainer>
      <StyledButton onClick={onPreviousClick} disabled={currentPage === 0}>
        <PrevArrow />
      </StyledButton>
      <Dropdown onChange={handleDropdownChange} value={currentPage}>
        {options}
      </Dropdown>
      <StyledButton
        onClick={onNextClick}
        disabled={currentPage + 1 === amountOfPages}
      >
        <NextArrow />
      </StyledButton>
    </PaginationContainer>
  );
};
