import { Teaser } from '../../components/teasers/teaser';
import { Illustration } from '../../components/illustration/illustration';
import React from 'react';
import { TeaserGrid } from '../../components/teasers/teaser-grid';

interface OverviewProps {
  className?: string;
}

export const Summary = ({ className }: OverviewProps) => {
  return (
    <TeaserGrid className={className}>
      <Teaser
        title="Digitale Plattformen"
        cover={<Illustration show={'monitor_024'} />}
      >
        <p>Von low-code applications bis zu Designsystemen</p>
      </Teaser>

      <Teaser
        title="Produkte & Services"
        cover={<Illustration show={'book_038'} />}
      >
        Prototyping, Ideation & Entwcklung
      </Teaser>

      <Teaser title="Beratung" cover={<Illustration show={'scientist_042'} />}>
        Schulungen & Workshops
      </Teaser>

      <Teaser title="Branchen" cover={<Illustration show={'report_031'} />}>
        Versicherungen, Banken, Automotive & Sport
      </Teaser>
    </TeaserGrid>
  );
};
