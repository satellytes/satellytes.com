declare module '*.woff2';
declare module '*.woff';
declare module '*.eot';
declare module '*.ttf';
declare module '*.png';

type SvgrComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>;

declare module '*.svg' {
  const svg: string;
  export default svg;
}
