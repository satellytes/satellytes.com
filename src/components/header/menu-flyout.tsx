import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { HEADER_HEIGHT } from './header';
import Navigation from '../navigation/navigation';

const FullscreenOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: 999;

  top: ${(props) => (props.visible ? HEADER_HEIGHT : '1000px')};
  left: 0;
  min-width: 100%;
  min-height: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  transition: top 0.2s ease-in, visibility 0.2s ease-in;
`;

const ScrollContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  overscroll-behavior-y: contain;
`;

const FullHeightNavigation = styled(Navigation)`
  min-height: 100%;

  /**
   * Because of unknown reasons, the imported variable needs to be
   * wrapped as function otherwise it's not working
   */
  padding-bottom: calc(${() => HEADER_HEIGHT});
`;

const NoScrollBody = createGlobalStyle`
  body {
    overflow-y: hidden;
  }
`;

interface NavigationFlyoutProp {
  visible: boolean;
  onClick?: () => void;
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
