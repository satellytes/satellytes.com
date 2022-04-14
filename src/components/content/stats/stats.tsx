import React from 'react';
import styled from 'styled-components';
import { theme } from '../../layout/theme';
import { up } from '../../support/breakpoint';
import { TextStyles } from '../../typography';

interface StatProps {
  title: string;
  content: string;
}

const Wrapper = styled.div`
  display: inline-block;
`;

const Title = styled.div`
  ${TextStyles.toplineR}
  color: ${theme.palette.text.topline};
  margin-bottom: 12px;
`;

const Content = styled.div`
  ${TextStyles.headlineM}
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  ${up('sm')} {
    flex-direction: row;
  }
`;

export const StatItem = ({ title, content }: StatProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Wrapper>
  );
};

export const Stats = ({ children }) => {
  return <StatsWrapper>{children}</StatsWrapper>;
};
