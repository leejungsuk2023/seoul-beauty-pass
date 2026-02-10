import { useState } from 'react';
import { Shield, Mail, FileText, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { mapBookingRowToRecord } from '../lib/booking';

export default function ManageBooking() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    if (!supabase) {
      setErrorMessage('Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      setIsSubmitting(false);
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedBookingRef = bookingRef.trim().toUpperCase();

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .ilike('email', normalizedEmail)
      .eq('booking_ref', normalizedBookingRef)
      .maybeSingle();

    if (error) {
      setErrorMessage('Could not verify your booking. Please try again.');
      setIsSubmitting(false);
      return;
    }

    if (!data) {
      setErrorMessage('No booking found with this email and booking reference.');
      setIsSubmitting(false);
      return;
    }

    const booking = mapBookingRowToRecord(data);
    sessionStorage.setItem('sbp-booking', JSON.stringify(booking));
    setIsSubmitting(false);
    navigate('/my-dashboard', { state: { booking } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Logo/Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0A2540] to-[#0056D2] rounded-full mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.manageBooking.title}
          </h1>
          <p className="text-gray-600">
            {t.manageBooking.subtitle}
          </p>
        </div>

        {/* Center Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.manageBooking.email}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent transition-all"
                  placeholder={t.manageBooking.emailPlaceholder}
                />
              </div>
            </div>

            {/* Booking Reference Input */}
            <div>
              <label htmlFor="booking-ref" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.manageBooking.bookingRef}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="booking-ref"
                  name="booking-ref"
                  type="text"
                  required
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent transition-all"
                  placeholder={t.manageBooking.bookingRefPlaceholder}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0A2540] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#0056D2] transition-colors shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? 'Loading...' : t.manageBooking.button}
            </button>
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
          </form>

          {/* Help Text */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <HelpCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="mb-2">
                  {t.manageBooking.help}{' '}
                  <a 
                    href="https://wa.me/821012345678" 
                    className="text-[#0A2540] font-semibold hover:text-[#0056D2] transition-colors"
                  >
                    {t.manageBooking.support}
                  </a>
                </p>
                <p className="text-xs text-gray-500">
                  {t.manageBooking.supportSubtext}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>{t.manageBooking.secure}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
