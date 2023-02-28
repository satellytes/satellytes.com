import styled from 'styled-components';
import { up } from '../support/breakpoint';
import {
  CONTENT_SPACE_LARGE,
  CONTENT_SPACE_SMALL,
  HEADER_HEIGHT_VALUE,
  CONTENT_SPACE_LEFT_RIGHT,
} from './theme';

/**
 * Provide a container component that ensure the content is
 * properly spaced.
 *
 * Applies a smaller margin when it's the first child in the layout
 * to accommodate for the general header padding applied to the layout already.
 */
export const ContentBlockContainer = styled.div`
  margin-top: ${CONTENT_SPACE_SMALL}px;

  ${up('md')} {
    margin-top: ${CONTENT_SPACE_LARGE}px;
    padding: 0 ${CONTENT_SPACE_LEFT_RIGHT};
  }

  &:first-child {
    margin-top: ${CONTENT_SPACE_SMALL - HEADER_HEIGHT_VALUE}px;

    ${up('md')} {
      margin-top: ${CONTENT_SPACE_LARGE - HEADER_HEIGHT_VALUE}px;
    }
  }
`;
