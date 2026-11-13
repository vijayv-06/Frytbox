import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Zap, Activity, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/companyData';

interface IndustriesSectionProps {
  compact?: boolean;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ compact = false }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="h-6 w-6" />;
      case 'Zap':
        return <Zap className="h-6 w-6" />;
      case 'Activity':
        return <Activity className="h-6 w-6" />;
      case 'Shield':
        return <Shield className="h-6 w-6" />;
      default:
        return <Cpu className="h-6 w-6" />;
    }
  };

  return (
    <section className="py-12 sm:py-20 bg-[#0B192C] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#38BDF8] mb-1.5 sm:mb-2 bg-blue-900/40 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-blue-700/30">
            <span>Industry Expertise</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
            Built for Mission-Critical Sectors
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
            Engineered logistics workflows addressing unique regulatory, temperature, and security specifications.
          </p>
        </div>

        {/* Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${compact ? 'lg:grid-cols-4' : 'lg:grid-cols-2'} gap-6`}>
          {INDUSTRIES_DATA.map((industry) => (
            <div
              key={industry.id}
              className="bg-[#1E293B]/70 rounded-2xl border border-slate-700/60 overflow-hidden hover:border-blue-500/40 transition-all group flex flex-col justify-between"
            >
              <div className={`relative ${compact ? 'h-40' : 'h-52'} overflow-hidden`}>
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/40 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center space-x-2.5">
                  <div className="h-8 w-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-lg">
                    {getIcon(industry.iconName)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-display">
                      {industry.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                <p className="text-[11px] sm:text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {industry.subtitle}
                </p>

                {/* Sub-sectors (only if not compact) */}
                {!compact && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {industry.sectors.map((sector, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-gray-200 border border-white/5"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-700/50">
                  <Link
                    to={`/industries#${industry.slug}`}
                    className="text-xs font-semibold text-[#38BDF8] hover:text-white inline-flex items-center space-x-1.5 transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
