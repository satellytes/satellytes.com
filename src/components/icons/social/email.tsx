import React from 'react';

interface EmailProps {
  color?: string;
}

export const IconEmail: React.FC<EmailProps> = (props) => (
  <svg
    width="24"
    height="19"
    viewBox="0 0 24 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 5.00006L12 11.0001L24 5.00006V16.0001C24 17.6569 22.6569 19.0001 21 19.0001H3C1.34315 19.0001 0 17.6569 0 16.0001V5.00006Z"
      fill={props.color ? props.color : '#668CFF'}
    />
    <path
      d="M24 3.00006L12 9.00006L5.24537e-07 3.00005C6.69384e-07 1.3432 1.34315 -2.01005e-05 3 -1.99557e-05L21 -1.83821e-05C22.6569 -1.82372e-05 24 1.3432 24 3.00006Z"
      fill={props.color ? props.color : '#668CFF'}
    />
  </svg>
);
