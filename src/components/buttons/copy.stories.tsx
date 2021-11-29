import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Copy } from './copy';

const Template: ComponentStory<typeof Copy> = (args) => <Copy {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  textToBeCopied: 'Nothing at all!!!',
};
