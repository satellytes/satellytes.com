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
       * possible renderers:
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
