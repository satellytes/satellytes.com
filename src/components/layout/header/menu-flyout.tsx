import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { HEADER_HEIGHT } from './header';
import Navigation from '../navigation/navigation';

const FullscreenOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: 999;

  top: ${() => HEADER_HEIGHT};
  bottom: ${(props) => (props.visible ? 0 : '-1000px')};
  left: 0;
  min-width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition: bottom 0.3s ease-out, visibility 0.3s ease-out;
`;

const ScrollContainer = styled.div`
  overflow-y: auto;
  overscroll-behavior-y: contain;
`;

const FullHeightNavigation = styled(Navigation)`
  min-height: 100%;
`;

const NoScrollBody = createGlobalStyle`
  body {
    overflow-y: hidden;
  }
`;

interface NavigationFlyoutProp {
  visible: boolean;
  onClick?: () => void;
  translation?: string;
  showLanguageSwitch?: boolean;
}

export const NavigationFlyout: React.FC<NavigationFlyoutProp> = (props) => {
  return (
    <FullscreenOverlay visible={props.visible} onClick={props.onClick}>
      <ScrollContainer>
        <FullHeightNavigation
          translation={props.translation}
          showLanguageSwitch={props.showLanguageSwitch}
        />
      </ScrollContainer>
      {props.visible && <NoScrollBody />}
    </FullscreenOverlay>
  );
};
