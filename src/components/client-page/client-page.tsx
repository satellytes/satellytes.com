import React from 'react';
import { SubTitle, Text } from '../typography/typography';
import { Grid, GridItem } from '../grid/grid';
import styled from 'styled-components';
import { formattedDate } from '../../shared';
import { up } from '../breakpoint/breakpoint';

export interface ClientProps {
  client: {
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

const ClientDescription = styled(Text)`
  margin-bottom: 40px;

  ${up('md')} {
    margin-bottom: 140px;
  }
}
`;

const ClientPage: React.FC<ClientProps> = ({ client }) => {
  return (
    <div>
      <Grid>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <TitleLabelItem>{client.industry}</TitleLabelItem>
          <ClientSubTitle>{client.name}</ClientSubTitle>

          <ClientDescription>
            We are currently working on the relaunch of incredible client 1
            which will take another few months. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Etiam porta sem
            malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus
            commodo, tortor mauris condimentum nibh, ut fermentum massa justo
            sit amet risus. Morbi leo risus, porta ac consectetur ac, vestibulum
            at eros. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Morbi leo risus, porta ac consectetur ac, vestibulum
            at eros. Donec sed odio dui. Integer posuere erat a ante venenatis
            dapibus posuere velit aliquet. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum.´
          </ClientDescription>
        </GridItem>
      </Grid>

      <Grid>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>Tasks</LabelsItem>

          <LabelsWrapper>
            {client.tasks.map((task, index) => (
              <Items key={index}>{task}</Items>
            ))}
          </LabelsWrapper>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>tech stack</LabelsItem>
          <LabelsWrapper>
            {client.techStack.map((technology, index) => (
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
            <LabelsText>{client.teamSize} people</LabelsText>
          </LabelsWrapper>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>current invest</LabelsItem>

          <LabelsWrapper>
            <LabelsText>{client.currentInvestInDays} days</LabelsText>
          </LabelsWrapper>
        </GridItem>
      </Grid>

      <Grid>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>start</LabelsItem>

          <LabelsWrapper>
            <LabelsText>{formattedDate(client.start)}</LabelsText>
          </LabelsWrapper>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <LabelsItem>finish</LabelsItem>

          <LabelsWrapper>
            <LabelsText>Internity</LabelsText>
          </LabelsWrapper>
        </GridItem>
      </Grid>

      <Grid>
        <GridItem xs={0} md={2} />
        <GridItem xs={12} md={8}>
          <Text>
            We are currently working on the relaunch of incredible client 1
            which will take another few months. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum. Etiam porta sem
            malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus
            commodo, tortor mauris condimentum nibh, ut fermentum massa justo
            sit amet risus. Morbi leo risus, porta ac consectetur ac, vestibulum
            at eros. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Morbi leo risus, porta ac consectetur ac, vestibulum
            at eros. Donec sed odio dui. Integer posuere erat a ante venenatis
            dapibus posuere velit aliquet. Aenean eu leo quam. Pellentesque
            ornare sem lacinia quam venenatis vestibulum.´
          </Text>
        </GridItem>
      </Grid>
    </div>
  );
};

export default ClientPage;
