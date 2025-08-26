import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, MapPin, Users } from "lucide-react";

const incidentSchema = z.object({
  incidentType: z.string().min(1, "Incident type is required"),
  severity: z.enum(["low", "medium", "high", "critical"]),
  title: z.string().min(1, "Incident title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(1, "Location is required"),
  dateTime: z.string().min(1, "Date and time is required"),
  reportedBy: z.string().min(1, "Reporter name is required"),
  vesselsInvolved: z.string().optional(),
  personnelInvolved: z.string().optional(),
  immediateActions: z.string().optional(),
  potentialConsequences: z.string().optional(),
  rootCause: z.string().optional(),
  correctiveActions: z.string().optional(),
  preventiveActions: z.string().optional(),
});

type IncidentFormData = z.infer<typeof incidentSchema>;

interface IncidentReportFormProps {
  onSubmit: (data: IncidentFormData) => void;
  onCancel: () => void;
  initialData?: Partial<IncidentFormData>;
  isSubmitting?: boolean;
}

const incidentTypes = [
  "Near Miss",
  "Personal Injury", 
  "Environmental Incident",
  "Equipment Failure",
  "Navigation Incident",
  "Security Incident",
  "Fire/Explosion",
  "Collision/Contact",
  "Grounding",
  "Cargo Related",
  "Other"
];

const severityConfig = {
  low: { label: "Low", color: "bg-green-100 text-green-800" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800" },
  high: { label: "High", color: "bg-orange-100 text-orange-800" },
  critical: { label: "Critical", color: "bg-red-100 text-red-800" }
};

export const IncidentReportForm: React.FC<IncidentReportFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isSubmitting = false
}) => {
  const form = useForm<IncidentFormData>({
    resolver: zodResolver(incidentSchema),
    defaultValues: {
      incidentType: "",
      severity: "medium",
      title: "",
      description: "",
      location: "",
      dateTime: "",
      reportedBy: "",
      vesselsInvolved: "",
      personnelInvolved: "",
      immediateActions: "",
      potentialConsequences: "",
      rootCause: "",
      correctiveActions: "",
      preventiveActions: "",
      ...initialData
    }
  });

  const watchSeverity = form.watch("severity");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Incident Report Form
            {watchSeverity && (
              <Badge className={severityConfig[watchSeverity].color}>
                {severityConfig[watchSeverity].label} Severity
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="incidentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Incident Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select incident type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {incidentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(severityConfig).map(([value, config]) => (
                            <SelectItem key={value} value={value}>
                              {config.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incident Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of the incident" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide a detailed description of what happened..."
                        className="min-h-20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Engine Room, Bridge, Deck Area" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date & Time
                      </FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Personnel Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="reportedBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reported By</FormLabel>
                      <FormControl>
                        <Input placeholder="Name and position" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personnelInvolved"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Personnel Involved
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Names and positions (if any)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="vesselsInvolved"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vessels/Equipment Involved</FormLabel>
                    <FormControl>
                      <Input placeholder="Vessel names, equipment, or systems involved" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions and Analysis */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="immediateActions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Immediate Actions Taken</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What immediate actions were taken to address the incident?"
                          className="min-h-16"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="potentialConsequences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Potential Consequences</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What could have happened if the situation escalated?"
                          className="min-h-16"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rootCause"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Root Cause Analysis</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What is the underlying cause of this incident?"
                          className="min-h-16"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="correctiveActions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Corrective Actions</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What actions will be taken to fix the immediate problem?"
                          className="min-h-16"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preventiveActions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preventive Actions</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What actions will prevent similar incidents in the future?"
                          className="min-h-16"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};