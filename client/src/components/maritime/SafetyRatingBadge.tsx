import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Shield, ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";
import { cn } from "@/lib/utils";

export type SafetyRating = 1 | 2 | 3 | 4 | 5;

export interface SafetyMetrics {
  competenceRating?: number;
  behavioralRating?: number;
  overallRating?: number;
  lastAssessmentDate?: string;
  assessmentType?: string;
  riskLevel?: "low" | "medium" | "high" | "critical";
}

interface SafetyRatingBadgeProps {
  rating: SafetyRating;
  metrics?: SafetyMetrics;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
  type?: "crew" | "vessel" | "incident" | "compliance";
}

const ratingConfig = {
  1: {
    label: "Critical",
    color: "bg-red-600",
    textColor: "text-red-600", 
    bgColor: "bg-red-50",
    icon: ShieldX,
    description: "Critical safety concerns - immediate action required"
  },
  2: {
    label: "Poor",
    color: "bg-red-400",
    textColor: "text-red-500",
    bgColor: "bg-red-50",
    icon: ShieldAlert,
    description: "Poor safety rating - significant improvements needed"
  },
  3: {
    label: "Fair",
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    icon: ShieldAlert,
    description: "Fair safety rating - some improvements recommended"
  },
  4: {
    label: "Good",
    color: "bg-green-500",
    textColor: "text-green-600",
    bgColor: "bg-green-50",
    icon: ShieldCheck,
    description: "Good safety rating - meets expected standards"
  },
  5: {
    label: "Excellent",
    color: "bg-green-600",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
    icon: ShieldCheck,
    description: "Excellent safety rating - exceeds expectations"
  }
};

const riskLevelConfig = {
  low: { color: "text-green-600", label: "Low Risk" },
  medium: { color: "text-yellow-600", label: "Medium Risk" },
  high: { color: "text-orange-600", label: "High Risk" },
  critical: { color: "text-red-600", label: "Critical Risk" }
};

export const SafetyRatingBadge: React.FC<SafetyRatingBadgeProps> = ({
  rating,
  metrics,
  size = "md",
  showDetails = false,
  type = "crew"
}) => {
  const config = ratingConfig[rating];
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

  const paddingClasses = {
    sm: "px-2 py-0.5",
    md: "px-2.5 py-1",
    lg: "px-3 py-1.5"
  };

  const RatingBadge = () => (
    <Badge 
      className={cn(
        "flex items-center gap-1.5 border-0",
        config.textColor,
        config.bgColor,
        textSizeClasses[size],
        paddingClasses[size]
      )}
    >
      <IconComponent className={sizeClasses[size]} />
      <span className="font-medium">{rating.toFixed(1)}</span>
      <span>{config.label}</span>
    </Badge>
  );

  const content = (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4" />
        <span className="font-medium capitalize">{type} Safety Rating</span>
      </div>
      <div className="text-sm space-y-1">
        <div>Overall Rating: {rating.toFixed(1)}/5.0 ({config.label})</div>
        {metrics?.competenceRating && (
          <div>Competence: {metrics.competenceRating.toFixed(1)}/5.0</div>
        )}
        {metrics?.behavioralRating && (
          <div>Behavioral: {metrics.behavioralRating.toFixed(1)}/5.0</div>
        )}
        {metrics?.riskLevel && (
          <div className={riskLevelConfig[metrics.riskLevel].color}>
            Risk Level: {riskLevelConfig[metrics.riskLevel].label}
          </div>
        )}
        {metrics?.lastAssessmentDate && (
          <div>Last Assessment: {metrics.lastAssessmentDate}</div>
        )}
        {metrics?.assessmentType && (
          <div>Assessment Type: {metrics.assessmentType}</div>
        )}
        <div className="pt-1 text-xs text-muted-foreground">
          {config.description}
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
              <RatingBadge />
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <RatingBadge />;
};