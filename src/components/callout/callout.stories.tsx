import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Callout from './callout';
import ShootingStar from '../../illustrations/shooting-star.svg';
import ConstellationBigDipper from '../../illustrations/constellation-big-dipper.svg';

const EXAMPLE_ILLUSTRATIONS = {
  None: null,
  ShootingStar: <ShootingStar />,
  ConstellationBigDipper: <ConstellationBigDipper />,
};

export default {
  component: Callout,
  title: 'Components/Callout',
  parameters: {
    componentSubtitle:
      'Display additional information detached from your surrounding text content',
  },
  argTypes: {
    illustration: {
      options: Object.keys(EXAMPLE_ILLUSTRATIONS),
      mapping: EXAMPLE_ILLUSTRATIONS,
      description:
        'This is an example list of icons, there is not default set. You have to provide a svg react component/',
      control: {
        type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
        labels: {
          // 'labels' maps option values to string labels
          None: 'None',
          ShootingStar: 'Shooting Star',
          ConstellationBigDipper: 'Constellation (Big Dipper)',
        },
      },
    },
  },
} as ComponentMeta<typeof Callout>;

const Template: ComponentStory<typeof Callout> = (args) => {
  return <Callout {...args}>{args.children}</Callout>;
};

export const Regular = Template.bind({});
Regular.args = {
  illustration: <ConstellationBigDipper />,
  children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.`,
};

export const WithLongText = Template.bind({});
WithLongText.args = {
  illustration: <ConstellationBigDipper />,
  children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.`,
};

export const NoIcon = Template.bind({});
NoIcon.args = {
  illustration: null,
  children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.`,
};
