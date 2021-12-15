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

export interface LocalesQuery {
  edges: {
    node: {
      ns: string;
      language: string;
      data: string;
    };
  }[];
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

  // now owned by the source plugin, added via `onCreateNode`
  fields: {
    path: string;
    socialCard: string;
  };
}

export interface SyTeamMember {
  id: string;
  name: string;
  image: IGatsbyImageData;
}

export interface BlogPostMarkdown {
  excerpt: string;
  htmlAst;
  fields: {
    socialCard: string;
    readingTime: {
      minutes: string;
    };
  };
  frontmatter: {
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
