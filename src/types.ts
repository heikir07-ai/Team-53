export type AppScreen = 'landing' | 'app';

export type AuthMode = 'connected' | 'guest';

export type Angle =
  | 'Spicy'
  | 'Funny'
  | 'Direct'
  | 'Analytical'
  | 'Left Take'
  | 'Conservative'
  | 'Woke'
  | 'Neutral';

export type HookType =
  | 'Start with controversy'
  | 'Open with a question'
  | 'Lead with a stat'
  | 'Build to a punchline';

export interface Tweet {
  id: string;
  text: string;
  angle: Angle;
}

export interface AngleOption {
  id: Angle;
  label: string;
  tooltip: string;
  selectedClass: 'selected-default' | 'selected-left' | 'selected-conservative' | 'selected-woke';
}

export interface HookOption {
  id: HookType;
  label: string;
}
