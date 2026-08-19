import type {ReactElement, ReactNode} from 'react';

/**
 * Department tile used in the "één platform, veel mogelijkheden" grid.
 * @startingPoint section="Vacatures" subtitle="Department tile grid" viewport="700x150"
 */
export interface CategoryTileProps {
  label: string;
  count: number;
  icon?: ReactNode;
  /** Selected tile inverts to deep teal with a lime icon chip. */
  selected?: boolean;
  onClick?: () => void;
}

export declare function CategoryTile(props: CategoryTileProps): ReactElement;
