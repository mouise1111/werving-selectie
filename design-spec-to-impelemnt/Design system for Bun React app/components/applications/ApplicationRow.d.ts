import type {ReactElement} from 'react';
import type {ApplicationStatus} from './StatusBadge';

/**
 * One sollicitatie row in the recruiter overview (UC3).
 * @startingPoint section="Sollicitaties" subtitle="Dense application list rows" viewport="700x200"
 */
export interface ApplicationRowProps {
  candidate: string;
  role: string;
  status: ApplicationStatus;
  /** Short date, e.g. "12 mrt". */
  appliedOn: string;
  /** Online test result 0–100, or null when no test was taken (UC4 1a). */
  testScore?: number | null;
  hasMotivation?: boolean;
  selected?: boolean;
  onOpen?: () => void;
}

export declare function ApplicationRow(props: ApplicationRowProps): ReactElement;
