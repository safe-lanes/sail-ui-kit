import {
  EditIcon,
  EyeIcon,
  FilterIcon,
  SearchIcon,
  Trash2Icon,
  Shield,
} from "lucide-react";
import { ColDef, GridReadyEvent, GridApi, ModuleRegistry } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule } from 'ag-grid-community';
import { 
  SetFilterModule, 
  MenuModule, 
  ColumnsToolPanelModule, 
  FiltersToolPanelModule, 
  SideBarModule 
} from 'ag-grid-enterprise';
import AgGridTable from '@/components/AgGridTable';

// Register AG Grid modules
ModuleRegistry.registerModules([
  AllCommunityModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SideBarModule
]);
import { RatingBadgeCellRenderer, ActionsCellRenderer, NameCellRenderer } from '@/components/AgGridCellRenderers';
import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AppraisalForm } from "./AppraisalForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CrewMember, AppraisalResult } from "@shared/schema";
import { StandardNavigationBar } from "@/components/StandardNavigationBar";

// Interface for combined crew member and appraisal data
interface CrewAppraisalData {
  id: string;
  name: { first: string; middle: string; last: string };
  rank: string;
  nationality: string;
  vessel: string;
  vesselType: string;
  signOn: string;
  appraisalType: string;
  appraisalDate: string;
  competenceRating: { value: string; color: string };
  behavioralRating: { value: string; color: string };
  overallRating: { value: string; color: string };
  appraisalId?: number;
}

