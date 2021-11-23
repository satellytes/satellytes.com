import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Accordion, AccordionContent } from './accordion';
import '@reach/accordion/styles.css';
import { IllustrationType } from '../illustration/illustration-set';

export default {
  component: Accordion,
  title: 'Components/Accordion',
  parameters: {
    componentSubtitle: 'A vertically stacked group of collapsible sections.',
  },
} as ComponentMeta<typeof Accordion>;

export const Regular = () => {
  return (
    <Accordion defaultIndex={0}>
      <AccordionContent
        title="1. Deine Bewerbung"
        illustration={'scientistB_007'}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolorem
        itaque nam, quisquam quos sed totam voluptas voluptatem voluptatibus.
        Debitis dicta dolores enim esse fugit impedit odio sed sunt tenetur!
      </AccordionContent>
      <AccordionContent
        title="2. Das Kennenlernen"
        illustration={'astronaut_015'}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolorem
        itaque nam, quisquam quos sed totam voluptas voluptatem voluptatibus.
        Debitis dicta dolores enim esse fugit impedit odio sed sunt tenetur!
      </AccordionContent>
      <AccordionContent title="3. Abschluss">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolorem
        itaque nam, quisquam quos sed totam voluptas voluptatem voluptatibus.
        Debitis dicta dolores enim esse fugit impedit odio sed sunt tenetur!
        consectetur adipisicing elit. Ab dolorem itaque nam, quisquam quos sed
        totam voluptas voluptatem voluptatibus. Debitis dicta dolores enim esse
        fugit impedit odio sed sunt tenetur!
      </AccordionContent>
    </Accordion>
  );
};

export interface AccordionContentProps {
  title: string;
  illustration: IllustrationType;
}

export const AccordionContentOnly = (props: AccordionContentProps) => {
  return (
    <Accordion defaultIndex={0}>
      <AccordionContent title={props.title} illustration={props.illustration}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolorem
        itaque nam, quisquam quos sed totam voluptas voluptatem voluptatibus.
        Debitis dicta dolores enim esse fugit impedit odio sed sunt tenetur!
      </AccordionContent>
    </Accordion>
  );
};
