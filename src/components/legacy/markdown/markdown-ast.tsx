import React, { createElement, ReactElement } from 'react';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';
import customSatellytesComponents from './custom-components';

/**
 * Render markdown based on a given html ast
 * instead of processing the raw markdown. That is how gatsby tells us to process the AST.
 *
 * The funny thing here is that this is horribly wrong.
 * See this issue about the wrong types (which makes it completely red here too):
 * https://github.com/rehypejs/rehype-react/issues/24
 *
 * > Oh my gosh. What is gatsby suggesting there?!
 * > The types here are correct. The example in the readme here is correct. What gatsby is suggesting there is really weird.
 */
const customAstRenderer = unified().use(rehypeReact, {
  createElement: createElement as any,
  components: customSatellytesComponents,
});

export const MarkdownAst = ({ htmlAst }) => {
  /**
   * The following type case from string to ReactElement os required.
   * See the notes from the docs at https://unifiedjs.com/explore/package/rehype-react/
   * Version 6.2.0 at the point of writing this.
   * > Typically, unified compilers return string. This compiler returns a ReactElement.
   * > [...]
   * > When using TypeScript, cast the type on your side.
   */

  const markdownContent = customAstRenderer.stringify(
    htmlAst,
  ) as unknown as ReactElement;
  return <div>{markdownContent}</div>;
};
