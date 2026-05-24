import { Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Appearance, Image, Pressable, StyleSheet, Text, View } from 'react-native';
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
            flex: 1,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        logoTextContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 0,
            marginBottom: 20,
        },
        logoCoffeeText: {
            height: 40,
            resizeMode: 'contain',
        },
        logoRegisterText: {
            height: 40,
            resizeMode: 'contain',
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

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <Image
                    source={mode === 'light' ? require('@/assets/images/icon-claro.png') : require('@/assets/images/icon-dark.png')}
                    style={styles.logo}
                />
                <Pressable onPress={toggleTheme} style={styles.themeButton}>
                    <Text style={styles.themeButtonText}>{mode === 'light' ? '☀️' : '🌙'}</Text>
                </Pressable>
            </View>

            {/* HERO */}
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
                <Text style={styles.heroTitle}>Tu café, registrado.</Text>
                <Text style={styles.heroSubtitle}>Lleva un control de tus degustaciones y comparte tus experiencias</Text>
            </View>

            {/* FOOTER */}
            <View style={styles.footer}>
                <View style={styles.footerContent}>
                    <Text style={styles.footerText}>Registrar café</Text>
                    <Pressable onPress={() => router.push('/form')} style={styles.fab}>
                        <Text style={styles.fabText}>+</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
