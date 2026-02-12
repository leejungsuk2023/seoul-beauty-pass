import { Link } from 'react-router';
import { Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import HowItWorksPreview from '../components/HowItWorksPreview';

export default function HowItWorks() {
  const { t } = useLanguage();
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0056D2] to-[#003D99] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.howItWorks.page.title}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t.howItWorks.page.subtitle}
          </p>
        </div>
      </section>

      {/* Journey Timeline - shared component */}
      <HowItWorksPreview mode="full" showLearnMore={false} />

      {/* Insurance Details */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.howItWorks.page.sectionInsuranceTitle}
            </h2>
            <p className="text-lg text-gray-600">
              {t.howItWorks.page.sectionInsuranceSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Safety Pass Coverage */}
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#0056D2] rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{t.shop.tier.safety.name}</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.howItWorks.page.safetyCostLine}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.howItWorks.page.safetyValid}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.howItWorks.page.safetyCoverage}</span>
                </li>
              </ul>
            </div>

            {/* VIP Pass Coverage */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl p-6 border-2 border-[#D4AF37] text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-[#D4AF37]">{t.shop.tier.vip.name}</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{t.howItWorks.page.vipCostLine}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{t.howItWorks.page.vipFlight}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{t.howItWorks.page.vipHotel}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{t.howItWorks.page.safetyValid}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-sm text-gray-700">
              <strong>{t.howItWorks.page.noteLabel}</strong> {t.howItWorks.page.noteBody}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0056D2] to-[#003D99] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.howItWorks.page.finalTitle}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t.howItWorks.page.finalSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="bg-white text-[#0056D2] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {t.howItWorks.page.goHome}
            </Link>
            <Link 
              to="/shop"
              className="bg-[#FF6B00] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#E55F00] transition-colors"
            >
              {t.howItWorks.page.viewPasses}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
