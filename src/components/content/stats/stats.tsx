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
`;

const Content = styled.dd`
  ${TextStyles.headlineM}
  margin: 0;
`;

const StatsWrapper = styled.dl`
  display: grid;
  gap: 12px;

  margin-top: 48px;
  margin-bottom: 80px;

  ${up('sm')} {
    grid-auto-flow: column;
    grid-template-rows: 1fr 1fr;
  }
`;

export const StatItem = ({ title, content }: StatProps) => {
  return (
    <>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </>
  );
};

export const Stats = ({ children }) => {
  return <StatsWrapper>{children}</StatsWrapper>;
};
