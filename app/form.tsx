import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useThemeColor } from '@/hooks/use-theme-color'
import { useStorage } from '@/hooks/use-storage'

const TIPOS = ['Entero', 'Molido', 'Cápsulas', 'Instantáneo'] as const
const SABORES = ['Vainilla', 'Chocolate'] as const

export default function FormScreen() {
  const colors = useThemeColor()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const { saveRecord } = useStorage()

  const [marca, setMarca] = useState<string>('')
  const [intensidad, setIntensidad] = useState<1 | 2 | 3 | null>(null)
  const [tipo, setTipo] = useState<string | null>(null)
  const [sabores, setSabores] = useState<string[]>([])

  const handleSave = async (): Promise<void> => {
    if (!marca.trim() || intensidad === null) {
      Alert.alert('Campos requeridos', 'Completa la marca e intensidad')
      return
    }
    try {
      await saveRecord({ marca, intensidad, tipo: tipo ?? '', sabores })
      router.back()
    } catch {
      Alert.alert('Error', 'No se pudo guardar el registro')
    }
  }

  function FieldLabel({ children }: { children: string }) {
    return (
      <Text
        style={[
          styles.fieldLabel,
          { color: colors.textMuted },
        ]}
      >
        {children}
      </Text>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 20,
      paddingTop: insets.top + 12,
      paddingBottom: 16,
    },
    backButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 1.5,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backButtonText: {
      fontSize: 18,
      color: colors.primary,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: insets.bottom + 40,
    },
    fieldLabel: {
      fontSize: 11,
      fontWeight: '500',
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginTop: 20,
      marginBottom: 6,
    },
    input: {
      borderWidth: 1.5,
      borderRadius: 10,
      paddingVertical: 11,
      paddingHorizontal: 14,
      fontSize: 14,
    },
    intensidadContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    intensidadButton: {
      flex: 1,
      borderRadius: 10,
      paddingVertical: 10,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    intensidadButtonText: {
      fontWeight: '600',
      fontSize: 16,
    },
    tipoContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    tipoButton: {
      borderRadius: 99,
      paddingVertical: 7,
      paddingHorizontal: 12,
      borderWidth: 1.5,
    },
    tipoButtonText: {
      fontSize: 12,
      fontWeight: '500',
    },
    saboresContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    saborButton: {
      flex: 1,
      borderWidth: 1.5,
      borderRadius: 10,
      paddingVertical: 11,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: 4,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxText: {
      fontSize: 10,
    },
    saborButtonText: {
      fontSize: 13,
    },
    saveButton: {
      width: '100%',
      marginTop: 24,
      paddingVertical: 15,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
  })

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Nuevo registro</Text>
      </View>

      {/* FORM */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. MARCA */}
        <FieldLabel>Marca</FieldLabel>
        <TextInput
          value={marca}
          onChangeText={setMarca}
          placeholder="Ej: Nespresso, Illy..."
          placeholderTextColor={colors.textMuted}
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
        />

        {/* 2. INTENSIDAD / TOSTADO */}
        <FieldLabel>Intensidad / Tostado</FieldLabel>
        <View style={styles.intensidadContainer}>
          {([1, 2, 3] as const).map(n => {
            const active = n === intensidad
            return (
              <Pressable
                key={n}
                onPress={() => setIntensidad(n)}
                style={[
                  styles.intensidadButton,
                  {
                    borderColor: active ? colors.primary : colors.border,
                    backgroundColor: active ? colors.primary : colors.surface,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.intensidadButtonText,
                    { color: active ? colors.background : colors.textMuted },
                  ]}
                >
                  {n}
                </Text>
              </Pressable>
            )
          })}
        </View>

        {/* 3. TIPO */}
        <FieldLabel>Tipo</FieldLabel>
        <View style={styles.tipoContainer}>
          {TIPOS.map(t => {
            const active = t === tipo
            return (
              <Pressable
                key={t}
                onPress={() => setTipo(t)}
                style={[
                  styles.tipoButton,
                  {
                    borderColor: active ? colors.primary : colors.border,
                    backgroundColor: active ? colors.primary : 'transparent',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tipoButtonText,
                    { color: active ? colors.background : colors.textMuted },
                  ]}
                >
                  {t}
                </Text>
              </Pressable>
            )
          })}
        </View>

        {/* 4. SABORES EXTRA */}
        <FieldLabel>Sabores extra</FieldLabel>
        <View style={styles.saboresContainer}>
          {SABORES.map(s => {
            const checked = sabores.includes(s)
            const toggle = () =>
              setSabores(prev => (checked ? prev.filter(x => x !== s) : [...prev, s]))

            return (
              <Pressable
                key={s}
                onPress={toggle}
                style={[
                  styles.saborButton,
                  {
                    backgroundColor: colors.surface,
                    borderColor: checked ? colors.accent : colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: checked ? colors.accent : colors.border,
                      backgroundColor: checked ? colors.accent : 'transparent',
                    },
                  ]}
                >
                  {checked && (
                    <Text style={[styles.checkboxText, { color: colors.background }]}>
                      ✓
                    </Text>
                  )}
                </View>
                <Text style={[styles.saborButtonText, { color: colors.text }]}>
                  {s}
                </Text>
              </Pressable>
            )
          })}
        </View>

        {/* BOTÓN GUARDAR */}
        <Pressable
          onPress={handleSave}
          style={[styles.saveButton, { backgroundColor: colors.accent }]}
        >
          <Text style={[styles.saveButtonText, { color: colors.background }]}>
            Guardar registro
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}
