import { IGatsbyImageData } from 'gatsby-plugin-image';
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import { LeadboxProps } from './components/content/leadbox/leadbox';
import { TeaserProps } from './components/content/teaser/teaser';
import { IllustrationType } from './components/ui/illustration/illustration-set';

export type ContentfulRichTextType =
  RenderRichTextData<ContentfulRichTextGatsbyReference>;

export interface BlogPostTeaser {
  fields: {
    path: string;
  };
  heroImage: {
    image: IGatsbyImageData;
  };
  id: string;
  publicationDate: string;
  teaserText: string;
  title: string;
}

export interface ContentfulPage {
  title: string;
  slug: string;
  description?: {
    description: string;
  };
  content?: ContentfulRichTextType;
  seoMetaText: string;
  noIndex?: boolean;
}

export interface SyTeamMember {
  id: string;
  name: string;
  image: IGatsbyImageData;
}

export type AboutUsImpressionTileSize =
  | 'landscape-big'
  | 'landscape-small'
  | 'portrait';

export interface ContentfulAboutUsImpression {
  tileSize: AboutUsImpressionTileSize;
  id: string;
  image: IGatsbyImageData;
}

export interface ContentFulBlogPostAuthor {
  fullName: string;
  summary: string;
}

export interface ContentfulBlogPostHero {
  image: any;
  creator: string;
  source: string;
  naturalHeight: boolean;
}

export interface ContentfulCodeBlock {
  description: string;
  code: string;
}

export interface ContentfulBlogPost {
  author: ContentFulBlogPostAuthor;
  introRichText?: {
    raw: string;
  };
  content: ContentfulRichTextType;
  heroImage: ContentfulBlogPostHero;
  id: string;
  leadBoxText: string;
  publicationDate: string;
  seoMetaText: string;
  slug: string;
  teaserText: string;
  title: string;
}

export interface ContentfulVacancy {
  id: string;
  name: string;
  slug: string;
  content: ContentfulRichTextType;
  schedule: string;
  createdAt: string;
  shortDescription: {
    shortDescription: string;
  };

  // added via `onCreateNode`
  socialCardFile: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

interface ContentfulSectionHeaderParagraph {
  slug: string;
  paragraph: {
    paragraph: string;
  };
}

export interface ContentfulSectionHeader {
  slug: string;
  kicker?: string;
  headline?: string;
  paragraphs?: ContentfulSectionHeaderParagraph[];
}

export interface ContentfulTeaser {
  slug: string;
  gridItems: ContentfulTeaserItem[];
}

export interface ContentfulTeaserItem extends TeaserProps {
  description: {
    description: string;
  };
}

export interface ContentfulAccordion {
  slug: string;
  accordionItems: ContentfulAccordionItem[];
}

export interface ContentfulAccordionItem {
  title: string;
  paragraph: {
    paragraph: string;
  };
  illustration?: IllustrationType;
}

export type ContentfulLeadBox = LeadboxProps;

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
