import React from 'react';
import customSatellytesComponents from './custom-components';
import rehypeReact from 'rehype-react';
import { Transformer } from 'unified';

/**
 * Render markdown based on a given html ast
 * instead of processing the raw markdown
 */

const renderAst: Transformer = new rehypeReact({
  createElement: React.createElement,
  components: customSatellytesComponents,
}).Compiler;

export const MarkdownAst = (props) => {
  return renderAst(props.htmlAst);
};
