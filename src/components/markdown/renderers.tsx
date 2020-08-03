import React from 'react';
import { SubTitle, Text } from '../typography/typography';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styled from 'styled-components';
import { ResponsiveCloudinaryImage } from '../image/cloudinary-image';

/**
 * Text
 *
 */
export const TextRenderer: React.FC = (props) => {
  return <Text>{props.children}</Text>;
};

/**
 * Blockquote
 *
 */
const Blockquote = styled.blockquote`
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 0 0 16px 0;
`;

export const BlockquoteRenderer: React.FC = (props) => {
  return <Blockquote>{props.children}</Blockquote>;
};

/*
 * Heading
 *
 */
interface ReactMarkdownHeadingRendererProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export const HeadingRenderer: React.FC<ReactMarkdownHeadingRendererProps> = (
  props,
) => {
  return <SubTitle>{props.children}</SubTitle>;
};

/*
 * Code
 *
 */
interface ReactMarkdownCodeRendererProps {
  language: string;
  value: string;
}

export const CodeRender: React.FC<ReactMarkdownCodeRendererProps> = (props) => {
  return (
    /**
     * Code highlighting is done with a custom syntax highlighter library:
     *  - https://github.com/conorhastings/react-syntax-highlighter
     *
     * Note: We use the Prism renderer of this library!
     *
     * Possible styles:
     *  - https://conorhastings.github.io/react-syntax-highlighter/demo/prism.html
     */
    <SyntaxHighlighter
      language={props.language}
      style={prism}
      customStyle={{ margin: '0 0 16px 0' }}
    >
      {props.value}
    </SyntaxHighlighter>
  );
};

const InlineCode = styled.code`
  /**
   * Inspired by Github.
   */
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
`;

export const InlineCodeRenderer: React.FC<ReactMarkdownCodeRendererProps> = (
  props,
) => {
  return <InlineCode>{props.value}</InlineCode>;
};

/*
 * Image
 *
 */
interface ReactMarkdownImageProps {
  src: string;
  alt: string;
}

export const CloudinaryImageRenderer: React.FC<ReactMarkdownImageProps> = (
  props,
) => {
  return <ResponsiveCloudinaryImage src={props.src} alt={props.alt} />;
};
