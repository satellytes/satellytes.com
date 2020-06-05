/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render } from '@testing-library/react';
import { ClientList } from './client-list';

const testClients = [
  {
    title: 'client name',
    timestamp: 'time',
    link: '/link',
  },
];

describe('Client List', () => {
  it('should render', () => {
    const clientList = render(<ClientList clients={testClients as any} />);
    expect(clientList).toBeTruthy();
  });

  it('should show link', () => {
    const { getByText } = render(<ClientList clients={testClients as any} />);
    expect(getByText('All Clients >')).toBeTruthy();
  });

  it('should direct to clients page when link "All Clients" is clicked/touched/etc', () => {
    const overviewPageLink = '/clients';
    const { getByText } = render(<ClientList clients={testClients as any} />);

    expect(getByText('All Clients >').closest('a')).toHaveAttribute(
      'href',
      overviewPageLink,
    );
  });

  describe('Client List Entry', () => {
    it('should show title', () => {
      const { getByText } = render(<ClientList clients={testClients as any} />);
      expect(getByText('client name')).toBeTruthy();
    });

    it('should show time information', () => {
      const timestamp = testClients[0].timestamp;
      const { getByText } = render(<ClientList clients={testClients as any} />);
      expect(getByText(`Since ${timestamp}`)).toBeTruthy();
    });

    it('title should direct to linked page', () => {
      const clientTitle = testClients[0].title;
      const clientLink = testClients[0].link;
      const { getByText } = render(<ClientList clients={testClients as any} />);

      expect(getByText(clientTitle).closest('a')).toHaveAttribute(
        'href',
        clientLink,
      );
    });

    it('chevron should direct to linked page', () => {
      const clientLink = testClients[0].link;
      const { getByText } = render(<ClientList clients={testClients as any} />);

      expect(getByText('>').closest('a')).toHaveAttribute('href', clientLink);
    });
  });
});
