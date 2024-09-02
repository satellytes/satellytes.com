import React from 'react';
import styled from 'styled-components';
import { Link } from '../../legacy/links/links';
import { TextStyles } from '../../typography';
import { theme } from '../theme';

const BreadcrumbContainer = styled.ol`
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  padding: 0;
`;

const BreadcrumbListItem = styled.li`
  ${TextStyles.textXS}

  white-space: nowrap;
  color: ${theme.palette.text.breadcrumb};
  &:not(:last-child) {
    margin-right: 7px;
    ::after {
      content: '›';
      margin-left: 7px;
      display: inline-flex;
      flex: 0 0 auto;
    }
  }
  :last-child {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

interface BreadcrumbProps {
  breadcrumbEntries: BreadcrumbEntry[];
}

export interface BreadcrumbEntry {
  pathname: string;
  label: string;
}

export const Breadcrumb = ({
  breadcrumbEntries,
}: BreadcrumbProps): JSX.Element => {
  return (
    <BreadcrumbContainer aria-label="breadcumbs" role="navigation">
      {breadcrumbEntries.map((breadcrumbEntry) => {
        return (
          <BreadcrumbListItem key={breadcrumbEntry.label}>
            <Link to={breadcrumbEntry.pathname}>{breadcrumbEntry.label}</Link>
          </BreadcrumbListItem>
        );
      })}
    </BreadcrumbContainer>
  );
};
