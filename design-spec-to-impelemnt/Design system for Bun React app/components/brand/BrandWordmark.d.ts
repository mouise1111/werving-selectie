import type {ReactElement} from 'react';

/**
 * Type-only brand wordmark with an optional lime block mark.
 * @startingPoint section="Brand" subtitle="Wordmark, ink and on-dark" viewport="700x150"
 */
export interface BrandWordmarkProps {
  /** Brand name. Replace with the product's real name. */
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  /** 'ink' on light surfaces, 'onDark' on the deep-teal band. */
  tone?: 'ink' | 'onDark';
  showMark?: boolean;
}

export declare function BrandWordmark(props: BrandWordmarkProps): ReactElement;
