import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSelector() {
  const { language, switchLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 bg-white/70 border border-peach/50 rounded-full px-1 py-1">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-ribbon-red text-white shadow-sm'
            : 'text-primary hover:text-ribbon-red'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('zh')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'zh'
            ? 'bg-ribbon-red text-white shadow-sm'
            : 'text-primary hover:text-ribbon-red'
        }`}
        aria-label="切换到中文"
      >
        中文
      </button>
    </div>
  )
}