export const ElementCrewAppraisals = (): JSX.Element => {
  const [location, navigate] = useLocation();
  const [selectedCrewMember, setSelectedCrewMember] = useState<CrewAppraisalData | null>(null);
  const [showAppraisalForm, setShowAppraisalForm] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  // AG Grid Column Definitions
  const columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'Crew ID',
      width: 120,
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      filter: 'agTextColumnFilter',
      sortable: true,
      resizable: true,
      cellRenderer: NameCellRenderer
    },
    {
      field: 'rank',
      headerName: 'Rank',
      width: 150,
      filter: 'agSetColumnFilter',
      sortable: true,
      resizable: true
    },
    {
      field: 'nationality',
      headerName: 'Nationality',
      width: 130,
      filter: 'agSetColumnFilter',
      sortable: true,
      resizable: true
    },
    {
      field: 'vessel',
      headerName: 'Vessel',
      width: 150,
      filter: 'agSetColumnFilter',
      sortable: true,
      resizable: true
    },
    {
      field: 'vesselType',
      headerName: 'Vessel Type',
      width: 130,
      filter: 'agSetColumnFilter',
      sortable: true,
      resizable: true
    },
    {
      field: 'signOn',
      headerName: 'Sign-On',
      width: 120,
      filter: 'agDateColumnFilter',
      sortable: true,
      resizable: true
    },
    {
      field: 'appraisalType',
      headerName: 'Appraisal Type',
      width: 140,
      filter: 'agSetColumnFilter',
      sortable: true,
      resizable: true
    },
    {
      field: 'appraisalDate',
      headerName: 'Appraisal Date',
      width: 130,
      filter: 'agDateColumnFilter',
      sortable: true,
      resizable: true,
      cellStyle: { textAlign: 'center' }
    },
    {
      field: 'competenceRating.value',
      headerName: 'Competence Rating',
      width: 150,
      filter: 'agNumberColumnFilter',
      sortable: true,
      resizable: true,
      cellRenderer: RatingBadgeCellRenderer,
      cellStyle: { textAlign: 'center' }
    },
    {
      field: 'behavioralRating.value',
      headerName: 'Behavioral Rating',
      width: 150,
      filter: 'agNumberColumnFilter',
      sortable: true,
      resizable: true,
      cellRenderer: RatingBadgeCellRenderer,
      cellStyle: { textAlign: 'center' }
    },
    {
      field: 'overallRating.value',
      headerName: 'Overall Rating',
      width: 140,
      filter: 'agNumberColumnFilter',
      sortable: true,
      resizable: true,
      cellRenderer: RatingBadgeCellRenderer,
      cellStyle: { textAlign: 'center' }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filter: false,
      resizable: false,
      cellRenderer: ActionsCellRenderer,
      cellStyle: { textAlign: 'center' }
    }
  ];

  const handleModuleChange = (moduleId: string) => {
    switch (moduleId) {
      case "crewing":
        navigate("/");
        break;
      case "technical-pms":
        navigate("/technical-pms");
        break;
      default:
        navigate("/");
    }
  };

  // Filter state
  const [filters, setFilters] = useState({
    searchName: "",
    rank: "",
    vessel: "",
    vesselType: "",
    nationality: "",
    appraisalType: "",
    rating: ""
  });

  // Fetch crew members and appraisal results
  const { data: crewMembers = [], isLoading: isLoadingCrew } = useQuery<CrewMember[]>({
    queryKey: ["/api/crew-members"],
    queryFn: async () => {
      const response = await fetch("/api/crew-members");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
  });

  const { data: appraisalResults = [], isLoading: isLoadingAppraisals } = useQuery<AppraisalResult[]>({
    queryKey: ["/api/appraisals"],
    queryFn: async () => {
      const response = await fetch("/api/appraisals");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
  });

  const handleEditClick = (crewMember: CrewAppraisalData) => {
    setSelectedCrewMember(crewMember);
    setShowAppraisalForm(true);
  };

  const handleCloseForm = () => {
    setShowAppraisalForm(false);
    setSelectedCrewMember(null);
  };

  // Helper function to get rating color based on value
  const getRatingColor = (rating: string): string => {
    const numRating = parseFloat(rating);
    if (numRating >= 4.0) return "bg-[#c3f2cb] text-[#286e34]"; // Green
    if (numRating >= 3.0) return "bg-[#ffeaa7] text-[#814c02]"; // Yellow
    if (numRating >= 2.0) return "bg-[#f9ecef] text-[#811f1a]"; // Light Pink
    return "bg-red-600 text-white"; // Dark Red
  };

  // Combine crew member and appraisal data
  const allCrewData: CrewAppraisalData[] = crewMembers.map((crewMember) => {
    const appraisal = appraisalResults.find(ar => ar.crewMemberId === crewMember.id);

    return {
      id: crewMember.id,
      name: {
        first: crewMember.firstName,
        middle: crewMember.middleName || "",
        last: crewMember.lastName || "",
      },
      rank: crewMember.rank,
      nationality: crewMember.nationality,
      vessel: crewMember.vessel,
      vesselType: crewMember.vesselType,
      signOn: crewMember.signOnDate,
      appraisalType: appraisal?.appraisalType || "Not Started",
      appraisalDate: appraisal?.appraisalDate || "N/A",
      competenceRating: {
        value: appraisal?.competenceRating || "N/A",
        color: appraisal?.competenceRating ? getRatingColor(appraisal.competenceRating) : "bg-gray-400 text-white",
      },
      behavioralRating: {
        value: appraisal?.behavioralRating || "N/A",
        color: appraisal?.behavioralRating ? getRatingColor(appraisal.behavioralRating) : "bg-gray-400 text-white",
      },
      overallRating: {
        value: appraisal?.overallRating || "N/A",
        color: appraisal?.overallRating ? getRatingColor(appraisal.overallRating) : "bg-gray-400 text-white",
      },
      appraisalId: appraisal?.id,
    };
  });

  // Filter crew data based on filter state
  const crewData = allCrewData.filter((crew) => {
    const fullName = `${crew.name.first} ${crew.name.middle} ${crew.name.last}`.toLowerCase();

    // Name search filter
    if (filters.searchName && !fullName.includes(filters.searchName.toLowerCase())) {
      return false;
    }

    // Rank filter
    if (filters.rank && crew.rank.toLowerCase() !== filters.rank.toLowerCase()) {
      return false;
    }

    // Vessel filter
    if (filters.vessel && crew.vessel.toLowerCase() !== filters.vessel.toLowerCase()) {
      return false;
    }

    // Vessel type filter
    if (filters.vesselType && crew.vesselType.toLowerCase() !== filters.vesselType.toLowerCase()) {
      return false;
    }

    // Nationality filter
    if (filters.nationality && crew.nationality.toLowerCase() !== filters.nationality.toLowerCase()) {
      return false;
    }

    // Appraisal type filter
    if (filters.appraisalType && crew.appraisalType.toLowerCase() !== filters.appraisalType.toLowerCase()) {
      return false;
    }

    // Rating filter
    if (filters.rating && crew.overallRating.value !== "N/A") {
      const rating = parseFloat(crew.overallRating.value);
      if (filters.rating === "high" && rating < 4.0) return false;
      if (filters.rating === "medium" && (rating < 3.0 || rating >= 4.0)) return false;
      if (filters.rating === "low" && rating >= 3.0) return false;
    }

    return true;
  });

  if (isLoadingCrew || isLoadingAppraisals) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading crew appraisals...</div>
      </div>
    );
  }




  return (
    <div className="bg-transparent w-full">
      <div className="overflow-hidden bg-[url(/figmaAssets/vector.svg)] bg-[100%_100%] w-full min-h-screen relative">
        {/* Header */}
        <StandardNavigationBar
          currentModule="crewing"
          onModuleChange={handleModuleChange}
          activeSection="appraisals"
        />

        {/* Left sidebar - Hidden on mobile, visible on lg+ */}
        <aside className="hidden lg:block w-[67px] absolute left-0 top-[66px] h-[calc(100vh-66px)]">
          {/* Light blue section with icon and "All" text */}
          <div className="w-full h-[79px] flex flex-col items-center justify-center bg-[#52baf3]">
            <div className="w-6 h-6 mb-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white"/>
                <path d="M19 15L19.74 17.74L22 18L19.74 18.26L19 21L18.26 18.26L16 18L18.26 17.74L19 15Z" fill="white"/>
                <path d="M5 6L5.5 7.5L7 8L5.5 8.5L5 10L4.5 8.5L3 8L4.5 7.5L5 6Z" fill="white"/>
              </svg>
            </div>
            <div className="text-white text-[10px] font-normal font-['Roboto',Helvetica]">
              All
            </div>
          </div>

          {/* Dark blue section */}
          <div className="w-full h-[calc(100%-79px)] bg-[#16569e]">
          </div>
        </aside>

        {/* Main content - Responsive layout */}
        <main className="absolute top-[67px] left-0 lg:left-[67px] w-full lg:w-[calc(100%-67px)] h-[calc(100%-67px)] overflow-y-auto">
          <div className="p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h1 className="font-['Mulish',Helvetica] font-bold text-black text-lg sm:text-xl lg:text-[22px] px-2 sm:px-4 lg:ml-[19px] lg:mr-[19px]">
                Crew Appraisals
              </h1>
              <Button
                variant="outline"
                className="h-10 border-[#e1e8ed] text-[#16569e] flex items-center gap-2 px-4 lg:ml-[19px] lg:mr-[19px] self-start sm:self-auto"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FilterIcon className="w-4 h-4" />
                <span className="text-sm">Filters</span>
              </Button>
            </div>

            {/* Filters - Responsive grid layout */}
            {showFilters && (
              <div className="mb-6 px-2 sm:px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-3 mb-4">
                  {/* Search Name */}
                  <div className="relative">
                    <Input
                      className="h-8 pl-10 text-[#8798ad] text-xs w-full"
                      placeholder="Search Name"
                      value={filters.searchName}
                      onChange={(e) => setFilters(prev => ({ ...prev, searchName: e.target.value }))}
                    />
                    <SearchIcon className="w-4 h-4 absolute left-3 top-2 text-[#8798ad]" />
                  </div>

                  {/* Rank */}
                  <Select value={filters.rank} onValueChange={(value) => setFilters(prev => ({ ...prev, rank: value }))}>
                    <SelectTrigger className="h-8 bg-white text-[#8a8a8a] text-xs w-full">
                      <SelectValue placeholder="Rank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Master">Master</SelectItem>
                      <SelectItem value="Chief Engineer">Chief Engineer</SelectItem>
                      <SelectItem value="Chief Mate">Chief Mate</SelectItem>
                      <SelectItem value="Able Seaman">Able Seaman</SelectItem>
                      <SelectItem value="Electrician">Electrician</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Vessel */}
                  <Select value={filters.vessel} onValueChange={(value) => setFilters(prev => ({ ...prev, vessel: value }))}>
                    <SelectTrigger className="h-8 bg-white text-[#8a8a8a] text-xs w-full">
                      <SelectValue placeholder="Vessel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MV Atlantic Star">MV Atlantic Star</SelectItem>
                      <SelectItem value="MV Pacific Dawn">MV Pacific Dawn</SelectItem>
                      <SelectItem value="MV Northern Light">MV Northern Light</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Vessel Type */}
                  <Select value={filters.vesselType} onValueChange={(value) => setFilters(prev => ({ ...prev, vesselType: value }))}>
                    <SelectTrigger className="h-8 bg-white text-[#8a8a8a] text-xs w-full">
                      <SelectValue placeholder="Vessel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Oil Tanker">Oil Tanker</SelectItem>
                      <SelectItem value="LPG Tanker">LPG Tanker</SelectItem>
                      <SelectItem value="Container">Container</SelectItem>
                      <SelectItem value="Bulk">Bulk</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Nationality */}
                  <Select value={filters.nationality} onValueChange={(value) => setFilters(prev => ({ ...prev, nationality: value }))}>
                    <SelectTrigger className="h-8 bg-white text-[#8a8a8a] text-xs w-full">
                      <SelectValue placeholder="Nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="British">British</SelectItem>
                      <SelectItem value="Indian">Indian</SelectItem>
                      <SelectItem value="Philippines">Philippines</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Appraisal Type */}
                  <Select value={filters.appraisalType} onValueChange={(value) => setFilters(prev => ({ ...prev, appraisalType: value }))}>
                    <SelectTrigger className="h-8 bg-white text-[#8a8a8a] text-xs w-full">
                      <SelectValue placeholder="Appraisal Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="End of Contract">End of Contract</SelectItem>
                      <SelectItem value="Mid Term">Mid Term</SelectItem>
                      <SelectItem value="Special">Special</SelectItem>
                      <SelectItem value="Probation">Probation</SelectItem>
                      <SelectItem value="Appraiser SCOT">Appraiser SCOT</SelectItem>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Rating */}
                  <Select value={filters.rating} onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}>
                    <SelectTrigger className="h-8 bg-white text-[#8a8a8a] text-xs w-full">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High (4-5)</SelectItem>
                      <SelectItem value="medium">Medium (3-4)</SelectItem>
                      <SelectItem value="low">Low (1-3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear filters button */}
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({
                  searchName: "",
                  rank: "",
                  vessel: "",
                  vesselType: "",
                  nationality: "",
                  appraisalType: "",
                  rating: ""
                })}
                    className="h-8 text-xs text-[#8798ad] border-[#e1e8ed]"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}



            {/* AG Grid Table - With Custom Styling */}
            <div className="bg-white mx-2 sm:mx-4 lg:mx-[19px] rounded-lg border ag-grid-container">
              {crewData.length > 0 ? (
                <div style={{ height: '500px', width: '100%' }} className="ag-theme-alpine">
                  <AgGridReact
                    rowData={crewData}
                    columnDefs={[
                      { field: 'id', headerName: 'Crew ID', width: 120 },
                      { 
                        field: 'name', 
                        headerName: 'Name', 
                        width: 200,
                        valueGetter: (params) => {
                          const name = params.data?.name;
                          if (!name) return '';
                          return `${name.first || ''} ${name.middle || ''} ${name.last || ''}`.trim();
                        }
                      },
                      { field: 'rank', headerName: 'Rank', width: 150 },
                      { field: 'vessel', headerName: 'Vessel', width: 150 },
                      { field: 'appraisalType', headerName: 'Appraisal Type', width: 140 },
                      { field: 'nationality', headerName: 'Nationality', width: 130 },
                      { field: 'vesselType', headerName: 'Vessel Type', width: 130 },
                      { 
                        field: 'actions', 
                        headerName: 'Actions', 
                        width: 120,
                        cellRenderer: ActionsCellRenderer,
                        sortable: false,
                        filter: false,
                        resizable: false,
                        pinned: 'right'
                      }
                    ]}
                    context={{
                      onEdit: handleEditClick
                    }}
                    onGridReady={(params) => {
                      setGridApi(params.api);
                      params.api.sizeColumnsToFit();
                    }}
                    sideBar={{
                      toolPanels: [
                        {
                          id: 'columns',
                          labelDefault: 'Columns',
                          labelKey: 'columns',
                          iconKey: 'columns',
                          toolPanel: 'agColumnsToolPanel',
                        },
                        {
                          id: 'filters',
                          labelDefault: 'Filters',
                          labelKey: 'filters',
                          iconKey: 'filter',
                          toolPanel: 'agFiltersToolPanel',
                        }
                      ],
                      defaultToolPanel: null
                    }}
                    defaultColDef={{
                      sortable: true,
                      filter: true,
                      resizable: true,
                      flex: 1,
                      minWidth: 100
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Loading crew appraisal data...
                </div>
              )}
              
              {/* Custom AG Grid Styling */}
              <style dangerouslySetInnerHTML={{
                __html: `
                .ag-grid-container .ag-theme-alpine .ag-header {
                  background-color: #52baf3 !important;
                  border-bottom: 1px solid #52baf3 !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-header-cell {
                  background-color: #52baf3 !important;
                  color: white !important;
                  font-size: 12px !important;
                  font-weight: normal !important;
                  border-right: none !important;
                  border-bottom: 1px solid #52baf3 !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-header-cell-label {
                  color: white !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-header-cell .ag-header-icon {
                  color: white !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-header-cell .ag-icon {
                  color: white !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-header-cell .ag-icon-filter {
                  color: white !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-header-cell .ag-icon-menu {
                  color: white !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-header-cell .ag-icon-desc,
                .ag-grid-container .ag-theme-alpine .ag-header-cell .ag-icon-asc {
                  color: white !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-row:hover {
                  background-color: #f9fafb !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-cell {
                  border-right: none !important;
                  padding: 8px 16px !important;
                  font-size: 13px !important;
                  color: #4f5863 !important;
                }
                
                .ag-grid-container .ag-theme-alpine {
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                
                .ag-grid-container .ag-theme-alpine .ag-row {
                  border-bottom: 1px solid #e5e7eb !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-row:last-child {
                  border-bottom: none !important;
                }
                
                /* Sidebar Styling */
                .ag-grid-container .ag-theme-alpine .ag-side-bar {
                  background-color: white !important;
                  border-left: 1px solid #e5e7eb !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-side-buttons {
                  background-color: white !important;
                  top: 48px !important;
                  border: none !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-side-button {
                  background-color: white !important;
                  border: none !important;
                  color: #6b7280 !important;
                  border-bottom: 1px solid #e5e7eb !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-side-button.ag-selected {
                  background-color: #f3f4f6 !important;
                  color: #374151 !important;
                }
                
                .ag-grid-container .ag-theme-alpine .ag-tool-panel-wrapper {
                  background-color: white !important;
                  border: none !important;
                }
                `
              }} />
            </div>

            {/* Pagination and Debug Info */}
            <div className="mt-4 mx-2 sm:mx-4 lg:mx-[19px]">
              <div className="text-xs font-normal font-['Mulish',Helvetica] text-black">
                {crewData.length > 0 ? `1 to ${crewData.length} of ${crewData.length}` : "0 to 0 of 0"}
              </div>
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-500 mt-1">
                  Debug: {crewData.length} crew records, {columnDefs.length} columns
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      {/* Appraisal Form Modal */}
      {showAppraisalForm && selectedCrewMember && (
        <AppraisalForm
          crewMember={{
            id: selectedCrewMember.id,
            name: selectedCrewMember.name,
            rank: selectedCrewMember.rank,
            vessel: selectedCrewMember.vessel
          }}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};