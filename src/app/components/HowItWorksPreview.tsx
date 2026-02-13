import React from 'react';
import { Link } from 'react-router';
import { Car, MessageCircle, Plane, Shield, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type Mode = 'compact' | 'full';

interface HowItWorksPreviewProps {
  mode?: Mode;
  showLearnMore?: boolean;
}

export default function HowItWorksPreview({ mode = 'compact', showLearnMore = true }: HowItWorksPreviewProps) {
  const { t } = useLanguage();

  if (mode === 'compact') {
    const steps = [
      { icon: Car, title: t.howItWorks.page.sectionArrival, desc: t.howItWorks.journey.arrival.step1.description },
      { icon: MessageCircle, title: t.howItWorks.page.sectionCare, desc: t.howItWorks.journey.recovery.step1.description },
      { icon: Plane, title: t.howItWorks.page.sectionReturn, desc: t.howItWorks.journey.departure.step2.description },
      { icon: Shield, title: t.howItWorks.page.sectionProtection, desc: t.howItWorks.page.sectionProtectionDesc },
    ];

    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.howItWorks.page.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.howItWorks.page.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 border-2 transition-all hover:shadow-lg ${
                  index === 3
                    ? 'bg-gradient-to-br from-[#0056D2] to-[#003D99] border-[#0056D2] text-white'
                    : 'bg-white border-gray-200 hover:border-[#0056D2]/30'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                    index === 3 ? 'bg-white/20' : 'bg-blue-100'
                  }`}
                >
                  <step.icon
                    className={`w-7 h-7 ${index === 3 ? 'text-white' : 'text-[#0056D2]'}`}
                  />
                </div>
                <h3 className={`font-bold mb-2 text-lg ${index === 3 ? 'text-white' : 'text-gray-900'}`}>
                  {step.title}
                </h3>
                <p
                  className={`text-sm line-clamp-2 ${
                    index === 3 ? 'text-blue-100' : 'text-gray-600'
                  }`}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {showLearnMore && (
            <div className="text-center">
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 bg-[#0056D2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0046B0] transition-colors"
              >
                {t.common.learnMore}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Full mode - Journey Timeline (same as HowItWorks page)
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Step 1: Arrival */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 relative">
            <div className="absolute -left-4 top-8 w-12 h-12 bg-[#0056D2] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              1
            </div>
            <div className="ml-10 sm:ml-12">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 sm:w-8 sm:h-8 text-[#0056D2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-left">{t.howItWorks.page.sectionArrival}</h3>
                  <p className="text-gray-700 mb-4 text-left">
                    {t.howItWorks.journey.arrival.step1.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900">{t.howItWorks.journey.arrival.step1.title}</p>
                        <p className="text-sm text-gray-600">{t.howItWorks.journey.arrival.step1.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900">{t.howItWorks.journey.arrival.step3.title}</p>
                        <p className="text-sm text-gray-600">{t.howItWorks.journey.arrival.step3.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900">{t.howItWorks.journey.arrival.step2.title}</p>
                        <p className="text-sm text-gray-600">{t.howItWorks.journey.arrival.step2.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-gray-400" />
          </div>

          {/* Step 2: Care */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 relative">
            <div className="absolute -left-4 top-8 w-12 h-12 bg-[#0056D2] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              2
            </div>
            <div className="ml-10 sm:ml-12">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#0056D2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-left">{t.howItWorks.page.sectionCare}</h3>
                  <p className="text-gray-700 mb-4 text-left">
                    {t.howItWorks.journey.recovery.step1.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-left">
                      <Clock className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900">{t.howItWorks.emergency.hotline.title}</p>
                        <p className="text-sm text-gray-600">{t.howItWorks.emergency.hotline.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900">{t.howItWorks.journey.surgeryDay.step3.title}</p>
                        <p className="text-sm text-gray-600">{t.howItWorks.journey.surgeryDay.step3.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900">{t.howItWorks.journey.recovery.step1.title}</p>
                        <p className="text-sm text-gray-600">{t.howItWorks.journey.recovery.step1.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-gray-400" />
          </div>

          {/* Step 3: Return */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 relative">
            <div className="absolute -left-4 top-8 w-12 h-12 bg-[#0056D2] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              3
            </div>
            <div className="ml-10 sm:ml-12">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Plane className="w-6 h-6 sm:w-8 sm:h-8 text-[#0056D2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-left">{t.howItWorks.page.sectionReturn}</h3>
                  <p className="text-gray-700 mb-4 text-left">
                    {t.howItWorks.journey.departure.step2.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900">{t.howItWorks.journey.departure.step2.title}</p>
                        <p className="text-sm text-gray-600">{t.howItWorks.journey.departure.step2.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900">{t.howItWorks.journey.departure.step1.title}</p>
                        <p className="text-sm text-gray-600">{t.howItWorks.journey.departure.step1.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900">{t.howItWorks.journey.departure.step3.title}</p>
                        <p className="text-sm text-gray-600">{t.howItWorks.journey.departure.step3.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-gray-400" />
          </div>

          {/* Step 4: Protection */}
          <div className="bg-gradient-to-br from-[#0056D2] to-[#003D99] rounded-2xl shadow-lg p-6 sm:p-8 relative text-white">
            <div className="absolute -left-4 top-8 w-12 h-12 bg-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              4
            </div>
            <div className="ml-10 sm:ml-12">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-left">{t.howItWorks.page.sectionProtection}</h3>
                  <p className="text-blue-100 mb-4 text-left">
                    {t.howItWorks.page.sectionProtectionDesc}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{t.howItWorks.emergency.insurance.title}</p>
                        <p className="text-sm text-blue-100">{t.howItWorks.page.safetyCostLine} / {t.howItWorks.page.vipCostLine}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{t.howItWorks.page.vipFlight}</p>
                        <p className="text-sm text-blue-100">{t.howItWorks.page.vipHotel}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{t.howItWorks.page.safetyValid}</p>
                        <p className="text-sm text-blue-100">{t.howItWorks.page.safetyCoverage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
