import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Ship, AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VesselStatus {
  status: "active" | "inactive" | "maintenance" | "emergency" | "port";
  location?: string;
  lastUpdate?: string;
  additionalInfo?: string;
}

interface VesselStatusIndicatorProps {
  vessel: {
    name: string;
    imoNumber?: string;
    vesselType: string;
    status: VesselStatus;
  };
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
}

const statusConfig = {
  active: {
    label: "Active",
    color: "bg-green-500",
    textColor: "text-green-700",
    icon: CheckCircle,
    description: "Vessel is operational and underway"
  },
  inactive: {
    label: "Inactive", 
    color: "bg-gray-500",
    textColor: "text-gray-700",
    icon: Clock,
    description: "Vessel is not currently active"
  },
  maintenance: {
    label: "Maintenance",
    color: "bg-yellow-500", 
    textColor: "text-yellow-700",
    icon: AlertTriangle,
    description: "Vessel is under maintenance"
  },
  emergency: {
    label: "Emergency",
    color: "bg-red-500",
    textColor: "text-red-700", 
    icon: XCircle,
    description: "Emergency situation on vessel"
  },
  port: {
    label: "In Port",
    color: "bg-blue-500",
    textColor: "text-blue-700",
    icon: Ship,
    description: "Vessel is docked in port"
  }
};

export const VesselStatusIndicator: React.FC<VesselStatusIndicatorProps> = ({
  vessel,
  size = "md",
  showDetails = false
}) => {
  const config = statusConfig[vessel.status.status];
  const IconComponent = config.icon;
  
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };
  
  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  const StatusBadge = () => (
    <Badge 
      variant="outline" 
      className={cn(
        "flex items-center gap-1.5",
        config.textColor,
        textSizeClasses[size]
      )}
    >
      <div className={cn("rounded-full", sizeClasses[size], config.color)} />
      <IconComponent className={sizeClasses[size]} />
      {config.label}
    </Badge>
  );

  const content = (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Ship className="h-4 w-4" />
        <span className="font-medium">{vessel.name}</span>
        {vessel.imoNumber && (
          <span className="text-xs text-muted-foreground">IMO: {vessel.imoNumber}</span>
        )}
      </div>
      <div className="text-sm">
        <div>Type: {vessel.vesselType}</div>
        <div>Status: {config.description}</div>
        {vessel.status.location && <div>Location: {vessel.status.location}</div>}
        {vessel.status.lastUpdate && <div>Last Update: {vessel.status.lastUpdate}</div>}
        {vessel.status.additionalInfo && <div>Info: {vessel.status.additionalInfo}</div>}
      </div>
    </div>
  );

  if (showDetails) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              <StatusBadge />
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            {content}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <StatusBadge />;
};