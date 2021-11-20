import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { Illustration, IllustrationSize } from '../illustration/illustration';
import { IllustrationType } from '../illustration/illustration-set';
import { down, up } from '../breakpoint/breakpoint';
import { getMainProps } from 'gatsby-plugin-image/dist/src/components/hooks';

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

const TopLineR = css`
  font-weight: bold;
  font-size: 16px;
  line-height: 110%;
`;

const HeadlineXL = css`
  font-weight: bold;
  font-size: 48px;
  line-height: 110%;
`;

const TextS = css`
  font-size: 14px;
  line-height: 150%;
`;

const TextL = css`
  font-weight: normal;
  font-size: 20px;
  line-height: 150%;
`;

const Text = css`
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
`;

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
  ${TopLineR}
  color: #3e61ee;
  margin: 0;
`;

const Headline = styled.p<LargeProps>`
  ${HeadlineXL}
  letter-spacing: -0.01em;
  color: #202840;
  margin-top: 16px;
  margin-bottom: ${({ large }) => (large ? '32px' : '16px')};
`;

const Metaline = styled.p<LargeProps>`
  ${TextS}
  letter-spacing: -0.01em;
  color: rgba(0, 0, 0, 0.5);
  margin-top: ${({ large }) => (large ? '32px' : '16px')};
`;

const HeaderBlockText = styled.p<LargeProps>`
    ${({ large }) => (large ? TextL : Text)}}
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
