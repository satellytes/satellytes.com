import React from 'react';
import styled, { css } from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { theme } from '../layout/theme';
import { GRID_GAP_MOBILE } from '../grid/grid';
import { formatDate } from '../util/format-date';
import { Link, LinkButton } from '../links/links';
import { RightArrowIcon } from '../icons/buttons-icons/right-arrow';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';

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
  border-color: rgba(255, 255, 255, 0.1);

  list-style: none;

  &:last-of-type {
    border-width: 1px 0;
  }
`;

const ClientListEntryLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 24px 16px;

  ${up('md')} {
    flex-direction: row;
    padding: 30px 23px 27px 24px;
  }

  transition: background-color 0.2s;

  svg {
    transition: transform 0.2s ease-in;
  }

  :hover {
    background-color: ${(props) =>
      props.theme.palette.text.contrastLink.hoverTransparent};

    svg {
      transform: translateX(2px);
    }
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

const ClientListLinkButton = styled(LinkButton)`
  margin-top: 32px;
  margin-left: 16px;

  ${up('md')} {
    margin-left: 0;
  }
`;

interface ClientListEntryProps {
  name: string;
  nameEN: string;
  start: string;
  path: string;
}

const ClientListEntry: React.FC<ClientListEntryProps> = ({
  name,
  nameEN,
  start,
  path,
}) => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const localizedName = 'en' === language ? nameEN : name;
  return (
    <ClientListEntryLi>
      <ClientListEntryLink to={path}>
        <StyledTitle title={`Show client: ${localizedName}`}>
          {localizedName}
        </StyledTitle>
        <StyledTimestamp>
          {t('clients.since')} {formatDate(start, 'MMMM y', language)}
        </StyledTimestamp>
        <StyledArrow title={`Show client: ${localizedName}`}>
          <RightArrowIcon />
        </StyledArrow>
      </ClientListEntryLink>
    </ClientListEntryLi>
  );
};

interface ClientListProps {
  clients: ClientListEntryProps[];
}

export const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <ClientListContainer>
        {clients.map(({ name, nameEN, start, path }) => (
          <ClientListEntry
            key={`${name}_${start}`}
            name={name}
            nameEN={nameEN}
            start={start}
            path={path}
          />
        ))}
      </ClientListContainer>
      <ClientListLinkButton to="/clients/" title="Show all clients">
        {t('clients.title')}
      </ClientListLinkButton>
    </Wrapper>
  );
};
