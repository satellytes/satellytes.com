import React from 'react';
import { ComponentStory } from '@storybook/react';
import { Icon, IconSize } from './icon';
import { ICON_NAMES } from './icon-set';
import { IconPreview, PreviewGrid } from './icon-preview';

const Template: ComponentStory<typeof Icon> = (args) => {
  return <Icon {...args} />;
};

export const Regular = Template.bind({});

Regular.args = {
  show: 'chevron_down',
  size: IconSize.NORMAL,
};

Regular.argTypes = {
  size: {
    options: [IconSize.NORMAL, IconSize.INHERIT],
    control: {
      type: 'select',
    },
  },
};

const OverviewTemplate = () => {
  return (
    <PreviewGrid>
      {ICON_NAMES.map((name) => {
        return <IconPreview key={name} name={name} />;
      })}
    </PreviewGrid>
  );
};

export const Overview = OverviewTemplate.bind({}) as any;
