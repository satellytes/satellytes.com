import { Options } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
// import { Marked } from '@ts-stack/markdown'
import { inspect } from 'util';
import { ContentfulCustomModel } from '../../../types/contentful.types';

import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import remarkPrism from 'remark-prism';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

const markdownToHyperText = (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkPrism)
    .use(remarkHtml)
    .process(markdown);
// const markdownToHyperText = (markdown: string) => Marked.parse(markdown);

export const rssRenderOptions: Partial<Options> = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      console.log('rendering entry: ', inspect(node, true, 10, true));

      if (!node.data.target) {
        console.error(`Embedded entry got no target: ${node.data.target}`);
        return ``;
      }

      const { __typename } = node.data.target;
      switch (__typename) {
        /**
         * Code Blocks
         */
        case ContentfulCustomModel.CONTENTFUL_CODE_BLOCK: {
          console.log('rendering CONTENTFUL_CODE_BLOCK:', node.data.target);
          const { code, description } = node.data.target;
          const md = `
          <figure>
            ${markdownToHyperText(code.code)}
            ${description && `<figcaption>${description}</figcaption>`}
          </figure>
          `;
          console.log('rendered markdown', code, description);
          return md;
        }
        /**
         * Blog Post Collapsible
         */
        case ContentfulCustomModel.CONTENTFUL_BLOG_POST_COLLAPSIBLE: {
          const { content, summary } = node.data.target;
          return ``;
        }
        /**
         * Blog Post Stats
         */
        case ContentfulCustomModel.CONTENTFUL_STATS: {
          const { statItems } = node.data.target;
          return ``;
        }
        /**
         * Advanced Images
         */
        case ContentfulCustomModel.CONTENTFUL_ADVANCED_ASSET: {
          return ``;
        }
        /**
         * Log error to console if type is not yet implemented
         */
        default:
          console.error(
            `Embedded entry type is not implemented: ${__typename}`,
          );
          return ``;
      }
    },
  },
};
