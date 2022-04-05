import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { isBrowser } from '../../support/is-browser';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { SimpleLink } from '../../legacy/markdown/custom-components';
import { theme } from '../../layout/theme';
import { Icon } from '../../ui/icon/icon';

const RSS_FEED_URL = '/blog/rss.xml';

interface FollowProps {
  className?: string;
}

const FollowPanelContainer = styled.div`
  color: ${theme.palette.text.header.light};
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

export const FollowPanel = ({ className }: FollowProps) => {
  const [rssUrl, setRssUrl] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (isBrowser()) {
      const rssURL = window.location.origin.concat(RSS_FEED_URL);
      setRssUrl(rssURL);
    }
  });

  return (
    <FollowPanelContainer className={className}>
      <PanelText>{t('blog.follow')}</PanelText>
      <SocialLinks>
        <SocialLinkItem data-testid="rss-feed">
          <SimpleLink href={rssUrl}>
            <Icon show="rss" />
          </SimpleLink>
        </SocialLinkItem>
      </SocialLinks>
    </FollowPanelContainer>
  );
};

export default FollowPanel;
