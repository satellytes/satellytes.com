import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Teaser } from './teaser';
import { Astronaut } from '../icons/illustrations/astronaut';
import { SpaceShuttle } from '../icons/illustrations/space-shuttle';

const icons = { Astronaut: <Astronaut />, SpaceShuttle: <SpaceShuttle /> };

export default {
  component: Teaser,
  title: 'Components/Teaser',
  parameters: {},
  argTypes: {
    icon: {
      options: Object.keys(icons),
      mapping: icons,
    },
  },
} as ComponentMeta<typeof Teaser>;

const Template: ComponentStory<typeof Teaser> = (args) => <Teaser {...args} />;

export const Regular = Template.bind({});
Regular.args = {
  title: 'Leadbox Title',

  children:
    'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.',

  linkTo: '/blog',
};

export const WithIllustration = Template.bind({});
WithIllustration.args = {
  ...Regular.args,
  icon: <SpaceShuttle />,
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...Regular.args,
  topline: 'Topline',
  timestamp: 'Timestamp',
  image: {
    layout: 'constrained',
    placeholder: {
      fallback:
        'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMEAQX/xAAVAQEBAAAAAAAAAAAAAAAAAAACBP/aAAwDAQACEAMQAAAB59LXVikwE3//xAAZEAEAAgMAAAAAAAAAAAAAAAARAAIBA0L/2gAIAQEAAQUC5pWOsMJCf//EABgRAAMBAQAAAAAAAAAAAAAAAAABAhEx/9oACAEDAQE/Aal8HWH/xAAVEQEBAAAAAAAAAAAAAAAAAAAAIf/aAAgBAgEBPwFH/8QAGBAAAgMAAAAAAAAAAAAAAAAAARAgITH/2gAIAQEABj8CpYIf/8QAGhABAAMBAQEAAAAAAAAAAAAAAQARIUExUf/aAAgBAQABPyFAqBGlzSFqNh2Bj59IFUIAyiArwn//2gAMAwEAAgADAAAAEBg//8QAGREAAwADAAAAAAAAAAAAAAAAAAERQZHw/9oACAEDAQE/ELKeZ2hDRn//xAAWEQADAAAAAAAAAAAAAAAAAAAAARH/2gAIAQIBAT8QThB//8QAHBABAAMAAgMAAAAAAAAAAAAAAQARIUFRYYGR/9oACAEBAAE/EAd6i6Dp6ggB9U5h3wLou/MHBDM9RJBAlFZAkPlP/9k=',
    },
    images: {
      fallback: {
        src: '/static/f09962349f7b6084a9508ccfe1993c25/00b4e/space.jpg',
        srcSet:
          '/static/f09962349f7b6084a9508ccfe1993c25/fee89/space.jpg 150w,\n/static/f09962349f7b6084a9508ccfe1993c25/a0d9b/space.jpg 300w,\n/static/f09962349f7b6084a9508ccfe1993c25/00b4e/space.jpg 600w,\n/static/f09962349f7b6084a9508ccfe1993c25/4611e/space.jpg 1200w',
        sizes: '(min-width: 600px) 600px, 100vw',
      },
      sources: [
        {
          srcSet:
            '/static/f09962349f7b6084a9508ccfe1993c25/4c07b/space.avif 150w,\n/static/f09962349f7b6084a9508ccfe1993c25/34546/space.avif 300w,\n/static/f09962349f7b6084a9508ccfe1993c25/bfc61/space.avif 600w,\n/static/f09962349f7b6084a9508ccfe1993c25/18588/space.avif 1200w',
          type: 'image/avif',
          sizes: '(min-width: 600px) 600px, 100vw',
        },
        {
          srcSet:
            '/static/f09962349f7b6084a9508ccfe1993c25/f5103/space.webp 150w,\n/static/f09962349f7b6084a9508ccfe1993c25/dc425/space.webp 300w,\n/static/f09962349f7b6084a9508ccfe1993c25/7802b/space.webp 600w,\n/static/f09962349f7b6084a9508ccfe1993c25/2dc4e/space.webp 1200w',
          type: 'image/webp',
          sizes: '(min-width: 600px) 600px, 100vw',
        },
      ],
    },
    width: 600,
    height: 339,
  },
};
