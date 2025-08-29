# TMSAComplianceIndicator Component Guide

## Overview
TMSAComplianceIndicator displays TMSA (Tanker Management and Self Assessment) compliance status for maritime operations. It provides visual indicators for TMSA elements, compliance levels, and assessment progress optimized for tanker fleet management and oil company compliance systems.

## Component Interface

```typescript
interface TMSAComplianceIndicatorProps {
  element: TMSAElement;
  status: ComplianceStatus;
  score?: number;
  maxScore?: number;
  showElementCode?: boolean;
  showScore?: boolean;
  showProgressBar?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'detailed' | 'compact';
  className?: string;
  onClick?: () => void;
}

interface TMSAElement {
  id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
}

type ComplianceStatus = 'compliant' | 'non-compliant' | 'partial' | 'not-assessed' | 'under-review';
```

## Basic Usage

```jsx
import { TMSAComplianceIndicator } from 'scomp-ui';

function TMSAOverview() {
  const tmsaElements = [
    {
      element: { id: 'EL1', code: 'EL1', name: 'Management & Leadership' },
      status: 'compliant',
      score: 92
    },
    {
      element: { id: 'EL2', code: 'EL2', name: 'Shore HR Management' },
      status: 'partial',
      score: 76
    },
    {
      element: { id: 'EL3', code: 'EL3', name: 'Crewing Management' },
      status: 'non-compliant',
      score: 58
    },
    {
      element: { id: 'EL4', code: 'EL4', name: 'Technical Management' },
      status: 'under-review',
      score: 0
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-medium">TMSA Compliance Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tmsaElements.map(({ element, status, score }) => (
          <TMSAComplianceIndicator
            key={element.id}
            element={element}
            status={status}
            score={score}
            maxScore={100}
            showElementCode={true}
            showScore={true}
            showProgressBar={true}
            size="md"
          />
        ))}
      </div>
    </div>
  );
}
```

## TMSA Elements & Status Types

```jsx
function TMSAElementsOverview() {
  const tmsaElements = [
    { code: 'EL1', name: 'Management & Leadership', status: 'compliant', score: 92 },
    { code: 'EL2', name: 'Shore HR Management', status: 'compliant', score: 88 },
    { code: 'EL3', name: 'Crewing Management', status: 'partial', score: 76 },
    { code: 'EL4', name: 'Technical Management', status: 'compliant', score: 84 },
    { code: 'EL5', name: 'Navigation', status: 'partial', score: 72 },
    { code: 'EL6', name: 'Cargo Operations', status: 'non-compliant', score: 58 },
    { code: 'EL6A', name: 'Mooring Operations', status: 'compliant', score: 90 },
    { code: 'EL7', name: 'Management of Change', status: 'under-review', score: 0 },
    { code: 'EL8', name: 'Incident Investigation', status: 'compliant', score: 86 },
    { code: 'EL9', name: 'Safety', status: 'partial', score: 74 },
    { code: 'EL10', name: 'Environment & Energy Management', status: 'not-assessed', score: 0 },
    { code: 'EL11', name: 'Emergency & Contingency Planning', status: 'compliant', score: 88 },
    { code: 'EL12', name: 'Measurement, Analysis & Improvement', status: 'partial', score: 78 },
    { code: 'EL13', name: 'Dry Docking', status: 'compliant', score: 92 }
  ];

  const statusCounts = {
    compliant: tmsaElements.filter(e => e.status === 'compliant').length,
    partial: tmsaElements.filter(e => e.status === 'partial').length,
    'non-compliant': tmsaElements.filter(e => e.status === 'non-compliant').length,
    'under-review': tmsaElements.filter(e => e.status === 'under-review').length,
    'not-assessed': tmsaElements.filter(e => e.status === 'not-assessed').length
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-green-800 font-medium">{statusCounts.compliant}</div>
          <div className="text-green-600 text-sm">Compliant</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-yellow-800 font-medium">{statusCounts.partial}</div>
          <div className="text-yellow-600 text-sm">Partial</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">{statusCounts['non-compliant']}</div>
          <div className="text-red-600 text-sm">Non-Compliant</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-blue-800 font-medium">{statusCounts['under-review']}</div>
          <div className="text-blue-600 text-sm">Under Review</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-gray-800 font-medium">{statusCounts['not-assessed']}</div>
          <div className="text-gray-600 text-sm">Not Assessed</div>
        </div>
      </div>

      {/* Detailed Elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tmsaElements.map((element) => (
          <TMSAComplianceIndicator
            key={element.code}
            element={{
              id: element.code,
              code: element.code,
              name: element.name
            }}
            status={element.status}
            score={element.score}
            maxScore={100}
            showElementCode={true}
            showScore={true}
            showProgressBar={true}
            variant="detailed"
            size="md"
          />
        ))}
      </div>
    </div>
  );
}
```

