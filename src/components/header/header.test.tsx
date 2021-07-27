import React from 'react';

import Header from './header';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../layout/theme';

jest.mock('gatsby-plugin-react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
    };
  },
  Link: jest.fn().mockImplementation(({ to, ...rest }) =>
    React.createElement('a', {
      ...rest,
      href: to,
    }),
  ),
}));

describe('<Header />', () => {
  it('should render', () => {
    const header = render(
      <ThemeProvider theme={theme}>
        <Header siteTitle="" />
      </ThemeProvider>,
    );
    expect(header).toBeTruthy();
  });

  it('should show the title', () => {
    const title = 'Test title';

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Header siteTitle={title} />
      </ThemeProvider>,
    );

    const header = getByText(title);
    expect(header).toBeInTheDocument();
  });
});
