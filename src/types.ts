import { IGatsbyImageData } from 'gatsby-plugin-image';
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';

export interface BlogPostTeaser {
  fields: {
    path: string;
  };
  heroImage: {
    image: any;
  };
  id: string;
  publicationDate: string;
  teaserText: string;
  title: string;
}

/**
 * the normalized jobs content coming from the API
 */
export interface SyPersonioJobSection {
  headline: string;
  descriptionHtml: string;
  description: string;
}

export interface SyPersonioJob {
  id: string;
  lang: string;
  jobId: string;
  name: string;
  short: string;
  createdAt: string;
  slug: string;
  schedule: string;
  sections: SyPersonioJobSection[];

  // added via `onCreateNode`
  socialCardFile: PlainFixedImageSharpSource;
}

export interface SyTeamMember {
  id: string;
  name: string;
  image: IGatsbyImageData;
}

export interface PlainFixedImageSharpSource {
  childImageSharp: {
    fixed: {
      src: string;
    };
  };
}

export interface BlogPostMarkdown {
  excerpt: string;
  htmlAst;
  readingTime: {
    minutes: string;
  };
  frontmatter: {
    shareImage: PlainFixedImageSharpSource;
    attribution: {
      creator: string;
      source: string;
      license?: string;
    };
    date: string;
    title: string;
    image?: string;
    author?: string;
    authorSummary?: string;
    seoMetaText?: string;
    leadboxText?: string;
    featuredImage: IGatsbyImageData;
    featuredImageSquared: IGatsbyImageData;
  };
  rawMarkdownBody: string;
}

export interface ContentFulBlogPostAuthor {
  fullName: string;
  summary: string;
}

export interface ContentfulBlogPostHero {
  image: any;
  creator: string;
  source: string;
}

export interface ContentfulCodeBlock {
  description: string;
  language: string;
  code: string;
}

export interface ContentfulBlogPost {
  author: ContentFulBlogPostAuthor;
  content: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  heroImage: ContentfulBlogPostHero;
  id: string;
  leadBoxText: string;
  publicationDate: string;
  seoMetaText: string;
  slug: string;
  teaserText: string;
  title: string;
}

export interface BreadcrumbEntry {
  pathname: string;
  label: string;
}

export interface I18nNextData {
  languages: string[];
  language: string;
  path: string;
  originalPath: string;
  defaultLanguage: string;
}
