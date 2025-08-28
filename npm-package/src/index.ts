// scomp - Maritime UI Components and Shared Foundation
// Main entry point for SAIL Phase 2 TMSA Modules

// ===== CORE UI COMPONENTS =====
export * from './components/ui';

// ===== MARITIME COMPONENTS =====
export * from './components/maritime';

// ===== DASHBOARD COMPONENTS =====
export * from './components/dashboard';

// ===== FEEDBACK COMPONENTS =====
export * from './components/feedback';

// ===== RBAC COMPONENTS =====
export * from './components/rbac';

// ===== LAYOUT COMPONENTS =====
export * from './components/layout';

// ===== FORM COMPONENTS =====
export * from './components/forms';

// ===== HOOKS =====
export * from './hooks';

// ===== SERVICES =====
// Services export their own types to avoid conflicts
export * from './services';

// ===== TYPES =====
// Types are already exported by their respective component modules
// export * from './types/layout';
// export * from './types/maritime';
// export * from './types/rbac';
// export * from './types/services';

// ===== CONSTANTS =====
// Constants are already exported by their respective component modules
// Note: Skip constants export to avoid conflicts with maritime components
// export * from './constants';

// ===== STYLES =====
import './styles/index.css';

// Package metadata
export const FOUNDATION_VERSION = '1.0.0';
export const SUPPORTED_REACT_VERSION = '>=18.0.0';
