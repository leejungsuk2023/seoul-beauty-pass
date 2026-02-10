import { Check, X, Star, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Shop() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = t.shop.faq.questions;

  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#0056D2] to-[#003D99] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.shop.hero.title}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t.shop.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Essential Pass */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.shop.tier.essential.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">$199</span>
                  <span className="text-gray-600">{t.shop.faq.oneTime}</span>
                </div>
                <p className="text-sm text-gray-600">{t.shop.tier.essential.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.shop.tier.essential.features[0]}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.shop.tier.essential.features[1]}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.shop.tier.essential.features[2]}</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">{t.shop.faq.essentialNoInsurance}</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">{t.shop.faq.essentialNoReturn}</span>
                </li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                <p className="text-sm text-yellow-800 font-medium">
                  {t.shop.faq.essentialWarning}
                </p>
              </div>

              <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                {t.shop.button}
              </button>
            </div>

            {/* Safety Pass - RECOMMENDED */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#0056D2] relative transform md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white px-6 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star className="w-4 h-4 fill-white" />
                {t.shop.tier.safety.badge}
              </div>

              <div className="mb-6 mt-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.shop.tier.safety.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-[#0056D2]">$499</span>
                  <span className="text-gray-600">{t.shop.faq.oneTime}</span>
                </div>
                <p className="text-sm text-gray-600">{t.shop.tier.safety.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.shop.tier.safety.features[0]}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.shop.tier.safety.features[1]}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.shop.tier.safety.features[2]}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-semibold">{t.shop.faq.safetyStandardInsurance}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.shop.tier.safety.features[5]}</span>
                </li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                <p className="text-sm text-blue-800 font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  {t.shop.faq.safetyInsuranceIncluded}
                </p>
              </div>

              <button className="w-full bg-[#0056D2] text-white py-3 rounded-lg font-semibold hover:bg-[#0046B0] transition-colors">
                {t.shop.button}
              </button>
            </div>

            {/* VIP Pass */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-8 border-2 border-[#D4AF37] text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none"></div>
              <div className="relative">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black px-3 py-1 rounded-full text-xs font-bold mb-4">
                    {t.shop.tier.vip.badge}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-[#D4AF37]">{t.shop.tier.vip.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-[#D4AF37]">$1,390</span>
                    <span className="text-gray-400">{t.shop.faq.oneTime}</span>
                  </div>
                  <p className="text-sm text-gray-300">{t.shop.tier.vip.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{t.shop.tier.vip.features[0]}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{t.shop.tier.vip.features[1]}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{t.shop.tier.vip.features[3]}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="font-bold text-[#D4AF37]">{t.shop.faq.vipPremiumInsurance}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{t.shop.faq.vipResurgeryCoverage}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>{t.shop.faq.vipLoungeAccess}</span>
                  </li>
                </ul>

                <div className="bg-[#D4AF37]/20 border border-[#D4AF37] rounded-lg p-3 mb-6">
                  <p className="text-sm font-medium flex items-center gap-2 text-[#F4D03F]">
                    <ShieldCheck className="w-4 h-4" />
                    {t.shop.faq.vipMaxProtection}
                  </p>
                </div>

                <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black py-3 rounded-lg font-bold hover:from-[#C19A2E] hover:to-[#D4AF37] transition-all shadow-lg">
                  {t.shop.button}
                </button>
              </div>
            </div>
          </div>

          {/* Feature Comparison Note */}
          <div className="mt-12 bg-white rounded-xl p-6 border border-gray-200 max-w-3xl mx-auto">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">{t.shop.faq.whySafetyTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2">🛡️</div>
                <p className="text-sm text-gray-700">{t.shop.faq.whySafetyBullets[0]}</p>
              </div>
              <div>
                <div className="text-3xl mb-2">✈️</div>
                <p className="text-sm text-gray-700">{t.shop.faq.whySafetyBullets[1]}</p>
              </div>
              <div>
                <div className="text-3xl mb-2">💰</div>
                <p className="text-sm text-gray-700">{t.shop.faq.whySafetyBullets[2]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t.shop.faq.title}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <span className="text-gray-500 text-xl">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
