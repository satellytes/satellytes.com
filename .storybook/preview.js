import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/components/layout/theme';
import { GlobalStyle } from '../src/components/layout/global-style';
import { i18n } from './i18next';

addDecorator((storyFn) => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle $lightTheme={true} />
      {storyFn()}
    </ThemeProvider>
  </>
));

export const parameters = {
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
};
