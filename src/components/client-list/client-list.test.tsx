/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render } from '@testing-library/react';
import { ClientList } from './client-list';
import { ThemeProvider } from 'styled-components';
import { theme } from '../layout/theme';

const testClients = [
  {
    name: 'client name',
    start: '2020-04-30',
    path: '/clients/client1',
  },
];

describe('Client List', () => {
  it('should render', () => {
    const clientList = render(
      <ThemeProvider theme={theme}>
        <ClientList clients={testClients as any} />
      </ThemeProvider>,
    );
    expect(clientList).toBeTruthy();
  });

  it('should show link', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ClientList clients={testClients as any} />
      </ThemeProvider>,
    );
    expect(getByText('All Clients >')).toBeTruthy();
  });

  it('should direct to clients page when link "All Clients" is clicked/touched/etc', () => {
    const overviewPageLink = '/clients';
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <ClientList clients={testClients as any} />
      </ThemeProvider>,
    );

    expect(getByText('All Clients >').closest('a')).toHaveAttribute(
      'href',
      overviewPageLink,
    );
  });

  describe('Client List Entry', () => {
    it('should show title', () => {
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <ClientList clients={testClients as any} />
        </ThemeProvider>,
      );
      expect(getByText('client name')).toBeTruthy();
    });

    it('title should direct to linked page', () => {
      const clientTitle = testClients[0].name;
      const clientLink = testClients[0].path;
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <ClientList clients={testClients as any} />
        </ThemeProvider>,
      );

      expect(getByText(clientTitle).closest('a')).toHaveAttribute(
        'href',
        clientLink,
      );
    });

    it('chevron should direct to linked page', () => {
      const clientLink = testClients[0].path;
      const { getByText } = render(
        <ThemeProvider theme={theme}>
          <ClientList clients={testClients as any} />
        </ThemeProvider>,
      );

      expect(getByText('>').closest('a')).toHaveAttribute('href', clientLink);
    });
  });
});
