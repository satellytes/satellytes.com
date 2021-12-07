import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { HEADER_HEIGHT } from '../header/header';

export const ContentBlockContainer = styled.div`
  margin-top: 80px;

  ${up('md')} {
    margin-top: 180px;
  }
`;

export const ContentBlockContainerWithoutHero = styled.div`
  margin-top: calc(80px + ${HEADER_HEIGHT});

  ${up('md')} {
    margin-top: calc(180px + ${HEADER_HEIGHT});
  }
`;
