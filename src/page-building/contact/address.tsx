import React from 'react';
import { ContentBlockContainer } from '../../components/layout/content-block-container';
import { SectionHeader } from '../../new-components/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { Link } from '../../components/links/links';
import { theme } from '../../components/layout/theme';

const StyledLink = styled(Link)`
  color: ${theme.palette.text.link.default};

  &:hover {
    border-bottom: 1px solid ${theme.palette.text.link.default};
  }
`;

export const Address = () => {
  const { t } = useTranslation();

  return (
    <ContentBlockContainer>
      <SectionHeader
        headline={t('contact.address')}
        kicker={t('contact.title')}
      >
        Satellytes Digital Consulting GmbH
        <br />
        Sendlinger Straße 52
        <br />
        80331 München
        <br />
        <br />
        <StyledLink to="https://g.page/satellytes?share">
          Google Maps &gt;
        </StyledLink>
      </SectionHeader>
    </ContentBlockContainer>
  );
};
