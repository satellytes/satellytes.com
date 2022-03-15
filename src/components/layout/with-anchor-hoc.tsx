import styled from 'styled-components';
import React from 'react';
import { HEADER_HEIGHT } from './header/header';

const oldGenerateAnchorId = (children) => {
  /*https://stackoverflow.com/questions/34204975/react-is-there-something-similar-to-node-textcontent*/
  const getNodeText = (node) => {
    if (['string', 'number'].includes(typeof node)) return node;
    if (node instanceof Array) return node.map(getNodeText).join('');
    if (typeof node === 'object' && node)
      return getNodeText(node.props.children);
  };

  return getNodeText(children)
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .join('-')
    .toLowerCase();
};

const ShareSymbol = styled.a`
  position: absolute;
  margin-left: -20px;
  scroll-margin-top: ${HEADER_HEIGHT};
`;

// eslint-disable-next-line react/display-name
export const WithAnchorHOC =
  (TitleComponent) =>
  ({ ...props }) => {
    return (
      <div>
        <ShareSymbol
          href={'#' + oldGenerateAnchorId(props.children)}
          id={oldGenerateAnchorId(props.children)}
        >
          #
        </ShareSymbol>
        <TitleComponent {...props} />
      </div>
    );
  };
