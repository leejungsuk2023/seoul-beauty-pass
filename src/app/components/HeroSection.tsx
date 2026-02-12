import { Link } from 'react-router';
import { Shield, CheckCircle, Clock, ArrowRight, Car, Star, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section - Premium Upgraded Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0056D2] via-[#0046B0] to-[#003D99]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#FF6B00] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Enhanced Typography */}
            <div className="space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <img src="/kb-insurance-logo.png" alt="KB Insurance" className="h-4 w-auto object-contain" />
                <span className="text-sm font-medium text-white">{t.home.hero.badge1}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white">{t.home.hero.landingTitle}</span>
                <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
                  {t.home.hero.headline2 ?? 'Our Priority'}
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                {t.home.hero.landingSubtitle}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 py-6">
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-white">5,000+</div>
                  <div className="text-sm text-blue-200 mt-1">{t.home.hero.stat1Label ?? 'Safe Journeys'}</div>
                </div>
                <div className="text-center lg:text-left border-l border-r border-white/20 px-4">
                  <div className="text-3xl md:text-4xl font-bold text-white">24/7</div>
                  <div className="text-sm text-blue-200 mt-1">{t.home.hero.stat2Label ?? t.home.hero.support247}</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-white">$50K</div>
                  <div className="text-sm text-blue-200 mt-1">{t.home.hero.stat3Label ?? t.home.hero.resurgery}</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/shop"
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-semibold rounded-xl hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t.home.hero.yesCard.button}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F4D03F] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link 
                  to="/free-offer"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  {t.home.hero.noCard.button}
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-sm text-blue-100">{t.home.cta.subtitle}</span>
                </div>
              </div>
            </div>

            {/* Right Visual - Enhanced Cards with Glassmorphism */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 - Airport Service */}
              <div className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-full blur-2xl"></div>
                <Car className="w-14 h-14 mb-6 text-[#D4AF37] relative z-10" />
                <h3 className="text-xl font-bold mb-3 text-white">{t.home.hero.airportService}</h3>
                <p className="text-sm text-blue-100">{t.home.hero.airportServiceDesc}</p>
              </div>

              {/* Card 2 - 24/7 Support */}
              <div className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF6B00]/20 to-transparent rounded-full blur-2xl"></div>
                <Clock className="w-14 h-14 mb-6 text-[#FF6B00] relative z-10" />
                <h3 className="text-xl font-bold mb-3 text-white">{t.home.hero.support247}</h3>
                <p className="text-sm text-blue-100">{t.home.hero.support247Desc}</p>
              </div>

              {/* Card 3 - Insurance Protection (Full Width) */}
              <div className="group relative col-span-2 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/30 hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/20">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <Shield className="w-16 h-16 text-[#D4AF37]" />
                    <div className="px-4 py-1 bg-[#D4AF37]/20 backdrop-blur-sm rounded-full border border-[#D4AF37]/30">
                      <span className="text-xs font-bold text-[#D4AF37]">BEST VALUE</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{t.home.hero.resurgery}</h3>
                  <p className="text-blue-100">{t.home.hero.resurgeryDesc}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-[#D4AF37]">
                    <CheckCircle className="w-4 h-4" />
                    <span>{t.home.hero.badge2}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 fill-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Add custom animations to the document */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}
