import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

interface HeaderProps {
  siteTitle: string;
}

const StyledHeader = styled.header`
  padding: 20px 24px 14px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Header: React.FC<HeaderProps> = ({ siteTitle = '' }) => (
  <StyledHeader>
    <div>
      <Link
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        {siteTitle}
      </Link>
    </div>
  </StyledHeader>
);

export default Header;
