import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Leadbox } from './leadbox';
import { Astronaut } from '../icons/illustrations/astronaut';
import { SpaceShuttle } from '../icons/illustrations/space-shuttle';

const icons = { Astronaut: (<Astronaut />), SpaceShuttle: (<SpaceShuttle />) };

export default {
  component: Leadbox,
  title: 'Components/Leadbox',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    icon: {
      options: Object.keys(icons),
      mapping: icons,
    }
  }
} as ComponentMeta<typeof Leadbox>;

const Template: ComponentStory<typeof Leadbox> = (args) => (
  <Leadbox {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  title: 'Leadbox Title',
  subtitle: 'Leadbox Subtitle',
  text: 'Leadbox Text',
  icon: <Astronaut />,
};

export const WithMail = Template.bind({});
WithMail.args = {
  ...Regular.args,
  title: 'Leadbox with Mail',
  mail: 'mail@lead.box',
};

export const WithLink = Template.bind({});
WithLink.args = {
  ...Regular.args,
  title: 'Leadbox with Link',
  link: 'Leadbox Link',
  linkTo: '/',
};
