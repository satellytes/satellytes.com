import React from 'react';
import styled, { css } from 'styled-components';
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

const StyledButton = styled.button<{ inactive: boolean }>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  ${(props) =>
    props.inactive &&
    css`
      cursor: default;
      opacity: 50%;
    `}
`;

export const Pagination: React.FC<PaginationProps> = ({
  onPreviousClick,
  onNextClick,
  amountOfPages,
  onDropdownSelect,
  currentPage,
}: PaginationProps) => {
  const { t } = useTranslation();

  const options: JSX.Element[] = [];
  for (let i = 1; i <= amountOfPages; i++) {
    options.push(<option value={i}>{`${t('blog.pagination')} ${i}`}</option>);
  }

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPreviousClick();
    }
  };

  const handleNextClick = () => {
    if (currentPage < amountOfPages) {
      onNextClick();
    }
  };

  const handleDropdownChange = (event) => {
    const selectedPage = parseInt(event.target.value);
    onDropdownSelect(selectedPage);
  };

  return (
    <PaginationContainer>
      <StyledButton onClick={handlePreviousClick} inactive={currentPage == 1}>
        <PrevArrow />
      </StyledButton>
      <Dropdown onChange={handleDropdownChange} value={currentPage}>
        {options}
      </Dropdown>
      <StyledButton
        onClick={handleNextClick}
        inactive={currentPage == amountOfPages}
      >
        <NextArrow />
      </StyledButton>
    </PaginationContainer>
  );
};
