import React from 'react';

export const Chevron: React.FC = (props: React.SVGAttributes<SVGElement>) => (
  <svg
    className={props.className}
    width="6"
    height="5"
    viewBox="0 0 6 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 4.75L0 0.25H6L3 4.75Z" fill="currentColor" />
  </svg>
);
