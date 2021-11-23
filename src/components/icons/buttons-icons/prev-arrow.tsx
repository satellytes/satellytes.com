import React from 'react';

export const PrevArrow: React.FC = (props: React.SVGAttributes<SVGElement>) => (
  <svg
    className={props.className}
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 2L2 6L5 10"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path d="M2 6H14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
