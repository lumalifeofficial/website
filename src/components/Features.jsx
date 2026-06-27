import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi'
import { useLanguage } from '../i18n/LanguageContext'

export default function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: FiTruck,
      title: t('features.freeShipping'),
      description: t('features.freeShippingDesc'),
    },
    {
      icon: FiShield,
      title: t('features.securePayment'),
      description: t('features.securePaymentDesc'),
    },
    {
      icon: FiRefreshCw,
      title: t('features.easyReturns'),
      description: t('features.easyReturnsDesc'),
    },
    {
      icon: FiHeadphones,
      title: t('features.support'),
      description: t('features.supportDesc'),
    },
  ]

  return (
    <section className="py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-cream rounded-2xl border border-peach/30 hover:shadow-md hover:shadow-peach/20 transition-all"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-soft-pink rounded-xl mb-4">
                <feature.icon className="text-ribbon-red" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-warm-brown/60 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
