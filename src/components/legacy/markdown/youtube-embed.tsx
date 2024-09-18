import React, { useContext } from 'react';
import styled from 'styled-components';
import { theme } from '../../layout/theme';
import { Button } from '../../ui/buttons/button';
import { TextStyles } from '../../typography';
import YouTubeConsentContext from '../../../context/youtube-consent-context';
import { Link } from '../links/links';

interface YoutubeEmbedProps {
  videoId: string;
}

// how to make iframe responsive: https://stackoverflow.com/questions/17838607/making-an-iframe-responsive
const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const YoutubeEmbedWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
`;

const YouTubePrivacyBannerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 16px;
  gap: 16px;
  background-color: ${theme.palette.background.card};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LegalText = styled.p`
  ${TextStyles.label}
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: fit-content;
`;

const SyledLink = styled(Link)`
  color: ${theme.palette.text.link.default};

  &:hover {
    border-bottom: 1px solid ${theme.palette.text.link.default};
  }
`;

export const YoutubeEmbed = ({ videoId }: YoutubeEmbedProps) => {
  const { consentGiven, giveConsent } = useContext(YouTubeConsentContext);

  return (
    <YoutubeEmbedWrapper>
      {consentGiven ? (
        <StyledIframe
          title="YouTube video player"
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></StyledIframe>
      ) : (
        <YouTubePrivacyBanner giveConsent={giveConsent} />
      )}
    </YoutubeEmbedWrapper>
  );
};

const YouTubePrivacyBanner = ({ giveConsent }) => {
  return (
    <YouTubePrivacyBannerWrapper>
      <LegalText>
        By clicking on &quot;Show YouTube Content&quot; you accept{' '}
        <SyledLink to={'https://policies.google.com/privacy?hl=en'}>
          YouTube&apos;s privacy policy
        </SyledLink>
        .
      </LegalText>
      <StyledButton onClick={giveConsent}>Show YouTube Content</StyledButton>
    </YouTubePrivacyBannerWrapper>
  );
};
