import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { Illustration, IllustrationSize } from '../illustration/illustration';
import { down, up } from '../breakpoint/breakpoint';

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
  ${down('sm')} {
    margin-left: auto;
  }
`;

const Topline = styled.p`
  ${TopLineR}
  color: #3e61ee;
  margin: 0;
`;

const HeaderBlock = (props) => {
  const HeaderBlockText = styled.p`
    ${props.large ? TextL : Text}}
    letter-spacing: -0.01em;
    color: #202840;
    margin-top: 32px;
  `;

  const Headline = styled.p`
    ${HeadlineXL}
    letter-spacing: -0.01em;
    color: #202840;
    margin-top: 16px;
    margin-bottom: ${props.large ? '32px' : '16px'};
  `;

  const Timestamp = styled.p`
    ${TextS}
    letter-spacing: -0.01em;
    color: rgba(0, 0, 0, 0.5);
    margin-top: ${props.large ? '32px' : '16px'};
    margin-bottom: 32px;
  `;

  return (
    <BlockWrapper>
      <TextWrapper>
        <Topline>{props.topline}</Topline>
        <Headline>{props.headline}</Headline>
        {(props.date || props.author) && (
          <Timestamp>
            {props.date}
            {props.date && props.author && ' · '}
            {props.author}
          </Timestamp>
        )}
        <HeaderBlockText>{props.children}</HeaderBlockText>
      </TextWrapper>
      <IconWrapper>
        <Illustration show={props.illustration} size={IllustrationSize.LARGE} />
      </IconWrapper>
    </BlockWrapper>
  );
};

export default HeaderBlock;
