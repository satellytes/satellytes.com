import React from 'react';
import { ImageCardSubtitle, TextLink } from '../typography/typography';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { navigate } from 'gatsby';

const JobCardContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 400px;
  margin-bottom: 16px;

  background-color: #f7f8fa;

  padding: 32px 26px 24px 24px;

  ${up('sm')} {
    padding: 32px 28px 20px 22px;
  }

  transition: transform 0.2s ease-in, box-shadow 0.2s ease-in;

  :hover {
    transform: translateY(-2px);
    box-shadow: inset 0px -2px 0px #668cff;
    cursor: pointer;
  }
`;

const JobCardTitle = styled.h3`
  font-size: 32px;
  font-weight: normal;
  line-height: 110%;
  color: #202840;
  margin-top: 0;
  margin-bottom: 24px;
`;

const JobCardText = styled(ImageCardSubtitle)`
  flex-grow: 1;
`;

interface JobCardProps {
  title: string;
  text: string;
  link: string;
}

export const JobCard = (props: JobCardProps): JSX.Element => {
  return (
    <JobCardContainer onClick={() => navigate(props.link)}>
      <JobCardTitle>{props.title}</JobCardTitle>
      <JobCardText>
        <div
          dangerouslySetInnerHTML={{
            __html: props.text,
          }}
        />
      </JobCardText>
      <TextLink to={props.link}>Apply</TextLink>
    </JobCardContainer>
  );
};
