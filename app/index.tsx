import { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, FlatList, Pressable, Appearance } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter, useFocusEffect } from 'expo-router'
import { useThemeColor } from '@/hooks/use-theme-color'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useStorage } from '@/hooks/use-storage'
import type { CoffeeRecord } from '@/types/coffee'

export default function LandingScreen() {
  const colors = useThemeColor()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const systemScheme = useColorScheme()
  const [modeOverride, setModeOverride] = useState<'light' | 'dark' | null>(null)

  const mode = modeOverride ?? systemScheme ?? 'light'

  useEffect(() => {
    Appearance.setColorScheme(mode)
  }, [mode])

  const toggleTheme = () => {
    setModeOverride(prev => {
      const currentMode = prev ?? systemScheme ?? 'light'
      return currentMode === 'light' ? 'dark' : 'light'
    })
  }

  const { records, loadRecords, deleteRecord } = useStorage()

  useFocusEffect(
    useCallback(() => {
      loadRecords()
    }, [loadRecords])
  )

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: insets.top + 12,
      paddingBottom: 12,
    },
    logo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    logoDot: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoEllipse: {
      width: 14,
      height: 20,
      borderRadius: 7,
      backgroundColor: colors.accent,
    },
    logoText: {
      flexDirection: 'row',
      gap: 0,
    },
    logoWord: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
    logoAccent: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.accent,
    },
    themeButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 1.5,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    themeButtonText: {
      fontSize: 14,
    },
    hero: {
      paddingHorizontal: 20,
      paddingTop: 28,
      alignItems: 'center',
      paddingBottom: 8,
    },
    heroTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      textAlign: 'center',
      lineHeight: 34,
    },
    heroSubtitle: {
      fontSize: 13,
      color: colors.textMuted,
      marginTop: 8,
      textAlign: 'center',
    },
    label: {
      fontSize: 11,
      fontWeight: '500',
      color: colors.textMuted,
      letterSpacing: 1,
      textTransform: 'uppercase',
      paddingHorizontal: 20,
      marginTop: 20,
      marginBottom: 8,
    },
    listContent: {
      paddingHorizontal: 20,
      gap: 10,
      paddingBottom: 20,
      flexGrow: 1,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
    },
    emptyText: {
      fontSize: 13,
      color: colors.textMuted,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 12,
      paddingHorizontal: 14,
    },
    cardRow1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardMarca: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    badge: {
      backgroundColor: colors.accent,
      borderRadius: 99,
      paddingVertical: 3,
      paddingHorizontal: 8,
    },
    badgeText: {
      fontSize: 10,
      color: colors.background,
      fontWeight: '500',
    },
    cardRow2: {
      marginTop: 4,
    },
    cardDetails: {
      fontSize: 11,
      color: colors.textMuted,
    },
    footer: {
      borderTopWidth: 1,
      borderColor: colors.border,
    },
    footerContent: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: insets.bottom + 16,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    footerText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.accent,
      marginRight: 12,
    },
    fab: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: colors.accent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    fabText: {
      fontSize: 24,
      color: colors.background,
      lineHeight: 28,
    },
  })

  const renderItem = ({ item }: { item: CoffeeRecord }) => (
    <View style={styles.card}>
      <View style={styles.cardRow1}>
        <Text style={styles.cardMarca}>{item.marca}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {item.tipo ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.tipo}</Text>
            </View>
          ) : null}
          <Pressable onPress={() => deleteRecord(item.id)} hitSlop={8}>
            <Text style={{ color: colors.textMuted, fontSize: 18, lineHeight: 20 }}>×</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.cardRow2}>
        <Text style={styles.cardDetails}>
          Tostado {item.intensidad} · {item.sabores.length > 0 ? item.sabores.join(', ') : 'Sin sabor'}
        </Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <View style={styles.logoDot}>
            <View style={styles.logoEllipse} />
          </View>
          <View style={styles.logoText}>
            <Text style={styles.logoWord}>Coffee</Text>
            <Text style={styles.logoAccent}>Register</Text>
          </View>
        </View>
        <Pressable style={styles.themeButton} onPress={toggleTheme}>
          <Text style={styles.themeButtonText}>{mode === 'dark' ? '☀️' : '🌙'}</Text>
        </Pressable>
      </View>

      {/* HERO */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Tu café,{'\n'}registrado.</Text>
        <Text style={styles.heroSubtitle}>Guarda cada taza con sus detalles</Text>
      </View>

      {/* LABEL */}
      <Text style={styles.label}>Mis registros</Text>

      {/* FLATLIST */}
      <FlatList
        data={records}
        keyExtractor={item => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aún no hay registros</Text>
          </View>
        }
        renderItem={renderItem}
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>Registrar café</Text>
          <Pressable style={styles.fab} onPress={() => router.push('/form')}>
            <Text style={styles.fabText}>+</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
