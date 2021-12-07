import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Expandable } from './expandable';

const Template: ComponentStory<typeof Expandable> = (args) => {
  return <Expandable {...args}>{args.children}</Expandable>;
};

export const Regular = Template.bind({});
Regular.args = {
  children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.`,
  summary: 'Summary',
};
