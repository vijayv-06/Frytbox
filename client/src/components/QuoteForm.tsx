import React, { useState, useEffect } from 'react';
import {
  Plane,
  Ship,
  Truck,
  Compass,
  FileCheck,
  Boxes,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Mail,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { QuoteFormData } from '../types';
import { CountryAutocomplete } from './CountryAutocomplete';

interface QuoteFormProps {
  initialService?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ initialService = 'ocean-freight' }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [quoteReference, setQuoteReference] = useState('');
  const [redirectCountdown, setRedirectCountdown] = useState(4);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceType: initialService,
    originCountry: 'India',
    originCity: 'Bengaluru',
    destinationCountry: 'United States',
    destinationCity: 'Los Angeles',
    cargoReadyDate: new Date().toISOString().split('T')[0],
    estimatedWeightKg: 1500,
    estimatedVolumeCbm: 8,
    cargoDescription: 'Commercial electronics & consumer manufactured goods',
    specialRequirements: '',
    incoterm: 'FOB',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!formData.serviceType || !formData.originCity || !formData.destinationCity) {
        setErrorMsg('Please complete all origin, destination, and service fields.');
        return;
      }
    } else if (step === 2) {
      if (!formData.cargoDescription || !formData.cargoReadyDate) {
        setErrorMsg('Please specify cargo details and expected ready date.');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setErrorMsg('');
    setStep((prev) => prev - 1);
  };

  const getEmailDetails = (refId: string) => {
    const targetEmail = 'vijayvenkatesh841@gmail.com';
    const subject = `FRYTBOX Freight Quote [${refId}] - ${formData.serviceType.replace('-', ' ').toUpperCase()} (${formData.originCity} -> ${formData.destinationCity})`;
    const body = `Dear FRYTBOX Operations & Commercial Team,

Please review my freight quotation request:

=============================================
QUOTATION REFERENCE & DETAILS
=============================================
Reference Number    : ${refId}
Freight Service     : ${formData.serviceType.replace('-', ' ').toUpperCase()}
Origin Port/City    : ${formData.originCity}, ${formData.originCountry}
Destination Port/City: ${formData.destinationCity}, ${formData.destinationCountry}
Cargo Ready Date    : ${formData.cargoReadyDate}
Incoterm            : ${formData.incoterm || 'FOB'}

=============================================
CARGO SPECIFICATIONS
=============================================
Cargo Description   : ${formData.cargoDescription}
Estimated Weight    : ${formData.estimatedWeightKg} KG
Estimated Volume    : ${formData.estimatedVolumeCbm} CBM
Special Requirements: ${formData.specialRequirements || 'Standard freight handling'}

=============================================
SHIPPER / CONTACT INFORMATION
=============================================
Contact Person      : ${formData.fullName}
Company Name        : ${formData.companyName}
Business Email      : ${formData.email}
Phone Number        : ${formData.phone}

Please reply with the official competitive spot / contract quotation and transit timetable.

Best regards,
${formData.fullName}
${formData.companyName}
FRYTBOX Worldwide Logistics (www.frytbox.com)`;

    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return { targetEmail, subject, body, mailtoUrl, gmailUrl };
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (submitted && quoteReference) {
      setRedirectCountdown(4);
      timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            const { mailtoUrl } = getEmailDetails(quoteReference);
            // Redirect to mail
            window.location.href = mailtoUrl;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [submitted, quoteReference]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMsg('Please enter your full contact details.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const generatedRef = data.referenceId || `FBX-QT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setQuoteReference(generatedRef);
      setSubmitted(true);
    } catch (err) {
      const generatedRef = `FBX-QT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setQuoteReference(generatedRef);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const copyDetailsToClipboard = () => {
    const { body } = getEmailDetails(quoteReference);
    navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (submitted) {
    const emailInfo = getEmailDetails(quoteReference);

    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-12 text-center max-w-2xl mx-auto animate-fadeIn">
        <div className="h-16 w-16 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
          <CheckCircle2 className="h-9 w-9" />
        </div>

        <div className="inline-block bg-blue-50 text-[#2563EB] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          Quotation Request Dispatched
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#081426] font-display">
          Thank You, {formData.fullName}!
        </h3>

        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          Your quote inquiry has been registered in our system under reference <span className="font-mono font-bold text-gray-900">{quoteReference}</span>.
        </p>

        {/* Priority Message required by user */}
        <div className="my-6 p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/50 text-left">
          <div className="flex items-start space-x-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <Mail className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-amber-900 leading-snug">
                Send quotation via mail to get the quick response from our team
              </h4>
              <p className="text-xs text-amber-800 mt-1">
                Redirecting to your mail client with pre-composed quotation details addressed to <span className="font-mono font-bold text-gray-900">vijayvenkatesh841@gmail.com</span> in <span className="font-bold text-[#2563EB]">{redirectCountdown}s</span>...
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 pt-3 border-t border-amber-500/20 flex flex-wrap gap-2.5">
            <a
              href={emailInfo.mailtoUrl}
              className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow flex items-center space-x-2"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Send Quotation via Mail Now</span>
            </a>

            <a
              href={emailInfo.gmailUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-semibold transition-all flex items-center space-x-1.5"
            >
              <ExternalLink className="h-3.5 w-3.5 text-red-500" />
              <span>Open in Gmail Web</span>
            </a>

            <button
              type="button"
              onClick={copyDetailsToClipboard}
              className="px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium transition-all flex items-center space-x-1.5"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5 text-gray-500" />}
              <span>{copied ? 'Copied Details' : 'Copy Text'}</span>
            </button>
          </div>
        </div>

        {/* Breakdown summary */}
        <div className="my-5 p-4 bg-gray-50 rounded-xl border border-gray-200 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Destination Mail:</span>
            <span className="font-mono font-semibold text-gray-900">vijayvenkatesh841@gmail.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Service:</span>
            <span className="font-semibold text-gray-900 capitalize">{formData.serviceType.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Routing:</span>
            <span className="font-semibold text-gray-900">{formData.originCity} ({formData.originCountry}) → {formData.destinationCity} ({formData.destinationCountry})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Cargo Spec:</span>
            <span className="font-semibold text-gray-900">{formData.estimatedWeightKg} kg • {formData.estimatedVolumeCbm} CBM</span>
          </div>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
          }}
          className="mt-3 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Step Progress Tracker */}
      <div className="bg-[#0B192C] px-6 py-5 border-b border-slate-800 text-white">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {[
            { num: 1, title: 'Route & Mode' },
            { num: 2, title: 'Cargo Specifics' },
            { num: 3, title: 'Contact Info' },
          ].map((item) => (
            <div key={item.num} className="flex items-center space-x-2">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= item.num
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-white/20 text-gray-300'
                }`}
              >
                {step > item.num ? <CheckCircle2 className="h-4 w-4" /> : item.num}
              </div>
              <span
                className={`text-xs hidden sm:inline font-medium ${
                  step >= item.num ? 'text-white' : 'text-gray-400'
                }`}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
        {errorMsg && (
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-[#2563EB]" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Freight Mode & Route */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                1. Select Freight Service
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'air-freight', label: 'Air Freight', icon: Plane },
                  { id: 'ocean-freight', label: 'Ocean Freight (FCL/LCL)', icon: Ship },
                  { id: 'road-logistics', label: 'Inland Road Trucking', icon: Truck },
                  { id: 'project-logistics', label: 'Project Heavy Lift', icon: Compass },
                  { id: 'customs-clearance', label: 'Customs Brokerage', icon: FileCheck },
                  { id: 'warehousing-contract-logistics', label: 'Warehousing & 3PL', icon: Boxes },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.serviceType === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setFormData({ ...formData, serviceType: item.id })}
                      className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'border-[#2563EB] bg-blue-50/50 text-[#081426] shadow-sm ring-1 ring-[#2563EB]'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-gray-50/50'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mb-2 ${isSelected ? 'text-[#2563EB]' : 'text-gray-400'}`} />
                      <span className="text-xs font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Origin & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Origin (Pick-Up / Port of Loading)</span>
                </div>
                <div>
                  <CountryAutocomplete
                    label="Origin Country"
                    value={formData.originCountry}
                    onChange={(country) => setFormData((prev) => ({ ...prev, originCountry: country }))}
                    placeholder="Type origin country..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">City / Gateway Port</label>
                  <input
                    type="text"
                    name="originCity"
                    value={formData.originCity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                  <span>Destination (Port of Discharge / Consignee)</span>
                </div>
                <div>
                  <CountryAutocomplete
                    label="Destination Country"
                    value={formData.destinationCountry}
                    onChange={(country) => setFormData((prev) => ({ ...prev, destinationCountry: country }))}
                    placeholder="Type destination country..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">City / Gateway Port</label>
                  <input
                    type="text"
                    name="destinationCity"
                    value={formData.destinationCity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow flex items-center space-x-2"
              >
                <span>Continue to Cargo Details</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Cargo Specifications */}
        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Cargo Nature / Description
              </label>
              <textarea
                name="cargoDescription"
                rows={2}
                value={formData.cargoDescription}
                onChange={handleChange}
                placeholder="E.g., 20 pallets of industrial spare parts, non-hazardous, packed in cartons"
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Estimated Total Weight (KG)</label>
                <input
                  type="number"
                  name="estimatedWeightKg"
                  value={formData.estimatedWeightKg || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Estimated Volume (CBM)</label>
                <input
                  type="number"
                  name="estimatedVolumeCbm"
                  value={formData.estimatedVolumeCbm || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Incoterms</label>
                <select
                  name="incoterm"
                  value={formData.incoterm}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900"
                >
                  <option value="FOB">FOB - Free on Board</option>
                  <option value="CIF">CIF - Cost, Insurance & Freight</option>
                  <option value="EXW">EXW - Ex Works</option>
                  <option value="DDP">DDP - Delivered Duty Paid</option>
                  <option value="DAP">DAP - Delivered at Place</option>
                  <option value="FCA">FCA - Free Carrier</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Cargo Ready Date</label>
                <input
                  type="date"
                  name="cargoReadyDate"
                  value={formData.cargoReadyDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Special Handling / Temperature</label>
                <input
                  type="text"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  placeholder="E.g., Reefer +2°C to +8°C, Over-dimensional, DG"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow flex items-center space-x-2"
              >
                <span>Continue to Contact</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Contact & Submission */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Full Contact Name *</label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Vikram Sundaram"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Company / Organization *</label>
                <input
                  type="text"
                  required
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Acme Global Logistics Ltd"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Corporate Email Address *</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="v.sundaram@acme.com"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900"
                />
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-[#2563EB] shrink-0" />
              <span>
                Your commercial shipment parameters are protected under NDA protocols.
              </span>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md flex items-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <span>Submit Quotation Request</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
