import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Illustration } from './illustration';
import { ILLUSTRATION_NAMES } from './illustration-set';
import { IllustrationPreview, PreviewGrid } from './illustration-preview';

export default {
  component: Illustration,
  title: 'Components/Illustration',
  parameters: {
    componentSubtitle: 'Helps to show one of our illustrations',
  },
  /**
   * I would like to add an argType for 'show' in order to configure
   * that property, but once I add it it's applied to any story, even the overview
   * one. When excluding the control by name there are still leftovers (bug?)
   *
   * Similar problems with the defaultValue. It's not clear, nor working properly.
   * One deprecation warning is also given even though following the official docs.
   * Reference: https://storybook.js.org/docs/react/api/argtypes
   */
} as ComponentMeta<typeof Illustration>;

/**
 * Special Story
 *
 * Overview of all illustrations.
 * It wasn't straight forward to store this story in a separate file
 * hence I keep it in this file even though it's not a classic story
 * describing the component itself.
 *
 * Comes first to be the first story to be shown.
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
    table: {
      type: { summary: 'string' },
    },
    control: {
      type: 'text',
    },
  },
};

Overview.parameters = {
  // We only want to expose our
  controls: { exclude: ['show', 'size'] },
};

/**
 * General Usage Stories with the common template.
 */
const Template: ComponentStory<typeof Illustration> = (args) => {
  return <Illustration {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  show: 'alien_002',
};
