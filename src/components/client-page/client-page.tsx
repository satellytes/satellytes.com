import React from 'react';
import styled from 'styled-components';
import { formattedDate } from '../../shared';
import { up } from '../breakpoint/breakpoint';
import { Grid, GridItem } from '../grid/grid';
import { Markdown } from '../markdown/markdown';
import { SubTitle } from '../typography/typography';

export interface ClientProps {
  data: {
    clientsJson: {
      name: string;
      industry: string;
      description?: string;
      tasks: string[];
      techStack: string[];
      teamSize?: number;
      start: string;
      currentInvestInDays?: number;
      details?: string[];
    };
    markdownRemark: {
      rawMarkdownBody: string;
    };
  };
}

const LabelsItem = styled.p`
  color: #202840;
  opacity: 0.5;
  font-family: CocoGothic;
  font-size: 12px;
  line-height: 110%;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const LabelsWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 12px 0px;
  margin-bottom: 40px;

  ${up('md')} {
    margin-bottom: 80px;
    flex-direction: row;
  }
`;

const LabelsText = styled.p`
  color: #202840;
  font-size: 32px;
  line-height: 110%;
  font-weight: bold;
  margin-top: 14px;
`;

const Items = styled.div`
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

const ClientSubTitle = styled(SubTitle)`
  margin-bottom: 40px;
  margin-top: 0px;
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
          <ClientDescription data={data.markdownRemark.rawMarkdownBody} />
        </GridItem>
      </Grid>

      <Grid>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>Tasks</LabelsItem>

          <LabelsWrapper>
            {data.clientsJson.tasks.map((task, index) => (
              <Items key={index}>{task}</Items>
            ))}
          </LabelsWrapper>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>tech stack</LabelsItem>
          <LabelsWrapper>
            {data.clientsJson.techStack.map((technology, index) => (
              <Items key={index}>{technology}</Items>
            ))}
          </LabelsWrapper>
        </GridItem>
      </Grid>

      <Grid>
        <GridItem xs={0} md={2} />

        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>Team size</LabelsItem>

          <LabelsWrapper>
            <LabelsText>{data.clientsJson.teamSize} people</LabelsText>
          </LabelsWrapper>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>current invest</LabelsItem>

          <LabelsWrapper>
            <LabelsText>{data.clientsJson.currentInvestInDays} days</LabelsText>
          </LabelsWrapper>
        </GridItem>
      </Grid>

      <Grid>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>start</LabelsItem>

          <LabelsWrapper>
            <LabelsText>{formattedDate(data.clientsJson.start)}</LabelsText>
          </LabelsWrapper>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>finish</LabelsItem>
          <LabelsWrapper>
            <LabelsText>Internity</LabelsText>
          </LabelsWrapper>
        </GridItem>
      </Grid>
    </div>
  );
};

export default ClientPage;
