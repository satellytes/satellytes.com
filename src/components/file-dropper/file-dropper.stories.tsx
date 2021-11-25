import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FileDropper } from './file-dropper';

export default {
  component: FileDropper,
  title: 'Components/FileDropper',
  parameters: {},
  argTypes: {},
} as ComponentMeta<typeof FileDropper>;

const Template: ComponentStory<typeof FileDropper> = (args) => (
  <FileDropper {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  illustration: 'monitor_024',
  acceptedFileTypes: '.pdf',
  onDrop: (acceptedFiles) => {
    console.log(acceptedFiles);
  },
  onDropRejected: (rejectedData) => {
    console.log(rejectedData);
  },
};