## Detailed Compliance Dashboard

```jsx
import { CheckCircle, AlertTriangle, XCircle, Clock, HelpCircle } from 'lucide-react';

function TMSAComplianceDashboard() {
  const vesselCompliance = {
    vesselName: 'MT Atlantic Trader',
    vesselType: 'Oil Tanker',
    lastAssessment: '2024-02-15',
    nextAssessment: '2024-08-15',
    overallScore: 78,
    complianceLevel: 'partial',
    elements: [
      { code: 'EL1', name: 'Management & Leadership', status: 'compliant', score: 92, findings: 0 },
      { code: 'EL2', name: 'Shore HR Management', status: 'compliant', score: 88, findings: 1 },
      { code: 'EL3', name: 'Crewing Management', status: 'partial', score: 76, findings: 3 },
      { code: 'EL4', name: 'Technical Management', status: 'compliant', score: 84, findings: 2 },
      { code: 'EL5', name: 'Navigation', status: 'partial', score: 72, findings: 4 },
      { code: 'EL6', name: 'Cargo Operations', status: 'non-compliant', score: 58, findings: 7 },
      { code: 'EL6A', name: 'Mooring Operations', status: 'compliant', score: 90, findings: 0 },
      { code: 'EL7', name: 'Management of Change', status: 'under-review', score: 0, findings: 0 },
      { code: 'EL8', name: 'Incident Investigation', status: 'compliant', score: 86, findings: 1 },
      { code: 'EL9', name: 'Safety', status: 'partial', score: 74, findings: 5 }
    ]
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'partial': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'non-compliant': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'under-review': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'not-assessed': return <HelpCircle className="h-5 w-5 text-gray-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Vessel Header */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">{vesselCompliance.vesselName}</h2>
            <p className="text-gray-600">{vesselCompliance.vesselType}</p>
          </div>
          <TMSAComplianceIndicator
            element={{ id: 'OVERALL', code: 'OVERALL', name: 'Overall Compliance' }}
            status={vesselCompliance.complianceLevel}
            score={vesselCompliance.overallScore}
            maxScore={100}
            showScore={true}
            size="lg"
            variant="detailed"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Last Assessment</div>
            <div className="font-medium">{vesselCompliance.lastAssessment}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Next Assessment</div>
            <div className="font-medium">{vesselCompliance.nextAssessment}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Overall Score</div>
            <div className="font-medium">{vesselCompliance.overallScore}/100</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-sm text-gray-600">Total Findings</div>
            <div className="font-medium">
              {vesselCompliance.elements.reduce((sum, e) => sum + e.findings, 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Elements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vesselCompliance.elements.map((element) => (
          <div key={element.code} className="bg-white border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-[#16569e]">{element.code}</span>
                  {getStatusIcon(element.status)}
                </div>
                <h3 className="font-medium text-sm">{element.name}</h3>
              </div>
            </div>

            <TMSAComplianceIndicator
              element={{
                id: element.code,
                code: element.code,
                name: element.name
              }}
              status={element.status}
              score={element.score}
              maxScore={100}
              showScore={true}
              showProgressBar={true}
              variant="compact"
              size="sm"
            />

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-gray-600">Findings:</span>
              <span className={element.findings === 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {element.findings}
              </span>
            </div>

            {element.findings > 0 && (
              <button className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                View Findings →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Fleet TMSA Comparison

```jsx
function FleetTMSAComparison() {
  const fleetData = [
    { vessel: 'MT Atlantic Trader', overall: 78, el1: 92, el2: 88, el3: 76, el4: 84, el5: 72, el6: 58 },
    { vessel: 'MT Pacific Spirit', overall: 84, el1: 90, el2: 86, el3: 82, el4: 88, el5: 80, el6: 72 },
    { vessel: 'MT Nordic Star', overall: 91, el1: 94, el2: 92, el3: 88, el4: 90, el5: 89, el6: 85 },
    { vessel: 'MT Southern Cross', overall: 69, el1: 75, el2: 72, el3: 68, el4: 70, el5: 65, el6: 54 }
  ];

  const getComplianceStatus = (score) => {
    if (score >= 85) return 'compliant';
    if (score >= 70) return 'partial';
    if (score >= 50) return 'non-compliant';
    return 'not-assessed';
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Fleet TMSA Compliance Comparison</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 border-b">Vessel</th>
              <th className="text-center p-3 border-b">Overall</th>
              <th className="text-center p-3 border-b">EL1</th>
              <th className="text-center p-3 border-b">EL2</th>
              <th className="text-center p-3 border-b">EL3</th>
              <th className="text-center p-3 border-b">EL4</th>
              <th className="text-center p-3 border-b">EL5</th>
              <th className="text-center p-3 border-b">EL6</th>
            </tr>
          </thead>
          <tbody>
            {fleetData.map((vessel) => (
              <tr key={vessel.vessel} className="border-b">
                <td className="p-3 font-medium">{vessel.vessel}</td>
                <td className="p-3 text-center">
                  <TMSAComplianceIndicator
                    element={{ id: 'overall', code: 'OVERALL', name: 'Overall' }}
                    status={getComplianceStatus(vessel.overall)}
                    score={vessel.overall}
                    showScore={true}
                    variant="compact"
                    size="sm"
                  />
                </td>
                {['el1', 'el2', 'el3', 'el4', 'el5', 'el6'].map((element) => (
                  <td key={element} className="p-3 text-center">
                    <TMSAComplianceIndicator
                      element={{ id: element, code: element.toUpperCase(), name: element.toUpperCase() }}
                      status={getComplianceStatus(vessel[element])}
                      score={vessel[element]}
                      showScore={true}
                      variant="compact"
                      size="sm"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fleet Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium mb-3">Fleet Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="font-medium text-green-600">
              {fleetData.filter(v => v.overall >= 85).length}
            </div>
            <div className="text-sm text-gray-600">Fully Compliant</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-yellow-600">
              {fleetData.filter(v => v.overall >= 70 && v.overall < 85).length}
            </div>
            <div className="text-sm text-gray-600">Partial Compliance</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-red-600">
              {fleetData.filter(v => v.overall < 70).length}
            </div>
            <div className="text-sm text-gray-600">Non-Compliant</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-blue-600">
              {Math.round(fleetData.reduce((sum, v) => sum + v.overall, 0) / fleetData.length)}
            </div>
            <div className="text-sm text-gray-600">Fleet Average</div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Interactive TMSA Assessment

```jsx
function InteractiveTMSAAssessment() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [assessmentData, setAssessmentData] = useState({
    'EL1': { status: 'not-assessed', score: 0 },
    'EL2': { status: 'not-assessed', score: 0 },
    'EL3': { status: 'not-assessed', score: 0 }
  });

  const updateElementScore = (elementCode, score) => {
    const status = score >= 85 ? 'compliant' : score >= 70 ? 'partial' : score >= 50 ? 'non-compliant' : 'not-assessed';
    setAssessmentData(prev => ({
      ...prev,
      [elementCode]: { status, score }
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">TMSA Self-Assessment Tool</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(assessmentData).map(([code, data]) => (
          <div key={code} className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">
              {code} - {code === 'EL1' ? 'Management & Leadership' : code === 'EL2' ? 'Shore HR Management' : 'Crewing Management'}
            </h4>
            
            <TMSAComplianceIndicator
              element={{
                id: code,
                code: code,
                name: code === 'EL1' ? 'Management & Leadership' : code === 'EL2' ? 'Shore HR Management' : 'Crewing Management'
              }}
              status={data.status}
              score={data.score}
              maxScore={100}
              showElementCode={true}
              showScore={true}
              showProgressBar={true}
              variant="detailed"
              onClick={() => setSelectedElement(code)}
              className="cursor-pointer hover:scale-105 transition-transform"
            />
            
            <div className="mt-3">
              <label className="text-sm text-gray-600">Assessment Score:</label>
              <input
                type="range"
                min="0"
                max="100"
                value={data.score}
                onChange={(e) => updateElementScore(code, parseInt(e.target.value))}
                className="w-full mt-1"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>{data.score}</span>
                <span>100</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedElement && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">
            Assessment Guidelines for {selectedElement}
          </h4>
          <p className="text-blue-700 text-sm">
            {selectedElement === 'EL1' && "Assess leadership commitment, management system effectiveness, and continuous improvement processes."}
            {selectedElement === 'EL2' && "Evaluate shore-based HR policies, training programs, and personnel management systems."}
            {selectedElement === 'EL3' && "Review crew selection, training, competency assessment, and performance management."}
          </p>
          <button 
            onClick={() => setSelectedElement(null)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            Close Guidelines
          </button>
        </div>
      )}
    </div>
  );
}
```

## Key Features
- **TMSA Standard Compliance**: Aligned with official TMSA assessment framework
- **Element-Specific Indicators**: Visual status for all 13 TMSA elements
- **Score Integration**: Numerical scoring with visual progress indicators
- **Multiple Variants**: Default, detailed, and compact display options
- **Status Color Coding**: Intuitive color scheme for compliance levels
- **Progress Tracking**: Progress bars showing compliance percentage
- **Interactive Support**: Click handlers for detailed element views
- **Fleet Comparison**: Tools for comparing multiple vessels

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Independent of form systems
- **No external providers**: Works without additional setup

## Compliance Status Colors
- **Compliant**: Green (#22c55e) - Meets all requirements
- **Partial**: Yellow (#eab308) - Some gaps exist
- **Non-Compliant**: Red (#ef4444) - Significant gaps
- **Under Review**: Blue (#3b82f6) - Assessment in progress
- **Not Assessed**: Gray (#6b7280) - No assessment completed

## TMSA Element Reference
- **EL1**: Management & Leadership
- **EL2**: Shore HR Management
- **EL3**: Crewing Management
- **EL4**: Technical Management
- **EL5**: Navigation
- **EL6**: Cargo Operations
- **EL6A**: Mooring Operations
- **EL7**: Management of Change
- **EL8**: Incident Investigation
- **EL9**: Safety
- **EL10**: Environment & Energy Management
- **EL11**: Emergency & Contingency Planning
- **EL12**: Measurement, Analysis & Improvement
- **EL13**: Dry Docking

## Best Practices
1. **Regular Assessment**: Conduct assessments according to TMSA schedule
2. **Evidence-Based Scoring**: Base scores on documented evidence
3. **Continuous Improvement**: Use results to drive improvement plans
4. **Fleet Consistency**: Apply consistent assessment criteria across fleet
5. **Stakeholder Engagement**: Involve relevant stakeholders in assessment process
6. **Documentation**: Maintain proper records of assessment findings
7. **Action Planning**: Develop corrective action plans for non-compliant elements

## Common Use Cases
- TMSA self-assessment displays
- Fleet compliance dashboards
- Oil company vetting preparation
- Terminal inspection readiness
- Compliance tracking systems
- Assessment progress monitoring
- Regulatory reporting interfaces
- Management review presentations
- Training and awareness programs
- Continuous improvement tracking