import { Link } from 'react-router';
import { Shield, CheckCircle, Clock, ArrowRight, ChevronDown, Car, Instagram, Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [showAllHospitals, setShowAllHospitals] = useState(false);

  // Partner hospitals data - 여기에 병원 로고를 계속 추가할 수 있습니다
  const hospitals = [
    { name: 'Seoul Clinic', logo: null }, // logo에는 나중에 이미지 URL을 넣으시면 됩니다
    { name: 'JK Plastic Surgery', logo: null },
    { name: 'ID Hospital', logo: null },
    { name: 'BK Clinic', logo: null },
    { name: 'Banobagi Clinic', logo: null },
    { name: 'Grand Plastic Surgery', logo: null },
    { name: 'DA Plastic Surgery', logo: null },
    { name: 'April 31 Clinic', logo: null },
    { name: 'Apgujeong Seoul', logo: null },
    { name: 'View Plastic Surgery', logo: null },
    { name: 'Oracle Clinic', logo: null },
    { name: 'Marble Clinic', logo: null },
    // 여기에 계속 병원을 추가하세요
  ];

  const displayedHospitals = showAllHospitals ? hospitals : hospitals.slice(0, 4);

  // Mock Instagram posts - 실제 Instagram API 연동 시 이 데이터를 대체하세요
  // Instagram Graph API: https://developers.facebook.com/docs/instagram-api
  const instagramPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1759813641406-980519f58b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBwbGFzdGljJTIwc3VyZ2VyeSUyMGJlZm9yZSUyMGFmdGVyfGVufDF8fHx8MTc3MDcwODkwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Amazing transformation! 🌟 Our VIP Safety Pass ensures you get the best care from start to finish.',
      likes: 342,
      comments: 28
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1660602738577-7277a9354341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljJTIwc2VvdWwlMjBtb2Rlcm58ZW58MXx8fHwxNzcwNzA4OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'State-of-the-art facilities at our partner clinics in Seoul 🏥✨',
      likes: 521,
      comments: 41
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1765896387454-3c29c0473615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBob3NwaXRhbHxlbnwxfHx8fDE3NzA3MDg5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Happy patients = our biggest success! 💙 Thank you for trusting BBG Medical Pass.',
      likes: 689,
      comments: 56
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1747660357398-8d325e39afbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwcGlja3VwJTIwc2VydmljZSUyMGx1eHVyeXxlbnwxfHx8fDE3NzA3MDg5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Your journey starts with our premium airport pickup service 🚗✈️',
      likes: 431,
      comments: 35
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0056D2] to-[#003D99] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t.home.hero.landingTitle}
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                {t.home.hero.landingSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>{t.home.hero.badge1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>{t.home.hero.badge2}</span>
                </div>
              </div>
            </div>

            {/* Right Visual - Split Screen Effect */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Car className="w-12 h-12 mb-4" />
                <h3 className="font-semibold mb-2">{t.home.hero.airportService}</h3>
                <p className="text-sm text-blue-100">{t.home.hero.airportServiceDesc}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Clock className="w-12 h-12 mb-4" />
                <h3 className="font-semibold mb-2">{t.home.hero.support247}</h3>
                <p className="text-sm text-blue-100">{t.home.hero.support247Desc}</p>
              </div>
              <div className="col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Shield className="w-12 h-12 mb-4" />
                <h3 className="font-semibold mb-2">{t.home.hero.resurgery}</h3>
                <p className="text-sm text-blue-100">{t.home.hero.resurgeryDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Gate - Key Decision Point */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.home.hero.subtitle}
            </h2>
            <p className="text-lg text-gray-600">
              {t.home.gate.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left Card - For Unbooked Users */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-[#D4AF37] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black px-4 py-1 text-sm font-bold rounded-bl-lg shadow-lg">
                {t.home.gate.saveBadge}
              </div>
              <div className="mt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-3xl">🆓</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t.home.gate.noBookingTitle}
                </h3>
                <p className="text-gray-700 mb-6 text-lg">
                  {t.home.gate.noBookingPrefix}<span className="font-bold text-[#D4AF37]">{t.home.gate.noBookingHighlight}</span>{t.home.gate.noBookingSuffix}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t.home.gate.noBookingBullets[0]}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t.home.gate.noBookingBullets[1]}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t.home.gate.noBookingBullets[2]}</span>
                  </li>
                </ul>
                <Link 
                  to="/free-offer"
                  className="block w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black text-center py-4 rounded-lg font-bold hover:from-[#C19A2E] hover:to-[#D4AF37] transition-all shadow-lg"
                >
                  {t.home.hero.noCard.button}
                </Link>
              </div>
            </div>

            {/* Right Card - For Booked Users */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-[#0056D2] p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#0056D2]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t.home.gate.bookedTitle}
              </h3>
              <p className="text-gray-700 mb-6 text-lg">
                {t.home.gate.bookedDescription}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0056D2] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.home.gate.bookedBullets[0]}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0056D2] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.home.gate.bookedBullets[1]}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#0056D2] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{t.home.gate.bookedBullets[2]}</span>
                </li>
              </ul>
              <Link 
                to="/shop"
                className="block w-full bg-[#0056D2] text-white text-center py-4 rounded-lg font-semibold hover:bg-[#0046B0] transition-colors"
              >
                {t.home.hero.yesCard.button}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t.home.trust.title}
            </h2>
            <p className="text-gray-600 mb-8">
              {t.home.trust.subtitle}
            </p>
            
            {/* Hospital Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              {displayedHospitals.map((hospital, index) => (
                <div 
                  key={index} 
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 h-32 flex items-center justify-center hover:border-[#D4AF37] hover:shadow-lg transition-all group"
                >
                  {hospital.logo ? (
                    <img 
                      src={hospital.logo} 
                      alt={hospital.name}
                      className="max-w-full max-h-16 object-contain grayscale group-hover:grayscale-0 transition-all"
                    />
                  ) : (
                    <div className="text-gray-400 font-semibold text-center group-hover:text-[#D4AF37] transition-colors">
                      {hospital.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* View All Button */}
            {!showAllHospitals && hospitals.length > 4 && (
              <button
                onClick={() => setShowAllHospitals(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black px-6 py-3 rounded-lg font-semibold hover:from-[#C19A2E] hover:to-[#D4AF37] transition-all shadow-md"
              >
                {t.home.trust.viewAllPartners.replace('{count}', String(hospitals.length))}
                <ChevronDown className="w-5 h-5" />
              </button>
            )}
            
            {showAllHospitals && (
              <button
                onClick={() => setShowAllHospitals(false)}
                className="inline-flex items-center gap-2 text-gray-600 px-6 py-3 rounded-lg font-semibold hover:text-[#0056D2] transition-colors"
              >
                {t.home.trust.showLess}
                <ChevronDown className="w-5 h-5 rotate-180" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t.home.trust.card1Title}</h3>
              <p className="text-gray-600 text-sm">{t.home.trust.card1Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t.home.trust.card2Title}</h3>
              <p className="text-gray-600 text-sm">{t.home.trust.card2Desc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t.home.trust.card3Title}</h3>
              <p className="text-gray-600 text-sm">{t.home.trust.card3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed - Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Instagram className="w-6 h-6 text-[#E4405F]" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t.home.instagram.title}
              </h2>
            </div>
            <p className="text-gray-600">
              {t.home.instagram.subtitle}
            </p>
          </div>
          
          {/* Horizontal Instagram Grid - Minimalist */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {instagramPosts.map(post => (
              <div 
                key={post.id} 
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
              >
                {/* Instagram Image */}
                <img 
                  src={post.image} 
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5 fill-white" />
                        <span className="font-semibold">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-semibold">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Follow Button */}
          <div className="text-center">
            <a 
              href="https://instagram.com/bbgmedicalpass" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#E4405F] to-[#F77737] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              <Instagram className="w-5 h-5" />
              {t.home.instagram.button}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
