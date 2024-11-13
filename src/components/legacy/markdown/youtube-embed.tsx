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
  }

  div[data-service] .cll .c-l-b,
  div[data-service] .cll .c-la-b {
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    color: #ffffff;
    border-radius: 30px;
    cursor: pointer;
    background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);
    text-wrap: nowrap;
    width: fit-content;

    @media (max-width: 768px) {
      margin-left: 0;
      margin-bottom: 8px;
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
