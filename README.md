# IRU Business Group Ltd - Corporate Website

## ?Overview

This is the official corporate website for IRU Business Group Ltd, a leading business solutions provider based in Kigali, Rwanda. The website showcases our comprehensive range of services, innovative projects, and strategic consulting capabilities across healthcare, technology, and digital media sectors.

## Features

- **Modern Responsive Design** - Fully responsive across all devices
- **Interactive UI Components** - Built with Radix UI primitives
- **Smooth Animations** - Enhanced user experience with scroll-triggered animations
- **Multi-language Support** - English, Kinyarwanda, and French language options
- **Newsletter Subscription** - EmailJS-powered subscription system
- **Social Media Integration** - Connected to all IRU Business Group social platforms
- **Dynamic Content Sections** - Modular component architecture
- **SEO Optimized** - Structured for search engine optimization
- **Dark/Light Theme** - Adaptive theming support

## Technology Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.1
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.11
- **UI Components**: Radix UI
- **Icons**: Lucide React & React Icons
- **Routing**: React Router DOM 6.26.2
- **State Management**: TanStack React Query 5.56.2
- **Form Handling**: React Hook Form 7.53.0
- **Charts**: Recharts 2.12.7
- **Animations**: Tailwind CSS Animate

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (Radix UI)
│   ├── Header.tsx          # Navigation header
│   ├── HeroSection.tsx     # Landing hero section
│   ├── AboutSection.tsx    # Company overview
│   ├── ConsultantSection.tsx # Consultant services & stats
│   ├── ServicesSection.tsx # Services & projects showcase
│   ├── FAQSection.tsx      # Frequently asked questions
│   ├── NewsSubscription.tsx # Newsletter subscription
│   └── Footer.tsx          # Site footer
├── pages/
│   ├── Index.tsx           # Main landing page
│   └── NotFound.tsx        # 404 error page
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── assets/                 # Static assets
└── App.tsx                 # Main application component
```

##  Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd iru-business-group-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## Design System

The project uses a comprehensive design system with:
- **Semantic Color Tokens** - Consistent theming across components
- **Responsive Typography** - Optimized for all screen sizes
- **Custom Animations** - Smooth transitions and interactions
- **Component Variants** - Flexible UI component configurations

## 📦 Key Dependencies

- **@radix-ui/react-*** - Accessible UI primitives
- **@tanstack/react-query** - Server state management
- **lucide-react** - Beautiful icon library
- **tailwindcss** - Utility-first CSS framework
- **react-router-dom** - Client-side routing
- **recharts** - Responsive chart library

## Deployment

1. **Build the project**
   ```bash
   npm run build
   ```
   deploy-5

2. **Deploy the `dist` folder** to your hosting platform
   - Netlify
   - Vercel
   - AWS S3
   - Traditional web hosting

**Built by IRU Business Group Ltd Development Team**
deploy 2
deploy-3
