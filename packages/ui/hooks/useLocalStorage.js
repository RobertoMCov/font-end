'use client'

import { useState } from 'react'

const useLocalStorage = ({ key, initialValue = '' }) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item?.includes('{') ? JSON.parse(item) : item || initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value)
    } catch (error) {
      // A more advanced implementation would handle the error case
    }
  }
  return { storedValue, setValue }
}

export default useLocalStorage
