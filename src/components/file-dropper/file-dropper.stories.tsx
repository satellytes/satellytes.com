import React from 'react';
import { ComponentStory } from '@storybook/react';
import { FileDropper } from './file-dropper';

const Template: ComponentStory<typeof FileDropper> = (args) => (
  <FileDropper {...args} />
);

export const Regular = Template.bind({});
Regular.args = {
  illustration: 'monitor_024',
  maxFiles: 1,
  acceptedFileTypes: '.pdf',
  onFileChange: (acceptedFiles) => console.log(acceptedFiles),
  fileCategories: ['CV', 'Cover letter'],
};
Regular.parameters = {
  controls: {
    exclude: ['onDropRejected', 'onFileChange', 'validator'],
  },
};
