import React from 'react';

export const ExpandableChevron = (
  props: React.SVGAttributes<SVGElement>,
): JSX.Element => (
  <svg
    className={props.className}
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.77064 5.68539L9.67861 1.8337C10.3652 1.15702 9.87892 0 8.90797 0L1.09203 0C0.121082 0 -0.365171 1.15702 0.321395 1.8337L4.22936 5.68539C4.65497 6.10487 5.34503 6.10487 5.77064 5.68539Z"
      fill="#3E61EE"
    />
  </svg>
);
