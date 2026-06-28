import { Link } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiAlertTriangle, FiPackage, FiShield } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ReturnPolicyPage() {
  const { t } = useLanguage()

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
            {/* Quality Issues */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiCheckCircle className="text-green-600" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('returnPolicy.qualityIssue.title')}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {t('returnPolicy.qualityIssue.content')}
                  </p>
                </div>
              </div>
            </div>

            {/* Non-Quality Issues */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiXCircle className="text-red-500" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('returnPolicy.nonQualityIssue.title')}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {t('returnPolicy.nonQualityIssue.content')}
                  </p>
                </div>
              </div>
            </div>

            {/* Uncontrollable Factors */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiAlertTriangle className="text-yellow-600" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('returnPolicy.transitDamage.title')}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {t('returnPolicy.transitDamage.content')}
                  </p>
                </div>
              </div>
            </div>

            {/* Custom / Mystery Box */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiPackage className="text-purple-600" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('returnPolicy.customItems.title')}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {t('returnPolicy.customItems.content')}
                  </p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiShield className="text-blue-600" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('returnPolicy.note.title')}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {t('returnPolicy.note.content')}
                  </p>
                </div>
              </div>
            </div>
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
