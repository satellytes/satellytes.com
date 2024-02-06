import React from 'react';
import { SectionHeader } from '../../content/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { Link } from '../../legacy/links/links';
import { theme } from '../../layout/theme';

const StyledLink = styled(Link)`
  color: ${theme.palette.text.link.default};

  &:hover {
    border-bottom: 1px solid ${theme.palette.text.link.default};
  }
`;

export const Address = () => {
  const { t } = useTranslation();

  return (
    <SectionHeader
      headline={t('contact.address')}
      kicker={t('contact.title')}
      kickerAs={'h1'}
    >
      Satellytes Digital Consulting GmbH
      <br />
      Sendlinger Straße 52
      <br />
      80331 München
      <br />
      <br />
      <StyledLink
        to="https://g.page/satellytes?share"
        aria-label={'Open Satellytes Google Maps profile in a new tab'}
      >
        Google Maps &gt;
      </StyledLink>
    </SectionHeader>
  );
};
