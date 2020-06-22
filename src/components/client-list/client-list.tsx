import React from 'react';
import styled, { css } from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { Link } from 'gatsby';
import { theme } from '../layout/theme';

interface ClientListProps {
  clients: [ClientListEntryProps];
}

interface ClientListEntryProps {
  title: string;
  timestamp: string;
  link: string;
}

const linkStyles = css`
  color: ${theme.palette.text.darkLinkColor.default};
  font-size: 20px;
  line-height: 110%;
  text-decoration: none;

  &:hover {
    color: ${theme.palette.text.darkLinkColor.hover};
  }
`;

const Wrapper = styled.div`
  /* 32px = 2 x 16px (padding of page layout) */
  width: calc(100% + 32px);
  margin-top: 80px;
  margin-bottom: 80px;
  margin-left: -16px;

  ${up('md')} {
    width: 100%;
    margin-top: 120px;
    margin-bottom: 160px;
    margin-left: 0;
  }
`;

const ClientListContainer = styled.ul`
  position: relative;
  margin: 0;
  padding: 0;
`;

const ClientListEntryWrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 24px 16px;
  border-width: 1px 0 0;
  border-style: solid;
  border-color: rgba(77, 121, 255, 0.2);

  &:last-of-type {
    border-width: 1px 0;
  }

  ${up('md')} {
    flex-direction: row;
    padding: 30px 23px 27px 24px;
  }
`;

const StyledTitle = styled(Link)`
  ${linkStyles}
  padding-right: 16px;
  margin-bottom: 8px;

  ${up('md')} {
    width: 312px;
    margin-bottom: 0;
  }
`;

const StyledTimestamp = styled.div`
  color: ${theme.palette.text.darkDefault};
  font-size: 16px;
  line-height: 110%;

  ${up('md')} {
    font-size: 20px;
  }
`;

const StyledArrow = styled(Link)`
  ${linkStyles}
  position: absolute;
  right: 15px;
  color: #4d79ff;
  margin-right: 12px;

  ${up('md')} {
    margin-right: 8px;
  }

  ${up('md')} {
    right: 23px;
    margin-right: 0;
  }
`;

const StyledOverviewLink = styled(Link)`
  ${linkStyles}
  display: block;
  margin-top: 30px;
  margin-left: 16px;
  color: #4d79ff;

  ${up('md')} {
    margin-left: 24px;
  }
`;

const ClientListEntry: React.FC<ClientListEntryProps> = ({
  title,
  timestamp,
  link,
}) => {
  return (
    <ClientListEntryWrapper>
      <StyledTitle to={link} title={`Show client: ${title}`}>
        {title}
      </StyledTitle>
      <StyledTimestamp>Since {timestamp}</StyledTimestamp>
      <StyledArrow to={link} title={`Show client: ${title}`}>
        &gt;
      </StyledArrow>
    </ClientListEntryWrapper>
  );
};

export const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  return (
    <Wrapper>
      <ClientListContainer>
        {clients.map(({ title, timestamp, link }) => (
          <ClientListEntry
            key={`${title}_${timestamp}`}
            title={title}
            timestamp={timestamp}
            link={link}
          />
        ))}
      </ClientListContainer>
      <StyledOverviewLink to="/clients" title="Show all clients">
        All Clients &gt;
      </StyledOverviewLink>
    </Wrapper>
  );
};
