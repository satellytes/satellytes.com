import React from 'react';
import styled from 'styled-components';
import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby';
import { RightArrowIcon } from '../icons/buttons-icons/right-arrow';

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

const LinkButtonContainer = styled(Link)`
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  padding: 11px 16px;

  background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);
  border-radius: 30px;

  /**
   * todo: needs to be replaced with an svg. this also makes vertical align 
   * middle possible / simpler   
   */
  svg {
    transition: transform 0.2s ease-in;
    margin-left: 20px;
  }
  :hover {
    svg {
      transform: translateX(2px);
    }
  }
`;

export const LinkButton = (props: LinkProps): JSX.Element => {
  const {
    children,
    // ref is not supported by both link components
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref,
    ...rest
  } = props;
  return (
    <LinkButtonContainer {...rest}>
      {children}
      <RightArrowIcon />
    </LinkButtonContainer>
  );
};
