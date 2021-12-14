import { ReactNode } from 'react';

export interface HeroWithText {
  title: string;
  kicker?: string;
  children?: ReactNode;
}
