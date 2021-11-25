import React from 'react';
import { ComponentStory } from '@storybook/react';
import Quote from './quote';

const Template: ComponentStory<typeof Quote> = (args) => {
  return <Quote>{args.children}</Quote>;
};

export const Regular = Template.bind({});
Regular.args = {
  children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.`,
};
