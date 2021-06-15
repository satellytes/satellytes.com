import { render } from '@testing-library/react';
import React from 'react';
import SharePanel from './share-panel';

describe('SharePanel', () => {
  let sharePanel: any;

  beforeEach(() => {
    sharePanel = render(<SharePanel title="article titel" />);
  });

  it('should render', () => {
    expect(sharePanel).toBeTruthy();
  });

  it('should contain a header', () => {
    const title = sharePanel.findByText('Artikel teilen');
    expect(title).toBeTruthy();
  });

  describe('icons', () => {
    it('should contain whatsapp', async () => {
      expect(sharePanel.getByTestId('whatsapp')).toBeTruthy();
    });
    it('should contain mail', async () => {
      expect(sharePanel.getByTestId('email')).toBeTruthy();
    });
    it('should contain facebook', async () => {
      expect(sharePanel.getByTestId('facebook')).toBeTruthy();
    });
    it('should contain twitter', async () => {
      expect(sharePanel.getByTestId('twitter')).toBeTruthy();
    });
    it('should contain linkedin', async () => {
      expect(sharePanel.getByTestId('linkedin')).toBeTruthy();
    });
    it('should contain xing', async () => {
      expect(sharePanel.getByTestId('xing')).toBeTruthy();
    });
  });
});
