'use client';

import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

// WhatsApp Icon SVG Component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('919579896842');

  // Fetch phone number from contact settings
  useEffect(() => {
    async function fetchNumber() {
      try {
        const res = await fetch('/api/settings?key=contact');
        const json = await res.json();
        if (json.success && json.data && json.data.value && json.data.value.whatsappNumber) {
          setWhatsappNumber(json.data.value.whatsappNumber);
        }
      } catch (err) {
        console.error('Error fetching WhatsApp number:', err);
      }
    }
    fetchNumber();
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    const formattedMessage = `Hello Space Archade,%0A%0A${encodeURIComponent(message)}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${formattedMessage}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 z-50 w-[90vw] max-w-[380px] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <WhatsAppIcon className="h-8 w-8 text-[#25D366]" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Space Archade</h3>
                <p className="text-xs text-white/90">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="bg-[#E5DDD5] p-4 h-[300px] overflow-y-auto">
            <div className="flex gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white flex-shrink-0 flex items-center justify-center">
                <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
              </div>
              <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[80%]">
                <p className="text-sm text-gray-800 mb-1">
                  Hello! Welcome to Space Archade 👋
                </p>
                <p className="text-sm text-gray-800">
                  How can I help you today? :)
                </p>
                <span className="text-xs text-gray-500 mt-1 block">Just now</span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-background p-4 border-t border-border">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write your message..."
                  rows={1}
                  className="w-full px-4 py-3 pr-12 rounded-full border border-input bg-muted/50 focus:outline-none focus:ring-2 focus:ring-[#25D366] resize-none text-sm"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="bg-[#25D366] hover:bg-[#20BA5A] disabled:bg-muted disabled:cursor-not-allowed text-white p-3 rounded-full transition-all flex-shrink-0"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-8 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95"
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <WhatsAppIcon className="h-7 w-7" />
        )}
      </button>
    </>
  );
}
