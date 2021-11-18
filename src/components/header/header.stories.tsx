import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from './header';

export default {
  component: Header,
  title: 'Components/Header',
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  siteTitle: 'Satellytes',
  $lightTheme: false,
  showLanguageSwitch: true,
};

export const WithLightTheme = Template.bind({});
WithLightTheme.args = {
  ...Regular.args,
  $lightTheme: true,
};

export const WithLightThemeTransparent = Template.bind({});
WithLightThemeTransparent.args = {
  ...Regular.args,
  $lightTheme: true,
  transparent: true,
};
