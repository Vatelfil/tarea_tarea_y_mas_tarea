export type ThemeColors = {
  background: string
  surface: string
  primary: string
  accent: string
  text: string
  textMuted: string
  border: string
}

export type ThemeMode = 'light' | 'dark'

export const theme: Record<ThemeMode, ThemeColors> = {
  light: {
    background: '#FDF6EE',
    surface:    '#F5E9D6',
    primary:    '#5C2D00',
    accent:     '#C46A00',
    text:       '#1E0A00',
    textMuted:  '#8B6248',
    border:     '#D9B99A',
  },
  dark: {
    background: '#1A0F00',
    surface:    '#2C1A05',
    primary:    '#E8A870',
    accent:     '#F5C87A',
    text:       '#F5E9D6',
    textMuted:  '#9E7A5A',
    border:     '#4A2E10',
  },
}
