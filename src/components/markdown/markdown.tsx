import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  BlockquoteRenderer,
  CloudinaryImageRenderer,
  CodeRender,
  HeadingRenderer,
  InlineCodeRenderer,
  LinkRenderer,
  TextRenderer,
} from './renderers';

/* MonkeyPatch as currently markdown comments don't get ommitted by default.*/
const removeExcerptSeparator = (rawMarkdown: string): string => {
  const excerptSeperator = '<!-- end -->';
  const cleanedMarkdown = rawMarkdown.replace(excerptSeperator, '');
  return cleanedMarkdown;
};

export const Markdown: React.FC = (props) => {
  if (typeof props.children !== 'string') {
    throw new Error(
      'Markdown component can only contain a markdown string as children',
    );
  }

  return (
    <ReactMarkdown
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
        blockquote: BlockquoteRenderer,
        link: LinkRenderer,
      }}
    >
      {removeExcerptSeparator(props.children)}
    </ReactMarkdown>
  );
};
