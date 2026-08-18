import { Link } from 'react-router-dom'
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiCheckCircle,
  FiClipboard,
  FiFileText,
  FiPackage,
  FiShield,
  FiXCircle,
} from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ReturnPolicyPage() {
  const { t } = useLanguage()
  const sections = [
    { key: 'qualityIssue', icon: FiCheckCircle, iconClass: 'bg-green-100 text-green-600' },
    { key: 'nonQualityIssue', icon: FiXCircle, iconClass: 'bg-red-100 text-red-500' },
    { key: 'transitDamage', icon: FiAlertTriangle, iconClass: 'bg-yellow-100 text-yellow-600' },
    { key: 'customItems', icon: FiPackage, iconClass: 'bg-purple-100 text-purple-600' },
    { key: 'applicationRequirements', icon: FiClipboard, iconClass: 'bg-peach/30 text-ribbon-red' },
    { key: 'dispatchCheck', icon: FiShield, iconClass: 'bg-blue-100 text-blue-600' },
    { key: 'policyUpdates', icon: FiFileText, iconClass: 'bg-gray-100 text-gray-600' },
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
          >
            <FiArrowLeft size={18} />
            <span className="text-sm font-medium">{t('returnPolicy.backToHome')}</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              {t('returnPolicy.title')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('returnPolicy.subtitle')}
            </p>
          </div>
          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map(({ key, icon: Icon, iconClass }) => (
              <div key={key} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconClass}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      {t(`returnPolicy.${key}.title`)}
                    </h2>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {t(`returnPolicy.${key}.content`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <p className="text-gray-600 mb-4">{t('returnPolicy.needHelp')}</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              {t('returnPolicy.contactUs')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
