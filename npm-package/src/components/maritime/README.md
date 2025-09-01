# Maritime Components

This directory contains enhanced maritime-specific UI components optimized for vessel operations, safety management, and regulatory compliance.

## Components Overview

### OperationsDashboard
Enterprise-grade maritime operations dashboard with real-time monitoring, interactive analytics, and comprehensive vessel management capabilities.

**Enhanced Features (60+ props):**
- Real-time data management with WebSocket integration
- Interactive callbacks for drill-down analytics
- Advanced filtering and customization options
- Maritime-specific KPI tracking and alerts
- Performance optimization with virtualization
- Comprehensive export and reporting capabilities

[📖 **View Complete Documentation**](../../../../guides/OperationsDashboard.md)

**Quick Start:**
```tsx
import { OperationsDashboard } from 'scomp-ui/sail-ui-kit';

<OperationsDashboard
  vessels={vesselData}
  onVesselSelect={handleVesselDetails}
  enableRealTimeUpdates={true}
  enableInteractiveCallbacks={true}
  showPerformanceMetrics={true}
  enableDrillDown={true}
/>
```

### IncidentReportForm
Comprehensive incident reporting system with workflow management, collaboration features, and maritime compliance integration.

**Enhanced Features (100+ props):**
- Advanced workflow management with step progression
- Collaboration features with commenting and approvals
- File attachments and evidence collection
- Auto-save capabilities with draft management
- Dynamic field configuration and templates
- Maritime authority integration and emergency response
- Comprehensive validation and audit trails

[📖 **View Complete Documentation**](../../../../guides/IncidentReportForm.md)

**Quick Start:**
```tsx
import { IncidentReportForm } from 'scomp-ui/sail-ui-kit';

<IncidentReportForm
  incident={incidentData}
  onSave={handleSave}
  enableWorkflow={true}
  enableComments={true}
  allowAttachments={true}
  autoSave={true}
  complianceChecks={maritimeRegulations}
/>
```

## Installation

```bash
npm install scomp-ui/sail-ui-kit
```

## Usage

```tsx
import { 
  OperationsDashboard, 
  IncidentReportForm,
  VesselStatusIndicator,
  SafetyRatingBadge 
} from 'scomp-ui/sail-ui-kit';
```

## Maritime Context Integration

These components are designed specifically for maritime operations and include:

- **Vessel-specific data handling** with fleet management support
- **Maritime regulatory compliance** including SOLAS, MARPOL, and STCW
- **Emergency response protocols** with automated authority notifications
- **Safety management integration** aligned with ISM Code requirements
- **Performance monitoring** with maritime KPIs and benchmarking

## Support & Documentation

- [Complete Component Documentation](../../../../guides/)
- [Maritime Integration Guide](../../../../guides/)
- [Best Practices & Patterns](../../../../guides/)

For technical support and questions, please refer to the comprehensive documentation guides.