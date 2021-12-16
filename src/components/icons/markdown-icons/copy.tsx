import React from 'react';

export const CopyIcon = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.onClick}
    >
      <circle cx="12" cy="12" r="12" fill="url(#paint0_linear)" />
      <path
        d="M6 10.2L12 14.4L18 10.2L12 6L6 10.2Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.57143 12L6 13.8L12 18L18 13.8L15.4286 12"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="24"
          y1="24"
          x2="-2.0388"
          y2="21.5348"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#543FD7" />
          <stop offset="1" stopColor="#2756FD" />
        </linearGradient>
      </defs>
    </svg>
  );
};
