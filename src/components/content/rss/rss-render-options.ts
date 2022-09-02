import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
//import { inspect } from 'util';
import { ContentfulCustomModel } from '../../../types/contentful.types';
import { Converter } from 'showdown';
import * as fs from 'fs';
//import { EmbeddedAssetType } from '../../content/rich-text/rich-text';

enum EmbeddedAssetType {
  IMAGE = 'image',
  VIDEO = 'video',
}

const converter: Converter = new Converter();
const markdownToHyperText = (markdown: string) => converter.makeHtml(markdown);

export const rssRenderOptions: Partial<Options> = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      // const dataString = JSON.stringify(node.data);
      // fs.writeFileSync(`entry-${new Date().toISOString()}.json`, dataString);

      if (!node.data.target) {
        //console.error(`Embedded entry got no target: ${node.data.target}`);
        return ``;
      }

      const { __typename } = node.data.target;
      switch (__typename) {
        /**
         * Code Blocks
         */
        case ContentfulCustomModel.CONTENTFUL_CODE_BLOCK: {
          //console.log('rendering CONTENTFUL_CODE_BLOCK:', node.data.target);
          const { code, description } = node.data.target;
          const md = `
          <figure>
            ${markdownToHyperText(code.code)}
            ${description && `<figcaption>${description}</figcaption>`}
          </figure>
          `;
          //console.log('rendered markdown', code, description);
          return md;
        }
        /**
         * Blog Post Collapsible
         */
        case ContentfulCustomModel.CONTENTFUL_BLOG_POST_COLLAPSIBLE: {
          const { content, summary } = node.data.target;
          return `
          <details>
          <summary>${summary}</summary>
            ${documentToHtmlString(content, rssRenderOptions)}
          </details>
          `;
        }
        /**
         * Blog Post Stats
         */
        case ContentfulCustomModel.CONTENTFUL_STATS: {
          const { statItems } = node.data.target;
          return `
          <div>
            ${statItems
              .map(
                (item) =>
                  `<div>
                <h3>${item.label}</h3>
                <p>${item.value}</p>
              </div><br>`,
              )
              .join('')}
          </div>
          `;
        }

        /**
         * Advanced Images
         */
        case ContentfulCustomModel.CONTENTFUL_ADVANCED_ASSET: {
          const { image } = node.data.target;
          return `
            <figure>
            <img src="${image.file.url}" alt="${image.description}">
            <figcaption>${image.description}</figcaption>
            </figure>
          `;
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
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const dataString = JSON.stringify(node.data);
      fs.writeFileSync(`asset-${new Date().toISOString()}.json`, dataString);
      if (node.data.target.file === undefined) {
        //console.log(inspect(node.data));
        return 'undefined';
      }
      const { url, contentType } = node.data.target.file;
      switch (contentType.split('/')[0]) {
        /**
         * Embedded images
         */
        case EmbeddedAssetType.IMAGE: {
          return `
            <figure>
            <img src="${url}" alt="${node.data.target.description}">
            <figcaption>${node.data.target.description}</figcaption>
            </figure>
          `;
        }
        case EmbeddedAssetType.VIDEO: {
          return `
            <figure>
            <video
                  key="video"
                  preload="auto"
                  autoPlay
                  loop
                  muted
                  width="100%"
                >
                  <source src="${url}" type="${contentType}" />
                </video>
            <figcaption>${node.data.target.description}</figcaption>
            </figure>
          `;
        }
        default:
          console.error(
            `Embedded asset type is not implemented: ${contentType}`,
          );
          return ``;
      }
    },
  },
};
