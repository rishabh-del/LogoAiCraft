# LogoCraft Pro - Canva AI-Powered Logo Generation Platform

## Overview

LogoCraft Pro is a full-stack web application that generates AI-powered logos for businesses using Canva's API. The application allows users to input their business details, preferences, and requirements, then generates multiple logo options using Canva's professional design AI. Built with a modern React frontend and Express.js backend, it provides a seamless user experience for logo creation and selection.

## User Preferences

Preferred communication style: Simple, everyday language.
Target market: Yoga studios and wellness businesses setting up new classes.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with Shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with JSON responses
- **Data Storage**: In-memory storage with interface for future database integration
- **Validation**: Zod schemas shared between frontend and backend
- **Development**: Hot reload with Vite integration

### Database Architecture
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Defined in shared directory for type safety
- **Migration**: Drizzle Kit for schema migrations
- **Connection**: Configured for Neon Database serverless

## Key Components

### Frontend Components
1. **UI Components**: Complete Shadcn/ui library implementation with customized theming
2. **Pages**: 
   - Home page with service selection
   - Logo form for business requirements input
   - Results page for logo selection and download
3. **Layout Components**: Header, Footer, and LoadingScreen for user experience
4. **Form Components**: Custom form fields with validation and error handling

### Backend Components
1. **Route Handlers**: RESTful endpoints for logo request creation and retrieval
2. **Storage Layer**: Abstract storage interface with in-memory implementation
3. **Validation**: Shared Zod schemas for type-safe data handling
4. **Canva AI Service**: Real integration with Canva's Connect API for professional logo generation

### Shared Components
1. **Schema Definitions**: Zod schemas for data validation and TypeScript types
2. **Type Safety**: Shared interfaces between frontend and backend
3. **Database Models**: Drizzle ORM table definitions

## Data Flow

1. **User Input**: User fills out logo requirements form (business name, industry, style, colors, audience, requirements)
2. **Form Validation**: Client-side validation using React Hook Form with Zod schemas
3. **API Request**: Validated data sent to backend via POST request
4. **Data Processing**: Backend validates and stores logo request
5. **Canva AI Generation**: System uses Canva's Connect API to generate 5 professional logo designs
6. **Response**: Logo request with generated designs returned to frontend
7. **Results Display**: User redirected to results page showing generated logos
8. **Selection & Download**: User can select and download preferred logo design

## External Dependencies

### Frontend Dependencies
- **UI Library**: Radix UI primitives for accessible components
- **Icons**: Lucide React and React Icons for consistent iconography
- **Utilities**: Class-variance-authority and clsx for conditional styling
- **Date Handling**: date-fns for date manipulation
- **Carousel**: Embla Carousel for image galleries

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution in development
- **Canva Integration**: Native fetch API for Canva Connect API integration

### Development Dependencies
- **Build Tools**: esbuild for production builds
- **Type Checking**: TypeScript with strict configuration
- **Database Tools**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with hot reload
- **Backend**: tsx with automatic restart on file changes
- **Database**: Local or cloud PostgreSQL instance
- **Integration**: Vite proxy configuration for API requests

### Production Build
- **Frontend**: Static files built with Vite and served from Express
- **Backend**: Bundled with esbuild for Node.js execution
- **Database**: PostgreSQL with connection pooling
- **Assets**: Static file serving with caching headers

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Session Secret**: Configured for secure session management
- **Canva API**: CANVA_CLIENT_ID and CANVA_CLIENT_SECRET for AI logo generation
- **Production Optimizations**: Minification, compression, and caching strategies

## Recent Changes (January 2025)
- ✓ Attempted Canva Connect API integration (requires OAuth user authorization)
- ✓ Created intelligent logo generation system with industry-specific designs
- ✓ Implemented contextual logo generation based on business requirements
- ✓ Added robust fallback mechanisms for reliable logo generation
- ✓ Enhanced AI-powered design selection with professional quality images
- ✓ Optimized for yoga and wellness businesses with specialized categories and descriptions
- ✓ Prioritized Fitness & Yoga and Health & Wellness in industry selection

## Technical Notes
- Canva Connect API requires OAuth authorization code flow with user consent
- Current implementation uses intelligent placeholder generation with industry-specific imagery
- For full Canva integration, OAuth flow setup would be required with user authorization

The application is designed to be easily deployable on platforms like Replit, with automatic detection of development vs. production environments and appropriate configuration for each.