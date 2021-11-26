import React from 'react';
import styled from 'styled-components';
import { Illustration, IllustrationSize } from '../illustration/illustration';
import { IllustrationType } from '../illustration/illustration-set';
import { down } from '../breakpoint/breakpoint';
import { TextStyles } from '../typography/typography-v2';

interface HeaderBlockProps {
  topline: string;
  headline: string;
  metaline: string;
  children: string;
  large: boolean;
  illustration?: IllustrationType | null;
}

interface LargeProps {
  large: boolean;
}

const BlockWrapper = styled.div`
  display: flex;
  ${down('sm')} {
    flex-direction: column;
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
  ${TextStyles.toplineR}
  color: #3e61ee;
  margin: 0;
`;

const Headline = styled.p<LargeProps>`
  ${TextStyles.headlineXL}
  letter-spacing: -0.01em;
  color: #202840;
  margin-top: 16px;
  margin-bottom: ${({ large }) => (large ? '32px' : '16px')};
`;

const Metaline = styled.p<LargeProps>`
  ${TextStyles.textS}
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.5);
  margin-top: ${({ large }) => (large ? '32px' : '16px')};
`;

const HeaderBlockText = styled.p<LargeProps>`
    ${({ large }) => (large ? TextStyles.textL : TextStyles.textR)}}
    letter-spacing: -0.01em;
    color: #202840;
    margin-top: 32px;

    ${down('sm')} {
      margin-top: 24px;
    }
  `;

const HeaderBlock = (props: HeaderBlockProps) => {
  return (
    <BlockWrapper>
      <TextWrapper>
        <Topline>{props.topline}</Topline>
        <Headline large={props.large}>{props.headline}</Headline>
        {props.metaline && (
          <Metaline large={props.large}>{props.metaline}</Metaline>
        )}
        <HeaderBlockText large={props.large}>{props.children}</HeaderBlockText>
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

export default HeaderBlock;
