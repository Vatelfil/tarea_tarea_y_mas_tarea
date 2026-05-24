/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { theme, ThemeColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(): ThemeColors {
  const colorScheme = useColorScheme() ?? 'light';
  return theme[colorScheme];
}
