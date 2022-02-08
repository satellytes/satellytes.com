import React from 'react';
import { Accordion, AccordionSection } from '../../ui/accordion/accordion';
import styled from 'styled-components';
import { SectionHeader } from '../../content/section-header/section-header';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { up } from '../../support/breakpoint';

const Spacer = styled.div`
  margin-bottom: 48px;
`;

const AccordionWrapper = styled.div`
  margin: 0 -24px;

  ${up('sm')} {
    margin: 0;
  }
`;

export const ApplicationProcess = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionHeader headline={t('career.application-process.headline')}>
        {t('career.application-process.paragraph')}
      </SectionHeader>

      <Spacer />

      <AccordionWrapper>
        <Accordion defaultIndex={0}>
          <AccordionSection
            title={t('career.application-process.accordion.0.title')}
            illustration={'scientistB_007'}
          >
            {t('career.application-process.accordion.0.paragraph')}
          </AccordionSection>

          <AccordionSection
            title={t('career.application-process.accordion.1.title')}
            illustration={'astronaut_015'}
          >
            {t('career.application-process.accordion.1.paragraph')}
          </AccordionSection>

          <AccordionSection
            title={t('career.application-process.accordion.2.title')}
          >
            {t('career.application-process.accordion.2.paragraph')}
          </AccordionSection>

          <AccordionSection
            title={t('career.application-process.accordion.3.title')}
          >
            {t('career.application-process.accordion.3.paragraph')}
          </AccordionSection>
        </Accordion>
      </AccordionWrapper>
    </>
  );
};
