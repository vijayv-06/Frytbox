import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Globe,
  Film,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  TrendingUp,
  Cpu,
  Award,
} from 'lucide-react';
import { COMPANY_PROFILE } from '../data/companyData';

export const AboutPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="bg-white pt-24">
      {/* Page Header */}
      <section className="bg-[#0B192C] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] bg-blue-900/40 px-3.5 py-1.5 rounded-full border border-blue-700/30">
              Corporate Overview & Profile
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-4 font-display text-white">
              About FRYTBOX Worldwide
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-200 leading-relaxed font-normal">
              Simplifying global trade for your business — moving goods however big or small with reliability, speed, and precision.
            </p>
          </div>
        </div>
      </section>

      {/* Core Presentation Story */}
      <section className="py-20 bg-white text-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                Our Mission & Values
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081426] font-display">
                Our Values Guide How We Deliver
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                At <strong>FRYTBOX WORLDWIDE LOGISTICS PRIVATE LIMITED</strong>, we are here to help simplify global trade for your business, moving your goods — however big or small — to the places they need to be. We partner with you, listen to your needs, and take action, connecting and collaborating with our network and partners across the whole journey, so you can focus on running your business with successful deliveries.
              </p>
              <p className="text-base text-gray-700 leading-relaxed">
                With flexibility, transparency, and on-ground expertise anywhere you need it, FRYTBOX Freight Forwarding is the better way to get your goods from <strong>factory floor to customer door — across countries</strong>. Built on our comprehensive network of freight forwarding, international transportations, and deep logistics experience, we accelerate trade to help you grow.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="text-sm font-bold text-[#081426] mb-1">
                    Transparent Pricing
                  </div>
                  <div className="text-xs text-gray-600">
                    No hidden terminal surcharges or unexpected detention costs.
                  </div>
                </div>
                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="text-sm font-bold text-[#081426] mb-1">
                    ICEGATE Synchronized
                  </div>
                  <div className="text-xs text-gray-600">
                    Direct automated customs filings and regulatory verification.
                  </div>
                </div>
              </div>
            </div>

            {/* Video Player */}
            <div className="lg:col-span-5">
              <div className="bg-[#0B192C] p-5 rounded-2xl shadow-xl border border-slate-800 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Film className="h-4 w-4 text-[#38BDF8]" />
                    <span className="text-xs font-semibold text-gray-200">Company Overview</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Frytbox11.mp4</span>
                </div>

                <div className="relative rounded-xl overflow-hidden aspect-video bg-black group">
                  <video
                    ref={videoRef}
                    src={`${import.meta.env.BASE_URL}videos/Frytbox11.mp4`}
                    poster={`${import.meta.env.BASE_URL}videos/frytbox-thumb.jpg`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={togglePlay}
                    playsInline
                  />

                  {!isPlaying && (
                    <div
                      onClick={togglePlay}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                    >
                      <div className="h-14 w-14 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 ml-0.5" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-2 right-2 flex items-center space-x-1.5 bg-black/60 px-2.5 py-1 rounded-md text-xs">
                    <button onClick={togglePlay} className="p-1 hover:text-[#38BDF8]">
                      {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </button>
                    <button onClick={toggleMute} className="p-1 hover:text-[#38BDF8]">
                      {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-400" />}
                    </button>
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-300 leading-relaxed">
                  FRYTBOX connects international factory floors to customer doors with seamless air, sea, and land logistics.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IT System Real-Time Visibility */}
      <section className="py-20 bg-[#F8FAFC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                Technology & Infrastructure
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#081426] mt-2 font-display">
                Digital Systems & Milestone Visibility
              </h2>
              <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                We use modern digital tools for freight forwarding, providing complete shipment visibility, automated alerts, and predictable scheduling.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    <strong>Smart Visibility:</strong> Automated alerts for customs clearance status, port berthing, transshipment, and inland haulage.
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    <strong>Warehouse Management Systems (WMS):</strong> Real-time SKU tracking, FTWZ integration, and barcoded order fulfillment.
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    <strong>Direct ICEGATE EDI Connectivity:</strong> Pre-clearance customs filing with zero document lag.
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#0B192C] p-8 rounded-2xl text-white shadow-xl">
              <h3 className="text-xl font-bold font-display mb-4 text-white">
                Corporate Headquarters & Regulatory Standing
              </h3>
              <div className="space-y-3 text-xs text-gray-300">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <strong className="text-white block mb-0.5">Corporate Entity</strong>
                  FRYTBOX WORLDWIDE LOGISTICS PRIVATE LIMITED
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <strong className="text-white block mb-0.5">Global Corporate Office</strong>
                  No 5AC, 961, 2nd Floor, HRBR Layout 1st Block, Bank Avenue Colony, Banaswadi, Bengaluru, Karnataka 560043, India
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                  <strong className="text-white block mb-0.5">Corporate Email & Web</strong>
                  info@frytbox.com • www.frytbox.com
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  to="/quote"
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Request a Quote
                </Link>
                <Link
                  to="/contact"
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
