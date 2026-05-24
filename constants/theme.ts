/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export type ThemeColors = {
  text: string;
  background: string;
  accent: string;
  border: string;
  surface: string;
  primary: string;
  textMuted: string;
};

export type ThemeMode = 'light' | 'dark'; 

export const theme: Record<ThemeMode, ThemeColors> = {
  light: {
    text: '#1E0A00',
    background: '#FDF6EE',
    accent: '#C46A00',
    border: '#D9B99A',
    surface: '#F5E9D6',
    primary: '#5C2D00',
    textMuted: '#8B6248',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    accent: '#F5C87A',
    border: '#4A2E10',
    surface: '#2C1A05',
    primary: '#E8A870',
    textMuted: '#9E7A5A',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif-medium',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, Inter",
    serif: "Merriweather, Georgia, serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif, Nunito",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
