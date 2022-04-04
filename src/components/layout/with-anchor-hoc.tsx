import styled from 'styled-components';
import React, { useState } from 'react';
import { HEADER_HEIGHT } from './header/header';
import { onlyText } from '../support/only-text';
import { Icon } from '../ui/icon/icon';
import { up } from '../support/breakpoint';

const Wrapper = styled.div`
  margin-left: -24px;
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
  color: #000;
  display: inline-block;

  ${up('md')} {
    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  }
`;

export const WithAnchorHOC =
  (TitleComponent) =>
  // eslint-disable-next-line react/display-name
  ({ ...props }) => {
    const [hoverActive, setHoverActive] = useState(false);
    console.log(props);
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
