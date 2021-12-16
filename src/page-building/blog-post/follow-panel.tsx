import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { up } from '../../components/style-utils/breakpoint';
import { isBrowser } from '../../components/util/is-browser';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { IconRSS } from './social-icons/rss';
import { SimpleLink } from '../../components/markdown/custom-components';

const RSS_FEED_URL = '/blog/rss.xml';

export interface ShareProps {
  title: string;
}

const FollowPanelContainer = styled.div`
  color: #668cff;
  margin-top: 48px;
  font-weight: bold;
  font-size: 16px;

  ${up('md')} {
    margin-top: 0px;
    min-width: 240px;
  }
`;

export const PanelText = styled.p`
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

export const FollowPanel: React.FC = () => {
  const [rssUrl, setRssUrl] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (isBrowser()) {
      const rssURL = window.location.origin.concat(RSS_FEED_URL);
      setRssUrl(rssURL);
    }
  });

  return (
    <FollowPanelContainer>
      <PanelText>{t('blog.follow')}</PanelText>
      <SocialLinks>
        <SocialLinkItem data-testid="rss-feed">
          <SimpleLink href={rssUrl}>
            <IconRSS />
          </SimpleLink>
        </SocialLinkItem>
      </SocialLinks>
    </FollowPanelContainer>
  );
};

export default FollowPanel;
