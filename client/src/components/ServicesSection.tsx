import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plane,
  Ship,
  Truck,
  Compass,
  FileCheck,
  Boxes,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/companyData';

interface ServicesSectionProps {
  compact?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ compact = false }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'core' | 'specialized'>('all');

  const displayedServices = compact
    ? SERVICES_DATA.slice(0, 4)
    : SERVICES_DATA.filter((service) => {
        if (activeTab === 'all') return true;
        return service.category === activeTab;
      });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Plane':
        return <Plane className="h-6 w-6" />;
      case 'Ship':
        return <Ship className="h-6 w-6" />;
      case 'Truck':
        return <Truck className="h-6 w-6" />;
      case 'Compass':
        return <Compass className="h-6 w-6" />;
      case 'FileCheck':
        return <FileCheck className="h-6 w-6" />;
      case 'Boxes':
        return <Boxes className="h-6 w-6" />;
      default:
        return <Ship className="h-6 w-6" />;
    }
  };

  return (
    <section className="py-20 bg-white text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#2563EB] mb-2">
              <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
              <span>Comprehensive Logistics Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081426] tracking-tight font-display">
              End-to-End Freight Forwarding
            </h2>
            <p className="mt-3 text-base text-gray-600 max-w-xl leading-relaxed">
              Streamlining international shipping through integrated air, ocean, road, project cargo, and customs clearance.
            </p>
          </div>

          {/* Right Header Action / Filter Tabs */}
          {compact ? (
            <Link
              to="/services"
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all"
            >
              <span>View All 6 Services</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <div className="mt-6 md:mt-0 flex items-center bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'all'
                    ? 'bg-white text-[#2563EB] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Services
              </button>
              <button
                onClick={() => setActiveTab('core')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'core'
                    ? 'bg-white text-[#2563EB] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Core Freight
              </button>
              <button
                onClick={() => setActiveTab('specialized')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'specialized'
                    ? 'bg-white text-[#2563EB] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Specialized
              </button>
            </div>
          )}
        </div>

        {/* Services Cards Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${compact ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
          {displayedServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className={`relative ${compact ? 'h-40' : 'h-48'} overflow-hidden bg-gray-900`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center space-x-2 text-white">
                  <div className="h-8 w-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold text-white">
                    {service.category === 'core' ? 'Core Network' : 'Specialized'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#081426] group-hover:text-[#2563EB] transition-colors font-display">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {!compact && (
                    <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
                      {service.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-gray-600">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to={`/services#${service.slug}`}
                    className="text-xs font-semibold text-[#2563EB] group-hover:text-[#1D4ED8] inline-flex items-center space-x-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    to={`/quote?service=${encodeURIComponent(service.id)}`}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-colors"
                  >
                    Quote
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
