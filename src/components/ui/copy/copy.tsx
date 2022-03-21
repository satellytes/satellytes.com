import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton } from '../buttons/icon-button';
import { Icon } from '../icon/icon';

const Default_Clicked_Duration = 3000;

interface CopyProps {
  /**
   * Duration, that the Checkmark will be shown once the button is clicked
   * @default 3000ms
   */
  clickedDuration?: number;

  /**
   * Text that will be copied
   */
  text: string;

  className?: string;
}

const CheckmarkContainer = styled.span`
  width: 24px;
  height: 24px;
  color: #17e5c3;

  padding: 0;
`;

const CopyWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  padding: 0;
`;

export const Copy = ({ clickedDuration, text, className }: CopyProps) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);

    navigator.clipboard.writeText(text);

    setTimeout(
      () => setClicked(false),
      clickedDuration ?? Default_Clicked_Duration,
    );
  };

  return (
    <CopyWrapper id="copy-container" className={className}>
      {clicked ? (
        <CheckmarkContainer>
          <Icon show="checkmark_bold" />
        </CheckmarkContainer>
      ) : (
        <IconButton icon={'clone'} onClick={handleClick}></IconButton>
      )}
    </CopyWrapper>
  );
};
