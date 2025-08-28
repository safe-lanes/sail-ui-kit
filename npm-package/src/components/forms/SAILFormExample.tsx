import React from 'react';
import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
import { SAILForm, type SAILFormSection as SAILFormSectionType } from './SAILForm';
import { SAILFormField, SAILTable, type SAILTableColumn } from './SAILFormField';
import { SAILFormGrid, SAILFormSection, SAILFormActions } from './SAILFormGrid';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// Example schema for demonstration - matches showcase implementation
// const exampleSchema = z.object({
//   seafarersName: z.string().min(1, "Seafarer's name is required"),
//   rank: z.string().min(1, "Rank is required"),
//   nationality: z.string().min(1, "Nationality is required"),
//   vessel: z.string().min(1, "Vessel is required"),
//   signOnDate: z.string().min(1, "Sign on date is required"),
//   appraisalType: z.string().min(1, "Appraisal type is required"),
//   appraisalPeriodFrom: z.string().optional(),
//   appraisalPeriodTo: z.string().optional(),
//   primaryAppraiser: z.string().optional(),
//   personalityIndexCategory: z.string().optional(),
// });

type ExampleFormData = {
  seafarersName: string;
  rank: string;
  nationality: string;
  vessel: string;
  signOnDate: string;
  appraisalType: string;
  appraisalPeriodFrom?: string;
  appraisalPeriodTo?: string;
  primaryAppraiser?: string;
  personalityIndexCategory?: string;
};

interface ExampleSAILFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ExampleFormData) => void;
  onSubmit: (data: ExampleFormData) => void;
}

