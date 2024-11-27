import React from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../typography';
import { resetButton } from '../../support/css-helpers';

interface YoutubeEmbedProps {
  videoId: string;
}

const YoutubeEmbedWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  margin-bottom: 24px;
  height: 0;

  /* button container */
  div[data-service] .cll .c-n-a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 18px;
  }

  /* legal text */
  .cc-text {
    font-family: 'CocoGothic', sans-serif;
    ${TextStyles.textXS};
  }

  /* buttons */
  div[data-service] .cll .c-l-b,
  div[data-service] .cll .c-la-b {
    ${resetButton}
    ${TextStyles.toplineS}  
    font-family: 'CocoGothic', sans-serif;
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 30px;
    background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);
    text-wrap: nowrap;
    color: #ffffff;

    transition: unset;

    &:hover {
      background: #3e61ee;
    }

    &::before {
      content: unset;
    }
  }
`;

export const YoutubeEmbed = ({ videoId }: YoutubeEmbedProps) => {
  return (
    <YoutubeEmbedWrapper>
      <div
        data-service="youtube"
        data-id={videoId}
        data-autoscale=""
        data-iframe-id={`youtube-${videoId}`}
        data-iframe-loading="lazy"
        data-iframe-frameborder="0"
      />
    </YoutubeEmbedWrapper>
  );
};
