import { render } from '@testing-library/react';
import React from 'react';
import SharePanel from './share-panel';

jest.mock('gatsby-plugin-react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
    };
  },
}));

describe('SharePanel', () => {
  let sharePanel: any;

  beforeEach(() => {
    sharePanel = render(<SharePanel title="article titel" />);
  });

  it('should render', () => {
    expect(sharePanel).toBeTruthy();
  });

  it('should contain a header', () => {
    const title = sharePanel.getByText('blog.share');
    expect(title).toBeInTheDocument();
  });

  describe('icons', () => {
    it('should contain whatsapp', async () => {
      expect(sharePanel.getByTestId('whatsapp')).toBeInTheDocument();
    });
    it('should contain mail', async () => {
      expect(sharePanel.getByTestId('email')).toBeInTheDocument();
    });
    it('should contain facebook', async () => {
      expect(sharePanel.getByTestId('facebook')).toBeInTheDocument();
    });
    it('should contain twitter', async () => {
      expect(sharePanel.getByTestId('twitter')).toBeInTheDocument();
    });
    it('should contain linkedin', async () => {
      expect(sharePanel.getByTestId('linkedin')).toBeInTheDocument();
    });
    it('should contain xing', async () => {
      expect(sharePanel.getByTestId('xing')).toBeInTheDocument();
    });
  });
});
