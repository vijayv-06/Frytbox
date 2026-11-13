import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  ChevronDown,
  ChevronRight,
  Plane,
  Ship,
  Truck,
  Compass,
  FileCheck,
  Boxes,
  ArrowRight,
  ShieldCheck,
  Home,
  Building2,
  Phone,
  Mail,
  Search,
  MessageSquare,
  Clock,
  CheckCircle2,
  Globe,
  Sparkles,
  PackageCheck,
} from 'lucide-react';
import { SERVICES_DATA, INDUSTRIES_DATA, COMPANY_PROFILE } from '../data/companyData';
import { TrackingResult } from '../types';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [industriesDropdown, setIndustriesDropdown] = useState(false);

  // Consignment Tracking Modal & Search State
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [isTrackingSearching, setIsTrackingSearching] = useState(false);

  const location = useLocation();
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const industriesDropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileIndustriesOpen(false);
    setServicesDropdown(false);
    setIndustriesDropdown(false);
    setTrackingModalOpen(false);
  }, [location.pathname]);

  // Lock background scroll when mobile menu or tracking modal is open
  useEffect(() => {
    if (mobileMenuOpen || trackingModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, trackingModalOpen]);

  // Handle clicks outside desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdown(false);
      }
      if (
        industriesDropdownRef.current &&
        !industriesDropdownRef.current.contains(event.target as Node)
      ) {
        setIndustriesDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setServicesDropdown(false);
        setIndustriesDropdown(false);
        setTrackingModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Quick Tracking Lookup Simulation
  const handlePerformTracking = (query?: string) => {
    const q = (query || trackingIdInput || '').trim();
    if (!q) return;

    setIsTrackingSearching(true);
    setTimeout(() => {
      const mockAir: TrackingResult = {
        trackingNumber: q.toUpperCase(),
        status: 'In Transit',
        origin: 'Bengaluru Kempegowda Intl (BLR), India',
        destination: 'Frankfurt Rhein-Main (FRA), Germany',
        carrier: 'Lufthansa Cargo / FRYTBOX Line 841',
        estimatedDelivery: 'Nov 18, 2026 • 16:30 CET',
        serviceType: 'Priority Air Freight Charter (Temperature-Controlled GDP)',
        currentLocation: 'Hub FRA Air Cargo Complex • Clearance Inbound',
        milestones: [
          {
            stage: 'Shipment Created & Export AWB Issued',
            location: 'Bengaluru Commercial Desk, IN',
            date: 'Nov 14, 2026',
            time: '09:15 IST',
            completed: true,
            current: false,
            description: 'Air Waybill filed with ICEGATE EDI customs clearance system.',
          },
          {
            stage: 'Received at Air Freight Consolidation Terminal',
            location: 'BLR Air Cargo Complex, Gate 4',
            date: 'Nov 14, 2026',
            time: '14:40 IST',
            completed: true,
            current: false,
            description: 'Barcode scanned, dimensioned, and unit load device (ULD) palletized.',
          },
          {
            stage: 'Export Customs Cleared & Aircraft Uplift',
            location: 'Kempegowda Intl Airport (BLR)',
            date: 'Nov 15, 2026',
            time: '02:10 IST',
            completed: true,
            current: false,
            description: 'Departed on Flight LH841. In-flight telemetry active.',
          },
          {
            stage: 'Arrived at Transshipment Hub & Inbound Clearance',
            location: 'Frankfurt Airport (FRA), DE',
            date: 'Nov 15, 2026',
            time: '11:25 CET',
            completed: true,
            current: true,
            description: 'Cargo unloaded and transferred to cold-chain pharmaceutical room.',
          },
          {
            stage: 'Final Mile Delivery to Consignee Facility',
            location: 'Industrial Park Kelsterbach, Germany',
            date: 'Nov 18, 2026',
            time: 'Expected 16:30 CET',
            completed: false,
            current: false,
            description: 'Dispatched via temperature-monitored dedicated GPS truck.',
          },
        ],
      };

      setTrackingResult(mockAir);
      setIsTrackingSearching(false);
      setTrackingModalOpen(true);
    }, 400);
  };

  const getServiceIcon = (name: string, className = 'h-5 w-5 text-[#2563EB]') => {
    switch (name) {
      case 'Plane':
        return <Plane className={className} />;
      case 'Ship':
        return <Ship className={className} />;
      case 'Truck':
        return <Truck className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'FileCheck':
        return <FileCheck className={className} />;
      case 'Boxes':
        return <Boxes className={className} />;
      default:
        return <ShieldCheck className={className} />;
    }
  };

  const isLinkActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getDesktopNavLinkClass = (path: string) => {
    const active = isLinkActive(path);
    if (active) {
      return isScrolled
        ? 'bg-blue-50 text-[#2563EB] font-bold shadow-sm border border-blue-100 px-3.5 py-2 rounded-xl transition-all'
        : 'bg-white/20 text-white font-bold backdrop-blur-md border border-white/30 shadow-sm px-3.5 py-2 rounded-xl transition-all';
    }
    return isScrolled
      ? 'text-gray-700 hover:text-[#2563EB] hover:bg-gray-100/80 px-3.5 py-2 rounded-xl font-medium transition-all duration-200'
      : 'text-gray-100 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-xl font-medium transition-all duration-200';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileMenuOpen
            ? 'bg-[#07162C] border-b border-slate-800 py-3 shadow-2xl'
            : isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
            : 'bg-gradient-to-b from-black/75 via-black/40 to-transparent py-3.5 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center space-x-3 group shrink-0"
            >
              <div className="h-10 sm:h-11 px-3 py-1.5 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100 transition-transform group-hover:scale-[1.02]">
                <img
                  src={`${import.meta.env.BASE_URL}frytbox-logo.png`}
                  alt="FRYTBOX Worldwide Logistics"
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
              <Link to="/" className={getDesktopNavLinkClass('/')}>
                Home
              </Link>

              {/* Services Dropdown (Click to toggle & Hover to open) */}
              <div
                ref={servicesDropdownRef}
                className="relative"
                onMouseEnter={() => setServicesDropdown(true)}
                onMouseLeave={() => setServicesDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesDropdown(!servicesDropdown)}
                  className={`${getDesktopNavLinkClass('/services')} inline-flex items-center space-x-1 cursor-pointer`}
                  aria-expanded={servicesDropdown}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`h-4 w-4 ml-0.5 opacity-80 transition-transform duration-200 ${
                      servicesDropdown ? 'rotate-180 text-[#2563EB]' : ''
                    }`}
                  />
                </button>

                {servicesDropdown && (
                  <div className="absolute left-0 mt-2 w-[650px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 grid grid-cols-2 gap-3 animate-fadeIn z-50">
                    {SERVICES_DATA.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services#${service.slug}`}
                        onClick={() => setServicesDropdown(false)}
                        className="flex items-start space-x-3 p-3 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all group"
                      >
                        <div className="p-2.5 rounded-xl bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors shadow-xs">
                          {getServiceIcon(service.iconName)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors truncate">
                            {service.title}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {service.shortDesc}
                          </div>
                        </div>
                      </Link>
                    ))}
                    <div className="col-span-2 pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-medium">
                        Multi-modal freight forwarding engineered for speed & reliability.
                      </span>
                      <Link
                        to="/services"
                        onClick={() => setServicesDropdown(false)}
                        className="text-[#2563EB] font-bold hover:underline inline-flex items-center space-x-1"
                      >
                        <span>All 6 Services</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Industries Dropdown (Click to toggle & Hover to open) */}
              <div
                ref={industriesDropdownRef}
                className="relative"
                onMouseEnter={() => setIndustriesDropdown(true)}
                onMouseLeave={() => setIndustriesDropdown(false)}
              >
                <button
                  type="button"
                  onClick={() => setIndustriesDropdown(!industriesDropdown)}
                  className={`${getDesktopNavLinkClass('/industries')} inline-flex items-center space-x-1 cursor-pointer`}
                  aria-expanded={industriesDropdown}
                >
                  <span>Industries</span>
                  <ChevronDown
                    className={`h-4 w-4 ml-0.5 opacity-80 transition-transform duration-200 ${
                      industriesDropdown ? 'rotate-180 text-[#2563EB]' : ''
                    }`}
                  />
                </button>

                {industriesDropdown && (
                  <div className="absolute left-0 mt-2 w-[440px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 space-y-2 animate-fadeIn z-50">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 pt-1">
                      Target Industry Solutions
                    </div>
                    {INDUSTRIES_DATA.map((industry) => (
                      <Link
                        key={industry.id}
                        to={`/industries#${industry.slug}`}
                        onClick={() => setIndustriesDropdown(false)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all group"
                      >
                        <div>
                          <div className="text-sm font-bold text-gray-900 group-hover:text-[#2563EB] transition-colors">
                            {industry.title}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {industry.subtitle}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-gray-100 flex justify-end">
                      <Link
                        to="/industries"
                        onClick={() => setIndustriesDropdown(false)}
                        className="text-xs text-[#2563EB] font-bold hover:underline inline-flex items-center space-x-1"
                      >
                        <span>Explore all specialized sectors</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/about" className={getDesktopNavLinkClass('/about')}>
                About Us
              </Link>

              <Link to="/contact" className={getDesktopNavLinkClass('/contact')}>
                Contact
              </Link>
            </nav>

            {/* Desktop Right Actions: Quick Track Consignment + Primary Quote Button */}
            <div className="hidden lg:flex items-center space-x-2.5">
              <button
                type="button"
                onClick={() => setTrackingModalOpen(true)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  isScrolled
                    ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200'
                    : 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/25 shadow-sm'
                }`}
                title="Track Air Waybill, Ocean Bill of Lading, or Reference #"
              >
                <Search className="h-3.5 w-3.5 text-[#38BDF8]" />
                <span>Track Cargo</span>
              </button>

              <Link
                to="/quote"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] transition-all shadow-md hover:shadow-blue-600/30 flex items-center space-x-1.5 active:scale-95"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile Header Right: Quick Action Pill + Animated Hamburger Toggle */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                type="button"
                onClick={() => setTrackingModalOpen(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 backdrop-blur-md flex items-center space-x-1 active:scale-95 transition-all"
              >
                <Search className="h-3 w-3 text-[#38BDF8]" />
                <span>Track</span>
              </button>

              <Link
                to="/quote"
                onClick={closeMobileMenu}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-sm flex items-center space-x-1 active:scale-95 transition-all"
              >
                <span>Quote</span>
                <ArrowRight className="h-3 w-3" />
              </Link>

              {/* Modern Animated 3-Bar Morphing Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`relative w-10 h-10 rounded-xl flex flex-col items-center justify-center space-y-1.5 transition-all duration-300 ${
                  mobileMenuOpen
                    ? 'bg-blue-600/25 text-[#38BDF8] ring-1 ring-[#38BDF8]/40 shadow-lg'
                    : isScrolled
                    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    : 'bg-white/15 text-white backdrop-blur-md border border-white/20 hover:bg-white/25'
                }`}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <span
                  className={`w-5 h-0.5 rounded-full transition-all duration-300 ease-in-out ${
                    mobileMenuOpen
                      ? 'rotate-45 translate-y-2 bg-[#38BDF8]'
                      : isScrolled
                      ? 'bg-gray-800'
                      : 'bg-white'
                  }`}
                />
                <span
                  className={`w-5 h-0.5 rounded-full transition-all duration-200 ease-in-out ${
                    mobileMenuOpen
                      ? 'opacity-0 scale-x-0 bg-[#38BDF8]'
                      : isScrolled
                      ? 'bg-gray-800'
                      : 'bg-white'
                  }`}
                />
                <span
                  className={`w-5 h-0.5 rounded-full transition-all duration-300 ease-in-out ${
                    mobileMenuOpen
                      ? '-rotate-45 -translate-y-2 bg-[#38BDF8]'
                      : isScrolled
                      ? 'bg-gray-800'
                      : 'bg-white'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* High-Impact Responsive Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#07162C]/98 backdrop-blur-2xl border-t border-slate-800/90 shadow-2xl text-white max-h-[calc(100vh-68px)] overflow-y-auto animate-fadeIn">
            <div className="px-4 sm:px-6 pt-4 pb-8 space-y-4">
              {/* Quick Consignment Tracking Search Card */}
              <div className="bg-gradient-to-r from-blue-900/40 to-slate-900/60 border border-blue-500/20 rounded-2xl p-3.5 shadow-lg">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-300 mb-2">
                  <span className="flex items-center space-x-1.5 text-white">
                    <Search className="h-3.5 w-3.5 text-[#38BDF8]" />
                    <span>Quick Consignment Tracking</span>
                  </span>
                  <span className="text-[10px] text-[#38BDF8] bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30 font-mono">
                    AWB • B/L • Container
                  </span>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (trackingIdInput.trim()) {
                      handlePerformTracking();
                    }
                  }}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="text"
                    value={trackingIdInput}
                    onChange={(e) => setTrackingIdInput(e.target.value)}
                    placeholder="e.g. FRYT-882910 or AWB"
                    className="flex-1 bg-black/40 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#38BDF8]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all flex items-center space-x-1 shrink-0 active:scale-95 cursor-pointer"
                  >
                    <span>Track</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </form>
              </div>

              {/* Primary Navigation Cards */}
              <div className="space-y-1.5">
                {/* Home */}
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                    location.pathname === '/'
                      ? 'bg-[#2563EB]/25 text-[#38BDF8] font-semibold border-l-4 border-[#38BDF8] shadow-inner'
                      : 'text-gray-200 hover:text-white hover:bg-white/5 font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-white/10 text-[#38BDF8]">
                      <Home className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Home</div>
                      <div className="text-[11px] text-gray-400">Global freight network & headquarters</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>

                {/* Services with 2-Column Mode Grid Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                      location.pathname.startsWith('/services')
                        ? 'bg-[#2563EB]/25 text-[#38BDF8] font-semibold border-l-4 border-[#38BDF8]'
                        : 'text-gray-200 hover:text-white hover:bg-white/5 font-medium'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-white/10 text-[#38BDF8]">
                        <Boxes className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold">Logistics Services</span>
                          <span className="text-[10px] font-bold bg-[#2563EB]/40 text-[#38BDF8] px-2 py-0.5 rounded-full border border-blue-500/30">
                            6 Modes
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-400">Air, Ocean, Road, Customs & FTWZ</div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 opacity-70 transition-transform duration-200 ${
                        mobileServicesOpen ? 'rotate-180 text-[#38BDF8]' : ''
                      }`}
                    />
                  </button>

                  {mobileServicesOpen && (
                    <div className="pt-2 pb-1 space-y-2 animate-fadeIn pl-2">
                      <div className="grid grid-cols-2 gap-2">
                        {SERVICES_DATA.map((service) => (
                          <Link
                            key={service.id}
                            to={`/services#${service.slug}`}
                            onClick={closeMobileMenu}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex flex-col justify-between group active:scale-95"
                          >
                            <div className="p-1.5 rounded-lg bg-blue-500/20 text-[#38BDF8] w-fit mb-1.5 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                              {getServiceIcon(service.iconName, 'h-4 w-4')}
                            </div>
                            <div className="text-xs font-bold text-gray-200 group-hover:text-white line-clamp-1">
                              {service.title}
                            </div>
                            <div className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">
                              {service.shortDesc}
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link
                        to="/services"
                        onClick={closeMobileMenu}
                        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#38BDF8] hover:underline px-2 py-1"
                      >
                        <span>View complete service breakdown</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Industries with Sector Chips Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                      location.pathname.startsWith('/industries')
                        ? 'bg-[#2563EB]/25 text-[#38BDF8] font-semibold border-l-4 border-[#38BDF8]'
                        : 'text-gray-200 hover:text-white hover:bg-white/5 font-medium'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-white/10 text-[#38BDF8]">
                        <Compass className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-semibold">Industries & Sectors</span>
                        <div className="text-[11px] text-gray-400">Tailored vertical supply chains</div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 opacity-70 transition-transform duration-200 ${
                        mobileIndustriesOpen ? 'rotate-180 text-[#38BDF8]' : ''
                      }`}
                    />
                  </button>

                  {mobileIndustriesOpen && (
                    <div className="pt-2 pb-1 space-y-2 animate-fadeIn pl-2">
                      <div className="grid grid-cols-2 gap-1.5">
                        {INDUSTRIES_DATA.map((industry) => (
                          <Link
                            key={industry.id}
                            to={`/industries#${industry.slug}`}
                            onClick={closeMobileMenu}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-gray-300 hover:text-white flex items-center space-x-2 transition-all active:scale-95"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] shrink-0" />
                            <span className="truncate">{industry.title}</span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        to="/industries"
                        onClick={closeMobileMenu}
                        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#38BDF8] hover:underline px-2 py-1"
                      >
                        <span>Explore all industry case studies</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* About Us */}
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                    location.pathname === '/about'
                      ? 'bg-[#2563EB]/25 text-[#38BDF8] font-semibold border-l-4 border-[#38BDF8]'
                      : 'text-gray-200 hover:text-white hover:bg-white/5 font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-white/10 text-[#38BDF8]">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">About Us</div>
                      <div className="text-[11px] text-gray-400">Corporate leadership & global footprint</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>

                {/* Contact */}
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                    location.pathname === '/contact'
                      ? 'bg-[#2563EB]/25 text-[#38BDF8] font-semibold border-l-4 border-[#38BDF8]'
                      : 'text-gray-200 hover:text-white hover:bg-white/5 font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-white/10 text-[#38BDF8]">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Contact & Support</div>
                      <div className="text-[11px] text-gray-400">24/7 Operations Desk • Bengaluru HQ</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              </div>

              {/* High-Conversion Action Button */}
              <div className="pt-2">
                <Link
                  to="/quote"
                  onClick={closeMobileMenu}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] flex items-center justify-center space-x-2.5 shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98]"
                >
                  <Sparkles className="h-4 w-4 text-blue-200" />
                  <span>Request Instant Freight Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Direct Multi-Channel Operations Hotlines */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2.5">
                  <span className="flex items-center space-x-1.5 font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400">24/7 Operations Command</span>
                  </span>
                  <span className="text-slate-400 font-mono">BENGALURU HQ</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={`tel:${COMPANY_PROFILE.headquarters.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 transition-colors active:scale-95 text-center"
                  >
                    <Phone className="h-4 w-4 text-[#38BDF8] mb-1" />
                    <span className="text-[11px]">Call Desk</span>
                  </a>

                  <a
                    href={`https://wa.me/918041234567?text=Hello%20FRYTBOX%20Logistics%20Team%2C%20I%20would%20like%20to%20inquire%20about%20freight%20services.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 transition-colors active:scale-95 text-center"
                  >
                    <MessageSquare className="h-4 w-4 text-emerald-400 mb-1" />
                    <span className="text-[11px]">WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${COMPANY_PROFILE.headquarters.email}`}
                    className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 transition-colors active:scale-95 text-center"
                  >
                    <Mail className="h-4 w-4 text-[#38BDF8] mb-1" />
                    <span className="text-[11px]">Email Us</span>
                  </a>
                </div>
              </div>

              {/* Certifications and Compliance Banner */}
              <div className="pt-2 text-center text-[10px] text-slate-400 tracking-wider uppercase font-semibold flex items-center justify-center space-x-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#38BDF8]" />
                <span>IATA CARGO • FIATA • FMC COMPLIANT • AEO CERTIFIED</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay when mobile menu is active */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Global Interactive Consignment Tracking Modal */}
      {trackingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0B192C] border border-slate-700/80 rounded-2xl shadow-2xl text-white overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#07162C]">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-[#38BDF8] border border-blue-500/30">
                  <PackageCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <span>Live Consignment Track & Trace</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Real-time GPS & EDI telemetry for Air, Ocean, and Inland freight
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTrackingModalOpen(false)}
                className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close tracking modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Search Bar Inside Modal */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePerformTracking();
                }}
                className="flex items-center space-x-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={trackingIdInput}
                    onChange={(e) => setTrackingIdInput(e.target.value)}
                    placeholder="Enter Air Waybill (AWB), Ocean B/L, or FRYT-XXXXX"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-slate-700 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isTrackingSearching}
                  className="px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-bold transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                >
                  {isTrackingSearching ? 'Locating...' : 'Track Cargo'}
                </button>
              </form>

              {/* Sample Quick Demo Tags */}
              <div className="flex items-center space-x-2 text-xs text-gray-400 flex-wrap gap-y-1">
                <span className="text-[11px] font-medium">Quick Demo References:</span>
                <button
                  type="button"
                  onClick={() => {
                    setTrackingIdInput('FRYT-882910');
                    handlePerformTracking('FRYT-882910');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#38BDF8] text-[11px] font-mono transition-colors cursor-pointer"
                >
                  FRYT-882910 (Air Express)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTrackingIdInput('FRYT-449102');
                    handlePerformTracking('FRYT-449102');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#38BDF8] text-[11px] font-mono transition-colors cursor-pointer"
                >
                  FRYT-449102 (Ocean FCL)
                </button>
              </div>

              {/* Live Tracking Status Result Display */}
              {trackingResult && (
                <div className="space-y-5 animate-fadeIn">
                  {/* Status Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/70 to-slate-900/90 border border-blue-500/30">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                          Reference ID
                        </div>
                        <div className="text-base font-extrabold text-[#38BDF8] font-mono">
                          {trackingResult.trackingNumber}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-[#38BDF8] border border-blue-500/40">
                          <span className="h-2 w-2 rounded-full bg-[#38BDF8] animate-ping" />
                          <span>{trackingResult.status}</span>
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-gray-400">Origin Hub:</div>
                        <div className="font-semibold text-white mt-0.5">{trackingResult.origin}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Destination Hub:</div>
                        <div className="font-semibold text-white mt-0.5">{trackingResult.destination}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Operating Carrier / Flight:</div>
                        <div className="font-semibold text-white mt-0.5">{trackingResult.carrier}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Estimated Delivery:</div>
                        <div className="font-semibold text-emerald-400 mt-0.5">{trackingResult.estimatedDelivery}</div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Milestones Timeline */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center space-x-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#38BDF8]" />
                      <span>Consignment Milestone Telemetry</span>
                    </h4>

                    <div className="space-y-4 pl-2 border-l-2 border-slate-700 ml-3">
                      {trackingResult.milestones.map((m, idx) => (
                        <div key={idx} className="relative pl-5">
                          {/* Dot Indicator */}
                          <div
                            className={`absolute -left-[11px] top-1 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                              m.completed
                                ? 'bg-blue-600 border-white text-white'
                                : m.current
                                ? 'bg-emerald-500 border-white text-white animate-pulse'
                                : 'bg-slate-800 border-slate-600 text-transparent'
                            }`}
                          >
                            {m.completed && <CheckCircle2 className="h-3 w-3" />}
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                            <span
                              className={`font-bold ${
                                m.current ? 'text-[#38BDF8]' : m.completed ? 'text-white' : 'text-gray-400'
                              }`}
                            >
                              {m.stage}
                            </span>
                            <span className="text-[11px] text-gray-400 font-mono">
                              {m.date} • {m.time}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-300 mt-0.5">
                            {m.location}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-1">
                            {m.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Default Welcome Helper if no search performed yet */}
              {!trackingResult && !isTrackingSearching && (
                <div className="py-8 text-center space-y-3">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 text-[#38BDF8] flex items-center justify-center mx-auto">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Enter Your Cargo Reference Number Above
                  </h4>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">
                    Track international ocean container numbers (e.g. MSKU, MAEU), master air waybills (MAWB), or FRYTBOX proprietary shipment references with instantaneous status.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-800 bg-[#07162C] flex items-center justify-between text-xs">
              <span className="text-gray-400">
                Need urgent cargo status escalation?
              </span>
              <a
                href={`tel:${COMPANY_PROFILE.headquarters.phone.replace(/[^0-9+]/g, '')}`}
                className="text-[#38BDF8] font-bold hover:underline inline-flex items-center space-x-1"
              >
                <span>Call 24/7 Desk ({COMPANY_PROFILE.headquarters.phone})</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
