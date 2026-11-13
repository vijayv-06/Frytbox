export type FreightMode = 'air' | 'ocean' | 'road' | 'project' | 'customs' | 'warehousing';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  category: 'core' | 'specialized';
  features: string[];
  capabilities: {
    title: string;
    description: string;
  }[];
  specifications?: string[];
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  sectors: string[];
  image: string;
  iconName: string;
}

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceType: string;
  originCountry: string;
  originCity: string;
  destinationCountry: string;
  destinationCity: string;
  cargoReadyDate: string;
  estimatedWeightKg?: number;
  estimatedVolumeCbm?: number;
  cargoDescription: string;
  specialRequirements?: string;
  incoterm?: string;
}

export interface ContactFormData {
  fullName: string;
  companyName?: string;
  email: string;
  phone?: string;
  subject: string;
  inquiryType: 'general' | 'sales' | 'support' | 'partnership' | 'careers';
  message: string;
}
