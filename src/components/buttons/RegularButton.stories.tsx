import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RegularButton from './RegularButton';

export default {
  component: RegularButton,
  title: 'Components/RegularButton',
  argTypes: {
    onClick: { action: 'onChange' },
  },
} as ComponentMeta<typeof RegularButton>;

const Template: ComponentStory<typeof RegularButton> = (args) => (
  <RegularButton {...args}></RegularButton>
);

export const Regular = Template.bind({});
Regular.args = {
  children: 'Alle Services',
};
