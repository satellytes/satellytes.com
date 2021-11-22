import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './button';

export default {
  component: Button,
  title: 'Components/Button',
  argTypes: {
    onClick: { action: 'onChange' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>
);

export const Regular = Template.bind({});
Regular.args = {
  children: 'Alle Services',
};
