# CoffeeRegister — Resumen de Tarea

## Descripción General

App mobile desarrollada con _Expo v54, **React Native, **TypeScript_ y _Expo Router_. Permite registrar cafés con sus detalles (marca, intensidad, tipo y sabores) y soporta tema claro y oscuro.

---

## División de Trabajo

### Paolo (Shepu)

- Definición de la paleta de colores para modo claro y oscuro
- Configuración de constants/theme.ts con los colores del proyecto
- Adaptación de hooks/use-theme-color.ts para retornar ThemeColors según el esquema activo
- Configuración de app/\_layout.tsx con Stack Navigator (expo-router) para las pantallas index y form
- Implementación de app/index.tsx — Landing Screen completa:
  - Header con logo (ícono de grano de café + texto "CoffeeRegister")
  - Toggle dark/light mode en el header
  - Sección hero con título y subtítulo
  - Botón FAB "Registrar café" alineado a la derecha que navega al formulario
- Placeholder de app/form.tsx para integración del equipo
- Diseño del logo en Figma (junto a Mauricio)

---

### Mauricio

- Inicialización del proyecto Expo y estructura de carpetas base
- Implementación de app/form.tsx — Form Screen completa:
  - Campo de texto para la marca
  - Selector de intensidad/tostado (1, 2, 3)
  - Selector de tipo (Entero, Molido, Cápsulas, Instantáneo)
  - Checkboxes de sabores extra (Vainilla, Chocolate)
  - Validación de campos requeridos
  - Botón "Guardar registro"
- Diseño del logo en Figma (junto a Paolo)

---

### Benjamín

- Implementación del hook useStorage con AsyncStorage:
  - saveRecord(data) — guardar registro
  - getRecords() — leer registros al cargar la app
  - deleteRecord(id) — eliminar registro individual
- Pantalla/sección de historial de registros guardados (arreglado en el bugFix, porque se hizo mal el merge anterior)
- diseño del mock de la app en Figma (junto a Paolo)

---

## Diseño en Figma

### Logo

Diseñado por _Paolo y Mauricio_ directamente en Figma usando la paleta definida.

- Ícono circular con grano de café geométrico (elipse + ranura curva central)
- Tipografía: "Coffee" en marrón oscuro + "Register" en dorado caramelo
- Tagline: "Registra cada taza"
- Dos versiones: modo claro (fondo crema #FDF6EE) y modo oscuro (fondo espresso #1A0F00)

### Mock de la App

Diseñado con apoyo de _Benjamín_.

- 4 pantallas: Landing claro, Landing oscuro, Formulario claro, Formulario oscuro
- Muestra el flujo completo: header con logo y toggle, hero, botón FAB y formulario con todos los campos

---

## Paleta de Colores

| Token      | Modo Claro | Modo Oscuro |
| ---------- | ---------- | ----------- |
| background | #FDF6EE    | #1A0F00     |
| surface    | #F5E9D6    | #2C1A05     |
| primary    | #5C2D00    | #E8A870     |
| accent     | #C46A00    | #F5C87A     |
| text       | #1E0A00    | #F5E9D6     |
| textMuted  | #8B6248    | #9E7A5A     |
| border     | #D9B99A    | #4A2E10     |

---

## Stack Tecnológico

- Expo v54 / React Native 0.81.5
- TypeScript ~5.9.2
- Expo Router v6 (file-based routing)
- AsyncStorage (persistencia local)
- expo-safe-area-context
