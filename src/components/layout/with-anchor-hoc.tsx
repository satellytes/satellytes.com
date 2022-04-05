import styled from 'styled-components';
import React, { useState } from 'react';
import { HEADER_HEIGHT } from './header/header';
import { onlyText } from '../support/only-text';
import { Icon } from '../ui/icon/icon';
import { up } from '../support/breakpoint';
import { theme } from './theme';

const Wrapper = styled.div`
  margin-left: -24px;
  display: flex;
  align-items: center;
`;

const generateAnchorId = (children) => {
  return onlyText(children)
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .join('-')
    .toLowerCase();
};

const ShareSymbol = styled.a<{ visible }>`
  scroll-margin-top: ${HEADER_HEIGHT};
  color: ${theme.palette.text.default};
  opacity: 0.3;

  ${up('md')} {
    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  }

  &:hover {
    opacity: 1;
  }
`;

export const WithAnchorHOC =
  (TitleComponent) =>
  // eslint-disable-next-line react/display-name
  ({ ...props }) => {
    const [hoverActive, setHoverActive] = useState(false);

    return (
      <Wrapper
        onMouseEnter={() => setHoverActive(true)}
        onMouseLeave={() => setHoverActive(false)}
      >
        <ShareSymbol
          href={'#' + generateAnchorId(props.children)}
          id={generateAnchorId(props.children)}
          visible={hoverActive}
        >
          <Icon show={'anchor'} />
        </ShareSymbol>
        <TitleComponent {...props} />
      </Wrapper>
    );
  };
