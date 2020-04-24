import React from 'react';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';

const Teaser = styled.div``;

const LeftContainer = styled.div<{ splitView: boolean }>`
  ${up('md')} {
    text-align: ${(props) => (props.splitView ? 'right' : 'left')};
    padding-right: ${(props) => (props.splitView ? '60%' : '0')};
  }
`;

const RightContainer = styled.div<{ splitView: boolean }>`
  ${up('md')} {
    padding-left: ${(props) => (props.splitView ? '40%' : '0')};
  }
`;

const PreTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  opacity: 0.5;

  margin-bottom: 8px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;

  margin-bottom: 24px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 150%;

  margin-bottom: 16px;
`;

const Link = styled.a`
  font-size: 20px;
  font-weight: bold;
  color: #4d79ff;
`;

interface BlockTeaserProps {
  preTitle: string;
  title: string;
  text: string;
  splitView?: boolean;
  link?: string;
}

export const BlockTeaser: React.FC<BlockTeaserProps> = (props) => {
  return (
    <Teaser>
      <LeftContainer splitView={Boolean(props.splitView)}>
        <PreTitle>{props.preTitle}</PreTitle>
        <Title>{props.title}</Title>
      </LeftContainer>
      <RightContainer splitView={Boolean(props.splitView)}>
        <Text>{props.text}</Text>
        <Link>{props.link}</Link>
      </RightContainer>
    </Teaser>
  );
};
