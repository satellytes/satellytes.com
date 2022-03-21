import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
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

const CopyWrapper = styled.div<{ clicked: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0;

  ${(props) =>
    props.clicked &&
    css`
      padding: 8px;
      border-radius: 3px;
      background-color: white;
    `}
`;

export const Copy = ({ clickedDuration, text, className }: CopyProps) => {
  const [clicked, setClicked] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    setClicked(true);

    navigator.clipboard.writeText(text);

    setTimeout(
      () => setClicked(false),
      clickedDuration ?? Default_Clicked_Duration,
    );
  };

  return (
    <CopyWrapper id="copy-container" clicked={clicked} className={className}>
      {clicked ? (
        <>
          <span>{t('blog.copied')}</span>
          <CheckmarkContainer>
            <Icon show="checkmark_bold" />
          </CheckmarkContainer>
        </>
      ) : (
        <IconButton icon={'clone'} onClick={handleClick}></IconButton>
      )}
    </CopyWrapper>
  );
};
