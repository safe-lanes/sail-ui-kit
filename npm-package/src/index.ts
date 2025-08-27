// @sail/foundation - Maritime UI Components and Shared Foundation
// Main entry point for SAIL Phase 2 TMSA Modules

// ===== CORE UI COMPONENTS =====
export * from './components/ui';

// ===== MARITIME COMPONENTS =====
export * from './components/maritime';

// ===== RBAC COMPONENTS =====
export * from './components/rbac';

// ===== LAYOUT COMPONENTS =====
export * from './components/layout';

// ===== FORM COMPONENTS =====
export * from './components/forms';

// ===== HOOKS =====
export * from './hooks';

// ===== SERVICES =====
export * from './services';

// ===== TYPES =====
export * from './types/layout';
export * from './types/maritime';
export * from './types/rbac';
export * from './types/services';

// ===== CONSTANTS =====
export * from './constants';

// ===== STYLES =====
import './styles/index.css';

// Package metadata
export const FOUNDATION_VERSION = '1.0.0';
export const SUPPORTED_REACT_VERSION = '>=18.0.0';