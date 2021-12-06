declare module '*.woff2';
declare module '*.woff';
declare module '*.eot';
declare module '*.ttf';
declare module '*.png';
declare module '*.jpg';

/**
 * This type matches the svg export as configured in storybook for SVGR.
 *
 * It's actually different to the linked reference and hwo Gatsby
 * does the processing. In Gatsby there are two loaders registered for svg files
 * that's why we get the file path form the file loader for the default export
 * and SVGR then switches to the named export `ReactComponent`.
 *
 * In Storybook we don't need any file loader so we force SVGR to
 * export into the named export `ReactComponent` to force a parity between
 * the two build systems involved.
 *
 * Reference:
 * https://github.com/gregberge/svgr/issues/38#issuecomment-717602727
 */

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
}
