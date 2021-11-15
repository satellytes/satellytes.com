import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Leadbox } from '../leadbox/leadbox';
import Navigation from './navigation';

export default {
  component: Navigation,
  title: 'Components/Navigation',
} as ComponentMeta<typeof Leadbox>;

const Template: ComponentStory<typeof Navigation> = (args) => (
  <Navigation {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  showLanguageSwitch: true,
};
