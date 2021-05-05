import React from 'react';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { LinkButton } from '../links/links';

const Teaser = styled.div``;

const LeftContainer = styled.div<{ splitView: boolean }>`
  ${up('md')} {
    text-align: ${(props) => (props.splitView ? 'right' : 'left')};
    margin-right: ${(props) => (props.splitView ? '60%' : '0')};
    padding-right: ${(props) => (props.splitView ? '12px' : '0')};
  }
`;

const RightContainer = styled.div<{ splitView: boolean }>`
  ${up('md')} {
    margin-left: ${(props) => (props.splitView ? '40%' : '0')};
    padding-left: ${(props) => (props.splitView ? '12px' : '0')};
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

const BlockTeaserLinkButton = styled(LinkButton)`
  margin-top: 16px;
`;

interface BlockTeaserProps {
  preTitle: string;
  title: string;
  splitView?: boolean;
  link?: string;
  linkTo?: string;
}

export const BlockTeaser: React.FC<BlockTeaserProps> = ({
  preTitle,
  title,
  splitView,
  link,
  linkTo,
  children,
  ...rest
}) => {
  return (
    <Teaser {...rest}>
      <LeftContainer splitView={Boolean(splitView)}>
        <PreTitle>{preTitle}</PreTitle>
        <Title>{title}</Title>
      </LeftContainer>
      <RightContainer splitView={Boolean(splitView)}>
        {children}
        {link && linkTo && (
          <BlockTeaserLinkButton to={linkTo}>{link}</BlockTeaserLinkButton>
        )}
      </RightContainer>
    </Teaser>
  );
};
