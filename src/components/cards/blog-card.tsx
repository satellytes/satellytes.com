import React from 'react';
import GatsbyImage, { FluidObject, GatsbyImageProps } from 'gatsby-image';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { theme } from '../layout/theme';
import { up } from '../breakpoint/breakpoint';
import { CardProps, CardWrapper, CardTitle, CardText } from './card';

interface BlogCardProps extends CardProps {
  link: string;
  caption?: string;
  image?: boolean;
  placeholderImage?: FluidObject;
  large?: boolean;
}

const LinkWrapper = styled(Link)`
  text-decoration: none;
`;

const BlogCardWrapper = styled(CardWrapper)<{ image: boolean }>`
  padding: 24px;
  overflow: hidden;

  ${(props) =>
    props.image &&
    css`
      padding: 24px 16px;
    `}
`;

const BlogCardImage = styled(GatsbyImage)<GatsbyImageProps>`
  width: calc(100% + 2 * 16px);
  margin: -24px -16px 24px;
`;

const BlogCardTitle = styled(CardTitle)<{ image: boolean; large: boolean }>`
  margin-bottom: 16px;
  font-size: 32px;

  transition: color 0.3s;
  ${BlogCardWrapper}:hover & {
    color: ${theme.palette.primary.main};
  }

  ${(props) =>
    props.large &&
    css`
      ${up('md')} {
        margin-bottom: 12px;
        font-size: 48px;
      }
    `}

  ${(props) =>
    props.image &&
    css`
      margin-bottom: 8px;
      font-size: 20px;
    `}
    
  ${(props) =>
    props.large &&
    props.image &&
    css`
      ${up('md')} {
        margin-bottom: 12px;
        font-size: 24px;
      }
    `}
`;

const BlogCardText = styled(CardText)<{ image: boolean; large: boolean }>`
  flex-grow: inherit;
  margin-bottom: 8px;

  ${BlogCardWrapper}:hover & {
    color: ${theme.palette.primary.main};
  }

  /* --- line-clipping --- */
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

  ${(props) =>
    props.large &&
    css`
      ${up('md')} {
        -webkit-line-clamp: 3;
      }
    `}
`;

const CardCaption = styled.p`
  margin: 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: rgba(32, 40, 64, 0.5);

  ${BlogCardWrapper}:hover & {
    color: ${theme.palette.primary.main};
  }
`;

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  text,
  link,
  caption = '',
  image,
  placeholderImage,
  large = false,
}) => {
  return (
    <BlogCardWrapper
      as={LinkWrapper}
      to={link}
      image={image ? 1 : 0}
      sm={6}
      md={large ? 6 : 4}
    >
      {image && placeholderImage && (
        <BlogCardImage
          fluid={{
            ...placeholderImage,
            aspectRatio: large ? 1.714 : 1.56,
          }}
        />
      )}

      <BlogCardTitle image={Boolean(image)} large={Boolean(large)}>
        {title}
      </BlogCardTitle>

      {text.length > 0 && (
        <BlogCardText image={Boolean(image)} large={Boolean(large)}>
          {text}
        </BlogCardText>
      )}

      {caption && <CardCaption>{caption}</CardCaption>}
    </BlogCardWrapper>
  );
};
