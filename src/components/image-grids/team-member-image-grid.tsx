import React from 'react';
import { Grid, GridItem } from '../grid/grid';
import { FluidObject } from 'gatsby-image';
import ImageCard from '../image-card/image-card';
import styled from 'styled-components';

interface TeamMemberImageGridProps {
  teamMembers: {
    name: string;
    role: string;
    links?: { title: string; url: string }[];
  }[];
  imagePlaceholder: FluidObject;
}

const ImageCardGrid = styled(Grid)`
  grid-column-gap: 24px;
`;

const TeamMemberImageGrid: React.FC<TeamMemberImageGridProps> = ({
  teamMembers,
  imagePlaceholder,
}) => {
  return (
    <ImageCardGrid>
      {teamMembers.map((teamMember) => (
        <GridItem xs={6} sm={4} md={3} key={teamMember.name}>
          <ImageCard
            alt={teamMember.name}
            image={imagePlaceholder}
            title={teamMember.name}
            subtitle={teamMember.role}
            links={teamMember.links}
          />
        </GridItem>
      ))}
    </ImageCardGrid>
  );
};

export default TeamMemberImageGrid;
