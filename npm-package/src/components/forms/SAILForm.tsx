import React, { useState } from 'react';
import { ArrowLeft, Save, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export interface SAILFormSection {
  id: string;
  title: string;
  letter?: string;
  description?: string;
  isVisible?: boolean;
  isCompleted?: boolean;
  content: React.ReactNode;
}

export interface SAILFormProps {
  title: string;
  sections: SAILFormSection[];
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  onSubmit?: () => void;
  showSaveButton?: boolean;
  showSubmitButton?: boolean;
  saveButtonText?: string;
  submitButtonText?: string;
  initialSection?: string;
  className?: string;
}

export const SAILForm: React.FC<SAILFormProps> = ({
  title,
  sections,
  isOpen,
  onClose,
  onSave,
  onSubmit,
  showSaveButton = true,
  showSubmitButton = true,
  saveButtonText = "Save Draft",
  submitButtonText = "Submit",
  initialSection,
  className = ""
}) => {
  // Filter visible sections
  const visibleSections = sections.filter(section => section.isVisible !== false);
  
  // Set initial active section
  const [activeSection, setActiveSection] = useState(() => {
    if (initialSection && visibleSections.find(s => s.id === initialSection)) {
      return initialSection;
    }
    return visibleSections.length > 0 ? visibleSections[0].id : '';
  });

  // Auto-generate letters if not provided
  const sectionsWithLetters = visibleSections.map((section, index) => ({
    ...section,
    letter: section.letter || String.fromCharCode(65 + index) // A, B, C, etc.
  }));

  const currentSection = sectionsWithLetters.find(section => section.id === activeSection);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2">
      {/* Modal Card with shadow and rounded corners */}
      <div className={`bg-white rounded-xl shadow-2xl max-w-7xl w-full h-[90vh] flex flex-col relative ${className}`}>
        {/* Header - Exact match to reference */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-xl">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-gray-600 hover:bg-gray-100 h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-medium text-gray-900">{title}</h1>
          </div>
          
          <div className="flex gap-2">
            {showSaveButton && onSave && (
              <Button 
                onClick={onSave}
                className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white px-4"
              >
                {saveButtonText}
              </Button>
            )}
            
            {showSubmitButton && onSubmit && (
              <Button 
                onClick={onSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-4"
              >
                {submitButtonText}
              </Button>
            )}
          </div>
        </div>
        
        {/* Body - Split layout exactly like reference */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Complete stepper navigation */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 p-6">
            <div className="space-y-4">
              {sectionsWithLetters.map((section, index) => {
                const isActive = activeSection === section.id;
                const isCompleted = section.isCompleted || false;
                
                return (
                  <div key={section.id}>
                    {/* Section Item - Clickable */}
                    <div 
                      className="flex items-start gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded"
                      onClick={() => setActiveSection(section.id)}
                    >
                      <div className={`w-12 h-12 ${isActive ? 'bg-[#4A90E2]' : isCompleted ? 'bg-green-500' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center text-lg font-medium`}>
                        {section.letter}
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className={`font-medium text-sm ${isActive ? 'text-[#4A90E2]' : 'text-gray-600'}`}>
                          {section.title.replace(/^Part [A-Z]: /, "").split(/(?=[A-Z])/).join('\n')}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Connecting line */}
                    {index < sectionsWithLetters.length - 1 && (
                      <div className="ml-6 w-0.5 h-6 bg-gray-300"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right Content Area - With proper card styling */}
          <div className="flex-1 bg-gray-50 overflow-y-auto rounded-br-xl">
            <div className="p-8">
              {/* White Content Card - This matches the reference */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {currentSection && (
                  <>
                    {/* Section Header */}
                    <div className="p-6 pb-4">
                      <h2 className="text-xl font-medium text-[#4A90E2] mb-2">{currentSection.title}</h2>
                      {currentSection.description && (
                        <p className="text-sm text-[#4A90E2] border-b border-gray-300 pb-2">{currentSection.description}</p>
                      )}
                    </div>
                    
                    {/* Form Fields - Inside the card */}
                    <div className="px-6 pb-6">
                      {currentSection.content}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAILForm;