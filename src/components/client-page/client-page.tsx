import React from 'react';
import styled from 'styled-components';
import { up } from '../breakpoint/breakpoint';
import { Grid, GridItem } from '../grid/grid';
import { SubTitle } from '../typography/typography';
import { Markdown } from '../markdown/markdown';
import { formattedDate } from '../util/format-date';

export interface ClientProps {
  data: {
    clientsJson: {
      name: string;
      industry: string;
      description: string;
      tasks: string[];
      techStack: string[];
      teamSize?: number;
      start: string;
      currentInvestInDays?: number;
      details?: string[];
    };
  };
}

const LabelsItem = styled.p`
  color: #202840;
  opacity: 0.5;
  font-size: 12px;
  line-height: 110%;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin-bottom: 40px;

  ${up('md')} {
    margin-bottom: 80px;
  }
`;

const Items = styled.li`
  font-size: 14px;
  font-weight: bold;
  line-height: 110%;
  color: #ffffff;
  background: #668cff;
  border-radius: 16px;
  border: 0;
  padding: 9px 14px;
  margin: 12px;
  margin-left: 0;
  }
`;

const ClientInfoItem = styled.p`
  color: #202840;
  font-size: 32px;
  line-height: 110%;
  font-weight: bold;
  margin-top: 14px;
`;

const ClientSubTitle = styled(SubTitle)`
  margin-bottom: 40px;
  margin-top: 0;
`;

const TitleLabelItem = styled(LabelsItem)`
  margin-top: 60px;
  ${up('md')} {
    margin-top: 100px;
  }
`;

const ClientDescription = styled(Markdown)`
  margin-bottom: 40px;

  ${up('md')} {
    margin-bottom: 140px;
  }
}
`;

const ClientPage: React.FC<ClientProps> = ({ data }) => {
  return (
    <div>
      <Grid>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <TitleLabelItem>{data.clientsJson.industry}</TitleLabelItem>
          <ClientSubTitle>{data.clientsJson.name}</ClientSubTitle>
          <ClientDescription data={data.clientsJson.description} />
        </GridItem>
      </Grid>

      <Grid>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>Tasks</LabelsItem>
          <Wrapper>
            {data.clientsJson.tasks.map((task, index) => (
              <Items key={index}>{task}</Items>
            ))}
          </Wrapper>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>tech stack</LabelsItem>
          <Wrapper>
            {data.clientsJson.techStack.map((technology, index) => (
              <Items key={index}>{technology}</Items>
            ))}
          </Wrapper>
        </GridItem>
      </Grid>

      <Grid>
        <GridItem xs={0} md={2} />

        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>Team size</LabelsItem>

          <Wrapper>
            <ClientInfoItem>{data.clientsJson.teamSize} people</ClientInfoItem>
          </Wrapper>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>current invest</LabelsItem>

          <Wrapper>
            <ClientInfoItem>
              {data.clientsJson.currentInvestInDays} days
            </ClientInfoItem>
          </Wrapper>
        </GridItem>
      </Grid>

      <Grid>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>start</LabelsItem>

          <Wrapper>
            <ClientInfoItem>
              {formattedDate(data.clientsJson.start)}
            </ClientInfoItem>
          </Wrapper>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>finish</LabelsItem>
          <Wrapper>
            <ClientInfoItem>Internity</ClientInfoItem>
          </Wrapper>
        </GridItem>
      </Grid>
    </div>
  );
};

export default ClientPage;
