import type {ReactElement} from 'react';

/** Section title plus optional right-aligned text action. */
export interface SectionHeadingProps {
  title: string;
  /** e.g. "Bekijk alle vacatures". Omitted renders the title alone. */
  actionLabel?: string;
  onAction?: () => void;
  /** 'hero' uses the 56px marketing display size. */
  size?: 'section' | 'hero';
}

export declare function SectionHeading(props: SectionHeadingProps): ReactElement;
