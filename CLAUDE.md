# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CoffeeRegister** is a React Native mobile app built with Expo v54.0.0, TypeScript, and expo-router for file-based routing. It uses React Navigation for tab-based navigation, and includes theming support (light/dark modes).

## Critical Dependencies & Versions

- **Expo**: ~54.0.33 — Always reference [Expo v54 docs](https://docs.expo.dev/versions/v54.0.0/) before writing code
- **React Native**: 0.81.5
- **TypeScript**: ~5.9.2
- **expo-router**: ~6.0.23 (file-based routing)
- **@react-navigation/bottom-tabs**: ~7.4.0

## Development Commands

```bash
npm start                    # Start dev server (choose platform: Android/iOS/web)
npm run android             # Start Android emulator
npm run ios                 # Start iOS simulator
npm run web                 # Start web dev server
npm run lint                # Run ESLint (expo preset)
npm run reset-project       # Move starter code to app-example/, create blank app/
```

## Architecture

### File-Based Routing (expo-router)

- **Root**: `app/_layout.tsx` — Sets up Stack navigation with ThemeProvider
- **Tab Stack**: `app/(tabs)/` — Default tab-based UI structure
- **Modal**: `app/modal.tsx` — Modal screen, accessible via navigation

Routes are defined by file structure. Example: `app/(tabs)/index.tsx` becomes the home tab, `app/(tabs)/explore.tsx` becomes another tab.

### Project Structure

- **app/** — Expo Router pages (file-based routes)
- **components/** — Reusable UI components (themed-text, themed-view, parallax-scroll-view, etc.)
- **constants/theme.ts** — Color/theme definitions
- **hooks/** — Custom React hooks (use-color-scheme, use-theme-color)
- **assets/images/** — Icons, splash screens, app icons
- **scripts/** — Build/project utilities

### Theming System

- Light/dark theme detection via `useColorScheme()` hook
- `useThemeColor()` hook gets color values per theme
- Built with React Navigation's theming

## TypeScript & Path Aliases

- `@/*` is aliased to project root (configured in tsconfig.json)
- Use `@/components`, `@/hooks`, `@/constants` for imports

## Linting

- Runs `eslint-config-expo` (preset for React Native + Expo)
- Config in `eslint.config.js`
- Ignores `dist/*`

## Notes

- The `app.json` enables React Compiler experiments and typed routes
- EAS project ID: `e6b67ae2-e25d-43a7-8514-7d61809462ca` (for deployments)
- Icon scheme: `coffeeregister://` (for deep linking)
- Portrait orientation only
