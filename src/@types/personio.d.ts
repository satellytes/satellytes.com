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
