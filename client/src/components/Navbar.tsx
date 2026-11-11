import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Plane,
  Ship,
  Truck,
  Compass,
  FileCheck,
  Boxes,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES_DATA, INDUSTRIES_DATA } from '../data/companyData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [industriesDropdown, setIndustriesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setIndustriesDropdown(false);
  }, [location.pathname]);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Plane':
        return <Plane className="h-5 w-5 text-[#2563EB]" />;
      case 'Ship':
        return <Ship className="h-5 w-5 text-[#2563EB]" />;
      case 'Truck':
        return <Truck className="h-5 w-5 text-[#2563EB]" />;
      case 'Compass':
        return <Compass className="h-5 w-5 text-[#2563EB]" />;
      case 'FileCheck':
        return <FileCheck className="h-5 w-5 text-[#2563EB]" />;
      case 'Boxes':
        return <Boxes className="h-5 w-5 text-[#2563EB]" />;
      default:
        return <ShieldCheck className="h-5 w-5 text-[#2563EB]" />;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3.5'
          : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-11 px-3 py-1.5 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
              <img
                src={`${import.meta.env.BASE_URL}frytbox-logo.png`}
                alt="FRYTBOX Worldwide Logistics"
                className="h-8 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              to="/"
              className={`px-3.5 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? isScrolled
                    ? 'text-[#2563EB] font-semibold'
                    : 'text-white font-semibold'
                  : isScrolled
                  ? 'text-gray-700 hover:text-[#2563EB]'
                  : 'text-gray-100 hover:text-white'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <Link
                to="/services"
                className={`px-3.5 py-2 text-sm font-medium inline-flex items-center space-x-1 transition-colors ${
                  location.pathname.startsWith('/services')
                    ? isScrolled
                      ? 'text-[#2563EB] font-semibold'
                      : 'text-white font-semibold'
                    : isScrolled
                    ? 'text-gray-700 hover:text-[#2563EB]'
                    : 'text-gray-100 hover:text-white'
                }`}
              >
                <span>Services</span>
                <ChevronDown className="h-4 w-4 ml-0.5 opacity-70" />
              </Link>

              {servicesDropdown && (
                <div className="absolute left-0 mt-1 w-[620px] bg-white rounded-xl shadow-xl border border-gray-100 p-5 grid grid-cols-2 gap-3 animate-fadeIn">
                  {SERVICES_DATA.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services#${service.slug}`}
                      className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-blue-50/60 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-[#2563EB] transition-colors">
                          {service.title}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {service.shortDesc}
                        </div>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                    <span className="text-gray-500">
                      Multi-modal supply chains engineered for global efficiency.
                    </span>
                    <Link
                      to="/services"
                      className="text-[#2563EB] font-semibold hover:underline inline-flex items-center"
                    >
                      All services <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIndustriesDropdown(true)}
              onMouseLeave={() => setIndustriesDropdown(false)}
            >
              <Link
                to="/industries"
                className={`px-3.5 py-2 text-sm font-medium inline-flex items-center space-x-1 transition-colors ${
                  location.pathname.startsWith('/industries')
                    ? isScrolled
                      ? 'text-[#2563EB] font-semibold'
                      : 'text-white font-semibold'
                    : isScrolled
                    ? 'text-gray-700 hover:text-[#2563EB]'
                    : 'text-gray-100 hover:text-white'
                }`}
              >
                <span>Industries</span>
                <ChevronDown className="h-4 w-4 ml-0.5 opacity-70" />
              </Link>

              {industriesDropdown && (
                <div className="absolute left-0 mt-1 w-[400px] bg-white rounded-xl shadow-xl border border-gray-100 p-4 space-y-1.5 animate-fadeIn">
                  {INDUSTRIES_DATA.map((industry) => (
                    <Link
                      key={industry.id}
                      to={`/industries#${industry.slug}`}
                      className="block p-3 rounded-lg hover:bg-blue-50/60 transition-colors group"
                    >
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-[#2563EB] transition-colors">
                        {industry.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {industry.subtitle}
                      </div>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-gray-100">
                    <Link
                      to="/industries"
                      className="text-xs text-[#2563EB] font-semibold hover:underline inline-flex items-center"
                    >
                      View all industries <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`px-3.5 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/about'
                  ? isScrolled
                    ? 'text-[#2563EB] font-semibold'
                    : 'text-white font-semibold'
                  : isScrolled
                  ? 'text-gray-700 hover:text-[#2563EB]'
                  : 'text-gray-100 hover:text-white'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`px-3.5 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/contact'
                  ? isScrolled
                    ? 'text-[#2563EB] font-semibold'
                    : 'text-white font-semibold'
                  : isScrolled
                  ? 'text-gray-700 hover:text-[#2563EB]'
                  : 'text-gray-100 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action: Pure Professional Blue CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/quote"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all shadow-md hover:shadow-blue-600/20 flex items-center space-x-2"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 px-5 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn text-gray-900">
          <Link
            to="/"
            className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-50"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-50"
          >
            Services
          </Link>
          <Link
            to="/industries"
            className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-50"
          >
            Industries
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-50"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-50"
          >
            Contact
          </Link>
          <div className="pt-3 border-t border-gray-100">
            <Link
              to="/quote"
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>Request a Quote</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
