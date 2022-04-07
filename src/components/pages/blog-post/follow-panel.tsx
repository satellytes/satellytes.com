import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { isBrowser } from '../../support/is-browser';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Icon } from '../../ui/icon/icon';
import { Link } from '../../legacy/links/links';

const RSS_FEED_URL = '/blog/rss.xml';

export interface ShareProps {
  title: string;
}

const FollowPanelContainer = styled.div`
  color: ${({ theme }) => theme.palette.text.header.light};
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

  color: ${({ theme }) => theme.palette.text.default};
`;

const SocialLinks = styled.ul`
  all: unset;
  order: 2;
  color: ${({ theme }) => theme.palette.text.link.default};

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
          <Link to={rssUrl}>
            <Icon show="rss" />
          </Link>
        </SocialLinkItem>
      </SocialLinks>
    </FollowPanelContainer>
  );
};

export default FollowPanel;
