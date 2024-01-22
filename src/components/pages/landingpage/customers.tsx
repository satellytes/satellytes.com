import React from 'react';
import { up } from '../../support/breakpoint';
import styled from 'styled-components';
import LogoSet, { CustomerLogoType } from './customer-logos/logo-set';

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

const CustomerLogoLayout = styled.div<{
  $mobileWidth: number;
  $desktopWidth: number;
}>`
  display: flex;
  align-items: center;

  width: ${({ $mobileWidth }) => $mobileWidth}px;
  ${up('md')} {
    width: ${({ $desktopWidth }) => $desktopWidth}px;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

interface CustomerLogoProps {
  show: CustomerLogoType;
  mobileWidth: number;
  desktopWidth: number;
}

const CustomerLogo = ({
  show,
  mobileWidth,
  desktopWidth,
}: CustomerLogoProps) => {
  const CustomerLogoSVG = LogoSet[show];

  return (
    <CustomerLogoLayout $mobileWidth={mobileWidth} $desktopWidth={desktopWidth}>
      <CustomerLogoSVG />
    </CustomerLogoLayout>
  );
};

const AriaCustomerLogo = () => {
  return (
    <ul
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0',
        listStyleType: 'none',
      }}
      aria-label={'Our Customers:'}
    >
      <li>Allianz</li>
      <li>Rosenbauer</li>
      <li>Media Markt</li>
      <li>Saturn</li>
      <li>Green City</li>
      <li>FC Bayern</li>
      <li>Zeiss</li>
      <li>A.D.A.C</li>
    </ul>
  );
};

export const Customers = () => {
  return (
    <LogosContainer>
      <AriaCustomerLogo />
      <LogoLine aria-hidden={true}>
        <CustomerLogo desktopWidth={330} mobileWidth={127} show="allianz" />
        <CustomerLogo desktopWidth={451} mobileWidth={176} show="rosenbauer" />
      </LogoLine>
      <LogoLine aria-hidden={true}>
        <CustomerLogo desktopWidth={403} mobileWidth={170} show="mediamarkt" />
        <CustomerLogo desktopWidth={285} mobileWidth={121} show="saturn" />
        <CustomerLogo desktopWidth={337} mobileWidth={156} show="greencity" />
      </LogoLine>
      <LogoLine aria-hidden={true}>
        <CustomerLogo desktopWidth={112} mobileWidth={48} show="fcbayern" />
        <CustomerLogo desktopWidth={92} mobileWidth={39} show="zeiss" />
        <CustomerLogo desktopWidth={324} mobileWidth={138} show="adac" />
      </LogoLine>
    </LogosContainer>
  );
};
