import React, { useState } from 'react';
import { SectionTitle, SubTitle, Text } from '../typography/typography';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styled from 'styled-components';
import { useDebounce, useWindowSize } from 'react-use';

const BLOG_PAGE_MAX_WIDTH_PX = 814;

/**
 * Text
 *
 */
export const TextRenderer: React.FC = (props) => {
  return <Text>{props.children}</Text>;
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
  if (props.level === 1) {
    return <SectionTitle as="h1">{props.children}</SectionTitle>;
  }
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
    <SyntaxHighlighter language={props.language} style={prism}>
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
const StyledImage = styled.img`
  width: 100%;
`;

const isCloudinaryUrl = (src: string): boolean => {
  const url = new URL(src);
  return (
    url.hostname.includes('cloudinary.com') &&
    url.pathname.startsWith('/satellytes')
  );
};

const transformCloudinaryUrl = (src: string, width: number): string => {
  if (width <= 0) {
    return '';
  }

  const srcParts = src.split('/');
  const imageId = srcParts[srcParts.length - 1];
  const transformations = `w_${width}`;
  return `https://res.cloudinary.com/satellytes/image/upload/${transformations}/satellytes-website/${imageId}`;
};

interface ReactMarkdownImageProps {
  src: string;
  alt: string;
}

export const CloudinaryImageRenderer: React.FC<ReactMarkdownImageProps> = (
  props,
) => {
  // we only support cloudinary urls for now
  if (!isCloudinaryUrl(props.src)) {
    throw new Error(
      'Please provide a valid image URL in markdown file. The image also needs to be hosted on Cloudinary. Your invalid URL: ' +
        props.src,
    );
  }

  const [imageWidth, setImageWidth] = useState(0);
  const { width: currentWindowSize } = useWindowSize();

  useDebounce(
    () => {
      const newImageWidth =
        currentWindowSize >= BLOG_PAGE_MAX_WIDTH_PX
          ? BLOG_PAGE_MAX_WIDTH_PX
          : currentWindowSize;

      // we only change the width if the picture gets better/larger
      if (newImageWidth > imageWidth) {
        setImageWidth(newImageWidth);
      }
    },
    250,
    [currentWindowSize],
  );

  const src = transformCloudinaryUrl(props.src, imageWidth);

  return <StyledImage src={src} alt={props.alt} />;
};