export const ExampleSAILForm: React.FC<ExampleSAILFormProps> = ({
  isOpen,
  onClose,
  onSave,
  onSubmit,
}) => {
  const [tableData, setTableData] = React.useState([
    { id: '1', training: 'Leadership Training', evaluation: 'Excellent', comment: '' },
    { id: '2', training: 'Safety Training', evaluation: 'Good', comment: '' },
  ]);

  const form = useForm<ExampleFormData>({
    // resolver: zodResolver(exampleSchema),
    defaultValues: {
      seafarersName: 'James Michael',
      rank: '',
      nationality: '',
      vessel: '',
      signOnDate: '',
      appraisalType: '',
      appraisalPeriodFrom: '',
      appraisalPeriodTo: '',
      primaryAppraiser: '',
      personalityIndexCategory: '',
    },
  });

  const tableColumns: SAILTableColumn[] = [
    { key: 'training', label: 'Training', type: 'text', required: true },
    { 
      key: 'evaluation', 
      label: 'Evaluation', 
      type: 'select',
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'average', label: 'Average' },
        { value: 'poor', label: 'Poor' }
      ]
    },
  ];

  const handleTableAdd = () => {
    const newItem = {
      id: Date.now().toString(),
      training: '',
      evaluation: '',
      comment: '',
    };
    setTableData([...tableData, newItem]);
  };

  const handleTableUpdate = (id: string, field: string, value: string) => {
    setTableData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleTableDelete = (id: string) => {
    setTableData(prev => prev.filter(item => item.id !== id));
  };

  const handleFormSave = () => {
    const data = form.getValues();
    onSave(data);
  };

  const handleFormSubmit = (data: ExampleFormData) => {
    onSubmit(data);
    onClose();
  };

  const sections: SAILFormSectionType[] = [
    {
      id: 'seafarer-info',
      title: "Part A: Seafarer's Information",
      description: 'Enter details as applicable',
      content: (
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Seafarer's Name</Label>
              <Input 
                className="bg-white border-gray-300" 
                defaultValue="James Michael" 
                {...form.register("seafarersName")}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Seafarer's Rank</Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select rank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="master">Master</SelectItem>
                  <SelectItem value="chief-officer">Chief Officer</SelectItem>
                  <SelectItem value="second-officer">Second Officer</SelectItem>
                  <SelectItem value="third-officer">Third Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Nationality</Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select nationality..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="british">British</SelectItem>
                  <SelectItem value="filipino">Filipino</SelectItem>
                  <SelectItem value="indian">Indian</SelectItem>
                  <SelectItem value="ukrainian">Ukrainian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Vessel</Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select vessel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mv-atlantic">MV Atlantic Star</SelectItem>
                  <SelectItem value="mv-pacific">MV Pacific Dawn</SelectItem>
                  <SelectItem value="mv-nordic">MV Nordic Explorer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Sign On Date</Label>
              <Input 
                type="date" 
                className="bg-white border-gray-300" 
                placeholder="dd/mm/yyyy" 
                {...form.register("signOnDate")}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Appraisal Type</Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial">Initial Assessment</SelectItem>
                  <SelectItem value="mid">Mid Contract</SelectItem>
                  <SelectItem value="end">End of Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Appraisal Period From</Label>
              <Input 
                type="date" 
                className="bg-white border-gray-300" 
                placeholder="dd/mm/yyyy" 
                {...form.register("appraisalPeriodFrom")}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Appraisal Period To</Label>
              <Input 
                type="date" 
                className="bg-white border-gray-300" 
                placeholder="dd/mm/yyyy" 
                {...form.register("appraisalPeriodTo")}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Primary Appraiser</Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select appraiser" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="master">Master</SelectItem>
                  <SelectItem value="chief">Chief Officer</SelectItem>
                  <SelectItem value="superintendent">Superintendent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Personality Index (PI) Category</Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category1">Category 1</SelectItem>
                  <SelectItem value="category2">Category 2</SelectItem>
                  <SelectItem value="category3">Category 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2"></div>
          </div>
          
          {/* Save Button positioned like reference */}
          <div className="flex justify-end mt-8">
            <Button 
              className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white px-6"
              onClick={handleFormSave}
            >
              Save
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'appraisal-start-info',
      title: 'Part B: Information at Start of Appraisal Period',
      description: 'Add below at the start of the Appraisal Period except the Evaluation which must be completed at the end of the Appraisal Period',
      content: (
        <div className="space-y-8">
          {/* B1. Trainings Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-[#16569e]">B1. Trainings conducted prior joining vessel (To Assess Effectiveness)</h3>
              <Button 
                variant="outline" 
                className="text-[#16569e] border-[#16569e]"
                onClick={handleTableAdd}
              >
                + Add Training
              </Button>
            </div>
            
            {/* Table Header */}
            <div className="bg-gray-50 border border-gray-200 rounded-t">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 text-sm font-medium text-gray-700">
                <div>S.No</div>
                <div>Training</div>
                <div>Evaluation</div>
                <div>Actions</div>
              </div>
            </div>
            
            {/* Empty State or Data */}
            {tableData.length === 0 ? (
              <div className="border border-gray-200 border-t-0 rounded-b bg-white p-8 text-center">
                <p className="text-gray-500">No trainings added yet. Click "Add Training" to get started.</p>
              </div>
            ) : (
              <div className="border border-gray-200 border-t-0 rounded-b bg-white">
                {tableData.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 border-b border-gray-100 last:border-b-0">
                    <div className="text-sm text-gray-700">{index + 1}</div>
                    <div className="text-sm text-gray-700">{item.training}</div>
                    <div className="text-sm text-gray-700">{item.evaluation}</div>
                    <div className="text-sm">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleTableDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* B2. Target Setting Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-[#16569e]">B2. Target Setting</h3>
              <Button variant="outline" className="text-[#16569e] border-[#16569e]">
                + Add Target
              </Button>
            </div>
            
            {/* Table Header */}
            <div className="bg-gray-50 border border-gray-200 rounded-t">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 text-sm font-medium text-gray-700">
                <div>S.No</div>
                <div>Target Setting</div>
                <div>Evaluation</div>
                <div>Actions</div>
              </div>
            </div>
            
            {/* Empty State */}
            <div className="border border-gray-200 border-t-0 rounded-b bg-white p-8 text-center">
              <p className="text-gray-500">No targets added yet. Click "Add Target" to get started.</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <Button 
              className="bg-[#5DADE2] hover:bg-[#4A9BD1] text-white px-6"
              onClick={handleFormSave}
            >
              Save
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white px-6"
              onClick={form.handleSubmit(handleFormSubmit)}
            >
              Submit
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <SAILForm
      title="Example SAIL Form"
      sections={sections}
      isOpen={isOpen}
      onClose={onClose}
      onSave={handleFormSave}
      onSubmit={form.handleSubmit(handleFormSubmit)}
      showSaveButton={true}
      showSubmitButton={true}
      saveButtonText="Save Draft"
      submitButtonText="Submit"
      initialSection="basic-info"
    />
  );
};

export default ExampleSAILForm;