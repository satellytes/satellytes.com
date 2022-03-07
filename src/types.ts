import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface BlogPostTeaser {
  id: string;
  frontmatter: {
    title: string;
    featuredImage: any;
    date: string;
    path: string;
    teaserText: string;
  };
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
  fields: {
    readingTime: {
      minutes: string;
    };
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
