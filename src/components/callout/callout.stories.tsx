import React from 'react';
import { ComponentMeta } from '@storybook/react';
import Callout from './callout';
import ShootingStar from '../../illustrations/shooting-star.svg';
import ConstellationBigDipper from '../../illustrations/constellation-big-dipper.svg';
import { Story } from '@storybook/react/dist/ts3.9/client/preview/types-6-0';

type CalloutProps = {
  icon: string;
  text: string;
};

export default {
  component: Callout,
  title: 'Components/Callout',
  parameters: {
    componentSubtitle:
      'Display additional information detached from your surrounding text content',
  },
  argTypes: {
    text: {
      control: { type: 'text' },
    },
    icon: {
      defaultValue: 'Shooting Star',
      description:
        'This is an example list of icons, there is not default set. You have to provide a svg react component/',
      options: ['None', 'Shooting Star', 'Constellation'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Callout>;

function getExampleIcon(iconId: string) {
  switch (iconId) {
    case 'None':
      return null;
    case 'Shooting Star':
      return <ShootingStar />;
    case 'Constellation':
      return <ConstellationBigDipper />;
    default:
      return null;
  }
}

const Template: Story<CalloutProps> = (args) => {
  const actualIcon = getExampleIcon(args.icon);
  return <Callout icon={actualIcon} text={args.text} />;
};

export const Regular = Template.bind({});
Regular.args = {
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.`,
};
/**
 * works
 */
export const NoIcon = Template.bind({});
NoIcon.args = {
  icon: 'None',
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.`,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: 'Shooting Star',
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.`,
};

export const WithLongText = Template.bind({});
WithLongText.args = {
  icon: 'Shooting Star',
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam.`,
};
