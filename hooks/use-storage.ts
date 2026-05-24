import type { CoffeeRecord } from '@/types/coffee'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'coffee_records'

export function useStorage() {
  const [records, setRecords] = useState<CoffeeRecord[]>([])

  const loadRecords = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY)
      if (raw) setRecords(JSON.parse(raw))
    } catch {
      // AsyncStorage failure: mantener estado actual
    }
  }, [])

  useEffect(() => {
    loadRecords()
  }, [loadRecords])

  const saveRecord = useCallback(async (data: Omit<CoffeeRecord, 'id'>) => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY)
      const existing: CoffeeRecord[] = raw ? JSON.parse(raw) : []
      const newRecord: CoffeeRecord = { ...data, id: Date.now().toString() }
      const updated = [...existing, newRecord]
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setRecords(updated)
    } catch {
      throw new Error('No se pudo guardar el registro')
    }
  }, [])

  const deleteRecord = useCallback(async (id: string) => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY)
      const existing: CoffeeRecord[] = raw ? JSON.parse(raw) : []
      const updated = existing.filter(r => r.id !== id)
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setRecords(updated)
    } catch {
      throw new Error('No se pudo eliminar el registro')
    }
  }, [])

  return { records, loadRecords, saveRecord, deleteRecord }
}
