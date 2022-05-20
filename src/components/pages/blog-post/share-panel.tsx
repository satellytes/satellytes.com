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
import { isBrowser } from '../../support/is-browser';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { theme } from '../../layout/theme';
import { Icon } from '../../ui/icon/icon';

export interface ShareProps {
  title: string;
}

const SharePanelContainer = styled.div`
  color: ${theme.palette.text.header.light};
  font-weight: bold;
  font-size: 16px;
`;

const SharePanelText = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: ${theme.palette.text.default};
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
            <Icon show="facebook" />
          </FacebookShareButton>
        </SocialLinkItem>
        <SocialLinkItem data-testid="whatsapp">
          <WhatsappShareButton url={shareUrl} title={title}>
            <Icon show="whatsapp" />
          </WhatsappShareButton>
        </SocialLinkItem>
        <SocialLinkItem data-testid="email">
          <EmailShareButton url={shareUrl} subject={title} body="body">
            <Icon show="email" />
          </EmailShareButton>
        </SocialLinkItem>
        <SocialLinkItem data-testid="twitter">
          <TwitterShareButton url={shareUrl} title={title} hashtags={hashtags}>
            <Icon show="twitter" />
          </TwitterShareButton>
        </SocialLinkItem>
        <SocialLinkItem data-testid="linkedin">
          <LinkedinShareButton title={title} url={shareUrl}>
            <Icon show="linked_in" />
          </LinkedinShareButton>
        </SocialLinkItem>
      </SocialLinks>
    </SharePanelContainer>
  );
};

export default SharePanel;
