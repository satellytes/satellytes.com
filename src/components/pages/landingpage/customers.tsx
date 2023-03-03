import React from 'react';
import { ContentfulCustomerLogo } from '../../../types';
import { up } from '../../support/breakpoint';
import styled from 'styled-components';

interface CustomersProps {
  logos: ContentfulCustomerLogo[];
}

const LogosContainer = styled.div`
  grid-column: 1 / 4;
  display: flex;
  background-color: #f7f8fa;
  margin-top: 80px;
  padding: 60px 24px;
  flex-direction: column;
  gap: 24px;
  ${up('md')} {
    margin-top: 120px;
    padding: 120px 24px;
    gap: 80px;
  }
`;

const LogoLine = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  ${up('md')} {
    gap: 80px;
  }
`;

const Logo = styled.img<{ mobileWidth: number; desktopWidth: number }>`
  width: ${({ mobileWidth }) => mobileWidth}px;

  ${up('md')} {
    width: ${({ desktopWidth }) => desktopWidth}px;
  }
`;

export const Customers = ({ logos }: CustomersProps) => {
  const Logos = logos.map((logo) => (
    <Logo
      src={logo.logo.url}
      mobileWidth={logo.mobileWidth}
      desktopWidth={logo.desktopWidth}
      key={logo.id}
      alt={logo.name + ' Logo'}
    />
  ));

  return (
    <LogosContainer>
      <LogoLine>
        {Logos[0]}
        {Logos[1]}
      </LogoLine>
      <LogoLine>
        {Logos[2]}
        {Logos[3]}
        {Logos[4]}
      </LogoLine>
      <LogoLine>
        {Logos[5]}
        {Logos[6]}
        {Logos[7]}
      </LogoLine>
    </LogosContainer>
  );
};
