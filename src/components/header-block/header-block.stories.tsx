import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HeaderBlock } from './header-block';

export default {
  component: HeaderBlock,
  title: 'Components/HeaderBlock',
} as ComponentMeta<typeof HeaderBlock>;

const Template: ComponentStory<typeof HeaderBlock> = (args) => (
  <HeaderBlock {...args}></HeaderBlock>
);

export const Regular = Template.bind({});
Regular.args = {
  topline: 'Topline',
  headline: 'Headline',
  metaline:
    'vor 3 Tagen · von Fabian Dietenberger, Frontend Engineer, Satellytes',
  illustration: 'rocket_011',
  large: true,
  children:
    'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.',
};

export const LandingPageExample = Template.bind({});
LandingPageExample.args = {
  topline: 'Unsere Services',
  headline: 'Development & Design',
  large: true,
  children: `Wir haben großen Spaß an Technologie und freuen uns auf neue Herausforderungen. Dabei fokussieren wir uns auf langfristige Engagements im Konzerngeschäft.
              Neuen Aufgaben begegnen wir immer mit angemessenem Respekt. Wir streben stets hochwertige und zeitgemäße Lösungen an – die Wahl der Technologie ist für uns dabei sekundär. Gern unterstützen wir auch Sie in den folgenden Disziplinen:`,
};
