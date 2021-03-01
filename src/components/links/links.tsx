import React from 'react';
import styled from 'styled-components';
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby';

interface LinkProps extends GatsbyLinkProps<void> {
  className?: string;
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
  const isExternalLink = to.toString().startsWith('http');

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

  return (
    <InternalLink
      to={to}
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
