import { theme, ThemeColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(): ThemeColors {
  const colorScheme = useColorScheme() ?? 'light';
  return theme[colorScheme];
}
