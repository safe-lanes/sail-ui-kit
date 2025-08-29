# Form Component Implementation Guide

## Component Overview
The `Form` components from `scomp-ui/sail-ui-kit` provide a comprehensive form system for maritime applications. Built on React Hook Form with Zod validation, essential for data integrity in fleet management systems.

## Props Interface
```typescript
interface FormProps {
  children: React.ReactNode;
}

interface FormFieldProps {
  control: Control<any>;
  name: string;
  render: ({ field, fieldState, formState }: any) => React.ReactElement;
}

interface FormItemProps {
  className?: string;
  children: React.ReactNode;
}

interface FormLabelProps {
  className?: string;
  children: React.ReactNode;
}

interface FormControlProps {
  className?: string;
  children: React.ReactNode;
}

interface FormDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface FormMessageProps {
  className?: string;
  children?: React.ReactNode;
}
```

## Basic Usage Example
```tsx
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "scomp-ui/sail-ui-kit";
import { Button, Input } from "scomp-ui/sail-ui-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const vesselSchema = z.object({
  name: z.string().min(2, "Vessel name must be at least 2 characters"),
  imo: z.string().regex(/^\d{7}$/, "IMO must be 7 digits"),
  type: z.string().min(1, "Please select a vessel type"),
  flag: z.string().min(2, "Flag state is required"),
  dwt: z.coerce.number().min(1, "DWT must be greater than 0"),
  length: z.coerce.number().min(1, "Length must be greater than 0"),
  beam: z.coerce.number().min(1, "Beam must be greater than 0"),
  yearBuilt: z.coerce.number().min(1900).max(new Date().getFullYear()),
});

type VesselFormData = z.infer<typeof vesselSchema>;

function VesselRegistrationForm({ onSubmit }: { onSubmit: (data: VesselFormData) => void }) {
  const form = useForm<VesselFormData>({
    resolver: zodResolver(vesselSchema),
    defaultValues: {
      name: "",
      imo: "",
      type: "",
      flag: "",
      dwt: 0,
      length: 0,
      beam: 0,
      yearBuilt: new Date().getFullYear(),
    },
  });

  const vesselTypes = [
    "Oil Tanker",
    "Chemical Tanker",
    "LPG Tanker",
    "Container",
    "Bulk Carrier",
    "General Cargo",
    "Passenger",
    "RoRo",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Vessel Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vessel Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., MV Ocean Star" {...field} />
              </FormControl>
              <FormDescription>
                Official name as registered with the flag state
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* IMO Number */}
        <FormField
          control={form.control}
          name="imo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IMO Number *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 9123456" {...field} />
              </FormControl>
              <FormDescription>
                International Maritime Organization identification number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Vessel Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vessel Type *</FormLabel>
              <FormControl>
                <select {...field} className="w-full p-2 border rounded-md">
                  <option value="">Select vessel type</option>
                  {vesselTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Flag State */}
        <FormField
          control={form.control}
          name="flag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flag State *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Singapore" {...field} />
              </FormControl>
              <FormDescription>
                Country where the vessel is registered
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Vessel Dimensions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="dwt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DWT (MT) *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="115000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length (m) *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="274" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="beam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beam (m) *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="48" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Year Built */}
        <FormField
          control={form.control}
          name="yearBuilt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year Built *</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1900" 
                  max={new Date().getFullYear()} 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-[#16569e] hover:bg-[#16569e]/90"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Registering..." : "Register Vessel"}
        </Button>
      </form>
    </Form>
  );
}
```

