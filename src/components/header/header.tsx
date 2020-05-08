import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

interface HeaderProps {
  siteTitle: string;
  light?: boolean;
}

const StyledHeader = styled.header<{ light: boolean }>`
  padding: 16px 24px;

  border-bottom: ${(props) =>
    props.light
      ? '1px solid rgba(255, 255, 255, 0.1)'
      : '1px solid rgba(32, 40, 64, 0.05)'};
`;

/**
 * We need to pass in a number instead of a boolean, otherwise we get an error
 * from styled components. GatsbyLink is passing all properties down to the DOM
 * and has therefore problems with a boolean.
 *
 * Issue: https://github.com/styled-components/styled-components/issues/1198
 */
const StyledLink = styled(Link)<{ light: number }>`
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;

  color: ${(props) =>
    props.light === 1
      ? props.theme.palette.text.headerLight
      : props.theme.palette.text.header};
`;

const Header: React.FC<HeaderProps> = (props) => (
  <StyledHeader light={Boolean(props.light)}>
    <div>
      <StyledLink to="/" light={props.light ? 1 : 0}>
        {props.siteTitle}
      </StyledLink>
    </div>
  </StyledHeader>
);

export default Header;
