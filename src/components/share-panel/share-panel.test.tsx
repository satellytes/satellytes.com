import { render } from '@testing-library/react';
import React from 'react';
import SharePanel from './share-panel';

describe('SharePanel', () => {
  let sharePanel: any;

  beforeEach(() => {
    sharePanel = render(<SharePanel />);
  });

  it('should render', () => {
    expect(sharePanel).toBeTruthy();
  });

  it('should contain a header', () => {
    const title = sharePanel.findByText('Artikel teilen');
    expect(title).toBeTruthy();
  });

  it('shared buttons should have shareButton class', () => {
    const firstSharedButton = sharePanel.getAllByRole('button');
    expect(firstSharedButton[0]).toHaveClass('react-share__ShareButton');
  });

  it('shared buttons should not be empty', () => {
    const firstSharedButton = sharePanel.getAllByRole('button');
    expect(firstSharedButton[0].children.length).toEqual(1);
  });

  describe('icons', () => {
    it('should contain whatsapp', () => {
      expect(sharePanel.findByRole('IconWhatsapp')).toBeTruthy();
    });
    it('should contain mail', () => {
      expect(sharePanel.findByRole('IconMail')).toBeTruthy();
    });
    it('should contain facebook', () => {
      expect(sharePanel.findByRole('IconFacebook')).toBeTruthy();
    });
    it('should contain twitter', () => {
      expect(sharePanel.findByRole('IconTwitter')).toBeTruthy();
    });
    it('should contain linkedin', () => {
      expect(sharePanel.findByRole('IconLinkedIn')).toBeTruthy();
    });
  });
});
