import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { TextStyles } from '../typography/typography-v2';
import { theme } from '../../new-components/layout/theme';

interface QuoteProps {
  children: ReactNode | ReactNode[];
}

const QuoteText = styled.blockquote`
  ${TextStyles.quote}
  color: ${theme.palette.text.topline};
  padding-left: 20px;
  margin: 0;
  border-left: 2px solid ${theme.palette.text.topline};
`;

export const Quote = ({ children }: QuoteProps) => {
  return <QuoteText>{children}</QuoteText>;
};
