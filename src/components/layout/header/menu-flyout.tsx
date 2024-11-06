import React, { useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Navigation from '../navigation/navigation';

export const FLYOUT_Z_INDEX = 999;
const BACKGROUND_Z_INDEX = 900;

const FullscreenOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  z-index: ${FLYOUT_Z_INDEX};

  bottom: ${(props) => (props.$visible ? 0 : '-1000px')};
  left: 0;
  min-width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
  transition:
    bottom 0.3s ease-out,
    visibility 0.3s ease-out;
`;

const BackgroundOverlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  z-index: ${BACKGROUND_Z_INDEX};
  top: 0;
  left: 0;
  background-color: ${(props) =>
    props.$visible ? 'rgba(0, 0, 0, 0.3)' : 'none'};
  visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
  transition:
    background-color 0.3s,
    visibility 0.3s ease-out;

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
  burgerRef: React.RefObject<HTMLButtonElement>;
}

export const NavigationFlyout: React.FC<NavigationFlyoutProp> = (props) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preventFocusOfNonFlyoutContent = (visible: boolean) => {
      const focusableElements = overlayRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) as NodeListOf<HTMLElement>;

      const firstFocusableElement = focusableElements?.[0];
      const lastFocusableElement =
        focusableElements?.[focusableElements.length - 1];

      const handleFocus = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') {
          return;
        }
        const shiftKeyPressed = event.shiftKey;
        const activeElement = document.activeElement;
        const burgerElement = props.burgerRef.current;
        if (shiftKeyPressed && activeElement === burgerElement) {
          lastFocusableElement?.focus();
          event.preventDefault();
        }
        if (!shiftKeyPressed && activeElement === burgerElement) {
          firstFocusableElement?.focus();
          event.preventDefault();
        }
        if (shiftKeyPressed && activeElement === firstFocusableElement) {
          burgerElement?.focus();
          event.preventDefault();
        }
        if (!shiftKeyPressed && activeElement === lastFocusableElement) {
          burgerElement?.focus();
          event.preventDefault();
        }
      };

      if (visible) {
        document.addEventListener('keydown', handleFocus);
      } else {
        document.removeEventListener('keydown', handleFocus);
      }

      return () => {
        document.removeEventListener('keydown', handleFocus);
      };
    };

    preventFocusOfNonFlyoutContent(props.visible);
  }, [props.visible]);

  return (
    <>
      <FullscreenOverlay
        ref={overlayRef}
        $visible={props.visible}
        onClick={props.onClick}
        aria-hidden={!props.visible}
      >
        <ScrollContainer>
          <FullHeightNavigation
            translation={props.translation}
            showLanguageSwitch={props.showLanguageSwitch}
          />
        </ScrollContainer>
        {props.visible && <NoScrollBody />}
      </FullscreenOverlay>
      <BackgroundOverlay
        $visible={props.visible}
        onClick={() => props.setIsNavigationVisible(false)}
      />
    </>
  );
};
