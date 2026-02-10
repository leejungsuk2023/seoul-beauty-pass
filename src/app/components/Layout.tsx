import { Link, useLocation, Outlet } from 'react-router';
import { Heart, Instagram, Facebook, Globe, ChevronDown } from 'lucide-react';
import { ConsultationFloatingButton } from './ConsultationFloatingButton';
import { useLanguage, LANGUAGES } from '../contexts/LanguageContext';
import { useState } from 'react';

export function Layout() {
  const location = useLocation();
  const { language, setLanguage, t, currentLanguageOption } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#0056D2] rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Seoul Beauty Pass</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                to="/shop" 
                className={`text-sm transition-colors ${
                  isActive('/shop') 
                    ? 'text-[#0056D2] font-medium' 
                    : 'text-gray-700 hover:text-[#0056D2]'
                }`}
              >
                {t.nav.shop}
              </Link>
              <Link 
                to="/free-offer" 
                className={`text-sm transition-colors ${
                  isActive('/free-offer') 
                    ? 'text-[#0056D2] font-medium' 
                    : 'text-gray-700 hover:text-[#0056D2]'
                }`}
              >
                {t.nav.freeOffer}
              </Link>
              <Link 
                to="/how-it-works" 
                className={`text-sm transition-colors ${
                  isActive('/how-it-works') 
                    ? 'text-[#0056D2] font-medium' 
                    : 'text-gray-700 hover:text-[#0056D2]'
                }`}
              >
                {t.nav.howItWorks}
              </Link>
            </div>

            {/* Right side: Language + Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    {currentLanguageOption.flag} {currentLanguageOption.nativeName}
                  </span>
                  <span className="text-sm font-medium text-gray-700 sm:hidden">
                    {currentLanguageOption.flag}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
                </button>

                {/* Language Dropdown */}
                {showLanguageMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowLanguageMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setShowLanguageMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                            language === lang.code ? 'bg-blue-50 text-[#0056D2] font-medium' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <div className="flex-1">
                            <div className="font-medium">{lang.nativeName}</div>
                            <div className="text-xs text-gray-500">{lang.name}</div>
                          </div>
                          {language === lang.code && (
                            <span className="text-[#0056D2]">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile My Booking Button */}
              <Link
                to="/manage-booking"
                className={`md:hidden px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/manage-booking')
                    ? 'bg-blue-50 text-[#0056D2]'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t.nav.myBooking}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main><Outlet /></main>

      {/* Consultation Floating Button */}
      <ConsultationFloatingButton />

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#0056D2] rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="font-semibold text-gray-900">Seoul Beauty Pass</span>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                {t.footer.tagline}
              </p>
              
              {/* Social Media Links */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 text-sm">Follow Us</h4>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/seoulbeautypass"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="w-5 h-5 text-black" />
                  </a>
                  <a
                    href="https://facebook.com/seoulbeautypass"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#0056D2] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">{t.footer.support.title}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link to="/manage-booking" className="hover:text-[#0056D2] font-medium">
                    {t.nav.myBooking}
                  </Link>
                </li>
                <li><a href="#" className="hover:text-[#0056D2]">{t.footer.support.helpCenter}</a></li>
                <li><a href="#" className="hover:text-[#0056D2]">{t.footer.support.contact}</a></li>
                <li><a href="#" className="hover:text-[#0056D2]">{t.footer.support.faq}</a></li>
                <li><a href="#" className="hover:text-[#0056D2]">{t.footer.support.insurance}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">{t.footer.services.title}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/shop" className="hover:text-[#0056D2]">{t.footer.services.essentialPass}</Link></li>
                <li><Link to="/shop" className="hover:text-[#0056D2]">{t.footer.services.safetyPass}</Link></li>
                <li><Link to="/shop" className="hover:text-[#0056D2]">{t.footer.services.vipPass}</Link></li>
                <li><Link to="/free-offer" className="hover:text-[#0056D2]">{t.footer.services.freeOffer}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">{t.footer.legal.title}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#0056D2]">{t.footer.legal.privacy}</a></li>
                <li><a href="#" className="hover:text-[#0056D2]">{t.footer.legal.terms}</a></li>
                <li><a href="#" className="hover:text-[#0056D2]">{t.footer.legal.medical}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center text-sm text-gray-600">
              <p>&copy; 2026 Seoul Beauty Pass. {t.footer.rights}</p>
              <p className="mt-2 text-xs text-gray-500">{t.footer.medical}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
