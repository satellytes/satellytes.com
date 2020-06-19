import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  CloudinaryImageRenderer,
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

/* MonkeyPatch as currently markdown comments don't get ommitted by default.*/
const removeExcerptSeparator = (rawMarkdown: string): string => {
  const excerptSeperator = '<!-- end -->';
  const cleanedMarkdown = rawMarkdown.replace(excerptSeperator, '');

  return cleanedMarkdown;
};

export const Markdown: React.FC<MarkdownProps> = (props) => {
  return (
    <ReactMarkdown
      source={removeExcerptSeparator(props.data)}
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
        image: CloudinaryImageRenderer,
      }}
    />
  );
};
