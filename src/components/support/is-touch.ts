/**
 * Use this Query to address touch devices like a smartphone.
 *
 * https://stackoverflow.com/a/11387852/3141881
 */
export const isTouch = (): string => `
  @media (hover: none)
`;

/**
 * Use this Query to address non touch devices like a laptop.
 */
export const isNoneTouch = (): string => `
  @media (hover: hover)
`;
