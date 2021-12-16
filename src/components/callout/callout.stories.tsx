import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Callout from './callout';
import { ILLUSTRATION_NAMES } from '../../new-components/illustration/illustration-set';

const EXAMPLE_ILLUSTRATIONS = [null, ...ILLUSTRATION_NAMES.slice(0, 5)];
export default {
  component: Callout,
  title: 'Components/Callout',
  parameters: {
    componentSubtitle:
      'Display additional information detached from your surrounding text content',
  },
  argTypes: {
    illustration: {
      options: EXAMPLE_ILLUSTRATIONS,
      description:
        'Pick one of the available illustrations. See the Illustration component for more details.',
      control: {
        type: 'select',
        labels: {
          null: 'None',
        },
      },
    },
  },
} as ComponentMeta<typeof Callout>;

const Template: ComponentStory<typeof Callout> = (args) => {
  return (
    <Callout illustration={args.illustration || EXAMPLE_ILLUSTRATIONS[1]}>
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
