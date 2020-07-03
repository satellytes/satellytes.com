import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { HEADER_HEIGHT } from './header';
import Navigation, {
  NAVIGATION_HEIGHT_DESKTOP,
  NAVIGATION_HEIGHT_MOBILE,
} from '../navigation/navigation';
import { up } from '../breakpoint/breakpoint';

const slideInKeyframes = keyframes`
 0% {
   transform: translateY(10000px);
 }
 100% {
   transform: translateY(0);
 }
`;

const FullscreenOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: 999;

  /**
   * Because of unknown reasons, the imported variable needs to be
   * wrapped as function otherwise it's not working
   */
  top: ${() => HEADER_HEIGHT};
  left: 0;
  min-width: 100%;
  min-height: 100%;
  height: 100%;

  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: flex-end;

  animation: ${slideInKeyframes} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const ScrollContainer = styled.div`
  position: relative;
  height: 100%;
  overflow-y: auto;
  overscroll-behavior-y: contain;
`;

const NoScrollBody = createGlobalStyle`
  body {
    overflow-y: hidden;
  }
`;

const FullHeightNavigation = styled(Navigation)`
  height: 100%;
  min-height: ${NAVIGATION_HEIGHT_MOBILE};

  ${up('md')} {
    min-height: ${NAVIGATION_HEIGHT_DESKTOP};
  }
`;

interface NavigationFlyoutProp {
  visible: boolean;
  onClick: () => void;
}

export const NavigationFlyout: React.FC<NavigationFlyoutProp> = (props) => {
  return (
    <FullscreenOverlay visible={props.visible} onClick={props.onClick}>
      <ScrollContainer>
        <FullHeightNavigation />
      </ScrollContainer>
      {props.visible && <NoScrollBody />}
    </FullscreenOverlay>
  );
};
