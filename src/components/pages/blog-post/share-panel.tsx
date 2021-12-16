import React, { useEffect, useState } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { IconEmail } from '../../legacy/icons/social-icons/email';
import { IconFacebook } from '../../legacy/icons/social-icons/facebook';
import { LinkedinWrapper } from '../../legacy/icons/social-icons/linkedin';
import { TwitterWrapper } from '../../legacy/icons/social-icons/twitter';
import { IconWhatsapp } from '../../legacy/icons/social-icons/whatsapp';
import { XingWrapper } from '../../legacy/icons/social-icons/xing';
import { isBrowser } from '../../support/is-browser';
import { useTranslation } from 'gatsby-plugin-react-i18next';

export interface ShareProps {
  title: string;
}

const SharePanelContainer = styled.div`
  color: #668cff;
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
  margin: 0;
`;

export const SharePanel: React.FC<ShareProps> = ({ title }) => {
  const [shareUrl, setShareUrl] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (isBrowser()) {
      setShareUrl(window.location.href);
    }
  });
  const hashtags = ['Satellytes'];

  return (
    <SharePanelContainer>
      <SharePanelText>{t('blog.share')}</SharePanelText>
      <SocialLinks>
        <SocialLinkItem data-testid="facebook">
          <FacebookShareButton url={shareUrl} quote={title}>
            <IconFacebook />
          </FacebookShareButton>
        </SocialLinkItem>
        <SocialLinkItem data-testid="whatsapp">
          <WhatsappShareButton url={shareUrl} title={title}>
            <IconWhatsapp />
          </WhatsappShareButton>
        </SocialLinkItem>
        <SocialLinkItem data-testid="email">
          <EmailShareButton url={shareUrl} subject={title} body="body">
            <IconEmail />
          </EmailShareButton>
        </SocialLinkItem>
        <SocialLinkItem data-testid="twitter">
          <TwitterShareButton url={shareUrl} title={title} hashtags={hashtags}>
            <TwitterWrapper color="#668cff" />
          </TwitterShareButton>
        </SocialLinkItem>
        <SocialLinkItem data-testid="linkedin">
          <LinkedinShareButton title={title} url={shareUrl}>
            <LinkedinWrapper color="#668cff" />
          </LinkedinShareButton>
        </SocialLinkItem>
        <SocialLinkItem data-testid="xing">
          <XingShareButton
            href={'https://www.xing.com/spi/shares/new?url=' + shareUrl}
            title={title}
            target="_blank"
          >
            <XingWrapper color="#668cff" />
          </XingShareButton>
        </SocialLinkItem>
      </SocialLinks>
    </SharePanelContainer>
  );
};

export default SharePanel;
