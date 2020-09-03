import React from 'react';

interface FacebookProps {
  color?: string;
}

export const IconFacebook: React.FC<FacebookProps> = (props) => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23 11.5C23 5.14805 17.852 0 11.5 0C5.14805 0 0 5.14805 0 11.5C0 17.852 5.14805 23 11.5 23C11.5674 23 11.6348 23 11.7021 22.9955V14.0471H9.23145V11.1676H11.7021V9.04727C11.7021 6.59004 13.2025 5.25137 15.3947 5.25137C16.4459 5.25137 17.3488 5.32773 17.6094 5.36367V7.9332H16.1C14.9096 7.9332 14.676 8.49922 14.676 9.33027V11.1631H17.5285L17.1557 14.0426H14.676V22.5553C19.4826 21.1762 23 16.7514 23 11.5Z"
      fill={props.color ? props.color : '#668CFF'}
    />
  </svg>
);
