import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../layout/theme';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { TextStyles } from '../../typography';
import { Dropdown, DropdownOption } from '../../forms/dropdown/dropdown';
import { Icon } from '../icon/icon';
import { Link } from 'gatsby';

interface PaginationProps {
  nextLink: string;
  previousLink: string;
  onDropdownSelect?: (selectedPage: number) => any;
  amountOfPages: number;
  currentPage: number;
  className?: string;
}

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PaginationDropdown = styled(Dropdown)`
  border: none !important;
  ${TextStyles.toplineR}
  color: ${theme.palette.text.link.default};
  cursor: pointer;
`;

const StyledLink = styled(Link)<{ $disabled: boolean }>`
  padding: 8px;
  border: none;
  background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  color: white;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 50%;
      cursor: not-allowed;
      pointer-events: none;
    `}

  &:hover {
    background: ${theme.palette.text.link.default};
  }
`;

const PageText = styled.span`
  ${TextStyles.toplineR}
  color: ${({ theme }) => theme.palette.text.topline};
`;

export const Pagination = ({
  nextLink,
  previousLink,
  amountOfPages,
  onDropdownSelect,
  currentPage,
  className,
}: PaginationProps): JSX.Element => {
  const { t } = useTranslation();

  const options = new Array(amountOfPages)
    .fill(null)
    .map((_, index) => (
      <DropdownOption key={index} value={(index + 1).toString()}>{`${t(
        'blog.pagination',
      )} ${index + 1}`}</DropdownOption>
    ));

  const handleDropdownChange = (selectedOption: string) => {
    const selectedPage = parseInt(selectedOption);
    onDropdownSelect?.(selectedPage);
  };

  return (
    <PaginationContainer className={className}>
      <StyledLink
        to={previousLink}
        aria-hidden={currentPage === 1}
        $disabled={currentPage === 1}
        aria-label="Previous Page"
        tabIndex={currentPage === 1 ? -1 : 0}
      >
        <Icon show={'arrow_left'} />
      </StyledLink>
      {onDropdownSelect ? (
        <PaginationDropdown
          onChange={handleDropdownChange}
          value={currentPage.toString()}
          arrow={<Icon show={'chevron_down'} />}
        >
          {options}
        </PaginationDropdown>
      ) : (
        <PageText>{`Page ${currentPage} of ${amountOfPages}`}</PageText>
      )}
      <StyledLink
        to={nextLink}
        $disabled={currentPage === amountOfPages}
        aria-hidden={currentPage === amountOfPages}
        aria-label="Next Page"
        tabIndex={currentPage === amountOfPages ? -1 : 0}
      >
        <Icon show={'arrow_right'} />
      </StyledLink>
    </PaginationContainer>
  );
};
