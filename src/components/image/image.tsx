import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

interface ImageProps {
  imageName: string;
  alt: string;
  card?: boolean;
}

const ImageWrapper = styled.div<{ card: boolean | undefined }>`
  margin-bottom: ${(props) => (props.card ? '0' : '24px')};
`;

const StyledImg = styled(Img)`
  border-radius: 4px;
`;

const Image: React.FC<ImageProps> = ({ alt, imageName, card }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const image = data.images.edges.find((element) => {
        return element.node.relativePath.includes(imageName);
      });
      if (!image) {
        return null;
      }

      return (
        <ImageWrapper card={card}>
          <StyledImg
            alt={alt}
            sizes={{
              ...image.node.childImageSharp.fluid,
              aspectRatio: 1 / 1,
            }}
          />
        </ImageWrapper>
      );
    }}
  />
);

export default Image;
