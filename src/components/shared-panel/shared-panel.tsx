import React from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';

export interface AuthorCredentialsProps {
  facebookId: string;
}

const SharedPanelContainer = styled.div`
  color: #668cff;
  margin-top: 80px;
  font-weight: bold;
  font-size: 16px;
`;

const SharedPanelText = styled.p`
  font-weight: bold;
  font-size: 16px;
`;

const SocialLinks = styled.ul`
  all: unset;
  order: 2;

  ${up('md')} {
    order: 1;
    margin-bottom: 20px;
  }
`;

const SocialLinkItem = styled.li`
  display: inline-block;
  margin-right: 16px;
  cursor: pointer;
  color: #4d79ff;
  &:last-of-type {
    margin-right: 0;
  }
`;

export const SharedPanel: React.FC<AuthorCredentialsProps> = ({
  facebookId,
}) => {
  const shareUrl = 'https://satellytes-website-new.netlify.app';
  const title = 'Satellytes';
  const iconSize = 24;
  return (
    <SharedPanelContainer>
      <SharedPanelText>Artikel teilen</SharedPanelText>
      <SocialLinks>
        <SocialLinkItem>
          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={iconSize} round={true} />
          </WhatsappShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <FacebookMessengerShareButton appId={facebookId} url={shareUrl}>
            <FacebookMessengerIcon size={iconSize} round={true} />
          </FacebookMessengerShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <EmailShareButton url={shareUrl} subject={title} body="body">
            <EmailIcon size={iconSize} />
          </EmailShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={iconSize} borderRadius={5} />
          </FacebookShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={iconSize} round={true} />
          </TwitterShareButton>
        </SocialLinkItem>
      </SocialLinks>
    </SharedPanelContainer>
  );
};

export default SharedPanel;
