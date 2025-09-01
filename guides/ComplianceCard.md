# ComplianceCard Component Guide

## Overview
The ComplianceCard component displays maritime compliance status and regulatory metrics for vessels and fleet operations. It provides visual indicators for TMSA, ISM Code, MLC, and other maritime regulations with TMSA-compliant styling optimized for compliance management dashboards.

## Component Interface

```typescript
interface ComplianceCardProps {
  vessel?: VesselInfo;
  complianceData: ComplianceData;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'summary' | 'detailed' | 'audit';
  showTrends?: boolean;
  onDetailsClick?: () => void;
  onAuditClick?: () => void;
  className?: string;
}

interface ComplianceData {
  overall: number;
  categories: {
    tmsa: ComplianceCategory;
    ism: ComplianceCategory;
    mlc: ComplianceCategory;
    stcw: ComplianceCategory;
    isps: ComplianceCategory;
    marpol: ComplianceCategory;
  };
  lastAudit: {
    date: string;
    type: string;
    score: number;
    auditor: string;
  };
  upcomingRenewals: RenewalItem[];
  deficiencies: DeficiencyItem[];
  trends: TrendData;
}

interface ComplianceCategory {
  score: number;
  status: 'compliant' | 'minor-issues' | 'major-issues' | 'non-compliant';
  lastReview: string;
  nextReview: string;
  certificateExpiry?: string;
}
```

## Key Features
- **Maritime Regulations**: Complete coverage of international maritime standards
- **Visual Indicators**: Clear compliance status with color-coded metrics
- **Trend Analysis**: Historical compliance performance tracking
- **Audit Integration**: Detailed audit findings and action items
- **Renewal Tracking**: Certificate expiry and renewal monitoring

## Basic Usage

```tsx
import { ComplianceCard } from 'scomp-ui/sail-ui-kit';

function ComplianceOverview() {
  const complianceData = {
    overall: 92,
    categories: {
      tmsa: {
        score: 95,
        status: 'compliant',
        lastReview: '2024-01-15',
        nextReview: '2024-07-15',
        certificateExpiry: '2025-01-15'
      },
      ism: {
        score: 88,
        status: 'minor-issues',
        lastReview: '2023-12-10',
        nextReview: '2024-06-10',
        certificateExpiry: '2024-12-10'
      },
      mlc: {
        score: 94,
        status: 'compliant',
        lastReview: '2024-02-20',
        nextReview: '2024-08-20',
        certificateExpiry: '2025-02-20'
      }
    },
    lastAudit: {
      date: '2024-01-15',
      type: 'TMSA Audit',
      score: 92,
      auditor: 'Lloyd\'s Register'
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-semibold text-[#16569e]">
        MV Container Express - Compliance Status
      </h3>
      
      <ComplianceCard
        complianceData={complianceData}
        variant="summary"
        showTrends={true}
        onDetailsClick={() => console.log('Show compliance details')}
        onAuditClick={() => console.log('Show audit details')}
      />
    </div>
  );
}
```

## Detailed Compliance Dashboard

