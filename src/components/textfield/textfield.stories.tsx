import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Textfield from './textfield';

export default {
  component: Textfield,
  title: 'Components/Textfield',
} as ComponentMeta<typeof Textfield>;

const Template: ComponentStory<typeof Textfield> = (args) => (
  <Textfield {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  label: 'Label *',
  errorMessage: '',
};
