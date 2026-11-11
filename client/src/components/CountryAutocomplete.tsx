import React, { useState, useRef, useEffect } from 'react';
import { COUNTRIES, Country } from '../data/countries';
import { ChevronDown, Globe2, Check } from 'lucide-react';

interface CountryAutocompleteProps {
  label: string;
  value: string;
  onChange: (countryName: string) => void;
  placeholder?: string;
  required?: boolean;
}

export const CountryAutocomplete: React.FC<CountryAutocompleteProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Type to search country...',
  required = false,
}) => {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (country: Country) => {
    setQuery(country.name);
    onChange(country.name);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    setIsOpen(true);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-xs text-gray-500 mb-1 flex items-center justify-between">
        <span>{label}</span>
        {query && <span className="text-[10px] text-[#2563EB] font-medium">Selected: {query}</span>}
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-400">
          <Globe2 className="h-3.5 w-3.5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          required={required}
          className="w-full pl-8 pr-8 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      {isOpen && (
        <ul className="absolute z-50 left-0 right-0 mt-1 max-h-52 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl py-1 text-xs">
          {filtered.length > 0 ? (
            filtered.map((country) => {
              const isSelected = country.name.toLowerCase() === query.toLowerCase();
              return (
                <li
                  key={country.code}
                  onClick={() => handleSelect(country)}
                  className={`px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-blue-50 transition-colors ${
                    isSelected ? 'bg-blue-50 font-semibold text-[#2563EB]' : 'text-gray-800'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-sm">{country.flag}</span>
                    <span>{country.name}</span>
                  </span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-[#2563EB]" />}
                </li>
              );
            })
          ) : (
            <li className="px-3 py-2 text-gray-400 text-xs italic">
              Use custom: "{query}"
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
