import React from 'react';
import styled from 'styled-components';
import { theme } from '../../layout/theme';
import { TextStyles } from '../../typography';

interface StatProps {
  title: string;
  content: string;
}

const Wrapper = styled.span`
  display: inline-block;
  margin-bottom: 80px;
  margin-right: 48px;
`;

const Title = styled.div`
  ${TextStyles.toplineR}

  color: ${theme.palette.text.topline};

  margin-bottom: 12px;
`;

const Content = styled.div`
  ${TextStyles.headlineM}
`;

export const Stat = ({ title, content }: StatProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Wrapper>
  );
};
