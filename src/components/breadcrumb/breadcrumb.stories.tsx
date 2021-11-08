import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Breadcrumb } from './breadcrumb';

export default {
  component: Breadcrumb,
  title: 'Components/Breadcrumb',
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
  <Breadcrumb {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  breadcrumbEntries: [
    { pathname: '/', crumbLabel: 'main' },
    { pathname: '/blog', crumbLabel: 'blog' },
  ],
};

export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
  breadcrumbEntries: [
    { pathname: '/', crumbLabel: 'main' },
    { pathname: '/blog', crumbLabel: 'blog' },
    { pathname: '/blog/howto-blog-post/', crumbLabel: 'howto-blog-post' },
  ],
  customLabel: 'How to do a blog post',
};

export const WithHero = Template.bind({});
WithHero.args = {
  ...Regular.args,
  hasHero: true,
};
