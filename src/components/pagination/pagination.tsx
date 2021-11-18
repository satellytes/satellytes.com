import React, { useState } from 'react';
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
}

const PaginationContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'previous dropdown next';
`;

const Dropdown = styled(PaginationDropdown)`
  background: none;
  border: none;
  color: ${theme.palette.text.link.default};
  cursor: pointer;

  grid-area: dropdown;
  justify-self: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const PreviousButton = styled(Button)`
  grid-area: previous;
  justify-self: start;
`;

const NextButton = styled(Button)`
  grid-area: next;
  justify-self: end;
`;

export const Pagination: React.FC<PaginationProps> = ({
  onPreviousClick,
  onNextClick,
  amountOfPages,
  onDropdownSelect,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  const options: JSX.Element[] = [];
  for (let i = 1; i <= amountOfPages; i++) {
    options.push(<option value={i}>{`${t('blog.pagination')} ${i}`}</option>);
  }

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPreviousClick();
    }
  };

  const handleNextClick = () => {
    if (currentPage < amountOfPages) {
      setCurrentPage(currentPage + 1);
      onNextClick();
    }
  };

  const handleDropdownChange = (event) => {
    const selectedPage = parseInt(event.target.value);
    setCurrentPage(selectedPage);
    onDropdownSelect(selectedPage);
  };

  return (
    <PaginationContainer>
      {currentPage !== 1 && (
        <PreviousButton onClick={handlePreviousClick}>
          <PrevArrow />
        </PreviousButton>
      )}
      <Dropdown onChange={handleDropdownChange} value={currentPage}>
        {options}
      </Dropdown>
      {currentPage !== amountOfPages && (
        <NextButton onClick={handleNextClick}>
          <NextArrow />
        </NextButton>
      )}
    </PaginationContainer>
  );
};
