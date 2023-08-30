import React from 'react';
import { Accordion, AccordionSection } from '../../ui/accordion/accordion';
import styled from 'styled-components';
import { up } from '../../support/breakpoint';
import { TextStyles } from '../../typography';
import { Teaser } from '../../content/teaser/teaser';
import {
  ContentfulAccordionItem,
  ContentfulSectionHeader,
} from '../../../types';

const Spacer = styled.div`
  margin-bottom: 32px;

  ${up('md')} {
    margin-top: 48px;
  }
`;

const AccordionWrapper = styled.div`
  margin: 0 -24px;

  ${up('sm')} {
    margin: 0;
  }
`;

const AccordionText = styled.p`
  ${TextStyles.textSR}
  margin-top: 12px;
  margin-bottom: -3px;
`;

const ApplicationProcessWrapper = styled.div`
  margin-top: 48px;

  ${up('md')} {
    margin-top: 60px;
  }
`;

interface ApplicationProcessProps {
  header: ContentfulSectionHeader;
  accordion: ContentfulAccordionItem[];
}

export const ApplicationProcess = ({
  header,
  accordion,
}: ApplicationProcessProps) => {
  return (
    <ApplicationProcessWrapper>
      <Teaser title={header.headline as string}>
        {header.paragraphs?.[0]?.paragraph?.paragraph as string}
      </Teaser>

      <Spacer />

      <AccordionWrapper>
        <Accordion defaultIndex={0}>
          {accordion.map((item, index) => (
            <AccordionSection key={index} title={item.title}>
              <AccordionText>{item.paragraph.paragraph}</AccordionText>
            </AccordionSection>
          ))}
        </Accordion>
      </AccordionWrapper>
    </ApplicationProcessWrapper>
  );
};
