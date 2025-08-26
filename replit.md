# Element Crew Appraisals System

## Overview
This is a full-stack web application for managing crew appraisals in the maritime industry. It provides tools for tracking and managing crew member performance evaluations across different vessels. The system aims to streamline the appraisal process, offering detailed forms, configurable options, and robust data management to enhance crew development and compliance.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
The application features a modern full-stack architecture with a clear separation of concerns.

### Core Technologies
- **Frontend**: React 18 with TypeScript, Vite, TanStack Query, Wouter, Tailwind CSS, and shadcn/ui.
- **Backend**: Express.js with TypeScript and Drizzle ORM.
- **Database**: MySQL (production-ready) with PostgreSQL compatibility for development.

### Frontend Architecture
- **UI Components**: Consistent design system using shadcn/ui and Tailwind CSS with CSS variables for theming.
- **Forms**: React Hook Form with Zod validation.
- **Data Fetching**: TanStack Query for efficient server state management.
- **Icons**: Lucide React.
- **Form Popup Component**: `FormPopup` component (`client/src/components/ui/form-popup.tsx`) ensures consistent spacing (`p-4`, `h-[calc(100vh-2rem)]`) and styling for all modal popups.

### Backend Architecture
- **API Server**: Express.js with TypeScript for type safety.
- **Database Layer**: Drizzle ORM for type-safe database operations.
- **Development Setup**: In-memory storage fallback for development.
- **Middleware**: Custom logging middleware for API request tracking.

### Database Schema
The application uses a relational schema with tables for:
- `users`: User authentication.
- `forms`: Appraisal form configurations and version control.
- `available_ranks`: Maritime rank definitions.
- `rank_groups`: Configurable rank groupings per form.
- `crew_members`: Crew member profiles.
- `appraisal_results`: Completed appraisal evaluations.

### Key Features and Specifications
- **Crew Appraisals Data Population**: Data is primarily populated from submitted appraisal forms. Fields like "Crew ID" and "Vessel Type" are auto-populated.
- **Filter Functionality**: A toggleable filter row allows filtering appraisals by name, rank, vessel type, nationality, appraisal type, and rating range.
- **Admin Module**: Accessible via `/admin` route, providing configuration for various forms.
    - **Forms Configuration**: Manages appraisal forms with CRUD operations (`/api/forms`). Features include a table view, form editor modal, and version control.
    - **Form Editor Modal**: An exact copy of the crew appraisal form (Parts A-G) with configurable sections, fields, and version tracking. Includes features like "Hide Field," "Hide Section," and dynamic renumbering.
    - **Configurable Rank Groups**: Dynamic configuration of rank groups for different form types, allowing multi-selection of maritime ranks.
    - **Configurable Dropdowns**: Fields like "Appraisal Type," "Personality Index (PI) Category," "Effectiveness" Rating, "Category," and "Status" in Part G2 Training Followup are configurable via dialogs.
    - **Configurable Tables**: Parts C and D allow dynamic addition of assessment criteria with weight validation. Part F2 allows configurable additional recommendations.
    - **Validation**: Comprehensive validation for blank fields in appraisal forms.
- **Responsive Design**: The Admin Sub-module's Crew Appraisal Form Editor is fully responsive and mobile-friendly, with adaptive modal sizing, sidebar navigation, grid layouts, and touch-friendly controls.
- **Confirmation Dialogs**: All delete functions across the application utilize consistent React AlertDialog components for user confirmation.
- **Comment Functionality**: Improved click-to-edit comments with auto-save on focus loss.

## External Dependencies

### Frontend Dependencies
- `@radix-ui/*`: Accessible UI primitive components.
- `@tanstack/react-query`: Server state management.
- `wouter`: Lightweight routing solution.
- `tailwindcss`: Utility-first CSS framework.
- `lucide-react`: Icon library.
- `react-hook-form`: Form management.
- `zod`: Schema validation.

### Backend Dependencies
- `express`: Web application framework.
- `drizzle-orm`: Type-safe ORM.
- `@neondatabase/serverless`: Neon PostgreSQL driver (for development/PostgreSQL compatibility).
- `connect-pg-simple`: PostgreSQL session store (for development/PostgreSQL compatibility).
- `mysql2`: MySQL client library.

### Development Dependencies
- `vite`: Fast build tool and dev server.
- `typescript`: Type checking and compilation.
- `drizzle-kit`: Database migration tool.