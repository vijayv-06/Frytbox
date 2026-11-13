import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
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
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { SERVICES_DATA, INDUSTRIES_DATA, COMPANY_PROFILE } from '../data/companyData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [industriesDropdown, setIndustriesDropdown] = useState(false);

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
  }, [location.pathname]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        ? 'bg-blue-50/90 text-[#1D4ED8] font-semibold shadow-xs border border-blue-200/60 px-3.5 py-1.5 rounded-lg text-sm transition-all'
        : 'bg-white/15 text-white font-semibold backdrop-blur-md border border-white/25 shadow-xs px-3.5 py-1.5 rounded-lg text-sm transition-all';
    }
    return isScrolled
      ? 'text-slate-700 hover:text-[#1D4ED8] hover:bg-slate-100/70 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150'
      : 'text-slate-200 hover:text-white hover:bg-white/10 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          mobileMenuOpen
            ? 'bg-[#07162C] border-b border-slate-800 py-3 shadow-2xl'
            : isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-2.5 sm:py-3'
            : 'bg-gradient-to-b from-black/80 via-black/45 to-transparent py-3 sm:py-4.5'
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
              <div className="h-10 sm:h-11 px-3 py-1.5 bg-white rounded-xl shadow-xs flex items-center justify-center border border-slate-200/60 transition-transform group-hover:scale-[1.02]">
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

              {/* Services Dropdown */}
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
                    className={`h-4 w-4 ml-0.5 opacity-75 transition-transform duration-200 ${
                      servicesDropdown ? 'rotate-180 text-[#2563EB]' : ''
                    }`}
                  />
                </button>

                {servicesDropdown && (
                  <div className="absolute left-0 mt-2 w-[650px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 grid grid-cols-2 gap-3 animate-fadeIn z-50">
                    {SERVICES_DATA.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services#${service.slug}`}
                        onClick={() => setServicesDropdown(false)}
                        className="flex items-start space-x-3 p-3 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all group"
                      >
                        <div className="p-2.5 rounded-xl bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors shadow-xs shrink-0">
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

              {/* Industries Dropdown */}
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
                    className={`h-4 w-4 ml-0.5 opacity-75 transition-transform duration-200 ${
                      industriesDropdown ? 'rotate-180 text-[#2563EB]' : ''
                    }`}
                  />
                </button>

                {industriesDropdown && (
                  <div className="absolute left-0 mt-2 w-[440px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 space-y-1.5 animate-fadeIn z-50">
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

            {/* Desktop Right Actions: Commercial Hotline + Primary Quote CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href={`tel:${COMPANY_PROFILE.headquarters.phone.replace(/[^0-9+]/g, '')}`}
                className={`hidden xl:inline-flex items-center space-x-2 text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
                title="Direct Commercial Operations Desk"
              >
                <Phone className="h-3.5 w-3.5 text-blue-500" />
                <span>{COMPANY_PROFILE.headquarters.phone}</span>
              </a>

              <Link
                to="/quote"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] transition-all shadow-sm hover:shadow-blue-600/30 flex items-center space-x-1.5 active:scale-95"
              >
                <span>Request a Quote</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile Header Right: Quote Action Pill + Animated Hamburger Toggle */}
            <div className="flex lg:hidden items-center space-x-2.5">
              <Link
                to="/quote"
                onClick={closeMobileMenu}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-sm flex items-center space-x-1 active:scale-95 transition-all"
              >
                <span>Quote</span>
                <ArrowRight className="h-3 w-3" />
              </Link>

              {/* Modern Animated 3-Bar Hamburger Button */}
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

        {/* Professional Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#07162C]/98 backdrop-blur-2xl border-t border-slate-800/90 shadow-2xl text-white max-h-[calc(100vh-68px)] overflow-y-auto animate-fadeIn">
            <div className="px-4 sm:px-6 pt-4 pb-8 space-y-4">
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

              {/* Action Button */}
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
                    href="https://wa.me/918041234567?text=Hello%20FRYTBOX%20Logistics%20Team%2C%20I%20would%20like%20to%20inquire%20about%20freight%20services."
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
    </>
  );
};
