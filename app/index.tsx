import { Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useStorage } from '@/hooks/use-storage';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { CoffeeRecord } from '@/types/coffee';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Appearance, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
    const colors = useThemeColor();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const systemScheme = useColorScheme();
    const [modeOverride, setModeOverride] = useState<'light' | 'dark' | null>(null);

    const mode = modeOverride ?? systemScheme ?? 'light';

    useEffect(() => {
        Appearance.setColorScheme(mode);
    }, [mode]);

    const toggleTheme = () => {
        setModeOverride((prev: 'light' | 'dark' | null) => {
            const currentMode = prev ?? systemScheme ?? 'light';
            return currentMode === 'light' ? 'dark' : 'light';
        })
    }

    const { records, loadRecords, deleteRecord } = useStorage();

    useFocusEffect(
        useCallback(() => {
            loadRecords();
        }, [loadRecords])
    );

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
            width: 36,
            height: 36,
        },
        logoTextContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 0,
            marginTop: 20,
        },
        logoCoffeeText: {
            height: 40,
            resizeMode: 'contain',
        },
        logoRegisterText: {
            height: 40,
            resizeMode: 'contain',
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
            color: colors.text,
            fontFamily: Fonts.rounded,
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
    });

    const renderItem = ({item}: {item: CoffeeRecord}) => {
        const isGroundCoffee = ['Entero', 'Molido'].includes(item.tipo);
        const [principal, ...subsabores] = item.sabores;
        
        return (
            <View style={styles.card}>
                <View style={styles.cardRow1}>
                    <Text style={styles.cardMarca}>{item.marca}</Text>
                    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                        {item.tipo ? (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{item.tipo}</Text>
                            </View>
                        ) : null}
                        <Pressable onPress={() => deleteRecord(item.id)}>
                            <Text style={{ fontSize: 12, color: colors.textMuted }}>Eliminar</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.cardRow2}>
                    <Text style={styles.cardDetails}>Intensidad: {item.intensidad}</Text>
                    {isGroundCoffee ? (
                        <>
                            {principal && <Text style={styles.cardDetails}>Sabor principal: {principal}</Text>}
                            {subsabores.length > 0 && <Text style={styles.cardDetails}>Subsabores: {subsabores.join(', ')}</Text>}
                        </>
                    ) : (
                        <>
                            {principal && <Text style={styles.cardDetails}>Sabor: {principal}</Text>}
                        </>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={mode === 'light' ? require('@/assets/images/iconoclaro.png') : require('@/assets/images/icon-dark.png')}
                    style={styles.logo}
                />
                <Pressable onPress={toggleTheme} style={styles.themeButton}>
                    <Text style={styles.themeButtonText}>{mode === 'light' ? '☀️' : '🌙'}</Text>
                </Pressable>
            </View>
            <View style={styles.hero}>
                <View style={styles.logoTextContainer}>
                    <Image
                        source={mode === 'light' ? require('@/assets/images/text-coffee-claro.png') : require('@/assets/images/Coffee-oscuro.png')}
                        style={styles.logoCoffeeText}
                    />
                    <Image
                        source={mode === 'light' ? require('@/assets/images/text-register-claro.png') : require('@/assets/images/Register-oscuro.png')}
                        style={styles.logoRegisterText}
                    />
                </View>
                <Text style={styles.heroSubtitle}>Lleva un control de tus degustaciones y comparte tus experiencias</Text>
            </View>
            <Text style={styles.label}>Mis registros de café</Text>
            <FlatList
                data={records}
                keyExtractor={(item) => item.id}
                style={{flex: 1}}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No hay registros de café disponibles.</Text>
                    </View>
                }
                renderItem={renderItem}
            />
            <View style={styles.footer}>
                <View style={styles.footerContent}>
                    <Text style={styles.footerText}>Agregar nuevo café</Text>
                    <Pressable onPress={() => router.push('/form')} style={styles.fab}>
                        <Text style={styles.fabText}>+</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
