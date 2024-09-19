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
        aria-label={`${children} (opens in a new tab)`}
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

  return (
    <InternalLink
      to={to}
      className={isAnchorLink ? undefined : className}
      placeholder={to}
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
