import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/components/layout/theme';
import { GlobalStyle } from '../src/components/layout/global-style';
import { i18n } from './i18next';
import { DocsContainer } from '@storybook/addon-docs';

addDecorator((storyFn) => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle $lightTheme={true} />
      {storyFn()}
    </ThemeProvider>
  </>
));

/**
 * We need to provide our theme to evert page in storybook.
 * Before we used a story decorator only, but that's not enough
 * as it won't provide any styles to pages without stories.
 */
const DocsPageContainer = ({ children, context }) => {
  return (
    <DocsContainer context={context}>
      <ThemeProvider theme={theme}>
        <GlobalStyle $lightTheme={true} />
        {children}
      </ThemeProvider>
    </DocsContainer>
  );
};
export const parameters = {
  docs: {
    container: DocsPageContainer,
  },
  viewMode: 'docs',
  previewTabs: {
    // move the docs tab to the front
    'storybook/docs/panel': { index: -1, title: 'Documentation' },
    'storybook/canvas/panel': { title: 'Code' },
    canvas: {
      title: 'Code',
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    de: 'Deutsch',
  },
  options: {
    storySort: {
      order: ['Getting started', 'Components'],
    },
  },
};
