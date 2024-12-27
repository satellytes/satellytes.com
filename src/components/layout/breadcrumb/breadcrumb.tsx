import React from 'react';
import styled from 'styled-components';
import { Link } from '../../legacy/links/links';
import { TextStyles } from '../../typography';
import { theme } from '../theme';

const BreadcrumbContainer = styled.ol`
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: clip;
  padding-left: 4px;
  transform: translateX(-4px);
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

const BreadcrumbLink = styled(Link)`
  display: inline-block;
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
    <nav aria-label="breadcrumbs">
      <BreadcrumbContainer aria-label="breadcumbs">
        {breadcrumbEntries.map((breadcrumbEntry) => {
          return (
            <BreadcrumbListItem key={breadcrumbEntry.label}>
              <BreadcrumbLink to={breadcrumbEntry.pathname}>
                {breadcrumbEntry.label}
              </BreadcrumbLink>
            </BreadcrumbListItem>
          );
        })}
      </BreadcrumbContainer>
    </nav>
  );
};
