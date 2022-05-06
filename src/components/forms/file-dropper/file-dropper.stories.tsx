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
  acceptedFileTypes: {
    'application/pdf': ['.pdf'],
  },
  fileCategories: [
    {
      value: 'CV',
      label: 'Lebenslauf',
    },
    {
      value: 'cover-letter',
      label: 'Anschreiben',
    },
    {
      value: 'other',
      label: 'Sonstiges',
    },
  ],
};
Regular.parameters = {
  controls: {
    exclude: ['validator'],
  },
};
