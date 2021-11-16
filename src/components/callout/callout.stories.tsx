import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Callout from './callout';
import { ILLUSTRATION_NAMES } from '../illustration/illustration-set';

export default {
  component: Callout,
  title: 'Components/Callout',
  parameters: {
    componentSubtitle:
      'Display additional information detached from your surrounding text content',
  },
  argTypes: {
    illustration: {
      options: ILLUSTRATION_NAMES,
      description:
        'Pick one of the available illustrations. See the Illustration component for more details.',
      control: {
        type: 'select',
      },
    },
  },
} as ComponentMeta<typeof Callout>;

const Template: ComponentStory<typeof Callout> = (args) => {
  return (
    <Callout illustration={args.illustration || ILLUSTRATION_NAMES[0]}>
      {args.children}
    </Callout>
  );
};

export const Regular = Template.bind({});
Regular.args = {
  children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.`,
};

export const WithLongText = Template.bind({});
WithLongText.args = {
  children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.`,
};
