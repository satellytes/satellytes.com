import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navigation from '../navigation/navigation';

export const FLYOUT_Z_INDEX = 999;

const FullscreenOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: ${FLYOUT_Z_INDEX};

  bottom: ${(props) => (props.visible ? 0 : '-1000px')};
  left: 0;
  min-width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition: bottom 0.3s ease-out, visibility 0.3s ease-out;
`;

const BackgroundOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: 900;
  top: 0;
  left: 0;
  background-color: ${(props) =>
    props.visible ? 'rgba(0, 0, 0, 0.3)' : 'none'};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition: background-color 0.3s, visibility 0.3s ease-out;

  width: 100%;
  height: 100%;
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
  setIsNavigationVisible: (b: boolean) => void;
}

export const NavigationFlyout: React.FC<NavigationFlyoutProp> = (props) => {
  return (
    <>
      <FullscreenOverlay visible={props.visible} onClick={props.onClick}>
        <ScrollContainer>
          <FullHeightNavigation
            translation={props.translation}
            showLanguageSwitch={props.showLanguageSwitch}
          />
        </ScrollContainer>
        {props.visible && <NoScrollBody />}
      </FullscreenOverlay>
      <BackgroundOverlay
        visible={props.visible}
        onClick={() => props.setIsNavigationVisible(false)}
      />
    </>
  );
};
