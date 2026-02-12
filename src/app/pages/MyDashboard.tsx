import { useMemo, useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Download, 
  Car, 
  Shield, 
  MessageCircle, 
  Phone,
  QrCode,
  ArrowUpRight,
  Calendar,
  MapPin
} from 'lucide-react';
import { useLocation } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import type { BookingRecord } from '../types/booking';

const defaultBooking: BookingRecord = {
  id: 'mock-booking',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  bookingRef: 'BBG-2026-4521',
  tier: 'Essential',
  status: 'Confirmed',
  voucherValue: 199,
  surgeryDate: '2026-03-15',
  clinic: 'ID Hospital Seoul',
  services: {
    airportPickup: {
      status: 'Driver Assigned',
      driverName: 'Kim Min-jun',
      carPlate: '서울 12가 3456',
      pickupTime: '2026-03-14 14:30',
      terminal: 'Incheon Airport Terminal 1'
    },
    insurance: {
      status: 'Active',
      provider: 'KB Insurance',
      coverage: '$15,000',
      policyNumber: 'KB-2026-789456'
    },
    hotline: {
      available: true,
      number: '+82-10-1234-5678'
    }
  }
};

export default function MyDashboard() {
  const location = useLocation();
  const { t } = useLanguage();
  const bookingFromRoute = (location.state as { booking?: BookingRecord } | null)?.booking;
  const bookingFromStorage = useMemo(() => {
    const raw = sessionStorage.getItem('sbp-booking');
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as BookingRecord;
    } catch {
      return null;
    }
  }, []);

  const userBooking = bookingFromRoute ?? bookingFromStorage ?? defaultBooking;
  const [showUpsell, setShowUpsell] = useState(userBooking.tier === 'Essential');

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'VIP': return 'from-black to-gray-800';
      case 'Safety': return 'from-[#0056D2] to-[#003D99]';
      default: return 'from-[#0A2540] to-[#0056D2]';
    }
  };

  const getTierBadge = (tier: string) => {
    switch(tier) {
      case 'VIP': return 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black';
      case 'Safety': return 'bg-[#0056D2] text-white';
      default: return 'bg-[#0A2540] text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t.dashboard.welcome}, {userBooking.name}.
              </h1>
              <p className="text-gray-600">
                {t.dashboard.bookingRef}: <span className="font-mono font-semibold">{userBooking.bookingRef}</span>
              </p>
            </div>
            
            {/* Status Badge */}
            <div className="flex-shrink-0">
              {userBooking.status === 'Confirmed' ? (
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border-2 border-green-200">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">{t.dashboard.status.confirmed}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full border-2 border-orange-200">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{t.dashboard.status.pending}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 1: The Digital Pass */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t.dashboard.pass.title}</h2>
          
          {/* Premium Card Design */}
          <div className={`bg-gradient-to-br ${getTierColor(userBooking.tier)} rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className={`inline-block ${getTierBadge(userBooking.tier)} px-3 py-1 rounded-full text-xs font-bold mb-3`}>
                    {userBooking.tier.toUpperCase()} {t.dashboard.pass.tier}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    BBG {userBooking.tier} Pass
                  </h3>
                  <p className="text-white/80 text-sm">
                    Medical Travel Concierge Service
                  </p>
                </div>
                
                {/* QR Code Placeholder */}
                <div className="bg-white p-3 rounded-xl">
                  <QrCode className="w-20 h-20 text-gray-900" />
                </div>
              </div>

              {/* Value Display */}
              <div className="mb-6">
                <p className="text-white/70 text-sm mb-1">{t.dashboard.pass.voucherValue}</p>
                <p className="text-4xl font-bold text-[#D4AF37]">
                  ${userBooking.voucherValue}
                </p>
              </div>

              {/* Trip Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/20">
                <div>
                  <p className="text-white/70 text-xs mb-1">{t.dashboard.pass.clinic}</p>
                  <p className="font-semibold">{userBooking.clinic}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">{t.dashboard.pass.surgeryDate}</p>
                  <p className="font-semibold">{new Date(userBooking.surgeryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full sm:w-auto bg-white text-[#0A2540] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-lg">
                <Download className="w-5 h-5" />
                {t.dashboard.pass.downloadButton}
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Trip Services (Grid Layout) */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t.dashboard.services.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card A: Airport Pickup */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Car className="w-6 h-6 text-[#0056D2]" />
                </div>
                <h3 className="font-bold text-gray-900">{t.dashboard.services.pickup.title}</h3>
              </div>

              {userBooking.services.airportPickup.status === 'Driver Assigned' ? (
                <div className="space-y-3">
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                    ✓ {t.dashboard.services.pickup.driverAssigned}
                  </div>
                  
                  <div className="text-sm space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{userBooking.services.airportPickup.terminal}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{userBooking.services.airportPickup.pickupTime}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mt-3">
                    <p className="text-xs text-gray-600 mb-1">{t.dashboard.services.pickup.driverDetails}</p>
                    <p className="font-semibold text-gray-900">{userBooking.services.airportPickup.driverName}</p>
                    <p className="text-sm text-gray-600 font-mono">{userBooking.services.airportPickup.carPlate}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Schedule your airport pickup service
                  </p>
                  <button className="w-full bg-[#0056D2] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[#0046B0] transition-colors">
                    {t.dashboard.services.pickup.scheduleNow}
                  </button>
                </div>
              )}
            </div>

            {/* Card B: Safety Protection (KB Certificate) */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <img src="/kb-insurance-logo.png" alt="KB Insurance" className="h-10 w-auto object-contain" />
                <h3 className="font-bold text-gray-900">{t.dashboard.services.insurance.title}</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                  ✓ {t.dashboard.services.insurance.active}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">{t.dashboard.services.insurance.coverage}</p>
                  <p className="text-2xl font-bold text-gray-900">{userBooking.services.insurance.coverage}</p>
                  <p className="text-xs text-gray-600 mt-1">{userBooking.services.insurance.provider}</p>
                </div>

                <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:border-[#0056D2] hover:text-[#0056D2] transition-all flex items-center justify-center gap-2">
                  {t.dashboard.services.insurance.viewCertificate}
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/821038035327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t.dashboard.services.insurance.careManager}
                </a>
              </div>
            </div>

            {/* Card C: 24/7 Hotline */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900">{t.dashboard.services.hotline.title}</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                  ● {t.dashboard.services.hotline.availableNow}
                </div>
                
                <p className="text-sm text-gray-600">
                  {t.dashboard.services.hotline.description}
                </p>

                <div className="space-y-2">
                  <button className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    {t.dashboard.services.hotline.chatButton}
                  </button>
                  
                  <button className="w-full bg-[#0056D2] text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-[#0046B0] transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    {t.dashboard.services.hotline.callButton}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Upsell Area (Only for Essential users) */}
        {showUpsell && (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowUpRight className="w-5 h-5 text-orange-600" />
                    <h3 className="text-xl font-bold text-gray-900">{t.dashboard.upsell.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    {t.dashboard.upsell.description
                      .replace('<strong>', '')
                      .replace('</strong>', '')
                    }
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {t.dashboard.upsell.features.roundtrip}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {t.dashboard.upsell.features.insurance}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {t.dashboard.upsell.features.priority}
                    </li>
                  </ul>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="text-center mb-3">
                    <p className="text-sm text-gray-600">{t.dashboard.upsell.price}</p>
                    <p className="text-3xl font-bold text-[#0056D2]">$300</p>
                    <p className="text-xs text-gray-500">{t.dashboard.upsell.oneTime}</p>
                  </div>
                  <button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black px-6 py-3 rounded-lg font-bold hover:shadow-xl transition-all">
                    {t.dashboard.upsell.button}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <p className="text-gray-600 mb-3">
            {t.dashboard.footer.help}
          </p>
          <a 
            href="https://wa.me/821038035327" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all mb-4"
          >
            <MessageCircle className="w-5 h-5" />
            {t.dashboard.services.insurance.careManager}
          </a>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="https://wa.me/821038035327" 
              className="inline-flex items-center gap-2 text-[#0056D2] font-semibold hover:text-[#0046B0] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {t.dashboard.footer.contact}
            </a>
            <span className="hidden sm:inline text-gray-300">•</span>
            <a 
              href="mailto:support@bbgmedicalpass.com" 
              className="inline-flex items-center gap-2 text-[#0056D2] font-semibold hover:text-[#0046B0] transition-colors"
            >
              support@bbgmedicalpass.com
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
