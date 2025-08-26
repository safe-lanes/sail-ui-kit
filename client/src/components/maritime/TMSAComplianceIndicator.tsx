import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, XCircle, AlertTriangle, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TMSAElement {
  id: string;
  name: string;
  code: string; // "EL1", "EL2", etc.
  description: string;
}

export interface ComplianceStatus {
  elementId: string;
  status: "compliant" | "non_compliant" | "partially_compliant" | "pending_review" | "not_assessed";
  score?: number; // 0-100
  lastAuditDate?: string;
  nextAuditDate?: string;
  findings?: number;
  recommendations?: number;
  criticalFindings?: number;
}

interface TMSAComplianceIndicatorProps {
  element: TMSAElement;
  status: ComplianceStatus;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
  showScore?: boolean;
}

const statusConfig = {
  compliant: {
    label: "Compliant",
    color: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
    icon: CheckCircle,
    description: "Fully compliant with TMSA requirements"
  },
  non_compliant: {
    label: "Non-Compliant", 
    color: "bg-red-500",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
    icon: XCircle,
    description: "Does not meet TMSA requirements"
  },
  partially_compliant: {
    label: "Partially Compliant",
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-50",
    icon: AlertTriangle,
    description: "Partially meets TMSA requirements"
  },
  pending_review: {
    label: "Pending Review",
    color: "bg-blue-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
    icon: Clock,
    description: "Assessment pending review"
  },
  not_assessed: {
    label: "Not Assessed",
    color: "bg-gray-500",
    textColor: "text-gray-700",
    bgColor: "bg-gray-50",
    icon: FileText,
    description: "No assessment completed"
  }
};

export const TMSAComplianceIndicator: React.FC<TMSAComplianceIndicatorProps> = ({
  element,
  status,
  size = "md",
  showDetails = false,
  showScore = true
}) => {
  const config = statusConfig[status.status];
  const IconComponent = config.icon;
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };
  
  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const ComplianceBadge = () => (
    <div className="flex items-center gap-2">
      <Badge 
        className={cn(
          "flex items-center gap-1.5 border-0",
          config.textColor,
          config.bgColor,
          textSizeClasses[size]
        )}
      >
        <IconComponent className={sizeClasses[size]} />
        <span className="font-medium">{element.code}</span>
        <span>{config.label}</span>
      </Badge>
      {showScore && status.score !== undefined && (
        <span className={cn("font-medium", textSizeClasses[size], getScoreColor(status.score))}>
          {status.score}%
        </span>
      )}
    </div>
  );

  const content = (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        <span className="font-medium">{element.name}</span>
      </div>
      
      <div className="text-sm space-y-2">
        <div>{element.description}</div>
        
        <div className="space-y-1">
          <div>Status: {config.description}</div>
          {status.score !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Compliance Score:</span>
                <span className={getScoreColor(status.score)}>
                  {status.score}%
                </span>
              </div>
              <Progress value={status.score} className="h-2" />
            </div>
          )}
        </div>

        {(status.findings !== undefined || status.recommendations !== undefined || status.criticalFindings !== undefined) && (
          <div className="space-y-1">
            <div className="font-medium">Assessment Results:</div>
            {status.criticalFindings !== undefined && status.criticalFindings > 0 && (
              <div className="text-red-600">Critical Findings: {status.criticalFindings}</div>
            )}
            {status.findings !== undefined && (
              <div>Total Findings: {status.findings}</div>
            )}
            {status.recommendations !== undefined && (
              <div>Recommendations: {status.recommendations}</div>
            )}
          </div>
        )}

        <div className="space-y-1">
          {status.lastAuditDate && (
            <div>Last Audit: {status.lastAuditDate}</div>
          )}
          {status.nextAuditDate && (
            <div>Next Audit: {status.nextAuditDate}</div>
          )}
        </div>
      </div>
    </div>
  );

  if (showDetails) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              <ComplianceBadge />
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm">
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <ComplianceBadge />;
};