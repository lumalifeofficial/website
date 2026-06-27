import { createContext, useContext, useState, useCallback } from 'react'
import translations from './translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('luma-language')
    return saved || 'en'
  })

  const switchLanguage = useCallback((lang) => {
    setLanguage(lang)
    localStorage.setItem('luma-language', lang)
  }, [])

  const t = useCallback(
    (key) => {
      const keys = key.split('.')
      let value = translations[language]
      for (const k of keys) {
        value = value?.[k]
      }
      return value || key
    },
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
