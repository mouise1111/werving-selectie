import type {ReactElement} from 'react';

/**
 * Two-field pill search bar for the careers site hero.
 * @startingPoint section="Vacatures" subtitle="Hero search field" viewport="700x120"
 */
export interface JobSearchBarProps {
  keyword?: string;
  location?: string;
  keywordPlaceholder?: string;
  locationPlaceholder?: string;
  onKeywordChange?: (value: string) => void;
  onLocationChange?: (value: string) => void;
  onSubmit?: (value: {keyword: string; location: string}) => void;
  submitLabel?: string;
}

export declare function JobSearchBar(props: JobSearchBarProps): ReactElement;
