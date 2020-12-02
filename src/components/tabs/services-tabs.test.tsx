import React from 'react';
import ServicesTabs, { ServiceTab } from './services-tabs';
import { render, fireEvent } from '@testing-library/react';

const TABS: ServiceTab[] = [
  {
    title: 'UX/UI',
    content: '',
  },
  {
    title: 'Full Stack',
    content: '',
  },
  {
    title: 'Service Development',
    content: '',
  },
  {
    title: 'More',
    content: '',
  },
];

describe('Services Tabs', () => {
  it('should render', () => {
    const servicesTabs = render(<ServicesTabs tabs={TABS} />);
    expect(servicesTabs).toBeTruthy();
  });

  it('should show UX/UI tab', () => {
    const { getByText } = render(<ServicesTabs tabs={TABS} />);
    expect(getByText('UX/UI')).toBeTruthy();
  });

  it('should show Full Stack tab', () => {
    const { getByText } = render(<ServicesTabs tabs={TABS} />);
    expect(getByText('Full Stack')).toBeTruthy();
  });

  it('should show Service Development tab', () => {
    const { getByText } = render(<ServicesTabs tabs={TABS} />);
    expect(getByText('Service Development')).toBeTruthy();
  });

  it('should show More tab', () => {
    const { getByText } = render(<ServicesTabs tabs={TABS} />);
    expect(getByText('More')).toBeTruthy();
  });

  it('should focus Service Development tab heading when clicked', () => {
    const { getByRole } = render(<ServicesTabs tabs={TABS} />);
    fireEvent.click(getByRole('tab', { name: 'Service Development' }));
    expect(getByRole('tab', { name: 'Service Development' })).toHaveFocus();
  });

  it('should activate Service Development tab content, when Service Development tab clicked', () => {
    const { getByRole } = render(<ServicesTabs tabs={TABS} />);
    fireEvent.click(getByRole('tab', { name: 'Service Development' }));
    expect(
      getByRole('tabpanel', { name: 'Service Development' }),
    ).toBeVisible();
  });
});
