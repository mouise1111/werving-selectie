import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';

export const wervingTheme = defineTheme({
  name: 'werving',
  extends: neutralTheme,
  color: {accent: ['#C7F04A', '#C7F04A'], neutralStyle: 'cool'},
  typography: {
    scale: {base: 14, ratio: 1.2},
    body: {family: 'Figtree', fallbacks: 'system-ui, sans-serif'},
    heading: {family: 'Poppins', fallbacks: 'Figtree, system-ui, sans-serif'},
  },
  radius: {base: 4, multiplier: 1},
  motion: {fast: 175, medium: 410, ratio: 0.75},
  tokens: {
    '--color-text-primary': ['#0B3B41', '#F1F6F6'],
    '--color-text-secondary': ['#5B7276', '#9DAFB2'],
    '--color-text-disabled': ['#9DAFB2', '#5B7276'],
    '--color-text-accent': ['#0B3B41', '#C7F04A'],
    '--color-icon-primary': ['#0B3B41', '#F1F6F6'],
    '--color-icon-secondary': ['#5B7276', '#9DAFB2'],
    '--color-icon-accent': ['#0B3B41', '#C7F04A'],
    '--color-accent-muted': ['#EAF6D2', '#1B3A1A'],
    '--color-background-body': ['#FFFFFF', '#062A2F'],
    '--color-background-surface': ['#FFFFFF', '#0B3B41'],
    '--color-background-card': ['#FFFFFF', '#0B3B41'],
    '--color-background-popover': ['#FFFFFF', '#0B3B41'],
    '--color-background-muted': ['#E7F0F1', '#0E464D'],
    '--color-background-inverted': ['#0B3B41', '#FFFFFF'],
    '--color-border': ['#DDE7E8', '#FFFFFF1F'],
    '--color-border-emphasized': ['#C3D4D6', '#FFFFFF33'],
    '--color-shadow': ['#0B3B4114', '#0000004D'],
    '--color-success': ['#0F7A4A', '#9FE5B4'],
    '--color-error': ['#A5192B', '#FFC6C1'],
    '--color-warning': ['#8A6100', '#F7E6AE'],
    '--focus-outline-color': ['#0B3B41', '#C7F04A'],
  },
  components: {
    button: {base: {borderRadius: '9999px'}},
    card: {base: {borderRadius: '12px', padding: '20px'}},
    input: {base: {borderRadius: '9999px'}},
  },
});
