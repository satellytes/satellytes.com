import React from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { IconEmail } from '../icons/social/email';
import { IconFacebook } from '../icons/social/facebook';
import { IconLinkedIn } from '../icons/social/linkedin';
import { IconTwitter } from '../icons/social/twitter';
import { IconWhatsapp } from '../icons/social/whatsapp';
import { IconXing } from '../icons/social/xing';

const SharePanelContainer = styled.div`
  color: #668cff;
  margin-top: 80px;
  font-weight: bold;
  font-size: 16px;
`;

const SharePanelText = styled.p`
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

const XingShareButton = styled.a`
  margin: 0px;
`;

export const SharePanel: React.FC = () => {
  const isBrowser = typeof window !== `undefined`;
  const shareUrl = isBrowser ? window.location.href : '';
  const title = isBrowser ? window.document.title : '';
  const hashtags = ['Satellytes'];

  return (
    <SharePanelContainer>
      <SharePanelText>Artikel teilen</SharePanelText>
      <SocialLinks>
        <SocialLinkItem>
          <FacebookShareButton url={shareUrl} quote={title}>
            <IconFacebook />
          </FacebookShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <WhatsappShareButton url={shareUrl} title={title}>
            <IconWhatsapp />
          </WhatsappShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <EmailShareButton url={shareUrl} subject={title} body="body">
            <IconEmail />
          </EmailShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <TwitterShareButton url={shareUrl} title={title} hashtags={hashtags}>
            <IconTwitter color="#668cff" />
          </TwitterShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <LinkedinShareButton title={title} url={shareUrl}>
            <IconLinkedIn color="#668cff" />
          </LinkedinShareButton>
        </SocialLinkItem>
        <SocialLinkItem>
          <XingShareButton
            href={'https://www.xing.com/spi/shares/new?url=' + shareUrl}
            title={title}
            target="_blank"
          >
            <IconXing color="#668cff" />
          </XingShareButton>
        </SocialLinkItem>
      </SocialLinks>
    </SharePanelContainer>
  );
};

export default SharePanel;
