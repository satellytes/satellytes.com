import styled from 'styled-components';
import { HeaderBlock } from '../../content/header-block/header-block';
import { generateAnchorId } from '../../layout/with-anchor-hoc';
import { up } from '../../support/breakpoint';

const SERVICE_PAGE_RESOURCE = '/services';

export const HomePageHeaderBlock = styled(HeaderBlock)`
  margin-bottom: 48px;
  ${up('md')} {
    margin-bottom: 60px;
  }
`;

export const getAnchorLinkFromTitle = (title: string): string => {
  return SERVICE_PAGE_RESOURCE + '#' + generateAnchorId(title);
};
