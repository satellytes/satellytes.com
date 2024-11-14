import React from 'react';
import styled from 'styled-components';

interface YoutubeEmbedProps {
  videoId: string;
}

const YoutubeEmbedWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;

  --im-font-family: 'CocoGothic', sans-serif;

  div[data-service] .cll .c-n-a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  div[data-service] .cll .c-n-t {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }

  div[data-service] .cll .c-l-b,
  div[data-service] .cll .c-la-b {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
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
