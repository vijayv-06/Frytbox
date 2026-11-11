import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { QuoteForm } from '../components/QuoteForm';
import { ShieldCheck, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/companyData';

export const QuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') || 'ocean-freight';

  return (
    <div className="bg-gray-50 pt-24 min-h-screen">
      {/* Header */}
      <section className="bg-[#0B192C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] bg-blue-900/40 px-3.5 py-1.5 rounded-full border border-blue-700/30">
              Commercial Rate Desk
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-3 font-display">
              Request a Logistics Quotation
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              Get transparent spot or contract pricing for air, ocean, road, project cargo, and customs clearance. Quotes are reviewed by specialists at our Bengaluru headquarters.
            </p>
          </div>
        </div>
      </section>

      {/* Main Quote Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Quote Form Container */}
          <div className="lg:col-span-8">
            <QuoteForm initialService={serviceParam} />
          </div>

          {/* Right Sidebar Benefits & Direct Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#081426] font-display">
                What You Can Expect:
              </h3>
              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>
                    <strong>2-Hour Response SLA:</strong> Fast turnaround on scheduled commercial routes.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero Hidden Fees:</strong> Itemized breakdown of ocean/air freight, drayage, and customs filing fees.
                  </span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>
                    <strong>Multi-Modal Optimization:</strong> Alternate route recommendations to save transit time or cost.
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Commercial Helpline */}
            <div className="bg-[#0B192C] p-6 rounded-2xl text-white shadow-lg space-y-3">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#38BDF8]">
                <Phone className="h-4 w-4" />
                <span>Urgent or High-Volume Inquiries?</span>
              </div>
              <div className="text-sm font-bold">
                Call Our Freight Desk Directly
              </div>
              <div className="text-xl font-bold font-mono text-white">
                {COMPANY_PROFILE.headquarters.phone}
              </div>
              <div className="text-xs text-gray-300">
                Email:{' '}
                <a
                  href={`mailto:${COMPANY_PROFILE.headquarters.email}`}
                  className="text-[#38BDF8] font-semibold underline"
                >
                  {COMPANY_PROFILE.headquarters.email}
                </a>
              </div>
              <div className="text-[11px] text-gray-400 pt-2 border-t border-slate-800">
                Mon - Sat: 9:00 AM - 7:00 PM IST
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
