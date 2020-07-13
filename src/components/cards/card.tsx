import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

import { theme } from '../layout/theme';
import { up } from '../breakpoint/breakpoint';
import { GridItem } from '../grid/grid';

export interface CardProps extends React.AllHTMLAttributes<HTMLElement> {
  title: string;
  text: string;
  link?: string;
}

const textStyles = css`
  color: ${theme.palette.text.default};
  line-height: 110%;
`;

export const CardWrapper = styled(GridItem)`
  background-color: ${theme.palette.background.card};

  align-self: stretch;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 24px;
  border-radius: 4px;

  ${up('md')} {
    min-height: 365px;
  }
`;

export const CardTitle = styled.div`
  ${textStyles};

  margin-bottom: 24px;
  font-size: 32px;
  font-weight: bold;
`;

export const CardText = styled.p`
  ${textStyles};

  flex-grow: 1;
  margin: 0 0 82px;
  font-size: 14px;
  line-height: 150%;
`;

const CardLink = styled(Link)`
  color: ${theme.palette.text.darkLinkColor.default};

  align-self: flex-end;
  font-size: 15px;
  font-weight: bold;
  line-height: 110%;
  text-decoration: none;

  &:hover {
    color: ${theme.palette.text.darkLinkColor.hover};
  }
`;

export const Card: React.FC<CardProps> = ({ title, text, link, className }) => {
  return (
    <CardWrapper sm={6} md={4} className={className}>
      <CardTitle>{title}</CardTitle>
      <CardText>{text}</CardText>
      {link && <CardLink to={link}>Apply &gt;</CardLink>}
    </CardWrapper>
  );
};
