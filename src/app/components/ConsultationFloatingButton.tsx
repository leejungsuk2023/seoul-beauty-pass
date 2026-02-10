import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export function ConsultationFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop & Mobile - Right Bottom */}
      <div className="fixed right-6 bottom-6 z-50">
        {isOpen ? (
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl border-2 border-[#D4AF37] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent pointer-events-none"></div>
            <div className="relative p-6 w-72">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="mb-4">
                <h3 className="text-white font-bold text-lg mb-1">Need Help?</h3>
                <p className="text-gray-400 text-sm">Chat with us instantly</p>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/821012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-4 py-3 rounded-lg hover:from-[#20BA5A] hover:to-[#0F7A6A] transition-all group shadow-lg"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-sm">WhatsApp</div>
                    <div className="text-xs opacity-90">Chat now</div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                </a>

                {/* Instagram Direct Message */}
                <a
                  href="https://ig.me/m/bbgmedicalpass"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black px-4 py-3 rounded-lg hover:from-[#C19A2E] hover:to-[#D4AF37] transition-all group shadow-lg"
                >
                  <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.5 18.501 6.06077 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7 21.476 5.35917C21.7226 5.99667 21.891 6.72167 21.941 7.78583C21.9885 8.8525 22.001 9.19167 22.001 12C22.001 14.8083 21.991 15.1475 21.941 16.2141C21.8918 17.2783 21.7226 18.0033 21.476 18.6408C21.2218 19.3 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45181 21.475C4.79264 21.2208 4.32764 20.8767 3.77264 20.3217C3.21681 19.7658 2.87264 19.3008 2.61848 18.6408C2.37181 18.0033 2.20348 17.2783 2.15348 16.2141C2.10598 15.1475 2.09598 14.8083 2.09598 12C2.09598 9.19167 2.10598 8.8525 2.15348 7.78583C2.20348 6.72167 2.37181 5.99667 2.61848 5.35917C2.87264 4.7 3.21598 4.23417 3.77264 3.67833C4.32848 3.1225 4.79348 2.77917 5.45181 2.525C6.08931 2.2775 6.81348 2.10917 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-sm">Instagram</div>
                    <div className="text-xs opacity-80">Send message</div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                </a>
              </div>

              {/* Response Time */}
              <div className="mt-4 pt-4 border-t border-[#D4AF37]/20">
                <p className="text-xs text-center text-gray-400">
                  ⚡ Average response time: <span className="text-[#F4D03F] font-semibold">2 minutes</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group relative"
            aria-label="Open consultation chat"
          >
            <MessageCircle className="w-6 h-6" />
            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping opacity-20"></span>
          </button>
        )}
      </div>
    </>
  );
}
