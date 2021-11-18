import React from 'react';

export const NextArrow: React.FC = (props: React.SVGAttributes<SVGElement>) => (
  <svg
    className={props.className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
      fill="url(#paint0_linear_3719_16601)"
    />
    <path
      d="M23 16L26 20L23 24"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M26 20H14"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3719_16601"
        x1="40"
        y1="40"
        x2="-3.39799"
        y2="35.8913"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#543FD7" />
        <stop offset="1" stopColor="#2756FD" />
      </linearGradient>
    </defs>
  </svg>
);
