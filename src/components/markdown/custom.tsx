import { Components } from 'react-markdown/src/ast-to-react';
import {
  SmallTitle,
  SubTitle,
  Text,
  TextLink,
  TextTitle,
} from '../typography/typography';
/**
 * We want to use prism as it has a much bigger community and plugin ecosystem then hljs which is also available.
 */
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
/**
 * See https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD
 * and with some previews available at https://github.com/PrismJS/prism-themes
 * I picked `nord` for being  We should create our own satellytes flavour in the future.
 */
import { nord as PrismTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';
import { rgba } from 'polished';
import React from 'react';
import { up } from '../breakpoint/breakpoint';

/**
 * Override markdown generated html content with custom React components (for us mostly to pass in custom styling)
 * Check for available content to override:
 * https://github.com/remarkjs/react-markdown#appendix-b-components
 */

const UnorderedList = styled.ul`
  line-height: 150%;
`;

const OrderedList = styled.ol`
  line-height: 150%;
`;

const SyntaxHighlighterStyled = styled(SyntaxHighlighter)`
  margin: '0 0 16px 0';
  overflow-x: auto;
  outline: 1x solid red;
`;
/*
the 160px margin is ridiculous and might fit single pages
but they are not suited for blog posts as the content gets stretched too most
and the information density is too much reduced for an article format.
 */
export const TextTitleCondensed = styled(TextTitle)`
  ${up('md')} {
    margin-top: 40px;
  }
`;

export const SubTitleCondensed = styled(SubTitle)`
  margin-top: 40px;
  margin-bottom: 20px;

  ${up('md')} {
    font-size: 36px;
  }
`;

const customSatellytesComponents: Components = {
  a(props) {
    return <TextLink to={props.href + ''}>{props.children}</TextLink>;
  },
  // define our lovely headlines from h1 to h6
  h1(props) {
    return <SubTitleCondensed as={'h1'}>{props.children}</SubTitleCondensed>;
  },
  h2(props) {
    return <SubTitleCondensed as={'h2'}>{props.children}</SubTitleCondensed>;
  },
  h3(props) {
    return <TextTitleCondensed as={'h3'}>{props.children}</TextTitleCondensed>;
  },
  h4(props) {
    return <SmallTitle as={'h4'}>{props.children}</SmallTitle>;
  },
  h5(props) {
    return <SmallTitle as={'h5'}>{props.children}</SmallTitle>;
  },
  h6(props) {
    return <SmallTitle as={'h6'}>{props.children}</SmallTitle>;
  },
  ol(props) {
    return <OrderedList>{props.children}</OrderedList>;
  },
  ul(props) {
    return <UnorderedList>{props.children}</UnorderedList>;
  },
  // now some general text formatting stuff
  blockquote(props) {
    return <Blockquote>{props.children}</Blockquote>;
  },
  p(props) {
    return <Text>{props.children}</Text>;
  },
  // Use `SyntaxHighlighter` for any given code block
  // inline code (single ticks) gets a much simpler rendering without any highlight being applied.
  code(props) {
    const className = String(props.className) ?? '';
    const children = String(props.children).replace(/\n$/, '');
    const match = /language-(\w+)/.exec(className);

    return !props.inline ? (
      <SyntaxHighlighterStyled
        showLineNumbers={true}
        style={PrismTheme}
        language={match?.[1] ?? 'text'}
        PreTag="div"
        {...props.props}
      >
        {children}
      </SyntaxHighlighterStyled>
    ) : (
      <InlineCode className={className} {...props} />
    );
  },
};

export default customSatellytesComponents;

const InlineCode = styled.code`
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: ${rgba('#ffffff', 0.2)};
  border-radius: 3px;
`;

const Blockquote = styled.blockquote`
  color: #ffffff;
  border-left: 0.25em solid #dfe2e5;
  margin: 0 0 16px 0;
  background-color: ${rgba('#ffffff', 0.2)};
  padding: 0.5em;
`;
