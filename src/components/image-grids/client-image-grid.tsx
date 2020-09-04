import React from 'react';
import { Grid, GridItem } from '../grid/grid';
import ImageCard from '../image-card/image-card';
import styled from 'styled-components';
import { InternalLink } from '../links/links';
import { up } from '../breakpoint/breakpoint';
import { FluidObject } from 'gatsby-image';

interface ClientImageGridProps {
  clients: { name: string; path: string }[];
  imagePlaceholder: FluidObject;
}

const ImageCardGrid = styled(Grid)`
  grid-column-gap: 24px;
  margin-top: 40px;

  ${up('md')} {
    margin-top: 80px;
  }
`;

const EmptyGridItem = styled(GridItem)``;

const ClientImageGrid: React.FC<ClientImageGridProps> = ({
  clients,
  imagePlaceholder,
}) => {
  return (
    <ImageCardGrid>
      {clients.map((client, index) => {
        // add two empty grid squares between 2nd and 3rd client on desktop
        if (index === 1)
          return (
            <React.Fragment key={client.name}>
              <GridItem xs={12} sm={4}>
                <InternalLink to={client.path}>
                  <ImageCard
                    alt={client.name}
                    image={imagePlaceholder}
                    title={client.name}
                    largeTitle
                  />
                </InternalLink>
              </GridItem>
              <EmptyGridItem xs={0} sm={4} />
              <EmptyGridItem xs={0} sm={4} />
            </React.Fragment>
          );
        else
          return (
            <GridItem xs={12} sm={4} key={client.name}>
              <InternalLink to={client.path}>
                <ImageCard
                  alt={client.name}
                  image={imagePlaceholder}
                  title={client.name}
                  largeTitle
                />
              </InternalLink>
            </GridItem>
          );
      })}
    </ImageCardGrid>
  );
};

export default ClientImageGrid;
