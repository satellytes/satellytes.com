import React from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../typography';

interface YoutubeEmbedProps {
  videoId: string;
}

const YoutubeEmbedWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  margin-bottom: 24px;
  height: 0;
  max-width: 100%;

  @media (max-width: 480px) {
    padding-top: 75px;
  }

  --im-font-family: 'CocoGothic', sans-serif;

  div[data-service] {
    overflow: visible;
  }

  div[data-service] .cll .c-n-a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  div[data-service] .cll .c-n-t {
    ${TextStyles.textSR}
    @media (max-width: 480px) {
      ${TextStyles.textS}
      position: absolute;
      bottom: calc(100% + 8px);
      left: 0;
      text-align: left;
      color: black;
    }
  }

  div[data-service] .cll .c-l-b,
  div[data-service] .cll .c-la-b {
    ${TextStyles.textSR}
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    color: #ffffff;
    border-radius: 30px;
    cursor: pointer;
    background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);
    text-wrap: nowrap;
    width: fit-content;
    margin: 0;

    @media (max-width: 768px) {
      ${TextStyles.textS}
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
