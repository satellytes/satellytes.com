import React from 'react';
import styled from 'styled-components';
import { down, up } from '../../support/breakpoint';
import { TextStyles } from '../../typography';

interface StatProps {
  title: string;
  content: string;
}

const Title = styled.dt`
  ${TextStyles.toplineR}
  color: ${({ theme }) => theme.palette.text.topline};

  margin-bottom: 12px;
`;

const Content = styled.dd`
  ${TextStyles.headlineM}
  margin: 0;
`;

const StatsWrapper = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 48px;

  margin-top: 48px;
  margin-bottom: 80px;

  ${up('sm')} {
    flex-direction: row;
  }
`;

export const StatItem = ({ title, content }: StatProps) => {
  return (
    <div>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </div>
  );
};

export const Stats = ({ children }) => {
  return <StatsWrapper>{children}</StatsWrapper>;
};
