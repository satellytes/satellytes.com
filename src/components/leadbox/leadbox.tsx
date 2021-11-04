import React from 'react';
import styled from 'styled-components';
import {
  LeadboxSubtitle,
  LeadboxText,
  LeadBoxTitle,
} from '../typography/typography';
import { theme } from '../layout/theme';
import { Grid, GridItem } from '../grid/grid';
import { Link, LinkButton } from '../links/links';
import { down, up } from '../breakpoint/breakpoint';

export interface LeadboxProps {
  title: string;
  subtitle?: string;
  text?: string;
  mail?: string;
  link?: string;
  linkTo?: string;
  icon: JSX.Element;
}

const StyledLeadbox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  background-color: ${theme.palette.background.leadbox};
  color: ${theme.palette.text.default};

  width: 100%;
  padding: 120px 0 500px;
  margin-bottom: -380px;
  z-index: 0;

  ${up('md')} {
    padding-top: 80px;
    margin-bottom: -420px;
  }
`;

const StyledGrid = styled(Grid)`
  width: 100%;
`;

const Illustration = styled.div`
  position: absolute;
  top: -70px;

  ${down('md')} {
    left: 0;
    right: 0;
  }
`;

const Mail = styled(Link)`
  font-size: 14px;
  line-height: 150%;
  color: ${theme.palette.text.link.default};

  &:hover {
    border-bottom: 1px solid ${theme.palette.text.link.default};
  }
`;

const StyledLinkButton = styled(LinkButton)`
  margin-top: 16px;
`;

export const Leadbox: React.FC<LeadboxProps> = ({
  title,
  subtitle,
  text,
  mail,
  link,
  linkTo,
  icon,
}) => {
  return (
    <StyledLeadbox>
      <StyledGrid>
        <GridItem>
          <Illustration>{icon}</Illustration>
          <LeadBoxTitle>{title}</LeadBoxTitle>
          {subtitle && <LeadboxSubtitle>{subtitle}</LeadboxSubtitle>}
          {text && <LeadboxText>{text}</LeadboxText>}
          {mail && <Mail to={`mailto:${mail}`}>{mail}</Mail>}
          {linkTo && link && (
            <StyledLinkButton to={linkTo}>{link}</StyledLinkButton>
          )}
        </GridItem>
      </StyledGrid>
    </StyledLeadbox>
  );
};
