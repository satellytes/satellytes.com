import React from 'react';
import { Trans } from 'react-i18next';
import styled, { css } from 'styled-components';
import { up } from '../../components/style-utils/breakpoint';
import { theme } from '../layout/theme';
import { TextStyles } from '../typography';

const mapTextAlignToFlex = (textAlign: 'right' | 'left' | 'bottom') => {
  if (textAlign === 'right') {
    return 'row';
  } else if (textAlign === 'left') {
    return 'row-reverse';
  } else {
    return 'column';
  }
};

interface TextAlignProps {
  textPlacement: 'right' | 'left' | 'bottom';
}

const BlockWrapper = styled.div<TextAlignProps>`
  display: flex;
  flex-direction: column;

  gap: 12px 24px;

  ${up('sm')} {
    flex-direction: ${({ textPlacement: textPlacement }) =>
      mapTextAlignToFlex(textPlacement)};
  }
`;

const ImageWrapper = styled.div`
  display: inline;
  position: relative;
`;

const AttributionContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  display: block;

  padding: 6px 8px;
  margin-bottom: 5px;

  font-size: 10px;
  line-height: 110%;
  color: #ffffff;
`;

const StyledLink = styled.a`
  color: #ffffff;
`;

const TextWrapper = styled.div<TextAlignProps>`
  ${TextStyles.textXS}

  max-width: 100%;
  color: ${theme.palette.text.default};

  ${up('sm')} {
    ${({ textPlacement: textPlacement }) =>
      textPlacement === 'bottom' &&
      css`
        ${TextStyles.textXS}
      `}

    ${({ textPlacement: textPlacement }) =>
      textPlacement !== 'bottom' &&
      css`
        ${TextStyles.textS}
        max-width: 228px;
      `}
  }
`;

interface ImageContentBlockProps {
  children: React.ReactNode;
  textAlign: 'right' | 'left' | 'bottom';
  description: string;
  attribution?: {
    source: string;
    creator: string;
  };
}

export const Image = ({
  children,
  textAlign,
  description,
  attribution,
}: ImageContentBlockProps) => {
  return (
    <BlockWrapper textPlacement={textAlign}>
      <ImageWrapper>
        {children}
        {attribution && (
          <AttributionContainer>
            <Trans i18nKey="image.attribution">Photo by </Trans>
            <StyledLink
              rel="nofollow noreferrer"
              target="_blank"
              href={attribution.source}
            >
              {attribution.creator}
            </StyledLink>
          </AttributionContainer>
        )}
      </ImageWrapper>
      <TextWrapper textPlacement={textAlign}>{description}</TextWrapper>
    </BlockWrapper>
  );
};
