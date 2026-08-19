import type {ReactElement} from 'react';

export type ApplicationStatus =
  | 'ontvangen'
  | 'behandeling'
  | 'testUitgenodigd'
  | 'testVoltooid'
  | 'shortlist'
  | 'aangenomen'
  | 'afgewezen'
  | 'ingetrokken'
  | 'geweigerd'
  | 'wachtstand';

/**
 * Status pill for a sollicitatie.
 * @startingPoint section="Sollicitaties" subtitle="Full status vocabulary" viewport="700x150"
 */
export interface StatusBadgeProps {
  status: ApplicationStatus;
  /** Override the Dutch default label only for shortened table variants. */
  label?: string;
  size?: 'sm' | 'md';
}

export declare function StatusBadge(props: StatusBadgeProps): ReactElement;
