import { useStorage } from '@/hooks/use-storage'
import { useThemeColor } from '@/hooks/use-theme-color'
import { type CoffeeRecord } from '@/types/coffee'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type CoffeeFormState = Omit<CoffeeRecord, 'id'>

const TIPOS = ['Entero', 'Molido', 'Cápsulas', 'Instantáneo'] as const
const SABORES_PRINCIPALES = ['Chocolatoso', 'Frutal', 'Floral', 'Dulce', 'Especiado', 'Nueces', 'Cítrico', 'Terroso', 'Ahumado'] as const
const SABORES_CAPSULAS = ['Chocolatoso', 'Tostado', 'Dulce', 'Nueces', 'Ahumado leve'] as const

const SUBSABORES: Record<string, string[]> = {
  'Chocolatoso': ['Chocolate negro', 'Chocolate con leche', 'Cacao', 'Moka'],
  'Frutal': ['Frutos rojos', 'Manzana', 'Durazno', 'Frutas tropicales'],
  'Floral': ['Jazmín', 'Lavanda', 'Té floral'],
  'Dulce': ['Caramelo', 'Miel', 'Vainilla', 'Panela'],
  'Nueces': ['Almendra', 'Avellana', 'Nuez'],
  'Cítrico': ['Limón', 'Naranja', 'Bergamota'],
  'Especiado': ['Canela', 'Clavo de olor', 'Pimienta'],
  'Ahumado': ['Tabaco', 'Humo', 'Caramelo quemado'],
  'Terroso': ['Tierra', 'Madera', 'Vegetal oscuro'],
}

