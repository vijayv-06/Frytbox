import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Check } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    const savedConsent = localStorage.getItem('frytbox_cookie_consent');
    if (!savedConsent) {
      // Delay showing by 1.2s for pleasant onboarding
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for custom trigger event to reopen cookie settings from footer
  useEffect(() => {
    const handleReopen = () => {
      setIsVisible(true);
      setShowPreferences(true);
    };
    window.addEventListener('frytbox_open_cookie_settings', handleReopen);
    return () => window.removeEventListener('frytbox_open_cookie_settings', handleReopen);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'frytbox_cookie_consent',
      JSON.stringify({ essential: true, analytics: true, timestamp: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem(
      'frytbox_cookie_consent',
      JSON.stringify({ essential: true, analytics: false, timestamp: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'frytbox_cookie_consent',
      JSON.stringify({ essential: true, analytics: analyticsEnabled, timestamp: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-50 max-w-xl mx-auto animate-slideUp">
      <div className="bg-[#0B192C]/95 backdrop-blur-md text-white p-5 sm:p-6 rounded-2xl shadow-2xl border border-slate-700/80 ring-1 ring-white/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-[#2563EB]/20 border border-[#2563EB]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-display text-white">
                Cookie & Privacy Choices
              </h3>
              <p className="text-xs text-gray-300">FRYTBOX Worldwide Logistics</p>
            </div>
          </div>

          <button
            onClick={handleAcceptEssential}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-xs text-gray-300 leading-relaxed">
          We use cookies and similar technologies to ensure seamless freight tracking, rate calculations, and secure corporate portal functionality. Optional analytics help us enhance global trade lane operations.
        </p>

        {showPreferences && (
          <div className="my-4 p-3.5 bg-black/40 rounded-xl border border-white/10 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Strictly Necessary Cookies</span>
                <span className="text-gray-400 text-[11px]">Essential for quoting, tracking, and account security.</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[10px] font-bold uppercase">Required</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div>
                <span className="font-semibold text-white block">Performance & Route Analytics</span>
                <span className="text-gray-400 text-[11px]">Help us optimize page speed and logistics calculator speed.</span>
              </div>
              <button
                type="button"
                onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                  analyticsEnabled ? 'bg-[#2563EB]' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-0.5 ${
                    analyticsEnabled ? 'translate-x-4 ml-0.5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => setShowPreferences(!showPreferences)}
            className="text-xs font-semibold text-[#38BDF8] hover:text-white underline transition-colors"
          >
            {showPreferences ? 'Hide Preferences' : 'Customize Preferences'}
          </button>

          <div className="flex items-center space-x-2">
            {showPreferences ? (
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all shadow"
              >
                Save Preferences
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleAcceptEssential}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-gray-200 border border-white/10 transition-all"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all shadow flex items-center space-x-1.5"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Accept All</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
