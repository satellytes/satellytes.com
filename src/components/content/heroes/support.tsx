import styled, { css } from 'styled-components';
import { up } from '../../support/breakpoint';
import { rgba } from 'polished';
import { HeroText, HeroWithText } from './hero-text';
import React from 'react';
import { theme } from '../../layout/theme';

/**
 * Provide the default space we want to give to heroes.
 * All heroes should use this container.
 *
 * We use the beautiful technique of using the grid
 * to spread the content over the full available width.
 * That way we don't need any position absolute & friends.
 * */
export const HeroContainer = styled.div<{ naturalHeight?: boolean }>`
  display: grid;

  ${({ naturalHeight }) =>
    !naturalHeight &&
    css`
      height: 520px;

      ${up('md')} {
        height: 640px;
      }
    `}

  background-color: ${theme.palette.background.hero};

  overflow: hidden;
  /**
   make sure everything in the hero is always on its own stacking context
   not to conflict with the global context
   */
  isolation: isolate;
  position: relative;
`;

interface TextContainerProps {
  dimmed?: boolean;
}

/**
 * Combined with `HeroContainer` this will give any text the appropriate space
 * within the hero aligned to the main content (by using the same grid template)
 * The background can be optionally dimmed/
 */
export const TextContainer = styled.div<TextContainerProps>`
  grid-area: 1/1;
  display: grid;
  grid-template-columns:
    [main-start] minmax(24px, 1fr)
    [content-start] minmax(0, 820px) [content-end]
    minmax(24px, 1fr) [main-end];

  > * {
    grid-column: content;
  }

  align-items: end;

  ${({ dimmed }) =>
    dimmed &&
    css`
      background-color: ${rgba('#000000', 0.2)};
    `}
`;

export const Hero = ({ title, children }: HeroWithText) => (
  <HeroContainer>
    {title && (
      <TextContainer>
        <HeroText title={title}>{children}</HeroText>
      </TextContainer>
    )}
  </HeroContainer>
);
