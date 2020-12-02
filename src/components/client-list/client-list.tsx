import React from 'react';
import styled, { css } from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { theme } from '../layout/theme';
import { GRID_GAP_MOBILE } from '../grid/grid';
import { formatDate } from '../util/format-date';
import { InternalLink } from '../links/links';

const linkStyles = css`
  color: ${theme.palette.text.link.default};
  font-size: 20px;
  line-height: 110%;
`;

const Wrapper = styled.div`
  width: calc(100% + 2 * ${() => GRID_GAP_MOBILE});
  margin-left: -${() => GRID_GAP_MOBILE};
  margin-bottom: 160px;
  margin-top: 40px;

  ${up('md')} {
    width: 100%;
    margin-left: 0;
    margin-top: 120px;
  }
`;

const ClientListContainer = styled.ul`
  position: relative;
  margin: 0;
  padding: 0;
`;

const ClientListEntryLi = styled.li`
  border-width: 1px 0 0;
  border-style: solid;
  border-color: rgba(77, 121, 255, 0.2);

  list-style: none;

  &:last-of-type {
    border-width: 1px 0;
  }
`;

const ClientListEntryLink = styled(InternalLink)`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 24px 16px;

  ${up('md')} {
    flex-direction: row;
    padding: 30px 23px 27px 24px;
  }

  transition: background-color 0.3s;
  :hover {
    background-color: ${(props) =>
      props.theme.palette.text.contrastLink.hoverTransparent};
  }
`;

const StyledTitle = styled.div`
  ${linkStyles};
  padding-right: 16px;
  margin-bottom: 8px;

  ${up('md')} {
    width: 312px;
    margin-bottom: 0;
  }
`;

const StyledTimestamp = styled.div`
  color: ${theme.palette.text.defaultDark};
  font-size: 16px;
  line-height: 110%;

  ${up('md')} {
    font-size: 20px;
  }
`;

const StyledArrow = styled.div`
  ${linkStyles};
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

const StyledOverviewLink = styled(InternalLink)`
  ${linkStyles};
  display: block;
  margin-top: 30px;
  margin-left: 16px;
  transition: color 0.3s;

  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.contrastLink.default};

  :hover {
    color: ${(props) => props.theme.palette.text.contrastLink.hover};
  }

  :hover {
    color: ${theme.palette.text.contrastLink.hover};
  }

  ${up('md')} {
    margin-left: 24px;
  }
`;

interface ClientListEntryProps {
  name: string;
  start: string;
  path: string;
}

const ClientListEntry: React.FC<ClientListEntryProps> = ({
  name,
  start,
  path,
}) => {
  return (
    <ClientListEntryLi>
      <ClientListEntryLink to={path}>
        <StyledTitle title={`Show client: ${name}`}>{name}</StyledTitle>
        <StyledTimestamp>Seit {formatDate(start, 'MMMM y')}</StyledTimestamp>
        <StyledArrow title={`Show client: ${name}`}>&gt;</StyledArrow>
      </ClientListEntryLink>
    </ClientListEntryLi>
  );
};

interface ClientListProps {
  clients: ClientListEntryProps[];
}

export const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  return (
    <Wrapper>
      <ClientListContainer>
        {clients.map(({ name, start, path }) => (
          <ClientListEntry
            key={`${name}_${start}`}
            name={name}
            start={start}
            path={path}
          />
        ))}
      </ClientListContainer>
      <StyledOverviewLink to="/clients" title="Show all clients">
        Zu den Kunden &gt;
      </StyledOverviewLink>
    </Wrapper>
  );
};
