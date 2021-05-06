import React from 'react';
import ReactMarkdown from 'react-markdown';
import customSatellytesComponents from './custom';
import remarkGfm from 'remark-gfm';

export const Markdown = (props) => {
  if (props.children && typeof props.children !== 'string') {
    throw new Error(
      'Markdown component can only contain a markdown string as children',
    );
  }

  const markdown = props.children?.toString();

  return (
    <ReactMarkdown
      rehypePlugins={[remarkGfm]}
      components={customSatellytesComponents}
    >
      {markdown}
    </ReactMarkdown>
  );
};
