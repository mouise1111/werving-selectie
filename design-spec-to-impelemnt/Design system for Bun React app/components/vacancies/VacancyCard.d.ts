import type {ReactElement, ReactNode} from 'react';

/**
 * Vacancy card for the public careers site.
 * @startingPoint section="Vacatures" subtitle="Tinted vacancy card with apply pill" viewport="700x300"
 */
export interface VacancyCardProps {
  title: string;
  /** Department or hiring team (UC1). */
  department: string;
  verified?: boolean;
  summary?: string;
  location?: string;
  /** e.g. "Voltijds", "Remote". */
  contract?: string;
  salary?: string;
  salaryPeriod?: string;
  /** Rotate 1 → 2 → 3 across a row; 'none' for white cards in dense grids. */
  tint?: 1 | 2 | 3 | 'none';
  logo?: ReactNode;
  actionLabel?: string;
  onApply?: () => void;
  /** One card per row may use the filled dark pill. */
  emphasizeAction?: boolean;
}

export declare function VacancyCard(props: VacancyCardProps): ReactElement;
