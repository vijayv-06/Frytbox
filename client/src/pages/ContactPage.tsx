import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react';
import { COMPANY_PROFILE } from '../data/companyData';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-50 pt-24 min-h-screen">
      {/* Header */}
      <section className="bg-[#0B192C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] bg-blue-900/40 px-3.5 py-1.5 rounded-full border border-blue-700/30">
              Global Support & Inquiries
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-3 font-display text-white">
              Contact FRYTBOX Worldwide
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              We come up with the right integrated logistics solution for every requirement across the globe. Get in touch with our team at the Bengaluru Global Corporate Office.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details & Office Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Corporate Headquarters
                </span>
                <h3 className="text-xl font-bold text-[#081426] mt-1 font-display">
                  {COMPANY_PROFILE.legalName}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-gray-900 font-semibold mb-0.5">Address:</strong>
                    <span>{COMPANY_PROFILE.headquarters.address}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#2563EB] shrink-0" />
                  <div>
                    <strong className="block text-gray-900 font-semibold mb-0.5">Corporate Email:</strong>
                    <a
                      href={`mailto:${COMPANY_PROFILE.headquarters.email}`}
                      className="text-[#2563EB] hover:underline font-medium"
                    >
                      {COMPANY_PROFILE.headquarters.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#2563EB] shrink-0" />
                  <div>
                    <strong className="block text-gray-900 font-semibold mb-0.5">Customer Support:</strong>
                    <a
                      href={`tel:${COMPANY_PROFILE.headquarters.phone}`}
                      className="hover:underline font-medium text-gray-900"
                    >
                      {COMPANY_PROFILE.headquarters.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500 shrink-0" />
                  <div>
                    <strong className="block text-gray-900 font-semibold mb-0.5">Working Hours:</strong>
                    <span>{COMPANY_PROFILE.headquarters.workingHours}</span>
                  </div>
                </div>
              </div>

              {/* Map embed / visual container */}
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100 h-44 relative flex items-center justify-center text-center p-4">
                <div className="space-y-1">
                  <Building2 className="h-8 w-8 text-[#2563EB] mx-auto" />
                  <div className="text-xs font-bold text-[#081426]">
                    FRYTBOX Corporate Office
                  </div>
                  <div className="text-[11px] text-gray-500">
                    HRBR Layout 1st Block, Banaswadi, Bengaluru
                  </div>
                  <a
                    href="https://maps.google.com/?q=HRBR+Layout+1st+Block+Banaswadi+Bengaluru+560043"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-xs font-semibold text-[#2563EB] hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
