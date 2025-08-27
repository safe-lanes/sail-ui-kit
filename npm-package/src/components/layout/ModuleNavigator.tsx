import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { 
  Grid3X3, 
  BarChart3, 
  Users, 
  Wrench, 
  Navigation, 
  Package, 
  Shield, 
  AlertTriangle, 
  Leaf, 
  LifeBuoy,
  ClipboardCheck,
  Lock,
  FileText
} from 'lucide-react';
import type { ModuleNavigatorProps, Module } from '../../types/layout';

/**
 * Module Navigator Component
 * Allows switching between different TMSA modules
 */
export function ModuleNavigator({ 
  currentModule, 
  onModuleChange,
  availableModules 
}: ModuleNavigatorProps) {
  const [showModuleDialog, setShowModuleDialog] = useState(false);

  // Default TMSA modules
  const defaultModules: Module[] = [
    {
      id: "crewing",
      name: "Crewing",
      icon: <Users className="h-5 w-5" />,
      description: "Crew management and appraisals",
      available: true,
      tmsaElement: "EL3"
    },
    {
      id: "technical",
      name: "Technical",
      icon: <Wrench className="h-5 w-5" />,
      description: "Technical management systems",
      available: true,
      tmsaElement: "EL4"
    },
    {
      id: "navigation",
      name: "Navigation",
      icon: <Navigation className="h-5 w-5" />,
      description: "Navigation and bridge management",
      available: true,
      tmsaElement: "EL5"
    },
    {
      id: "cargo",
      name: "Cargo Operations",
      icon: <Package className="h-5 w-5" />,
      description: "Cargo handling and operations",
      available: true,
      tmsaElement: "EL6"
    },
    {
      id: "safety",
      name: "Safety",
      icon: <Shield className="h-5 w-5" />,
      description: "Safety management system",
      available: true,
      tmsaElement: "EL9"
    },
    {
      id: "incident",
      name: "Incident Investigation",
      icon: <AlertTriangle className="h-5 w-5" />,
      description: "Incident reporting and investigation",
      available: true,
      tmsaElement: "EL8"
    },
    {
      id: "environment",
      name: "Environment",
      icon: <Leaf className="h-5 w-5" />,
      description: "Environmental management",
      available: true,
      tmsaElement: "EL10"
    },
    {
      id: "emergency",
      name: "Emergency",
      icon: <LifeBuoy className="h-5 w-5" />,
      description: "Emergency response management",
      available: true,
      tmsaElement: "EL11"
    },
    {
      id: "audit",
      name: "Audits & Inspections",
      icon: <ClipboardCheck className="h-5 w-5" />,
      description: "Audit and inspection management",
      available: true,
      tmsaElement: "EL12"
    },
    {
      id: "security",
      name: "Security",
      icon: <Lock className="h-5 w-5" />,
      description: "Security and cyber security",
      available: true,
      tmsaElement: "EL13"
    },
    {
      id: "management",
      name: "Management",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Management and leadership",
      available: true,
      tmsaElement: "EL1"
    },
    {
      id: "documentation",
      name: "Documentation",
      icon: <FileText className="h-5 w-5" />,
      description: "Document management system",
      available: false,
      tmsaElement: "EL7"
    }
  ];

  const modules = availableModules || defaultModules;

  const handleModuleSelect = (moduleId: string) => {
    onModuleChange(moduleId);
    setShowModuleDialog(false);
  };

  return (
    <>
      <div 
        className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" 
        onClick={() => setShowModuleDialog(true)}
      >
        <div className="w-6 h-6 mb-1">
          <Grid3X3 className="h-6 w-6 text-[#4f5863]" />
        </div>
        <div className="text-[#4f5863] text-[10px] font-normal font-['Mulish',Helvetica]">
          Modules
        </div>
      </div>

      <Dialog open={showModuleDialog} onOpenChange={setShowModuleDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select TMSA Module</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {modules.map((module: Module) => (
              <Button
                key={module.id}
                variant={currentModule === module.id ? "default" : "ghost"}
                className="h-auto p-4 justify-start text-left"
                onClick={() => handleModuleSelect(module.id)}
                disabled={!module.available}
              >
                <div className="flex flex-col items-start gap-2 w-full">
                  <div className="flex items-center gap-3 w-full">
                    <div className={`p-2 rounded-lg ${
                      currentModule === module.id 
                        ? 'bg-white/20' 
                        : 'bg-gray-100'
                    }`}>
                      {module.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-2">
                        {module.name}
                        {module.tmsaElement && (
                          <Badge 
                            variant="secondary" 
                            className="text-xs"
                          >
                            {module.tmsaElement}
                          </Badge>
                        )}
                        {!module.available && (
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                          >
                            Soon
                          </Badge>
                        )}
                      </div>
                      {module.description && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {module.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>TMSA Elements:</strong> Each module corresponds to a specific TMSA (Tanker Management Self Assessment) element for comprehensive maritime compliance.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}