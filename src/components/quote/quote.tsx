import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { TextStyles } from '../typography/typography-v2';
import { theme } from '../layout/theme';

interface QuoteProps {
  children: ReactNode | ReactNode[];
}

const QuoteText = styled.p`
  ${TextStyles.quote}
  color: ${theme.palette.text.topline};
  padding-left: 20px;
  margin: 0;
`;

const Quote = ({ children }: QuoteProps) => {
  return <QuoteText>{children}</QuoteText>;
};

export default Quote;
