# Accordion Component Implementation Guide

## Component Overview
The `Accordion` component from `scomp-ui/sail-ui-kit` provides a collapsible content interface for organizing information in expandable sections. Perfect for FAQs, documentation, and detailed vessel information panels.

## Props Interface
```typescript
interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  orientation?: "horizontal" | "vertical";
  className?: string;
  children: React.ReactNode;
}

interface AccordionItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface AccordionTriggerProps {
  className?: string;
  children: React.ReactNode;
}

interface AccordionContentProps {
  className?: string;
  children: React.ReactNode;
}
```

## Basic Usage Example
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "scomp-ui/sail-ui-kit";

function VesselDocumentationAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="certificates">
        <AccordionTrigger>Vessel Certificates</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Safety Certificate: Valid until Dec 2025</p>
            <p>Radio Certificate: Valid until Jun 2025</p>
            <p>Load Line Certificate: Valid until Aug 2025</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="equipment">
        <AccordionTrigger>Safety Equipment</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Life Rafts: 4 units - Last serviced Mar 2024</p>
            <p>Fire Extinguishers: 24 units - All current</p>
            <p>EPIRB: Active - Battery expires Nov 2025</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="inspections">
        <AccordionTrigger>Recent Inspections</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Port State Control: Singapore - Dec 2024 (No deficiencies)</p>
            <p>Flag State Inspection: Jan 2024 (2 minor deficiencies - closed)</p>
            <p>Vetting Inspection: Shell - Nov 2024 (Score: 87/100)</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## Advanced Maritime Implementation
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";

interface TMSAElementData {
  id: string;
  name: string;
  score: number;
  status: "compliant" | "non-compliant" | "pending";
  lastAudit: string;
  nextAudit: string;
  findings: number;
}

function TMSAComplianceAccordion({ elements }: { elements: TMSAElementData[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">TMSA Elements Overview</h3>
      
      <Accordion type="multiple" className="w-full">
        {elements.map((element) => (
          <AccordionItem key={element.id} value={element.id}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full mr-4">
                <span className="text-left">{element.name}</span>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={element.status === "compliant" ? "default" : "destructive"}
                  >
                    {element.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Score: {element.score}%
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-medium mb-2">Audit Information</h4>
                  <p className="text-sm">Last Audit: {element.lastAudit}</p>
                  <p className="text-sm">Next Audit: {element.nextAudit}</p>
                  <p className="text-sm">Outstanding Findings: {element.findings}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Compliance Score</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        element.score >= 80 ? 'bg-green-600' : 
                        element.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${element.score}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1">{element.score}% compliant</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **TanStack Query**: Optional for dynamic content loading
- **Form Context**: Not required unless used within forms

## Maritime-Specific Use Cases
1. **TMSA Element Breakdown**: Expandable sections for each TMSA element with compliance details
2. **Vessel Documentation**: Organize certificates, inspections, and equipment records
3. **Crew Information**: Expandable crew member details with certifications and training
4. **Port Information**: Detailed port procedures, restrictions, and requirements
5. **Cargo Operations**: Step-by-step cargo handling procedures and safety protocols

## Integration with Fleet Management
```tsx
// Example: Fleet vessel details with accordion
function FleetVesselDetails({ vessel }: { vessel: Vessel }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{vessel.name}</h2>
        <Badge variant="outline">{vessel.status}</Badge>
      </div>
      
      <Accordion type="single" collapsible defaultValue="overview">
        <AccordionItem value="overview">
          <AccordionTrigger>Vessel Overview</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>IMO:</strong> {vessel.imo}</p>
                <p><strong>Flag:</strong> {vessel.flag}</p>
                <p><strong>Built:</strong> {vessel.yearBuilt}</p>
              </div>
              <div>
                <p><strong>DWT:</strong> {vessel.dwt.toLocaleString()} MT</p>
                <p><strong>Length:</strong> {vessel.length} m</p>
                <p><strong>Beam:</strong> {vessel.beam} m</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="position">
          <AccordionTrigger>Current Position & Voyage</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p><strong>Last Position:</strong> {vessel.lastPosition}</p>
              <p><strong>Next Port:</strong> {vessel.nextPort}</p>
              <p><strong>ETA:</strong> {vessel.eta}</p>
              <p><strong>Speed:</strong> {vessel.speed} knots</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="crew">
          <AccordionTrigger>Crew Information</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p><strong>Total Crew:</strong> {vessel.crewCount}</p>
              <p><strong>Nationalities:</strong> {vessel.crewNationalities.join(", ")}</p>
              <p><strong>Master:</strong> {vessel.master}</p>
              <p><strong>Chief Engineer:</strong> {vessel.chiefEngineer}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
```

## Styling and Theming
The Accordion component follows maritime blue theme (#16569e) and supports:
- **Responsive design**: Adapts to mobile and desktop layouts
- **Custom animations**: Smooth expand/collapse transitions
- **Maritime styling**: Consistent with TMSA compliance applications
- **Dark mode support**: Automatic theme switching

## Troubleshooting
1. **Content not expanding**: Ensure `AccordionItem` has unique `value` prop
2. **Multiple items not working**: Set `type="multiple"` on parent Accordion
3. **Default open not working**: Check `defaultValue` matches item `value`
4. **Styling issues**: Verify className prop usage and Tailwind CSS setup
5. **Content overflow**: Use proper spacing and responsive classes

## Best Practices
- Use descriptive trigger text for maritime operations
- Include visual indicators for compliance status
- Group related maritime information logically
- Implement loading states for dynamic content
- Provide clear visual hierarchy with badges and formatting