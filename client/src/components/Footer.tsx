import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Globe2,
} from 'lucide-react';
import { COMPANY_PROFILE, SERVICES_DATA, INDUSTRIES_DATA } from '../data/companyData';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#0B192C] text-gray-300 border-t border-slate-800 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <div className="h-11 px-3 py-1.5 bg-white rounded-lg inline-flex items-center">
                <img
                  src={`${import.meta.env.BASE_URL}frytbox-logo.png`}
                  alt="FRYTBOX Worldwide Logistics"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              <strong className="text-white font-semibold block mb-1">
                {COMPANY_PROFILE.legalName}
              </strong>
              Global supply chain and freight forwarding enterprise delivering integrated multi-modal solutions across air, ocean, road, and project cargo.
            </p>

            <div className="flex items-center space-x-4 pt-1 text-xs text-gray-400">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>ICEGATE EDI Compliant</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Globe2 className="h-4 w-4 text-[#38BDF8]" />
                <span>Global Multi-Modal</span>
              </span>
            </div>
          </div>

          {/* Column 2: Logistics Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.slug}`}
                    className="text-gray-400 hover:text-white transition-colors block"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              Industries
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {INDUSTRIES_DATA.map((ind) => (
                <li key={ind.id}>
                  <Link
                    to={`/industries#${ind.slug}`}
                    className="text-gray-400 hover:text-white transition-colors block"
                  >
                    {ind.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/quote"
                  className="text-[#38BDF8] hover:underline font-semibold flex items-center space-x-1"
                >
                  <span>Request a Quotation</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Global HQ Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">
              Corporate Office
            </h4>
            <div className="space-y-3 text-xs leading-relaxed text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <span>{COMPANY_PROFILE.headquarters.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#38BDF8] shrink-0" />
                <a
                  href={`mailto:${COMPANY_PROFILE.headquarters.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_PROFILE.headquarters.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400 shrink-0" />
                <span>{COMPANY_PROFILE.headquarters.workingHours}</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="text-xs font-semibold text-white mb-2">
                Market Briefing
              </div>
              {subscribed ? (
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Subscribed successfully.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex space-x-1.5">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Corporate email"
                    className="flex-1 bg-white/10 border border-white/15 px-3 py-1.5 text-xs rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            © {new Date().getFullYear()} {COMPANY_PROFILE.legalName}. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link to="/industries" className="hover:text-white transition-colors">
              Industries
            </Link>
            <Link to="/quote" className="hover:text-white transition-colors">
              Quote
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('frytbox_open_cookie_settings'))}
              className="hover:text-white transition-colors text-xs text-gray-400 cursor-pointer"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
