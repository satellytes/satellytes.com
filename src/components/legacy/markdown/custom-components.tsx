import { SmallTitle, SubTitle, Text, TextTitle } from '../typography';

import styled from 'styled-components';
import { rgba } from 'polished';
import React from 'react';
import { up } from '../../support/breakpoint';
import { theme } from '../../layout/theme';
import { CodeBlock } from './code-block';
import { TextStyles } from '../../typography';

/**
 * Override markdown generated html content with custom React components (for us mostly to pass in custom styling)
 * Check for available content to override:
 * https://github.com/remarkjs/react-markdown#appendix-b-components
 */

const UnorderedList = styled.ul`
  line-height: 150%;
  list-style-type: none;
  padding-left: 0;

  > li:before {
    content: '-';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  }

  > li {
    position: relative;
    padding-left: 16px;
    margin-bottom: 12px;
  }
`;

const OrderedList = styled.ol`
  line-height: 150%;
  padding-left: 16px;

  > li {
    margin-bottom: 12px;
  }
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

export const SimpleLink = styled.a`
  display: inline-block;
  color: ${theme.palette.text.link.default};

  line-height: 150%;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: ${theme.palette.text.link.hover};
    text-decoration: underline;
  }
`;

const Blockquote = styled.blockquote`
  border-left: 0.25em solid ${theme.palette.text.link.default};
  margin: 0 0 16px 0;
  background-color: ${rgba(theme.palette.background.bodyLight, 0.2)};
  padding: 1em;

  > p {
    margin: 0;
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  max-width: 100%;
`;

const TableStyled = styled.table`
  border: solid 1px #ddeeee;
  border-collapse: collapse;
  border-spacing: 0;
  font: normal 13px Arial, sans-serif;

  thead th {
    border: solid 1px #ddeeee;
    padding: 10px;
    text-align: left;
    color: #fff;
    background-color: #4d79ff;
  }

  tbody td {
    border: solid 1px #ddeeee;
    padding: 10px;
  }

  tbody tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const DetailsStyled = styled.details`
  margin-bottom: 16px;

  summary {
    cursor: pointer;
  }
`;

const Image = styled.img`
  max-width: 100%;
`;

const Figure = styled.figure`
  margin: 0;

  figcaption {
    margin-top: 12px;
  }
`;

const Figcaption = styled.figcaption`
  ${TextStyles.textS};
  color: ${theme.palette.text.timestamp};
`;
/**
 * Note: There is no `code` element as this is properly generated by gatsy remark already
 * and we don't want to mess with that content anymore.
 */
const customSatellytesComponents = {
  details(props) {
    return <DetailsStyled {...props}>{props.children}</DetailsStyled>;
  },
  a(props) {
    return <SimpleLink {...props}>{props.children}</SimpleLink>;
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
  img(props) {
    return <Image {...props}>{props.children}</Image>;
  },
  // now some general text formatting stuff
  blockquote(props) {
    return <Blockquote>{props.children}</Blockquote>;
  },
  p(props) {
    return <Text>{props.children}</Text>;
  },
  em(props) {
    return <span>{props.children}</span>;
  },
  pre(props) {
    return <CodeBlock {...props}>{props.children}</CodeBlock>;
  },
  table(props) {
    return (
      <TableWrapper>
        <TableStyled {...props} />
      </TableWrapper>
    );
  },
  figure(props) {
    return <Figure>{props.children}</Figure>;
  },
  figcaption(props) {
    return <Figcaption>{props.children}</Figcaption>;
  },
};

export default customSatellytesComponents;
