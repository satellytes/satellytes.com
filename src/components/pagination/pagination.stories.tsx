import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Pagination } from './pagination';

export default {
  component: Pagination,
  title: 'Components/Pagination',
  parameters: {},
  argTypes: {},
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Regular = Template.bind({});
Regular.args = {};
