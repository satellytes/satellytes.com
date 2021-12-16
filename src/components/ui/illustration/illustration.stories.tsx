import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Illustration } from './illustration';
import { ILLUSTRATION_NAMES } from './illustration-set';
import { IllustrationPreview, PreviewGrid } from './illustration-preview';

export default {
  component: Illustration,
  title: 'Components/UI/Illustration',
  parameters: {
    componentSubtitle: 'Helps to show one of our illustrations',
  },
} as ComponentMeta<typeof Illustration>;

/**
 * General Usage Story with the common template.
 */
const Template: ComponentStory<typeof Illustration> = (args) => {
  return <Illustration {...args} />;
};

export const Regular = Template.bind({});

Regular.args = {
  show: 'alien_002',
};

/**
 * Special Story
 *
 * Overview of all illustrations.
 * It wasn't straight forward to store this story in a separate file
 * hence I keep it in this file even though it's not a classic story
 * describing the component itself.
 */
interface OverviewProps {
  filterPattern: string;
}

const OverviewTemplate = (props: OverviewProps) => {
  let items = ILLUSTRATION_NAMES;

  if (props.filterPattern) {
    items = items.filter((id) => id.indexOf(props.filterPattern) !== -1);
  }

  return (
    <PreviewGrid>
      {items.map((name) => {
        return <IllustrationPreview key={name} name={name} />;
      })}
    </PreviewGrid>
  );
};

export const Overview = OverviewTemplate.bind({}) as any;
Overview.argTypes = {
  filterPattern: {
    name: 'Search',
    control: {
      type: 'text',
    },
  },
};

Overview.parameters = {
  // We only want to expose our `filter` property on this special story
  controls: { exclude: ['show', 'size'] },
};
