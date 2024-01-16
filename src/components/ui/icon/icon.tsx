import IconSet, { IconType } from './icon-set';
import React from 'react';
import styled, { css } from 'styled-components';

export enum IconSize {
  NORMAL = 'normal', // 24px
  INHERIT = 'inherit', // width and height equals 150% of the text size of the container
}

const DEFAULT_ICON_SIZE = IconSize.NORMAL;
interface Dimensions {
  width: string;
  height: string;
}

type IconSizeMap = { [key in IconSize]: Dimensions };

const ICON_SIZE_MAP: IconSizeMap = {
  [IconSize.NORMAL]: {
    width: '24px',
    height: '24px',
  },
  [IconSize.INHERIT]: {
    width: '1.5em',
    height: '1.5em',
  },
};

interface IconContainerProps {
  size: IconSize;
}

interface IconProps {
  /**
   * Pick an icon by name.
   */
  show: IconType /**
   /**
   * Choose the size. 
   */;
  size?: IconSize;
  /**
   * Let's support styled components and friends by accepting this property
   */
  className?: string;
}

const transformSizeToDimension = (size: IconSize) => {
  const sizeMapped = ICON_SIZE_MAP[size];

  return css`
    width: ${sizeMapped.width};
    height: ${sizeMapped.width};
  `;
};

const IconContainer = styled.span<IconContainerProps>`
  display: inline-block;
  vertical-align: middle;
  ${(props) => transformSizeToDimension(props.size)}
`;

export const Icon = (props: IconProps) => {
  const IconSvg = IconSet[props.show];

  if (!IconSvg) {
    return null;
  }

  return (
    <IconContainer
      size={props.size ?? DEFAULT_ICON_SIZE}
      className={props.className}
    >
      <IconSvg />
    </IconContainer>
  );
};

export { IconSet };
