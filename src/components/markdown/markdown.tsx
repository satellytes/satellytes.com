import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  CodeRender,
  HeadingRenderer,
  InlineCodeRenderer,
  TextRenderer,
} from './renderers';

interface MarkdownProps {
  /**
   * the actual markdown text
   */
  data: string;
}

export const Markdown: React.FC<MarkdownProps> = (props) => {
  return (
    <ReactMarkdown
      source={props.data}
      /**
       * Custom renderers/components mapping can be defined here. If a component
       * is not mapped to a node, the node will be rendererd with the default
       * fallback. All nodes and their fallback can be viewed here:
       *
       *  - https://github.com/rexxars/react-markdown#node-types
       */
      renderers={{
        paragraph: TextRenderer,
        heading: HeadingRenderer,
        code: CodeRender,
        inlineCode: InlineCodeRenderer,
      }}
    />
  );
};
