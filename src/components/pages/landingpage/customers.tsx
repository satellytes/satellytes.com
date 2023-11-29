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

export const Customers = () => {
  return (
    <LogosContainer>
      <LogoLine>
        <CustomerLogo desktopWidth={330} mobileWidth={127} show="allianz" />
        <CustomerLogo desktopWidth={451} mobileWidth={176} show="rosenbauer" />
      </LogoLine>
      <LogoLine>
        <CustomerLogo desktopWidth={403} mobileWidth={170} show="mediamarkt" />
        <CustomerLogo desktopWidth={285} mobileWidth={121} show="saturn" />
        <CustomerLogo desktopWidth={337} mobileWidth={156} show="greencity" />
      </LogoLine>
      <LogoLine>
        <CustomerLogo desktopWidth={112} mobileWidth={48} show="fcbayern" />
        <CustomerLogo desktopWidth={92} mobileWidth={39} show="zeiss" />
        <CustomerLogo desktopWidth={324} mobileWidth={138} show="adac" />
      </LogoLine>
    </LogosContainer>
  );
};
