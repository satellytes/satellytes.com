import React from 'react';
import styled from 'styled-components';

interface LinkedinProps {
  color?: string;
}

export const IconLinkedIn: React.FC<LinkedinProps> = (props) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21.9947 22V21.9991H22.0002V13.9726C22.0002 10.046 21.147 7.0213 16.5136 7.0213C14.2862 7.0213 12.7914 8.23229 12.1812 9.38036H12.1168V7.38788H7.72363V21.9991H12.2981V14.7642C12.2981 12.8592 12.6626 11.0172 15.0437 11.0172C17.3898 11.0172 17.4248 13.1912 17.4248 14.8864V22H21.9947Z" />
    <path d="M0.467773 7.25531H4.91458V22H0.467773V7.25531Z" />
    <path d="M2.69149 0C1.20566 0 0 1.20004 0 2.67894C0 4.15784 1.20566 5.38297 2.69149 5.38297C4.17731 5.38297 5.38297 4.15784 5.38297 2.67894C5.38204 1.20004 4.17638 0 2.69149 0V0Z" />
  </svg>
);

export const LinkedinWrapper = styled(IconLinkedIn)<LinkedinProps>`
  transition: fill 0.3s ease-in;
  fill: ${(props) => (props.color ? props.color : '#202840')};
  &:hover {
    fill: ${(props) => (props.color ? props.color : '#ffffff')};
  }
`;