```tsx
function DetailedComplianceDashboard() {
  const fleetComplianceData = [
    {
      vessel: {
        id: 'mv-container-express',
        name: 'MV Container Express',
        type: 'Container Ship',
        flag: 'Panama',
        imo: '9123456'
      },
      complianceData: {
        overall: 95,
        categories: {
          tmsa: {
            score: 98,
            status: 'compliant' as const,
            lastReview: '2024-01-15',
            nextReview: '2024-07-15',
            certificateExpiry: '2025-01-15'
          },
          ism: {
            score: 92,
            status: 'compliant' as const,
            lastReview: '2023-12-10',
            nextReview: '2024-06-10',
            certificateExpiry: '2024-12-10'
          },
          mlc: {
            score: 96,
            status: 'compliant' as const,
            lastReview: '2024-02-20',
            nextReview: '2024-08-20',
            certificateExpiry: '2025-02-20'
          },
          stcw: {
            score: 94,
            status: 'compliant' as const,
            lastReview: '2024-01-10',
            nextReview: '2024-07-10',
            certificateExpiry: '2025-01-10'
          },
          isps: {
            score: 97,
            status: 'compliant' as const,
            lastReview: '2023-11-15',
            nextReview: '2024-05-15',
            certificateExpiry: '2024-11-15'
          },
          marpol: {
            score: 93,
            status: 'compliant' as const,
            lastReview: '2024-01-05',
            nextReview: '2024-07-05',
            certificateExpiry: '2025-01-05'
          }
        },
        lastAudit: {
          date: '2024-01-15',
          type: 'TMSA Level 3 Audit',
          score: 95,
          auditor: 'DNV Maritime'
        },
        upcomingRenewals: [
          {
            id: '1',
            certificate: 'ISM Certificate',
            expiryDate: '2024-12-10',
            daysRemaining: 90,
            authority: 'Flag State Administration',
            status: 'pending'
          },
          {
            id: '2',
            certificate: 'ISPS Certificate',
            expiryDate: '2024-11-15',
            daysRemaining: 65,
            authority: 'Port State Control',
            status: 'in-progress'
          }
        ],
        deficiencies: [],
        trends: {
          last12Months: [88, 90, 92, 91, 93, 94, 92, 95, 96, 94, 95, 95],
          improvement: 7
        }
      }
    },
    {
      vessel: {
        id: 'mt-crude-carrier',
        name: 'MT Crude Carrier',
        type: 'Oil Tanker',
        flag: 'Liberia',
        imo: '9234567'
      },
      complianceData: {
        overall: 87,
        categories: {
          tmsa: {
            score: 90,
            status: 'minor-issues' as const,
            lastReview: '2023-11-20',
            nextReview: '2024-05-20',
            certificateExpiry: '2024-11-20'
          },
          ism: {
            score: 85,
            status: 'minor-issues' as const,
            lastReview: '2023-10-15',
            nextReview: '2024-04-15',
            certificateExpiry: '2024-10-15'
          },
          mlc: {
            score: 88,
            status: 'minor-issues' as const,
            lastReview: '2023-12-05',
            nextReview: '2024-06-05',
            certificateExpiry: '2024-12-05'
          },
          stcw: {
            score: 86,
            status: 'minor-issues' as const,
            lastReview: '2023-11-30',
            nextReview: '2024-05-30',
            certificateExpiry: '2024-11-30'
          },
          isps: {
            score: 89,
            status: 'minor-issues' as const,
            lastReview: '2023-10-25',
            nextReview: '2024-04-25',
            certificateExpiry: '2024-10-25'
          },
          marpol: {
            score: 84,
            status: 'major-issues' as const,
            lastReview: '2023-12-01',
            nextReview: '2024-03-01',
            certificateExpiry: '2024-12-01'
          }
        },
        lastAudit: {
          date: '2023-11-20',
          type: 'TMSA Level 2 Audit',
          score: 87,
          auditor: 'Bureau Veritas'
        },
        upcomingRenewals: [
          {
            id: '3',
            certificate: 'ISM Certificate',
            expiryDate: '2024-10-15',
            daysRemaining: 35,
            authority: 'Flag State Administration',
            status: 'urgent'
          },
          {
            id: '4',
            certificate: 'MARPOL Certificate',
            expiryDate: '2024-12-01',
            daysRemaining: 82,
            authority: 'Flag State Administration',
            status: 'pending'
          }
        ],
        deficiencies: [
          {
            id: 'DEF-001',
            description: 'Oil discharge monitoring equipment calibration overdue',
            category: 'MARPOL',
            severity: 'major',
            foundDate: '2023-11-20',
            dueDate: '2024-03-20',
            status: 'open'
          },
          {
            id: 'DEF-002',
            description: 'Crew training records incomplete for emergency procedures',
            category: 'STCW',
            severity: 'minor',
            foundDate: '2023-11-30',
            dueDate: '2024-02-28',
            status: 'in-progress'
          }
        ],
        trends: {
          last12Months: [82, 81, 83, 85, 84, 86, 87, 85, 88, 87, 86, 87],
          improvement: 5
        }
      }
    }
  ];

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'minor-issues': return 'bg-yellow-100 text-yellow-800';
      case 'major-issues': return 'bg-orange-100 text-orange-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#16569e] mb-2">
          Fleet Compliance Dashboard
        </h1>
        <p className="text-gray-600">
          Comprehensive compliance monitoring across all vessels and regulations
        </p>
      </div>

      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fleet Average</p>
              <p className="text-2xl font-bold text-[#16569e]">
                {Math.round(fleetComplianceData.reduce((acc, v) => acc + v.complianceData.overall, 0) / fleetComplianceData.length)}%
              </p>
            </div>
            <Shield className="h-8 w-8 text-[#16569e]" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliant Vessels</p>
              <p className="text-2xl font-bold text-green-600">
                {fleetComplianceData.filter(v => v.complianceData.overall >= 90).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Renewals</p>
              <p className="text-2xl font-bold text-yellow-600">
                {fleetComplianceData.reduce((acc, v) => acc + v.complianceData.upcomingRenewals.length, 0)}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open Deficiencies</p>
              <p className="text-2xl font-bold text-red-600">
                {fleetComplianceData.reduce((acc, v) => acc + v.complianceData.deficiencies.length, 0)}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Individual Vessel Compliance */}
      <div className="space-y-6">
        {fleetComplianceData.map((vesselData) => (
          <div key={vesselData.vessel.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{vesselData.vessel.name}</h3>
                <p className="text-sm text-gray-600">
                  {vesselData.vessel.type} • Flag: {vesselData.vessel.flag} • IMO: {vesselData.vessel.imo}
                </p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getComplianceColor(vesselData.complianceData.overall)}`}>
                  {vesselData.complianceData.overall}%
                </div>
                <p className="text-sm text-gray-600">Overall Compliance</p>
              </div>
            </div>

            {/* Compliance Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {Object.entries(vesselData.complianceData.categories).map(([key, category]) => (
                <div key={key} className="text-center p-3 border border-gray-200 rounded-lg">
                  <div className="text-xs font-medium text-gray-500 uppercase mb-1">{key}</div>
                  <div className={`text-lg font-bold ${getComplianceColor(category.score)}`}>
                    {category.score}%
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(category.status)}`}>
                    {category.status.replace('-', ' ')}
                  </span>
                  {category.certificateExpiry && (
                    <div className="text-xs text-gray-500 mt-1">
                      Expires: {formatDate(category.certificateExpiry)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Last Audit */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">Last Audit</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-800">Type:</span>
                  <div className="text-blue-700">{vesselData.complianceData.lastAudit.type}</div>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Date:</span>
                  <div className="text-blue-700">{formatDate(vesselData.complianceData.lastAudit.date)}</div>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Score:</span>
                  <div className="text-blue-700">{vesselData.complianceData.lastAudit.score}%</div>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Auditor:</span>
                  <div className="text-blue-700">{vesselData.complianceData.lastAudit.auditor}</div>
                </div>
              </div>
            </div>

            {/* Upcoming Renewals */}
            {vesselData.complianceData.upcomingRenewals.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Upcoming Certificate Renewals</h4>
                <div className="space-y-2">
                  {vesselData.complianceData.upcomingRenewals.map((renewal) => {
                    const daysRemaining = getDaysUntilExpiry(renewal.expiryDate);
                    const isUrgent = daysRemaining <= 30;
                    
                    return (
                      <div key={renewal.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                        isUrgent ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
                      }`}>
                        <div>
                          <div className="font-medium text-gray-900">{renewal.certificate}</div>
                          <div className="text-sm text-gray-600">{renewal.authority}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${isUrgent ? 'text-red-600' : 'text-yellow-600'}`}>
                            {daysRemaining} days remaining
                          </div>
                          <div className="text-sm text-gray-600">
                            Expires: {formatDate(renewal.expiryDate)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Deficiencies */}
            {vesselData.complianceData.deficiencies.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Open Deficiencies</h4>
                <div className="space-y-2">
                  {vesselData.complianceData.deficiencies.map((deficiency) => (
                    <div key={deficiency.id} className="flex items-start justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{deficiency.id}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            deficiency.severity === 'major' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {deficiency.severity}
                          </span>
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                            {deficiency.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{deficiency.description}</p>
                        <div className="text-xs text-gray-600 mt-1">
                          Found: {formatDate(deficiency.foundDate)} • Due: {formatDate(deficiency.dueDate)}
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        deficiency.status === 'open' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {deficiency.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Global Compliance Summary */}
      <div className="bg-[#16569e] text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Fleet Compliance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-2xl font-bold">
              {Math.round(fleetComplianceData.reduce((acc, v) => acc + v.complianceData.overall, 0) / fleetComplianceData.length)}%
            </div>
            <div className="text-sm opacity-90">Average Fleet Compliance</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {fleetComplianceData.reduce((acc, v) => acc + v.complianceData.deficiencies.length, 0)}
            </div>
            <div className="text-sm opacity-90">Total Open Deficiencies</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {fleetComplianceData.reduce((acc, v) => acc + v.complianceData.upcomingRenewals.filter(r => getDaysUntilExpiry(r.expiryDate) <= 90).length, 0)}
            </div>
            <div className="text-sm opacity-90">Renewals Due (90 days)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Performance Considerations

- **Data Caching**: Efficient caching of compliance data and audit results
- **Real-time Updates**: WebSocket integration for compliance status changes
- **Chart Optimization**: Optimized rendering for trend charts and metrics
- **Responsive Design**: Adaptive layouts for different screen sizes

## Accessibility Features

- **Screen Reader Support**: Proper ARIA labels for compliance metrics
- **Color Accessibility**: Multiple indicators beyond color coding
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: WCAG compliant color schemes

## Common Patterns

```tsx
// Basic compliance overview
<ComplianceCard
  complianceData={complianceData}
  variant="summary"
/>

// Detailed audit view
<ComplianceCard
  complianceData={complianceData}
  variant="audit"
  showTrends={true}
/>

// Interactive compliance management
<ComplianceCard
  complianceData={complianceData}
  onDetailsClick={showDetails}
  onAuditClick={scheduleAudit}
/>
```

## Integration with Maritime Systems

The ComplianceCard component integrates seamlessly with:
- **Audit Management**: Digital audit workflows and documentation
- **Certificate Tracking**: Automated renewal and expiry management
- **Regulatory Reporting**: Compliance reporting to maritime authorities
- **Quality Management**: ISM and TMSA quality system integration
- **Training Systems**: Compliance-based training and competency tracking

Use this component to maintain clear visibility of regulatory compliance status and ensure adherence to international maritime standards.