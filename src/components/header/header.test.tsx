import React from 'react';

import Header from './header';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../layout/theme';

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