## Advanced Maritime Crew Form
```tsx
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "scomp-ui/sail-ui-kit";
import { Button, Input, Textarea, Checkbox } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge } from "scomp-ui/sail-ui-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Users, FileText, Calendar } from "lucide-react";

const crewMemberSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().refine((date) => {
    const birthDate = new Date(date);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age >= 18 && age <= 65;
  }, "Crew member must be between 18 and 65 years old"),
  nationality: z.string().min(2, "Nationality is required"),
  
  // Professional Information
  rank: z.string().min(1, "Please select a rank"),
  licenseNumber: z.string().min(1, "License number is required"),
  experience: z.coerce.number().min(0, "Experience cannot be negative"),
  
  // Contact Information
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  emergencyContact: z.string().min(2, "Emergency contact is required"),
  emergencyPhone: z.string().min(10, "Emergency phone must be at least 10 digits"),
  
  // Documents
  passportNumber: z.string().min(1, "Passport number is required"),
  passportExpiry: z.string().refine((date) => {
    return new Date(date) > new Date();
  }, "Passport must not be expired"),
  medicalCertExpiry: z.string().refine((date) => {
    return new Date(date) > new Date();
  }, "Medical certificate must not be expired"),
  
  // Additional Information
  availableFrom: z.string(),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  specialCertifications: z.array(z.string()),
  comments: z.string().optional(),
  
  // Agreements
  termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms"),
  backgroundCheckConsent: z.boolean().refine((val) => val === true, "Background check consent is required"),
});

type CrewMemberFormData = z.infer<typeof crewMemberSchema>;

function CrewMemberRegistrationForm({ onSubmit }: { onSubmit: (data: CrewMemberFormData) => void }) {
  const form = useForm<CrewMemberFormData>({
    resolver: zodResolver(crewMemberSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      nationality: "",
      rank: "",
      licenseNumber: "",
      experience: 0,
      email: "",
      phone: "",
      emergencyContact: "",
      emergencyPhone: "",
      passportNumber: "",
      passportExpiry: "",
      medicalCertExpiry: "",
      availableFrom: new Date().toISOString().split('T')[0],
      languages: [],
      specialCertifications: [],
      comments: "",
      termsAccepted: false,
      backgroundCheckConsent: false,
    },
  });

  const ranks = [
    "Master",
    "Chief Officer",
    "Second Officer",
    "Third Officer",
    "Chief Engineer", 
    "Second Engineer",
    "Third Engineer",
    "Bosun",
    "Able Seaman",
    "Ordinary Seaman",
    "Cook",
    "Messman",
    "Fitter",
    "Electrician",
    "Oiler",
    "Wiper",
  ];

  const commonLanguages = [
    "English",
    "Spanish", 
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Russian",
    "Chinese",
    "Japanese",
    "Arabic",
  ];

  const certifications = [
    "STCW Basic Safety Training",
    "Advanced Fire Fighting",
    "Medical First Aid",
    "Ship Security Officer",
    "Dangerous Goods",
    "Tank Cleaning",
    "Crane Operation",
    "GMDSS General Operator",
  ];

  const toggleLanguage = (language: string) => {
    const currentLanguages = form.getValues("languages");
    const updatedLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter(l => l !== language)
      : [...currentLanguages, language];
    form.setValue("languages", updatedLanguages);
  };

  const toggleCertification = (cert: string) => {
    const currentCerts = form.getValues("specialCertifications");
    const updatedCerts = currentCerts.includes(cert)
      ? currentCerts.filter(c => c !== cert)
      : [...currentCerts, cert];
    form.setValue("specialCertifications", updatedCerts);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., British" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rank/Position *</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full p-2 border rounded-md">
                        <option value="">Select rank</option>
                        {ranks.map((rank) => (
                          <option key={rank} value={rank}>
                            {rank}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience *</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="Certificate of Competency number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Certificate of Competency or equivalent professional license
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.smith@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+44 7123 456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact *</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact name and relationship" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Phone *</FormLabel>
                    <FormControl>
                      <Input placeholder="+44 7987 654321" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="passportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passport Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passportExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passport Expiry *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="medicalCertExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical Certificate Expiry *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="languages"
              render={() => (
                <FormItem>
                  <FormLabel>Languages Spoken *</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {commonLanguages.map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={language}
                          checked={form.watch("languages").includes(language)}
                          onCheckedChange={() => toggleLanguage(language)}
                        />
                        <label htmlFor={language} className="text-sm">
                          {language}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Special Certifications */}
        <Card>
          <CardHeader>
            <CardTitle>Special Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="specialCertifications"
              render={() => (
                <FormItem>
                  <FormLabel>Additional Certifications</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {certifications.map((cert) => (
                      <div key={cert} className="flex items-center space-x-2">
                        <Checkbox
                          id={cert}
                          checked={form.watch("specialCertifications").includes(cert)}
                          onCheckedChange={() => toggleCertification(cert)}
                        />
                        <label htmlFor={cert} className="text-sm">
                          {cert}
                        </label>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="availableFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available From</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Earliest date you can join a vessel
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Comments</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional information, special requirements, or notes..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Agreements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I accept the terms and conditions *
                    </FormLabel>
                    <FormDescription>
                      You agree to our employment terms and maritime regulations
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="backgroundCheckConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I consent to background checks *
                    </FormLabel>
                    <FormDescription>
                      Required for maritime security clearance
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-[#16569e] hover:bg-[#16569e]/90 px-8"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
```

## Context Requirements
- **React Hook Form**: Built on React Hook Form for form state management
- **Zod Validation**: Requires Zod schemas for validation
- **Form Provider**: Must be wrapped with Form component provider

## Maritime-Specific Use Cases
1. **Vessel Registration**: Comprehensive vessel data entry with validation
2. **Crew Management**: Crew member registration and certification tracking
3. **Incident Reporting**: Structured incident and safety report forms
4. **Maintenance Forms**: Equipment and vessel maintenance scheduling
5. **Compliance Forms**: TMSA compliance and audit documentation
6. **Port Operations**: Cargo and port operation forms
7. **Training Records**: Crew training and certification management

## Integration with Fleet Management
```tsx
// Example: Form with API integration and optimistic updates
function VesselFormWithAPI() {
  const queryClient = useQueryClient();
  
  const createVessel = useMutation({
    mutationFn: (data: VesselFormData) => apiRequest("/api/vessels", {
      method: "POST",
      body: data,
    }),
    onSuccess: (newVessel) => {
      // Optimistic update
      queryClient.setQueryData(["/api/vessels"], (old: Vessel[]) => 
        [...(old || []), newVessel]
      );
      toast.success("Vessel registered successfully");
    },
    onError: (error) => {
      toast.error("Failed to register vessel");
    },
  });

  return (
    <VesselRegistrationForm 
      onSubmit={createVessel.mutate}
    />
  );
}
```

## Styling and Theming
The Form components follow maritime blue theme (#16569e) and support:
- **Consistent styling**: Uniform form field appearance
- **Validation feedback**: Clear error and success states
- **Responsive design**: Mobile-friendly form layouts
- **Maritime context**: Industry-appropriate field labels and validation

## Troubleshooting
1. **Validation not working**: Ensure Zod schema is properly configured
2. **Form state issues**: Check React Hook Form setup and defaultValues
3. **Submit not triggering**: Verify form validation and onSubmit handler
4. **Field registration issues**: Ensure FormField components are properly structured
5. **Performance issues**: Use proper field optimization for large forms

## Best Practices
- Always use Zod schemas for robust validation
- Provide clear, descriptive field labels and help text
- Implement proper error handling and user feedback
- Use appropriate input types for maritime data (numbers, dates, etc.)
- Group related fields logically using Cards or sections
- Provide real-time validation feedback
- Consider offline scenarios for maritime environments
- Use maritime-specific terminology and validation rules
- Implement proper loading states for form submissions