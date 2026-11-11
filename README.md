# FRYTBOX Worldwide Logistics — Premium Corporate Platform

Official corporate web platform for **FRYTBOX WORLDWIDE LOGISTICS PRIVATE LIMITED** (Bengaluru, India), designed with DP World-inspired executive aesthetic, corporate storytelling, modern typography, and complete full-stack functionality.

---

## 🌟 Key Features

1. **Official Video Integration (`Frytbox11.mp4`)**:
   - **Hero Background Video**: Autoplaying cinematic background with play/pause, audio toggle, and video track switching.
   - **Interactive Brand Film Showcase**: Dedicated high-definition player section on the homepage and about page.
   - **Theater Modal Player**: Accessible from the top navigation bar, hero CTA, and footer to watch `Frytbox11.mp4` in full HD with time scrubbers and full audio controls.

2. **Full Corporate Design System (DP World Inspired)**:
   - Deep Maritime Navy (`#071D3D`, `#102D59`) paired with Brand Cardinal Red (`#B72832`).
   - Clean typography using **Manrope** and **Inter** Google Fonts.
   - Mega-menu navigation with deep links for core services and target industries.

3. **Core Freight Forwarding Services**:
   - **Air Freight Logistics**: Basic, Premium, Express tiers, full/part aircraft charters, temperature-controlled biopharma cold chain, and DG handling.
   - **Ocean Freight Forwarding**: FCL & LCL container shipping, breakbulk, out-of-gauge (OOG), and carrier space allocations.
   - **Road Logistics & Inland Freight**: Domestic FTL/LTL, cross-border trucking, port/ICD/CFS connectivity, and heavy haulage.
   - **Project Logistics & Heavy Lift**: Engineering surveys, route feasibility studies, heavy crane rigging, and turnkey movement for energy, mining, power, and defense.
   - **Customs Clearance & Brokerage**: Licensed customs house agent (CHA) services, ICEGATE EDI filings, duty drawback, EPCG, and SEZ compliance.
   - **Warehousing & Value-Added Logistics**: FTWZ duty-deferment handling, modern WMS, kitting, barcoded picking, and e-commerce distribution.

4. **Interactive Consignment Tracking (Track & Trace)**:
   - Direct integration simulation for Air Waybills (AWB), Ocean Bills of Lading (B/L), and container IDs.
   - Interactive milestone timeline (e.g. Test shipment `FRYT-882910` or `FRYT-449102`).

5. **Multi-Step Rate Quotation Engine**:
   - 3-step interactive quotation wizard with instant validation.
   - Integrated with backend API (`/api/quotes`) generating official reference numbers (e.g. `FBX-QT-2026-XXXXX`).

6. **Full-Stack MERN Architecture**:
   - **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router DOM.
   - **Backend**: Node.js & Express API with MongoDB Atlas support and reliable JSON file storage fallback.

---

## 📁 Project Directory Structure

```
Frytbox/
├── client/
│   ├── public/
│   │   ├── videos/
│   │   │   ├── Frytbox11.mp4        # Official corporate film
│   │   │   ├── hero-logistics.mp4   # Alternate logistics reel
│   │   │   └── network-globe.mp4    # Global network video
│   │   ├── frytbox-logo.png         # Official high-resolution logo
│   │   └── Clear-FRYTBOX-Logo.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Mega-menu header with video trigger
│   │   │   ├── Footer.tsx           # Corporate footer with Bengaluru HQ info
│   │   │   ├── HeroVideo.tsx        # Video hero featuring Frytbox11.mp4
│   │   │   ├── BrandVideoSection.tsx # Dedicated Frytbox.mp4 player section
│   │   │   ├── VideoModal.tsx       # HD theater modal for Frytbox.mp4
│   │   │   ├── ServicesSection.tsx  # Filterable 6-service grid
│   │   │   ├── IndustriesSection.tsx# 4 sector specialization cards
│   │   │   ├── TrackingWidget.tsx   # Live shipment tracking visualizer
│   │   │   ├── QuoteForm.tsx        # Multi-step quotation wizard
│   │   │   └── ContactForm.tsx      # Corporate inquiry form
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ServicesPage.tsx
│   │   │   ├── IndustriesPage.tsx
│   │   │   ├── QuotePage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   └── TrackingPage.tsx
│   │   ├── data/
│   │   │   └── companyData.ts       # Extracted PPT content & profiles
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── server/
│   ├── models/                      # Mongoose schemas (Quote, Contact)
│   ├── routes/                      # API endpoints (/api/quotes, /api/contact)
│   ├── data/                        # Persistent JSON storage fallback
│   ├── server.js                    # Express application entry
│   ├── storageHelper.js
│   └── package.json
├── assets_source/                   # Original PPTX and media assets
├── package.json                     # Root orchestrator scripts
└── README.md
```

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- npm

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Development Mode (Frontend + Backend Concurrently)
```bash
npm run dev
```
- Client dev server: `http://localhost:5173`
- Server API: `http://localhost:5000`

### 3. Production Build & Execution
```bash
# Build frontend
npm run build

# Start production server (serves both API & Frontend on port 5000)
npm run server
```
Then visit: `http://localhost:5000`

---

## 🏢 Corporate Entity Information

- **Company Legal Name**: FRYTBOX WORLDWIDE LOGISTICS PRIVATE LIMITED
- **Global Corporate Office**: No 5AC, 961, 2nd Floor, HRBR Layout 1st Block, Bank Avenue Colony, Banaswadi, Bengaluru, Karnataka 560043, India
- **Official Website**: https://www.frytbox.com
- **Official Email**: info@frytbox.com
