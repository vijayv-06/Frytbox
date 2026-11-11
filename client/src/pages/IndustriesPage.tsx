import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Cpu,
  Zap,
  Activity,
  Shield,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/companyData';

export const IndustriesPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="h-7 w-7" />;
      case 'Zap':
        return <Zap className="h-7 w-7" />;
      case 'Activity':
        return <Activity className="h-7 w-7" />;
      case 'Shield':
        return <Shield className="h-7 w-7" />;
      default:
        return <Cpu className="h-7 w-7" />;
    }
  };

  return (
    <div className="bg-white pt-24">
      {/* Header */}
      <section className="bg-[#0B192C] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] bg-blue-900/40 px-3.5 py-1.5 rounded-full border border-blue-700/30">
              Sector Specializations
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-4 font-display">
              Industries We Power
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-200 leading-relaxed font-normal">
              Tailor-made solutions to manage complex demands, streamline regulatory approvals, and make supply chains leaner and more agile.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Details */}
      <section className="py-20 bg-white text-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {INDUSTRIES_DATA.map((industry, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={industry.id}
                id={industry.slug}
                className="scroll-mt-32 pt-8 border-t border-gray-100 first:border-0 first:pt-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shadow-sm border border-blue-100">
                        {getIcon(industry.iconName)}
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                          Industry Vertical
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081426] font-display">
                          {industry.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-[#2563EB]">
                      {industry.subtitle}
                    </p>

                    <p className="text-base text-gray-700 leading-relaxed">
                      {industry.description}
                    </p>

                    {/* Sectors */}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                        Sub-Sectors Handled:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {industry.sectors.map((sec, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-800"
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">
                        Operational Safeguards:
                      </div>
                      {industry.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Link
                        to={`/quote?industry=${encodeURIComponent(industry.id)}`}
                        className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl transition-all shadow inline-flex items-center space-x-2"
                      >
                        <span>Request {industry.title} Quote</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 group">
                      <img
                        src={industry.image}
                        alt={industry.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
