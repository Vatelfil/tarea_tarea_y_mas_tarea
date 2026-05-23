import { View, Text } from 'react-native'
import { useThemeColor } from '@/hooks/use-theme-color'

export default function FormScreen() {
  const colors = useThemeColor()

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.text, fontSize: 24, fontWeight: 'bold' }}>Form</Text>
    </View>
  )
}
