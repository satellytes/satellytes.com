import React from 'react';

export const Swoosh: React.FC = (props: React.SVGAttributes<SVGElement>) => (
  <svg
    className={props.className}
    viewBox="0 0 51 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.2677 1.62848C-2.24866 4.13097 -0.220584 13.7035 8.33002 9.91382C30.0564 0.284465 50.4749 15 50.4749 15C50.4749 15 27.8129 -5.8777 5.2677 1.62848Z"
      fill="currentColor"
    />
  </svg>
);
