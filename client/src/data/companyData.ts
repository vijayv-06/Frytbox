import { ServiceItem, IndustryItem } from '../types';

const base = import.meta.env.BASE_URL || '/';

export const COMPANY_PROFILE = {
  name: 'FRYTBOX WORLDWIDE LOGISTICS',
  legalName: 'FRYTBOX WORLDWIDE LOGISTICS PRIVATE LIMITED',
  tagline: 'Connecting Businesses. Moving the World.',
  heroSubheading:
    'Accelerating international trade with transparency, speed, and seamless multi-modal logistics from factory floor to customer door.',
  aboutSummary:
    'FRYTBOX is a global supply chain logistics company that provides ocean and air freight forwarding, warehousing, distribution services, return of cargo, international transportation, pick up, last-mile delivery, customs clearance, and end-to-end supply chain management.',
  headquarters: {
    address: 'No 5AC, 961, 2nd Floor, HRBR Layout 1st Block, Bank Avenue Colony, Banaswadi, Bengaluru, Karnataka 560043, India',
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    pincode: '560043',
    email: 'info@frytbox.com',
    phone: '+91 80 4123 4567',
    workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
  },
  stats: [
    { label: 'Global Ports & Hubs', value: '120+', prefix: '', suffix: '+' },
    { label: 'On-Time Delivery Rate', value: '99.4', prefix: '', suffix: '%' },
    { label: 'Active Trade Lanes', value: '450+', prefix: '', suffix: '' },
    { label: 'Dedicated Logistics Pros', value: '350+', prefix: '', suffix: '' },
  ],
  coreValues: [
    {
      title: 'Customer-Centric Partnership',
      description:
        'We listen to your specific operational needs and engineer tailored solutions that keep your business agile and ahead of the curve.',
      icon: 'Handshake',
    },
    {
      title: 'Total Cargo Visibility',
      description:
        'State-of-the-art digital tools and ICEGATE-integrated real-time visibility from cargo origin to final last-mile doorstep.',
      icon: 'Eye',
    },
    {
      title: 'Operational Precision',
      description:
        'Unwavering commitment to quality, compliant documentation, and strict adherence to global safety and customs standards.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Agile Multi-Modal Network',
      description:
        'Global coverage combined with deep local nuances across air, sea, rail, and road networks for rapid, cost-effective freight movement.',
      icon: 'Globe',
    },
  ],
  videoAssets: {
    brandFilm: `${base}videos/Frytbox11.mp4`,
    heroReel: `${base}videos/Frytbox11.mp4`,
    heroReelMobile: `${base}videos/Frytbox22.mp4`,
    networkGlobe: `${base}videos/network-globe.mp4`,
    heroLogistics: `${base}videos/hero-logistics.mp4`,
  },
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'air-freight',
    slug: 'air-freight',
    title: 'Air Freight Logistics',
    shortDesc: 'Time-critical global air transport with flexible tiers: Basic, Premium, Express, and full charter capabilities.',
    fullDesc:
      'When speed is paramount, FRYTBOX Air Freight services deliver fast, reliable global reach. Built on robust airline partnerships, space allocations on prime scheduled routes, and dedicated charter options, we ensure your high-value and urgent cargo reaches any destination on time.',
    iconName: 'Plane',
    image: `${base}images/services/frytbox-air-freight.jpg`,
    category: 'core',
    features: [
      'Basic, Premium, and Express tier delivery schedules',
      'Door-to-Door and Airport-to-Airport services',
      'Temperature-controlled cold chain for biopharma and perishables',
      'Dangerous Goods (DG) certified handling',
      'Full and part aircraft charters for oversized or project cargo',
      'Daily scheduled consolidations with prime tier-1 carriers',
    ],
    capabilities: [
      {
        title: 'Priority Express Logistics',
        description: 'Next-flight-out dispatch and dedicated airport ramp oversight for urgent mission-critical shipments.',
      },
      {
        title: 'Full & Part Chartering',
        description: 'Custom aircraft charter solutions for heavy machinery, emergency humanitarian relief, or high-volume freight.',
      },
      {
        title: 'End-to-End Cargo Visibility',
        description: 'Live flight telemetry, milestone updates, and proactive exception management around the clock.',
      },
    ],
    specifications: [
      'Maximum payload flexibility',
      'IATA compliant standards',
      'Global bonded warehouse transit',
      '24/7 flight monitoring',
    ],
  },
  {
    id: 'ocean-freight',
    slug: 'ocean-freight',
    title: 'Ocean Freight Forwarding',
    shortDesc: 'Reliable FCL & LCL container shipping, non-containerised loads, and global breakbulk solutions with guaranteed space.',
    fullDesc:
      'FRYTBOX ocean logistics connects major global ports through long-term carrier alliances. From Full Container Loads (FCL) to cost-effective Less-than-Container Loads (LCL) and specialized breakbulk, we navigate maritime trade lanes with transparent pricing and complete cargo visibility.',
    iconName: 'Ship',
    image: `${base}images/services/frytbox-ocean-freight.jpg`,
    category: 'core',
    features: [
      'FCL (Full Container Load) & LCL (Less than Container Load)',
      'Port-to-Port, Port-to-Door, and Door-to-Door routing',
      'Breakbulk, Out-of-Gauge (OOG), and Ro-Ro shipping',
      'Reefer container solutions for temperature-sensitive goods',
      'Direct carrier space agreements on key transpacific, European, and Asian routes',
      'Customized ocean consolidations and de-consolidation hubs',
    ],
    capabilities: [
      {
        title: 'FCL & Strategic Capacity',
        description: 'Predictable sailing schedules with prioritized vessel space and container equipment availability.',
      },
      {
        title: 'Consolidated LCL Network',
        description: 'Cost-optimized shipping for smaller cargo volumes with weekly direct sailings and fast CFS turnaround.',
      },
      {
        title: 'Port-Side Drayage & Customs',
        description: 'Seamless terminal clearance, container haulage, and swift dispatch to inland destinations.',
      },
    ],
    specifications: [
      'Standard 20ft & 40ft High Cube containers',
      'Open top & flat rack equipment',
      'IMO certified marine documentation',
      'Multi-modal rail/truck on-carriage',
    ],
  },
  {
    id: 'road-logistics',
    slug: 'road-logistics',
    title: 'Road Logistics & Inland Freight',
    shortDesc: 'Time-definite domestic FTL & LTL trucking, cross-border transport, and heavy haulage solutions across India and beyond.',
    fullDesc:
      'FRYTBOX Inland Network Services is an integrated, time-definite platform supporting cargo movement across domestic and cross-border corridors. With cost optimization, scalable capacity, and real-time GPS telemetry, we guarantee safe, on-time road transportation.',
    iconName: 'Truck',
    image: `${base}images/services/frytbox-road-trucking.jpg`,
    category: 'core',
    features: [
      'Domestic FTL (Full Truckload) & LTL (Less Than Truckload)',
      'Cross-border trucking and bonded transit corridors',
      'Port movement / ICD to ICD / CFS to CFS connectivity',
      'Contract pick-up, store-to-store distribution, and last-mile delivery',
      'Heavy haulage solutions including high-payload and low-bed trailers',
      'Temperature-controlled reefer fleet for cold chain integrity',
    ],
    capabilities: [
      {
        title: 'Dedicated Fleet Network',
        description: 'Scalable transport options with vetted drivers, GPS telematics, and digital proof-of-delivery.',
      },
      {
        title: 'Multi-Hub Intermodal Transit',
        description: 'Connecting ports, rail freight terminals (ICD), and distribution centers without bottlenecks.',
      },
      {
        title: 'Last-Mile Precision',
        description: 'Scheduled store drops, factory deliveries, and project-site staging handled with complete care.',
      },
    ],
    specifications: [
      'GPS real-time telemetry on all vehicles',
      'Air-suspension trailers for sensitive equipment',
      'Hydraulic multi-axle modular trailers',
      'Strict transit safety compliance',
    ],
  },
  {
    id: 'project-logistics',
    slug: 'project-logistics',
    title: 'Project Logistics & Heavy Lift',
    shortDesc: 'Engineering-led transport for over-dimensional cargo, heavy-lift plant machinery, and complex multi-modal movements.',
    fullDesc:
      'Our Project & Energy Services team offers specialized engineering solutions for oversized and massive loads. From industrial presses to wind turbine components and defense assets, we execute concept-to-delivery logistics backed by route feasibility studies, rigging analysis, and on-site supervision.',
    iconName: 'Compass',
    image: `${base}images/services/frytbox-project-logistics.jpg`,
    category: 'specialized',
    features: [
      'Over-dimensional (ODC) and heavy-lift freight management',
      'Full and part ocean breakbulk chartering',
      'Route feasibility studies, bridge clearances, and civil permits',
      'On-site technical supervision during loading, securing, and offloading',
      'Turnkey logistics for Renewable Energy, Power, Mining, Oil & Gas, and Aerospace',
      'Custom jacking, skidding, and heavy crane operations',
    ],
    capabilities: [
      {
        title: 'Route & Civil Survey Studies',
        description: 'In-depth engineering surveys evaluating road curvature, overhead obstacles, and load-bearing structures.',
      },
      {
        title: 'Vessel Chartering & Stowage Planning',
        description: 'Naval architect calculations for heavy cargo lashings, center-of-gravity distribution, and marine stability.',
      },
      {
        title: 'On-Site Operational Command',
        description: 'Dedicated logistics engineers stationed at departure, transshipment, and installation sites.',
      },
    ],
    specifications: [
      'Up to 1,000+ metric ton single-piece capability',
      'Multi-modal sea-river-road routing',
      'Marine cargo insurance consultation',
      'Turnkey factory relocation',
    ],
  },
  {
    id: 'customs-clearance',
    slug: 'customs-clearance',
    title: 'Customs Clearance & Brokerage',
    shortDesc: 'Licensed customs house brokerage, ICEGATE integration, foreign trade policy advisory, duty drawback, and SEZ filings.',
    fullDesc:
      'Looking for seamless customs clearance solutions in India? As a licensed customs broker, FRYTBOX assists importers and exporters through complex statutory declarations, documentation compliance, and electronic ICEGATE filing to ensure zero detention and demurrage.',
    iconName: 'FileCheck',
    image: `${base}images/services/frytbox-customs-clearance.jpg`,
    category: 'specialized',
    features: [
      'Import and Export clearance across major air cargo complexes and sea ports',
      'Direct ICEGATE electronic filing and automated EDI status updates',
      'Duty Drawback, EPCG schemes, Advance Authorisation, and SEZ applications',
      'SVB (Special Valuation Branch) clearance, Bonding and De-Bonding warehousing',
      'Advisory on Foreign Trade Policy (FTP), customs tariff classifications, and DGFT formalities',
      'Pre-shipment verification and HS Code audit to eliminate penal liabilities',
    ],
    capabilities: [
      {
        title: 'Government Scheme Maximization',
        description: 'Helping exporters and manufacturers unlock duty benefits, exemptions, and FTWZ privileges.',
      },
      {
        title: 'Fast-Track Port Release',
        description: 'Proactive document audit before vessel berthing to secure immediate customs clearance upon arrival.',
      },
      {
        title: 'Regulatory & Valuation Defense',
        description: 'Legal and technical support for SVB related-party transactions, PCA, and tariff dispute resolution.',
      },
    ],
    specifications: [
      'AEO certified operational practices',
      'Direct EDI customs server handshake',
      'Specialized chemical & pharma clearances',
      'Export promotion council liaison',
    ],
  },
  {
    id: 'warehousing-contract-logistics',
    slug: 'warehousing-contract-logistics',
    title: 'Warehousing & Value-Added Logistics',
    shortDesc: 'Strategically located facilities, modern WMS, FTWZ handling, e-commerce order fulfillment, and contract packaging.',
    fullDesc:
      'FRYTBOX warehousing and contract logistics facilities keep your supply chain agile, resilient, and responsive. Equipped with modern Warehouse Management Systems (WMS), 24/7 surveillance, and value-added capabilities like kitting, tagging, and FTWZ operations, we optimize your storage footprint.',
    iconName: 'Boxes',
    image: `${base}images/services/frytbox-warehousing.jpg`,
    category: 'core',
    features: [
      'Short-term and long-term bonded & non-bonded storage',
      'Consolidation & de-consolidation hubs near major gateway ports',
      'Modern WMS with real-time barcode inventory control and ERP integrations',
      'Value-added services: co-packing, kitting, labelling, tagging, and QA testing',
      'Free Trade Warehousing Zone (FTWZ) solutions for duty deferment',
      '3PL and outsourced inventory management for omni-channel distribution',
    ],
    capabilities: [
      {
        title: 'Real-Time WMS Intelligence',
        description: 'Granular visibility down to SKU, batch number, FIFO rotation, and expiry dates.',
      },
      {
        title: 'E-Commerce & Retail Fulfillment',
        description: 'High-speed pick, pack, and ship workflows designed for fast marketplace delivery SLAs.',
      },
      {
        title: 'High-Security Inventory Protection',
        description: '24/7 CCTV surveillance, biometric access control, fire suppression, and temperature stability.',
      },
    ],
    specifications: [
      'High-bay pallet racking',
      'FTWZ duty deferral capability',
      'Temperature controlled zones (15°C to 25°C & 2°C to 8°C)',
      'Reverse logistics & return processing',
    ],
  },
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'technology-retail',
    slug: 'technology-retail',
    title: 'Technology & Retail',
    subtitle: 'High-velocity supply chains for consumer electronics, fast fashion, and omnichannel retail.',
    description:
      'We connect your factory floor to warehouse, distribution centers, and direct-to-store channels so goods reach shelves and consumer doorsteps faster. With serialized monitoring and high-security handling, we protect high-value electronic components.',
    highlights: [
      'High-security logistics with anti-theft protocols and GPS geofencing',
      'Omnichannel fulfillment and reverse logistics management',
      'Peak seasonal capacity guarantees during product launches and festive sales',
      'Direct-to-store distribution with time-window deliveries',
    ],
    sectors: ['Consumer Electronics', 'Apparel & Footwear', 'E-Commerce Brands', 'Telecommunications Hardware'],
    image: `${base}images/industries/frytbox-retail.jpg`,
    iconName: 'Cpu',
  },
  {
    id: 'automotive-energy',
    slug: 'automotive-energy',
    title: 'Automotive & Energy',
    subtitle: 'Just-in-Time component feeding, EV battery transport, and heavy infrastructure energy logistics.',
    description:
      'Connecting your vehicles from factory floor to customer door or last mile wherever needed. We deliver innovative, reliable, and tailored solutions for solar, wind, power plant components, and conventional energy transport.',
    highlights: [
      'Just-in-Time (JIT) and Just-in-Sequence (JIS) manufacturing line feeds',
      'Dangerous Goods certified logistics for Lithium-ion EV battery packs',
      'Specialized low-bed trailer logistics for transformers, wind blades, and generators',
      'Cross-border customs clearance for automotive assembly parts',
    ],
    sectors: ['Automotive OEMs & Tier 1 Suppliers', 'Electric Vehicles & Batteries', 'Solar & Wind Renewable Energy', 'Oil, Gas & Power Utilities'],
    image: `${base}images/industries/frytbox-automotive.jpg`,
    iconName: 'Zap',
  },
  {
    id: 'healthcare-chemical',
    slug: 'healthcare-chemical',
    title: 'Healthcare & Chemical',
    subtitle: 'Strict GDP compliant cold chains, medical device shipping, and specialized chemical distribution.',
    description:
      'Biopharma, Medical Devices, Diagnostics & Labs, Hospital and Home Care — FRYTBOX experienced and dedicated teams seamlessly design global and local temperature-controlled solutions to deliver the best care for patients.',
    highlights: [
      'Validated cold chain solutions (-20°C, 2°C to 8°C, and 15°C to 25°C)',
      'Real-time temperature data logger integration and active telemetry',
      'Classified chemical freight handling in accordance with Hazmat and ADR standards',
      'Priority customs fast-track for life-saving medicines and biological samples',
    ],
    sectors: ['Pharmaceuticals & Vaccines', 'Medical Devices & Equipment', 'Diagnostic Labs & Reagents', 'Specialty Industrial Chemicals'],
    image: `${base}images/industries/frytbox-pharma.jpg`,
    iconName: 'Activity',
  },
  {
    id: 'industrial-aerospace',
    slug: 'industrial-aerospace',
    title: 'Industrial & Aerospace',
    subtitle: 'Mission-critical AOG support, precision heavy machinery, and secure defense transport.',
    description:
      'Dedicated teams to move your industrial machinery, aerospace parts, and defense cargo around the globe in the safest fashion. Tailor-made solutions to manage complex demands and make supply chains leaner and more agile.',
    highlights: [
      '24/7/365 Aircraft-on-Ground (AOG) rapid emergency logistics',
      'ITAR and defense cargo security compliance with vetted personnel',
      'Air-ride transport for high-precision CNC tooling and turbine blades',
      'Heavy crane loading, skidding, and assembly support at installation sites',
    ],
    sectors: ['Commercial & Defense Aerospace', 'Heavy Machinery & Industrial Tools', 'Maritime Spares', 'Infrastructure & Construction Engineering'],
    image: `${base}images/industries/frytbox-energy.jpg`,
    iconName: 'Shield',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'FRYTBOX transformed our transpacific ocean shipments. Their proactive customs clearance and dedicated Bengaluru support team saved us days of lead time across our peak quarters.',
    author: 'Rajesh K. Mehta',
    role: 'VP of Global Supply Chain',
    company: 'Apex Precision Engineering',
  },
  {
    quote:
      'Handling temperature-controlled biopharma freight demands zero margin of error. FRYTBOX provides impeccable visibility and flawless regulatory paperwork from factory door to destination hospital.',
    author: 'Dr. Anita Roy',
    role: 'Director of International Distribution',
    company: 'BioVanguard Therapeutics',
  },
  {
    quote:
      'For our wind turbine installation project, FRYTBOX delivered 400-ton oversized breakbulk movements without a single delay. Their engineering team is best in class.',
    author: 'Michael Vance',
    role: 'Project Director',
    company: 'Helios Renewable Solutions',
  },
];
