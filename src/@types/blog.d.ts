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
