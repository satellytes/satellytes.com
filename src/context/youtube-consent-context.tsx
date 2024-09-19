import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface YouTubeConsentContextType {
  consentGiven: boolean;
  giveConsent: () => void;
}

const YouTubeConsentContext = createContext<YouTubeConsentContextType>({
  consentGiven: false,
  giveConsent: () => {},
});

interface YouTubeConsentProviderProps {
  children: ReactNode;
}

export const YouTubeConsentProvider = ({
  children,
}: YouTubeConsentProviderProps) => {
  const [consentGiven, setConsentGiven] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem('youtube-consent');
    if (consent === 'true') {
      setConsentGiven(true);
    }
  }, []);

  const giveConsent = () => {
    setConsentGiven(true);
    localStorage.setItem('youtube-consent', 'true');
  };

  return (
    <YouTubeConsentContext.Provider value={{ consentGiven, giveConsent }}>
      {children}
    </YouTubeConsentContext.Provider>
  );
};

export default YouTubeConsentContext;
