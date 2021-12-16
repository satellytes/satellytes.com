import React from 'react';
import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby-plugin-react-i18next';
import { GatsbyLinkProps } from 'gatsby';

interface LinkProps extends GatsbyLinkProps<void> {
  className?: string;
  language?: string;
}

export const Link = (props: LinkProps): JSX.Element => {
  const {
    to,
    children,
    className,
    // ref is not supported by both link components
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref,
    ...rest
  } = props;

  const isExternalLink =
    to.toString().startsWith('http') ||
    to.toString().startsWith('mailto') ||
    to.toString().startsWith('tel');

  if (isExternalLink) {
    return (
      <ExternalLink
        href={to}
        target="_blank"
        rel="noopener"
        className={className}
        {...rest}
      >
        {children}
      </ExternalLink>
    );
  }

  /**
   * internal anchor tags will get the styling of their parent
   */
  const isAnchorLink = to.startsWith('#');

  /**
   * it seems that using consistent '/' at the end of internal links is better
   * for SEO as it prevents the redirect from non-slash to slash. it also aligns
   * it with the sitemap.xml
   *
   * - https://github.com/gatsbyjs/gatsby/discussions/27889
   */
  const toWithSlash = to.endsWith('/') ? to : `${to}/`;

  return (
    <InternalLink
      to={toWithSlash}
      className={isAnchorLink ? undefined : className}
      {...rest}
    >
      {children}
    </InternalLink>
  );
};

const InternalLink = styled(GatsbyLink)`
  text-decoration: none;
  color: inherit;
`;

const ExternalLink = styled.a`
  text-decoration: none;
  color: inherit;
`;
