import { SmallTitle, SubTitle, Text, TextTitle } from '../typography';

import styled from 'styled-components';
import React from 'react';
import { theme } from '../../layout/theme';
import { CodeBlock } from './code-block';
import { TextStyles } from '../../typography';
import { Quote } from '../../ui/quote/quote';
import { WithAnchorHOC } from '../../layout/with-anchor-hoc';

/**
 * Override markdown generated html content with custom React components (for us mostly to pass in custom styling)
 * Check for available content to override:
 * https://github.com/remarkjs/react-markdown#appendix-b-components
 */

const UnorderedList = styled.ul`
  line-height: 150%;
  list-style-type: none;
  padding-left: 0;
  margin: 16px 0;

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

const OrderedList = styled.ol<{ doubleDigit: boolean }>`
  line-height: 150%;
  padding-left: ${(props) => (props.doubleDigit ? '26px' : '18px')};

  > li {
    margin-bottom: 12px;
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

const QuoterWrapper = styled.div`
  margin: 48px 0;
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
  margin: 48px 0;

  figcaption {
    margin-top: 12px;
  }
`;

const Figcaption = styled.figcaption`
  ${TextStyles.textS};
  color: ${theme.palette.text.timestamp};
`;

const SubTitleWithAnchor = WithAnchorHOC(SubTitle);
const TextTitleWithAnchor = WithAnchorHOC(TextTitle);
const SmallTitleWithAnchor = WithAnchorHOC(SmallTitle);

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
    return <SubTitle as={'h1'}>{props.children}</SubTitle>;
  },
  h2(props) {
    return <SubTitleWithAnchor as={'h2'}>{props.children}</SubTitleWithAnchor>;
  },
  h3(props) {
    return (
      <TextTitleWithAnchor as={'h3'}>{props.children}</TextTitleWithAnchor>
    );
  },
  h4(props) {
    return (
      <SmallTitleWithAnchor as={'h4'}>{props.children}</SmallTitleWithAnchor>
    );
  },
  h5(props) {
    return (
      <SmallTitleWithAnchor as={'h5'}>{props.children}</SmallTitleWithAnchor>
    );
  },
  h6(props) {
    return (
      <SmallTitleWithAnchor as={'h6'}>{props.children}</SmallTitleWithAnchor>
    );
  },
  ol(props) {
    return (
      <OrderedList doubleDigit={props.children.length > 9}>
        {props.children}
      </OrderedList>
    );
  },
  ul(props) {
    return <UnorderedList>{props.children}</UnorderedList>;
  },
  img(props) {
    return <Image {...props}>{props.children}</Image>;
  },
  // now some general text formatting stuff
  blockquote(props) {
    return (
      <QuoterWrapper>
        <Quote>{props.children}</Quote>
      </QuoterWrapper>
    );
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
