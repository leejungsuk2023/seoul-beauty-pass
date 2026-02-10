import { Check, Sparkles, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { generateBookingRef, getDefaultSurgeryDate } from '../lib/bookingGenerator';

export default function FreeOffer() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    contactType: 'whatsapp',
    procedure: '',
    surgeryDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    if (!supabase) {
      setErrorMessage('Service is not configured. Please contact support.');
      setIsSubmitting(false);
      return;
    }

    try {
      const bookingRef = generateBookingRef();
      const surgeryDate = formData.surgeryDate || getDefaultSurgeryDate();

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          booking_ref: bookingRef,
          tier: 'Essential',
          status: 'Pending Verification',
          voucher_value: 199,
          surgery_date: surgeryDate,
          clinic: 'To be assigned',
          services: {
            airportPickup: {
              status: 'Pending'
            },
            insurance: {
              status: 'Inactive'
            },
            hotline: {
              available: true
            }
          }
        })
        .select()
        .single();

      if (error) throw error;

      // Store booking data and redirect to dashboard
      if (data) {
        const bookingRecord = {
          id: data.id,
          name: data.name,
          email: data.email,
          bookingRef: data.booking_ref,
          tier: data.tier,
          status: data.status,
          voucherValue: data.voucher_value,
          surgeryDate: data.surgery_date,
          clinic: data.clinic,
          services: data.services
        };
        sessionStorage.setItem('sbp-booking', JSON.stringify(bookingRecord));
        navigate('/my-dashboard', { state: { booking: bookingRecord } });
      }
    } catch (error) {
      console.error('Booking creation error:', error);
      setErrorMessage('Failed to create booking. Please try again or contact support.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">{t.freeOffer.hero.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.freeOffer.hero.title}
          </h1>
          <p className="text-xl text-black/80 max-w-2xl mx-auto font-semibold">
            {t.freeOffer.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.freeOffer.comparison.title}
            </h2>
            <p className="text-lg text-gray-600">
              {t.freeOffer.hero.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.freeOffer.comparison.surgeryCost}</h3>
              <p className="text-gray-600 text-sm">{t.freeOffer.comparison.samePrice}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.freeOffer.benefits.title}</h3>
              <p className="text-gray-600 text-sm">{t.freeOffer.benefits.pickup.description}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.freeOffer.benefits.consultation.title}</h3>
              <p className="text-gray-600 text-sm">{t.freeOffer.benefits.consultation.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t.freeOffer.comparison.title}
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold">{t.freeOffer.comparison.headers.service}</th>
                    <th className="px-6 py-4 text-center text-gray-700 font-semibold">{t.freeOffer.comparison.headers.direct}</th>
                    <th className="px-6 py-4 text-center bg-orange-50 text-[#FF6B00] font-semibold">{t.freeOffer.comparison.headers.bbg}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-gray-900 font-medium">{t.freeOffer.comparison.surgeryCost}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{t.freeOffer.comparison.samePrice}</td>
                    <td className="px-6 py-4 text-center bg-orange-50 text-gray-700 font-semibold">{t.freeOffer.comparison.samePrice}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900 font-medium">{t.freeOffer.benefits.pickup.title}</td>
                    <td className="px-6 py-4 text-center text-gray-700">$90</td>
                    <td className="px-6 py-4 text-center bg-orange-50">
                      <span className="text-green-600 font-semibold flex items-center justify-center gap-1">
                        <Check className="w-5 h-5" />
                        FREE
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900 font-medium">{t.freeOffer.comparison.simData}</td>
                    <td className="px-6 py-4 text-center text-gray-700">$50</td>
                    <td className="px-6 py-4 text-center bg-orange-50">
                      <span className="text-green-600 font-semibold flex items-center justify-center gap-1">
                        <Check className="w-5 h-5" />
                        FREE
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900 font-medium">{t.freeOffer.benefits.support.title}</td>
                    <td className="px-6 py-4 text-center text-gray-700">$59</td>
                    <td className="px-6 py-4 text-center bg-orange-50">
                      <span className="text-green-600 font-semibold flex items-center justify-center gap-1">
                        <Check className="w-5 h-5" />
                        FREE
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-6 py-4 text-gray-900">{t.freeOffer.comparison.totalValue}</td>
                    <td className="px-6 py-4 text-center text-gray-900">+$199</td>
                    <td className="px-6 py-4 text-center bg-orange-100 text-[#FF6B00] text-lg">
                      {t.freeOffer.comparison.saveLabel}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#0056D2]" />
              {t.freeOffer.comparison.importantNoteTitle}
            </h3>
            <p className="text-gray-700 text-sm">
              {t.freeOffer.comparison.importantNoteBody}
            </p>
          </div>
        </div>
      </section>

      {/* Lead Gen Form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.freeOffer.form.title}
            </h2>
            <p className="text-gray-600">
              {t.freeOffer.form.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t.freeOffer.form.name} *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all"
                  placeholder={t.freeOffer.form.namePlaceholder}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t.freeOffer.form.email} *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all"
                  placeholder={t.freeOffer.form.emailPlaceholder}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t.freeOffer.form.emailHelp}
                </p>
              </div>

              {/* Contact Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {t.freeOffer.comparison.preferredContactMethod}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.contactType === 'whatsapp' 
                      ? 'border-[#FF6B00] bg-orange-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="contactType"
                      value="whatsapp"
                      checked={formData.contactType === 'whatsapp'}
                      onChange={(e) => setFormData({ ...formData, contactType: e.target.value })}
                      className="text-[#FF6B00]"
                    />
                    <span className="font-medium">WhatsApp</span>
                  </label>
                  <label className={`flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.contactType === 'line' 
                      ? 'border-[#FF6B00] bg-orange-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="contactType"
                      value="line"
                      checked={formData.contactType === 'line'}
                      onChange={(e) => setFormData({ ...formData, contactType: e.target.value })}
                      className="text-[#FF6B00]"
                    />
                    <span className="font-medium">LINE</span>
                  </label>
                </div>
              </div>

              {/* Contact ID */}
              <div>
                <label htmlFor="contact" className="block text-sm font-semibold text-gray-900 mb-2">
                  {formData.contactType === 'whatsapp' ? t.freeOffer.comparison.whatsappNumber : 'LINE ID'} *
                </label>
                <input
                  type="text"
                  id="contact"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all"
                  placeholder={formData.contactType === 'whatsapp' ? '+82 10-1234-5678' : 'Your LINE ID'}
                />
              </div>

              {/* Interested Procedure */}
              <div>
                <label htmlFor="procedure" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t.freeOffer.form.procedure} *
                </label>
                <select
                  id="procedure"
                  required
                  value={formData.procedure}
                  onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">{t.freeOffer.form.procedurePlaceholder}</option>
                  <option value="eyes">{t.freeOffer.form.procedures.doubleeyelid}</option>
                  <option value="nose">{t.freeOffer.form.procedures.rhinoplasty}</option>
                  <option value="breast">{t.freeOffer.form.procedures.breastAugmentation}</option>
                  <option value="facial-contouring">{t.freeOffer.form.procedures.facelift}</option>
                  <option value="body-contouring">{t.freeOffer.form.procedures.liposuction}</option>
                  <option value="anti-aging">{t.freeOffer.comparison.antiAging}</option>
                  <option value="other">{t.freeOffer.form.procedures.other}</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black py-4 rounded-lg font-bold hover:from-[#C19A2E] hover:to-[#D4AF37] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                {isSubmitting ? t.freeOffer.form.buttonSubmitting : t.freeOffer.comparison.submitCta}
              </button>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}

              <p className="text-sm text-gray-600 text-center">
                {t.freeOffer.form.consent}
              </p>
            </div>
          </form>

          {/* Additional Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-1">{t.freeOffer.comparison.fastResponse}</h4>
              <p className="text-sm text-gray-600">{t.freeOffer.comparison.fastResponseDesc}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌍</div>
              <h4 className="font-semibold text-gray-900 mb-1">{t.freeOffer.comparison.multilingual}</h4>
              <p className="text-sm text-gray-600">{t.freeOffer.comparison.multilingualDesc}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-1">{t.freeOffer.comparison.noObligation}</h4>
              <p className="text-sm text-gray-600">{t.freeOffer.comparison.noObligationDesc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
