import React from 'react';
import styled from 'styled-components';
import {
  Illustration,
  IllustrationSize,
} from '../../ui/illustration/illustration';
import { IllustrationType } from '../../ui/illustration/illustration-set';
import { down, up } from '../../support/breakpoint';
import { TextStyles } from '../../typography';

interface HeaderBlockProps {
  topline: string;
  headline: string;
  metaline?: string;
  children: string | React.ReactNode;
  large?: boolean;
  illustration?: IllustrationType;
  className?: string;
}

interface LargeProps {
  $large?: boolean;
}

const BlockWrapper = styled.div`
  display: flex;

  ${down('sm')} {
    flex-direction: column-reverse;
  }
`;

const TextWrapper = styled.div`
  display: inline;
`;

const IconWrapper = styled.div`
  width: 144px;
  height: 144px;
  margin-left: auto;
`;

const Topline = styled.p`
  ${TextStyles.toplineS}
  color: #3e61ee;
  margin: 0;

  ${up('md')} {
    ${TextStyles.toplineR}
  }
`;

const Headline = styled.h2`
  ${TextStyles.headlineM}
  letter-spacing: -0.01em;
  color: #202840;
  margin: 12px 0 16px;

  ${up('md')} {
    margin: 16px 0 24px;
    ${TextStyles.headlineL}
  }
`;

const Metaline = styled.p<LargeProps>`
  ${TextStyles.textS}
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.5);
  margin-top: ${({ $large }) => ($large ? '32px' : '16px')};
`;

const HeaderBlockText = styled.p<LargeProps>`
  ${({ $large }) => ($large ? TextStyles.textSR : TextStyles.textS)};

  ${up('md')} {
    ${({ $large }) => ($large ? TextStyles.textR : TextStyles.textSR)};
  }
  margin: 16px 0 0;
  letter-spacing: -0.01em;
  color: #202840;

  ${up('md')} {
    margin: 24px 0 0;
  }
`;

export const HeaderBlock = (props: HeaderBlockProps) => {
  return (
    <BlockWrapper className={props.className}>
      <TextWrapper>
        <Topline>{props.topline}</Topline>
        <Headline>{props.headline}</Headline>
        {props.metaline && (
          <Metaline $large={props.large}>{props.metaline}</Metaline>
        )}
        <HeaderBlockText $large={props.large}>{props.children}</HeaderBlockText>
      </TextWrapper>
      {props.illustration && (
        <IconWrapper>
          <Illustration
            show={props.illustration}
            size={IllustrationSize.LARGE}
          />
        </IconWrapper>
      )}
    </BlockWrapper>
  );
};
