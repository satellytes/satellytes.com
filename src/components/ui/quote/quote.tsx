import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { theme } from '../../layout/theme';

interface QuoteProps {
  children: ReactNode | ReactNode[];
}

const QuoteText = styled.blockquote`
  ${TextStyles.quote}
  padding-left: 20px;
  margin: 48px 0;
  border-left: 2px solid ${theme.palette.text.topline};

  > p {
    ${TextStyles.quote}
    margin: 0;
  }
`;

export const Quote = ({ children }: QuoteProps) => {
  return <QuoteText>{children}</QuoteText>;
};
