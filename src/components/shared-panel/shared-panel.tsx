import React from 'react';
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { IconEmail } from '../icons/social/email';
import { IconFacebook } from '../icons/social/facebook';
import { IconMessenger } from '../icons/social/messenger';
import { IconTwitter } from '../icons/social/twitter';
import { IconWhatsapp } from '../icons/social/whatsapp';

export interface AuthorCredentialsProps {
  facebookId: string;
}

const SharedPanelContainer = styled.div`
  color: #668cff;
  margin-top: 26px;
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
  &:last-of-type {
    margin-right: 0;
  }
`;

export const SharedPanel: React.FC<AuthorCredentialsProps> = ({
  facebookId,
}) => {
  const shareUrl = typeof window !== `undefined` ? window.location.href : '';
  const title = typeof window !== `undefined` ? window.document.title : '';

  return (
    <SharedPanelContainer>
      <SharedPanelText>Artikel teilen</SharedPanelText>
      <SocialLinks>
        <SocialLinkItem>
          <WhatsappShareButton url={shareUrl} title={title}>
            <IconWhatsapp />
          </WhatsappShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <FacebookMessengerShareButton appId={facebookId} url={shareUrl}>
            <IconMessenger />
          </FacebookMessengerShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <EmailShareButton url={shareUrl} subject={title} body="body">
            <IconEmail />
          </EmailShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <FacebookShareButton url={shareUrl} quote={title}>
            <IconFacebook />
          </FacebookShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <TwitterShareButton url={shareUrl} title={title}>
            <IconTwitter color="#668cff" />
          </TwitterShareButton>
        </SocialLinkItem>
      </SocialLinks>
    </SharedPanelContainer>
  );
};

export default SharedPanel;
