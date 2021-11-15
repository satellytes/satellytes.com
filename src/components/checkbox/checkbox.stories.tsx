import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Checkbox from './checkbox';

export default {
  component: Checkbox,
  title: 'Components/Checkbox',
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);
export const Regular = Template.bind({});
Regular.args = {
  label: 'Satellytes',
};
Regular.parameters = {
  backgrounds: {
    values: [
      { name: 'black', value: '#000' },
      { name: 'white (figma)', value: '#F2F2F2;' },
    ],
  },
};
