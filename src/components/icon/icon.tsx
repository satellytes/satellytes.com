import IconSet, { IconType } from './icon-set';
import React from 'react';
import styled, { css } from 'styled-components';

export enum IconSize {
  NORMAL = 'normal', // 24px
  INHERIT = 'inherit', // width and height equals 150% of the text size of the container
}

const DEFAULT_ICON_SIZE = IconSize.NORMAL;

const ICON_SIZE_MAP = {
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
  if (!Object.keys(ICON_SIZE_MAP).includes(size)) {
    size = DEFAULT_ICON_SIZE;
    console.warn(
      `Received unknown size '${size}' for an icon. Please check, falling back to the default size`,
    );
  }
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