export default function FormScreen() {
  const colors = useThemeColor()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const scrollViewRef = useRef<ScrollView>(null)
  const screenWidth = Dimensions.get('window').width

  const [marca, setMarca] = useState<string>('')
  const [intensidad, setIntensidad] = useState<number | null>(null)
  const [tipo, setTipo] = useState<string>('')
  const [saborPrincipal, setSaborPrincipal] = useState<string>('')
  const [showSaborDropdown, setShowSaborDropdown] = useState<boolean>(false)
  const [subsabores, setSubsabores] = useState<string[]>([])
  const [showSubsaboresDropdown, setShowSubsaboresDropdown] = useState<boolean>(false)

  const { saveRecord } = useStorage()

  const  handleSave = async (): Promise<void> => {
    if (!marca.trim() || intensidad === null) {
      Alert.alert('Campos requeridos', 'Completa la marca e intensidad')
      return
    }
    
    const sabores: string[] = []
    if (['Entero', 'Molido'].includes(tipo)) {
      if (saborPrincipal) sabores.push(saborPrincipal)
      sabores.push(...subsabores)
    } else if (['Cápsulas', 'Instantáneo'].includes(tipo)) {
      if (saborPrincipal) sabores.push(saborPrincipal)
    }
    
    const data: CoffeeFormState = { marca, intensidad, tipo, sabores }
    try {
      await saveRecord(data)
      router.back()
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el registro')
    }
  }

  const handleIntensidadPress = (value: number) => {
    if (intensidad === value) {
      setIntensidad(null)
    } else {
      setIntensidad(value)
    }
  }

  const handleTipoPress = (value: string) => {
    if (tipo === value) {
      setTipo('')
      setSaborPrincipal('')
      setShowSaborDropdown(false)
      setSubsabores([])
    } else {
      setTipo(value)
      setSaborPrincipal('')
      setShowSaborDropdown(false)
      setSubsabores([])
    }
  }

  const handleSaborPrincipalSelect = (sabor: string) => {
    setSaborPrincipal(sabor)
    setShowSaborDropdown(false)
    setSubsabores([])
  }

  const handleSubsaborToggle = (subsabor: string) => {
    setSubsabores(prev =>
      prev.includes(subsabor)
        ? prev.filter(x => x !== subsabor)
        : [...prev, subsabor]
    )
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
    },
    backButtonText: {
      fontSize: 24,
      color: colors.primary,
      alignSelf: 'center',
      lineHeight: 17.5,
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
      marginTop: 12,
    },
    intensidadScrollView: {
      flexGrow: 0,
      gap: 8,
      paddingVertical: 8,
    },
    intensidadButton: {
      width: 50,
      height: 50,
      borderRadius: 10,
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
    saborPrincipalContainer: {
      marginTop: 12,
    },
    saborPrincipalButton: {
      borderWidth: 1.5,
      borderRadius: 10,
      paddingVertical: 11,
      paddingHorizontal: 14,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    saborPrincipalButtonText: {
      fontSize: 14,
    },
    saborPrincipalPlaceholder: {
      fontSize: 14,
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      borderWidth: 1.5,
      borderRadius: 10,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      zIndex: 1000,
      maxHeight: 250,
    },
    dropdownItem: {
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderBottomWidth: 1,
    },
    dropdownItemText: {
      fontSize: 14,
    },
    saborPrincipalWrapper: {
      position: 'relative',
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
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.intensidadScrollView}
          style={styles.intensidadContainer}
        >
          {Array.from({ length: 13 }, (_, i) => i + 1).map(n => {
            const active = n === intensidad
            return (
              <Pressable
                key={n}
                onPress={() => handleIntensidadPress(n)}
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
                    { color: active ? colors.background : colors.text },
                  ]}
                >
                  {n}
                </Text>
              </Pressable>
            )
          })}
        </ScrollView>

        {/* 3. TIPO */}
        <FieldLabel>Tipo</FieldLabel>
        <View style={styles.tipoContainer}>
          {TIPOS.map(t => {
            const active = t === tipo
            return (
              <Pressable
                key={t}
                onPress={() => handleTipoPress(t)}
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

        {/* 4. PERFIL DE SABOR */}
        {tipo && (
          <View style={styles.saborPrincipalWrapper}>
            <FieldLabel>{(tipo === 'Entero' || tipo === 'Molido') ? 'Perfil de sabor principal' : 'Perfil de sabor'}</FieldLabel>
            <Pressable
              onPress={() => {
                setShowSubsaboresDropdown(false)
                setShowSaborDropdown(!showSaborDropdown)
              }}
              style={[
                styles.saborPrincipalButton,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  saborPrincipal ? styles.saborPrincipalButtonText : styles.saborPrincipalPlaceholder,
                  { color: saborPrincipal ? colors.text : colors.textMuted },
                ]}
              >
                {saborPrincipal || ((tipo === 'Entero' || tipo === 'Molido') ? 'Seleccionar sabor principal' : 'Seleccionar sabor')}
              </Text>
              <Text style={{ color: colors.text, fontSize: 16 }}>
                {showSaborDropdown ? '▲' : '▼'}
              </Text>
            </Pressable>

            {showSaborDropdown && (
              <ScrollView
                style={[
                  styles.dropdown,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                {((tipo === 'Entero' || tipo === 'Molido') ? SABORES_PRINCIPALES : SABORES_CAPSULAS).map(sabor => (
                  <Pressable
                    key={sabor}
                    onPress={() => handleSaborPrincipalSelect(sabor)}
                    style={[
                      styles.dropdownItem,
                      {
                        borderBottomColor: colors.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        { color: colors.text },
                      ]}
                    >
                      {sabor}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>
        )}

        {/* 5. SUBSABORES */}
        {saborPrincipal && (tipo === 'Entero' || tipo === 'Molido') && (
          <View style={styles.saborPrincipalWrapper}>
            <FieldLabel>Subsabores</FieldLabel>
            <Pressable
              onPress={() => {
                setShowSaborDropdown(false)
                setShowSubsaboresDropdown(!showSubsaboresDropdown)
              }}
              style={[
                styles.saborPrincipalButton,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  subsabores.length > 0 ? styles.saborPrincipalButtonText : styles.saborPrincipalPlaceholder,
                  { color: subsabores.length > 0 ? colors.text : colors.textMuted },
                ]}
              >
                {subsabores.length > 0 ? `${subsabores.length} subsabor${subsabores.length > 1 ? 'es' : ''}` : 'Subsabor del perfil'}
              </Text>
              <Text style={{ color: colors.text, fontSize: 16 }}>
                {showSubsaboresDropdown ? '▲' : '▼'}
              </Text>
            </Pressable>

            {showSubsaboresDropdown && (
              <ScrollView
                style={[
                  styles.dropdown,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                {(SUBSABORES[saborPrincipal] || []).map(subsabor => {
                  const isSelected = subsabores.includes(subsabor)
                  return (
                    <Pressable
                      key={subsabor}
                      onPress={() => handleSubsaborToggle(subsabor)}
                      style={[
                        styles.dropdownItem,
                        {
                          borderBottomColor: colors.border,
                          backgroundColor: isSelected ? colors.primary + '20' : 'transparent',
                        },
                      ]}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View
                          style={[
                            styles.checkbox,
                            {
                              borderColor: isSelected ? colors.accent : colors.border,
                              backgroundColor: isSelected ? colors.accent : 'transparent',
                            },
                          ]}
                        >
                          {isSelected && (
                            <Text style={[styles.checkboxText, { color: colors.background }]}>
                              ✓
                            </Text>
                          )}
                        </View>
                        <Text
                          style={[
                            styles.dropdownItemText,
                            { color: colors.text },
                          ]}
                        >
                          {subsabor}
                        </Text>
                      </View>
                    </Pressable>
                  )
                })}
              </ScrollView>
            )}
          </View>
        )}

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
