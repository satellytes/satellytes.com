import IllustrationSet, { IllustrationType } from './illustration-set';
import React from 'react';
import styled, { css } from 'styled-components';

export enum IllustrationSize {
  NORMAL = 'normal', // 72px
  MEDIUM = 'medium', // 80px
  LARGE = 'large', // 144px
  INHERIT = 'inherit', // 100% of the container
}

export interface IllustrationProps {
  /**
   * Pick an illustration by name.
   */
  show: IllustrationType;
  /**
   * Choose the size. Defaults to 72x72px, can be large (144x14px) or grow with the container.
   */
  size?: IllustrationSize;
  /**
   * let's support styled components and friends by accepting this property
   */
  className?: string;
}

const IllustrationLayout = styled.div<Pick<IllustrationProps, 'size'>>`
  width: 72px;
  height: 72px;

  ${({ size }) =>
    size === IllustrationSize.MEDIUM &&
    css`
      width: 80px;
      height: 80px;
    `}

  ${({ size }) =>
    size === IllustrationSize.LARGE &&
    css`
      width: 144px;
      height: 144px;
    `}

  ${({ size }) =>
    size === IllustrationSize.INHERIT &&
    css`
      width: auto;
      height: auto;
    `}
`;
/**
 * Use this component to show one of the many illustrations we have
 * prepared to use on our website. The `show` property is typed to
 * support you with a list of choices.
 *
 * *You can't display anything else with this component.*
 */
export const Illustration = (props: IllustrationProps) => {
  const IllustrationSvg = IllustrationSet[props.show];

  return (
    <IllustrationLayout
      className={props.className}
      size={props.size ?? IllustrationSize.NORMAL}
    >
      <IllustrationSvg />
    </IllustrationLayout>
  );
};

export { IllustrationSet };
