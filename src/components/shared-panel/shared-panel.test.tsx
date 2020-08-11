import { render } from '@testing-library/react';
import React from 'react';
import SharedPanel from './shared-panel';

const testData = {
  facebookId: 'some-id',
  url: 'some-url',
  title: 'some-title',
};

describe('SharedPanel', () => {
  let sharedPanel: any;

  beforeEach(() => {
    sharedPanel = render(<SharedPanel facebookId={testData.facebookId} />);
  });

  it('should render', () => {
    expect(sharedPanel).toBeTruthy();
  });

  it('should contain a header', () => {
    const title = sharedPanel.findByText('Artikel teilen');
    expect(title).toBeTruthy();
  });

  it('shared buttons should have shareButton class', () => {
    const firstSharedButton = sharedPanel.getAllByRole('button');
    expect(firstSharedButton[0]).toHaveClass('react-share__ShareButton');
  });

  it('shared buttons should not be empty', () => {
    const firstSharedButton = sharedPanel.getAllByRole('button');
    expect(firstSharedButton[0].children.length).toEqual(1);
  });

  describe('icons', () => {
    it('should contain whatsapp', () => {
      expect(sharedPanel.findByRole('IconWhatsapp')).toBeTruthy();
    });
    it('should contain messager', () => {
      expect(sharedPanel.findByRole('IconMessenger')).toBeTruthy();
    });
    it('should contain mail', () => {
      expect(sharedPanel.findByRole('IconMail')).toBeTruthy();
    });
    it('should contain facebook', () => {
      expect(sharedPanel.findByRole('IconFacebook')).toBeTruthy();
    });
    it('should contain twitter', () => {
      expect(sharedPanel.findByRole('IconTwitter')).toBeTruthy();
    });
  });
});
