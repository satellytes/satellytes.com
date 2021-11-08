import React from 'react';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../header/header';
import { Link } from '../links/links';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { BreadcrumbText } from '../typography/typography';
import { theme } from '../layout/theme';

const BreadcrumbContainer = styled.ol<{ hasHero: boolean }>`
  margin: calc(${HEADER_HEIGHT} + 16px) 24px 0;
  margin-top: ${(props) => props.hasHero && '16px'};
  list-style: none;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  padding: 0;
`;

const BreadcrumbListItem = styled(BreadcrumbText)`
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
  breadcrumbEntries: BreadcrumbType[];
  customLabel?: string;
  hasHero: boolean;
}

export interface BreadcrumbType {
  pathname: string;
  crumbLabel: string;
}

export const Breadcrumb = ({
  breadcrumbEntries,
  customLabel,
  hasHero,
}: BreadcrumbProps): JSX.Element => {
  const { t, language, defaultLanguage } = useI18next();
  const isDefaultLanguage = language === defaultLanguage;

  return (
    <BreadcrumbContainer hasHero={hasHero}>
      {breadcrumbEntries.map((breadcrumbEntry, index) => {
        if (index === 0 && !isDefaultLanguage) {
          return;
        }
        const crumbLabel: string =
          (index === breadcrumbEntries.length - 1 && customLabel) ||
          t(`${breadcrumbEntry.crumbLabel}.breadcrumb`);
        return (
          <BreadcrumbListItem key={crumbLabel}>
            <Link to={breadcrumbEntry.pathname} language={defaultLanguage}>
              {crumbLabel}
            </Link>
          </BreadcrumbListItem>
        );
      })}
    </BreadcrumbContainer>
  );
};
