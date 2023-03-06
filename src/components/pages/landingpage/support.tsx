import styled from 'styled-components';
import { HeaderBlock } from '../../content/header-block/header-block';
import { up } from '../../support/breakpoint';

export const HomePageHeaderBlock = styled(HeaderBlock)`
  margin-bottom: 48px;
  ${up('md')} {
    margin-bottom: 60px;
  }
`;
