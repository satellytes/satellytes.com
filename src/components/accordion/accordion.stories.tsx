import React from 'react';
import { Accordion, AccordionSection } from './accordion';
import '@reach/accordion/styles.css';
import { ILLUSTRATION_NAMES } from '../illustration/illustration-set';

export const Regular = () => {
  return (
    <Accordion defaultIndex={0}>
      <AccordionSection
        title="1. Deine Bewerbung"
        illustration={'scientistB_007'}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolorem
        itaque nam, quisquam quos sed totam voluptas voluptatem voluptatibus.
        Debitis dicta dolores enim esse fugit impedit odio sed sunt tenetur!
      </AccordionSection>
      <AccordionSection
        title="2. Das Kennenlernen"
        illustration={'astronaut_015'}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolorem
        itaque nam, quisquam quos sed totam voluptas voluptatem voluptatibus.
        Debitis dicta dolores enim esse fugit impedit odio sed sunt tenetur!
      </AccordionSection>
      <AccordionSection title="3. Abschluss">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolorem
        itaque nam, quisquam quos sed totam voluptas voluptatem voluptatibus.
        Debitis dicta dolores enim esse fugit impedit odio sed sunt tenetur!
        consectetur adipisicing elit. Ab dolorem itaque nam, quisquam quos sed
        totam voluptas voluptatem voluptatibus. Debitis dicta dolores enim esse
        fugit impedit odio sed sunt tenetur!
      </AccordionSection>
    </Accordion>
  );
};

interface AccordionExampleProps {
  defaultIndex: number;
}

export const AccordionContainerExample = (props: AccordionExampleProps) => {
  return (
    <Accordion defaultIndex={[0, 1]}>
      <AccordionSection title="Section A">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolorem
        itaque nam, quisquam quos sed totam voluptas voluptatem voluptatibus.
        Debitis dicta dolores enim esse fugit impedit odio sed sunt tenetur!
      </AccordionSection>
      <AccordionSection title="Section B">
        This section is opened by default as we defined the defaultIndex to be
        1.
      </AccordionSection>
    </Accordion>
  );
};

export const AccordionSectionExample = (args) => {
  return (
    <Accordion defaultIndex={[0, 1]}>
      <AccordionSection
        title="Text with illustration"
        illustration={args.illustration}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolorem
        itaque nam, quisquam quos sed totam voluptas voluptatem voluptatibus.
        Debitis dicta dolores enim esse fugit impedit odio sed sunt tenetur!
      </AccordionSection>
      <AccordionSection title="Text, no illustration">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolorem
        itaque nam, quisquam quos sed totam voluptas voluptatem voluptatibus.
        Debitis dicta dolores enim esse fugit impedit odio sed sunt tenetur!
      </AccordionSection>
    </Accordion>
  );
};

const EXAMPLE_ILLUSTRATIONS = [...ILLUSTRATION_NAMES.slice(0, 5)];
AccordionSectionExample.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  defaultIndex: {
    table: {
      disable: true,
    },
  },
  illustration: {
    options: EXAMPLE_ILLUSTRATIONS,
    defaultValue: ILLUSTRATION_NAMES[0],
    description:
      'Pick one of the available illustrations. See the Illustration component for more details.',
    control: {
      type: 'select',
      labels: {
        null: 'None',
      },
    },
  },
};
