import React from 'react';
import {
  SmallTitle,
  SubTitle,
  Text,
  TextLink,
  TextTitle,
} from '../typography/typography';
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
  let tag = 'h2';

  switch (props.level) {
    case 3:
      tag = 'h3';
      break;
    case 4:
      tag = 'h4';
      break;
    case 5:
      tag = 'h5';
      break;
    case 6:
      tag = 'h6';
      break;
  }

  if (props.level <= 2) {
    return <SubTitle as={tag as never}>{props.children}</SubTitle>;
  }

  if (props.level === 3) {
    return <TextTitle as={tag as never}>{props.children}</TextTitle>;
  }

  return <SmallTitle as={tag as never}>{props.children}</SmallTitle>;
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

/**
 * Link
 */
interface ReactMarkdownLinkProps {
  href: string;
}
export const LinkRenderer: React.FC<ReactMarkdownLinkProps> = (props) => {
  return <TextLink to={props.href}>{props.children}</TextLink>;
};

/**
 * List
 **/
interface ReactMarkdownListProps {
  ordered: boolean;
}

const UnorderedList = styled.ul`
  list-style: none;
  line-height: 150%;

  padding-left: 0;

  > li:before {
    content: '·';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }

  > li {
    position: relative;
    padding-left: 16px;
    margin-bottom: 16px;
  }
`;

const OrderedList = styled.ol`
  list-style: none;
  line-height: 150%;

  margin-top: 0;
  padding-left: 0;

  > li::before {
    content: '(' counter(item) ') ';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }

  > li {
    position: relative;
    counter-increment: item;
    padding-left: 32px;
    margin-bottom: 16px;
  }
`;

export const ListRenderer: React.FC<ReactMarkdownListProps> = (props) => {
  return props.ordered ? (
    <OrderedList>{props.children}</OrderedList>
  ) : (
    <UnorderedList>{props.children}</UnorderedList>
  );
};
