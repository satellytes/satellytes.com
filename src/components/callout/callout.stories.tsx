import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Callout from './callout';
import ShootingStar from '../../illustrations/shooting-star.svg';
import ConstellationBigDipper from '../../illustrations/constellation-big-dipper.svg';
import { Story } from '@storybook/react/dist/ts3.9/client/preview/types-6-0';

type CalloutProps = {
  icon: string;
  text: string;
};
/**
 * iconSelection is not actual property. It's a story-only argument
 * to render the "complex" value `icon` with different variants.
 */
export default {
  component: Callout,
  title: 'Components/Callout',
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
