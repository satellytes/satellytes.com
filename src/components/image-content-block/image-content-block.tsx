import React from 'react';
import styled from 'styled-components';
import { down } from '../breakpoint/breakpoint';
import { theme } from '../layout/theme';
import { TextStyles } from '../typography/typography-v2';

const BlockWrapper = styled.div<{
  textAlign: 'right' | 'left' | 'bottom';
}>`
  display: inline-flex;
  flex-direction: ${({ textAlign }) =>
    textAlign === 'right'
      ? 'row'
      : textAlign === 'left'
      ? 'row-reverse'
      : 'column'};

  width: 100%;

  ${down('sm')} {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  display: inline;
  position relative;
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

const TextWrapper = styled.div<{
  textAlign: 'right' | 'left' | 'bottom';
}>`
  ${({ textAlign }) =>
    textAlign === 'right'
      ? 'margin-left: 24px;'
      : textAlign === 'left'
      ? 'margin-right: 24px;'
      : 'margin-top: 12px;'}

  ${({ textAlign }) =>
    textAlign === 'bottom' ? TextStyles.textXS : TextStyles.textS}

  ${({ textAlign }) =>
    textAlign === 'bottom' ? 'width 0; min-width:100%;' : ''}
  ${({ textAlign }) => (textAlign !== 'bottom' ? 'max-width: 228px;' : '')}

  ${down('sm')} {
    ${TextStyles.textXS}

    margin: 12px 0;
    width 0;
    min-width: 100%;
    max-width: 100;
  }

  ${theme.palette.text.default};
`;

interface ImageContentBlockProps {
  children: React.ReactNode;
  textAlign: 'right' | 'left' | 'bottom';
  description: string;
  attribution: {
    source: string;
    creator: string;
  };
}

const ImageContentBlock = ({
  children,
  textAlign,
  description,
  attribution,
}: ImageContentBlockProps) => {
  return (
    <BlockWrapper textAlign={textAlign}>
      <ImageWrapper>
        {children}
        {attribution && (
          <AttributionContainer>
            Photo by{' '}
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
      <TextWrapper textAlign={textAlign}>{description}</TextWrapper>
    </BlockWrapper>
  );
};

export default ImageContentBlock;
