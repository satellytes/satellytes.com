import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Textfield from './textfield';

export default {
  component: Textfield,
  title: 'Components/Textfield',
  parameters: {
    layout: 'fullscreen',
    background: 'white (figma)',
  },
} as ComponentMeta<typeof Textfield>;

const Template: ComponentStory<typeof Textfield> = (args) => (
  <Textfield {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  label: 'Label *',
  error: false,
  errorMessage: 'Something went wrong!',
};

Regular.parameters = {
  backgrounds: {
    default: 'white (figma)',
    values: [
      { name: 'black', value: '#000' },
      { name: 'white (figma)', value: '#F2F2F2;' },
    ],
  },
};
