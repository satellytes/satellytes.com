import React from 'react';

interface LinkedinProps {
  color?: string;
}

export const IconLinkedIn: React.FC<LinkedinProps> = (props) => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.9406 5.0564C1.71819 5.0564 0.732422 3.92395 0.732422 2.52779C0.732422 1.13244 1.71819 0 2.9406 0C4.15803 0 5.14594 1.13244 5.14594 2.52779C5.14594 3.92395 4.15803 5.0564 2.9406 5.0564ZM19.0986 21H15.2931V14.1783C15.2931 12.5519 15.2689 10.4592 13.3159 10.4592C11.3351 10.4592 11.0329 12.2318 11.0329 14.0623V21H7.23163V6.97282H10.8796V8.89074H10.9324C11.4399 7.78767 12.6815 6.625 14.5326 6.625C18.3866 6.625 19.0986 9.52923 19.0986 13.3071V21ZM4.84436 6.9729H1.03457V21H4.84436V6.9729Z"
      fill={props.color ? props.color : '#202840'}
    />
  </svg>
);
