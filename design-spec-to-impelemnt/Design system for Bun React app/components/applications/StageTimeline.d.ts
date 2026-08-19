import type {ReactElement} from 'react';

export interface Stage {
  label: string;
  state: 'done' | 'current' | 'todo';
  /** Date, interviewer or result shown under the label. */
  meta?: string;
}

/**
 * Progress through the selection process, for both the candidate and the ATS.
 * @startingPoint section="Sollicitaties" subtitle="Selection process progress" viewport="700x160"
 */
export interface StageTimelineProps {
  stages: Stage[];
  orientation?: 'horizontal' | 'vertical';
}

export declare function StageTimeline(props: StageTimelineProps): ReactElement;
