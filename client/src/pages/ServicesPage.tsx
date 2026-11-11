import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Plane,
  Ship,
  Truck,
  Compass,
  FileCheck,
  Boxes,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/companyData';

export const ServicesPage: React.FC = () => {
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
      case 'Plane':
        return <Plane className="h-7 w-7" />;
      case 'Ship':
        return <Ship className="h-7 w-7" />;
      case 'Truck':
        return <Truck className="h-7 w-7" />;
      case 'Compass':
        return <Compass className="h-7 w-7" />;
      case 'FileCheck':
        return <FileCheck className="h-7 w-7" />;
      case 'Boxes':
        return <Boxes className="h-7 w-7" />;
      default:
        return <Ship className="h-7 w-7" />;
    }
  };

  return (
    <div className="bg-white pt-24">
      {/* Services Header */}
      <section className="bg-[#0B192C] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] bg-blue-900/40 px-3.5 py-1.5 rounded-full border border-blue-700/30">
              Integrated Freight Forwarding
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-4 font-display">
              Logistics Services
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-200 leading-relaxed font-normal">
              Tailored shipping services to meet your business needs by providing the right combination of freight, logistics expertise, and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Services In-Depth List */}
      <section className="py-20 bg-white text-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {SERVICES_DATA.map((service, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={service.id}
                id={service.slug}
                className="scroll-mt-32 pt-8 border-t border-gray-100 first:border-0 first:pt-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Text Column */}
                  <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shadow-sm border border-blue-100">
                        {getIcon(service.iconName)}
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                          {service.category === 'core' ? 'Core Freight' : 'Specialized Solution'}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#081426] font-display">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {service.fullDesc}
                    </p>

                    {/* Features Grid */}
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-900">
                        Operational Features & Capabilities:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feat, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs text-gray-700">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {service.capabilities.map((cap, i) => (
                        <div key={i} className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-2xs">
                          <h4 className="text-xs font-bold text-[#081426] mb-1">
                            {cap.title}
                          </h4>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            {cap.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Link
                        to={`/quote?service=${encodeURIComponent(service.id)}`}
                        className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-xl transition-all shadow flex items-center space-x-2 w-fit"
                      >
                        <span>Request {service.title} Rate</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {service.specifications && (
                        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3.5 rounded-xl text-xs text-gray-800 shadow">
                          <span className="font-bold text-[#081426] block mb-1">
                            Standards:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {service.specifications.map((spec, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-gray-100 rounded text-[11px] text-gray-700 font-medium"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-16 bg-[#0B192C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              Ready to Optimize Your Freight Logistics?
            </h3>
            <p className="mt-1 text-sm text-gray-300">
              Submit your cargo specifications for transparent, competitive rates across all modes.
            </p>
          </div>
          <Link
            to="/quote"
            className="px-8 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm rounded-xl transition-all shadow-xl"
          >
            Request Instant Quote
          </Link>
        </div>
      </section>
    </div>
  );
};
