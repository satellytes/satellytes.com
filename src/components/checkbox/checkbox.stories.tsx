import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Checkbox from './checkbox';

export default {
  component: Checkbox,
  title: 'Components/Checkbox',
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  label: 'Satellytes',
};
