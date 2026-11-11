import React from 'react';
import { Link } from 'react-router-dom';
import { HeroVideo } from '../components/HeroVideo';
import { ServicesSection } from '../components/ServicesSection';
import { IndustriesSection } from '../components/IndustriesSection';
import { COMPANY_PROFILE } from '../data/companyData';
import { CheckCircle2, ArrowRight, ShieldCheck, Globe, Handshake, Eye } from 'lucide-react';

export const Home: React.FC = () => {
  const getCoreValueIcon = (icon: string) => {
    switch (icon) {
      case 'Handshake':
        return <Handshake className="h-6 w-6 text-[#2563EB]" />;
      case 'Eye':
        return <Eye className="h-6 w-6 text-[#2563EB]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="h-6 w-6 text-[#2563EB]" />;
      case 'Globe':
        return <Globe className="h-6 w-6 text-[#2563EB]" />;
      default:
        return <CheckCircle2 className="h-6 w-6 text-[#2563EB]" />;
    }
  };

  return (
    <div className="bg-white">
      {/* 1. Hero with Frytbox11.mp4 in high visibility & continuous loop */}
      <HeroVideo />

      {/* 2. Core Services Grid (Streamlined & Breathable) */}
      <ServicesSection compact={true} />

      {/* 3. Industry Sectors Overview (Compact & Fast) */}
      <IndustriesSection compact={true} />

      {/* 4. Why FRYTBOX (Streamlined Low Content) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full">
              The FRYTBOX Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081426] tracking-tight mt-2 font-display">
              Why Global Shippers Partner With Us
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              Unwavering commitment to operational excellence, transparent pricing, and dependable delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_PROFILE.coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-white text-[#2563EB] flex items-center justify-center mb-5 shadow-sm border border-gray-100">
                  {getCoreValueIcon(val.icon)}
                </div>
                <h3 className="text-base font-bold text-[#081426] mb-2 font-display">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Minimal Elegant Corporate Blue CTA */}
      <section className="py-16 bg-[#0B192C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Ready to Move Your Business Forward?
            </h2>
            <p className="mt-1.5 text-sm text-gray-300 max-w-lg">
              Get in touch with our commercial operations team for tailored freight rates and logistics advisory.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/quote"
              className="px-7 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center space-x-2"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all"
            >
              <span>Contact Bengaluru HQ</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
