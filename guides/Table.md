# Table Component Guide

## Overview
Table provides comprehensive data display functionality for maritime applications with sorting, filtering, pagination, and action capabilities. It supports complex fleet data, crew management, and operational information with professional maritime styling and responsive design.

## Component Interface

```typescript
interface TableProps {
  data: any[];
  columns: TableColumn[];
  sortable?: boolean;
  filterable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  selectable?: boolean;
  actions?: TableAction[];
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: Record<string, any>) => void;
  onSelect?: (selectedRows: any[]) => void;
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
}

interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableAction {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: any) => void;
  variant?: 'default' | 'destructive' | 'outline';
  disabled?: (row: any) => boolean;
}
```

## Basic Usage

```jsx
import { Table } from 'scomp-ui';

function BasicTableExample() {
  const vesselData = [
    {
      id: '1',
      name: 'MV Atlantic Star',
      type: 'Container Ship',
      imo: '1234567',
      flag: 'Panama',
      status: 'Operational',
      captain: 'James Wilson',
      location: 'Rotterdam'
    },
    {
      id: '2',
      name: 'MV Pacific Dawn',
      type: 'Bulk Carrier',
      imo: '2345678',
      flag: 'Liberia',
      status: 'Maintenance',
      captain: 'Sarah Chen',
      location: 'Singapore'
    },
    {
      id: '3',
      name: 'MV Nordic Explorer',
      type: 'Tanker',
      imo: '3456789',
      flag: 'Marshall Islands',
      status: 'Transit',
      captain: 'Mike Rodriguez',
      location: 'English Channel'
    }
  ];

  const columns = [
    { key: 'name', header: 'Vessel Name', sortable: true },
    { key: 'type', header: 'Type', sortable: true, filterable: true },
    { key: 'imo', header: 'IMO Number' },
    { key: 'flag', header: 'Flag State', sortable: true, filterable: true },
    { 
      key: 'status', 
      header: 'Status', 
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          value === 'Operational' ? 'bg-green-100 text-green-800' :
          value === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
          value === 'Transit' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'captain', header: 'Captain' },
    { key: 'location', header: 'Current Location' }
  ];

  const actions = [
    {
      label: 'View Details',
      icon: <Eye className="h-4 w-4" />,
      onClick: (row) => console.log('View details for', row.name)
    },
    {
      label: 'Track',
      icon: <MapPin className="h-4 w-4" />,
      onClick: (row) => console.log('Track vessel', row.name)
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (row) => console.log('Edit vessel', row.name),
      variant: 'outline'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Fleet Overview</h2>
      <Table
        data={vesselData}
        columns={columns}
        actions={actions}
        sortable={true}
        filterable={true}
        paginated={true}
        pageSize={10}
        selectable={true}
        onSelect={(selected) => console.log('Selected vessels:', selected)}
      />
    </div>
  );
}
```

## Crew Management Table

```jsx
import { User, Phone, Mail, Calendar, Award } from 'lucide-react';

function CrewManagementTable() {
  const crewData = [
    {
      id: '1',
      name: 'Captain James Wilson',
      rank: 'Master',
      nationality: 'British',
      vessel: 'MV Atlantic Star',
      joinDate: '2024-01-15',
      contractEnd: '2024-07-15',
      certifications: ['STCW Basic Safety', 'Ship Security Officer'],
      email: 'j.wilson@maritime.com',
      phone: '+44 7700 900123',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      rank: 'Chief Officer',
      nationality: 'Singapore',
      vessel: 'MV Pacific Dawn',
      joinDate: '2024-02-01',
      contractEnd: '2024-08-01',
      certifications: ['STCW Basic Safety', 'Bridge Resource Management'],
      email: 's.chen@maritime.com',
      phone: '+65 9123 4567',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      rank: 'Chief Engineer',
      nationality: 'Spanish',
      vessel: 'MV Nordic Explorer',
      joinDate: '2024-01-20',
      contractEnd: '2024-07-20',
      certifications: ['STCW Basic Safety', 'Engine Resource Management'],
      email: 'm.rodriguez@maritime.com',
      phone: '+34 612 345 678',
      status: 'On Leave'
    }
  ];

  const crewColumns = [
    { 
      key: 'name', 
      header: 'Name', 
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-gray-500">{row.rank}</div>
          </div>
        </div>
      )
    },
    { key: 'nationality', header: 'Nationality', sortable: true, filterable: true },
    { key: 'vessel', header: 'Current Vessel', sortable: true, filterable: true },
    { 
      key: 'joinDate', 
      header: 'Join Date', 
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'contractEnd', 
      header: 'Contract End', 
      sortable: true,
      render: (value) => {
        const endDate = new Date(value);
        const today = new Date();
        const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
        const isExpiringSoon = daysLeft <= 30;
        
        return (
          <div className={isExpiringSoon ? 'text-red-600 font-medium' : ''}>
            {endDate.toLocaleDateString()}
            {isExpiringSoon && (
              <div className="text-xs">({daysLeft} days left)</div>
            )}
          </div>
        );
      }
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          value === 'Active' ? 'bg-green-100 text-green-800' :
          value === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    }
  ];

  const crewActions = [
    {
      label: 'View Profile',
      icon: <User className="h-4 w-4" />,
      onClick: (row) => console.log('View profile for', row.name)
    },
    {
      label: 'Contact',
      icon: <Phone className="h-4 w-4" />,
      onClick: (row) => console.log('Contact', row.name),
      variant: 'outline'
    },
    {
      label: 'Certifications',
      icon: <Award className="h-4 w-4" />,
      onClick: (row) => console.log('View certifications for', row.name),
      variant: 'outline'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Crew Management</h2>
        <button className="px-4 py-2 bg-[#16569e] text-white rounded hover:bg-[#144d8a]">
          Add Crew Member
        </button>
      </div>
      
      <Table
        data={crewData}
        columns={crewColumns}
        actions={crewActions}
        sortable={true}
        filterable={true}
        paginated={true}
        pageSize={10}
        selectable={true}
        onSelect={(selected) => console.log('Selected crew:', selected)}
      />
    </div>
  );
}
```

## Voyage Management Table

```jsx
import { Calendar, MapPin, Clock, DollarSign } from 'lucide-react';

function VoyageManagementTable() {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [selectedVoyages, setSelectedVoyages] = useState([]);

  const voyageData = [
    {
      id: 'V001',
      vessel: 'MV Atlantic Star',
      route: 'Rotterdam → Hamburg → Antwerp',
      departure: '2024-03-15T08:00:00Z',
      arrival: '2024-03-20T14:00:00Z',
      status: 'In Progress',
      cargo: 'Containers',
      revenue: 180000,
      distance: 850,
      progress: 65
    },
    {
      id: 'V002',
      vessel: 'MV Pacific Dawn',
      route: 'Singapore → Shanghai → Hong Kong',
      departure: '2024-03-10T06:00:00Z',
      arrival: '2024-03-18T10:00:00Z',
      status: 'Completed',
      cargo: 'Bulk Coal',
      revenue: 240000,
      distance: 1250,
      progress: 100
    },
    {
      id: 'V003',
      vessel: 'MV Nordic Explorer',
      route: 'Houston → Rotterdam → Le Havre',
      departure: '2024-03-20T12:00:00Z',
      arrival: '2024-04-02T16:00:00Z',
      status: 'Planned',
      cargo: 'Crude Oil',
      revenue: 320000,
      distance: 4850,
      progress: 0
    }
  ];

  const voyageColumns = [
    { key: 'id', header: 'Voyage ID', width: '100px' },
    { key: 'vessel', header: 'Vessel', sortable: true, filterable: true },
    { 
      key: 'route', 
      header: 'Route',
      width: '200px',
      render: (value) => (
        <div className="text-sm">
          {value.split(' → ').map((port, index, array) => (
            <span key={index}>
              {port}
              {index < array.length - 1 && (
                <span className="text-gray-400 mx-1">→</span>
              )}
            </span>
          ))}
        </div>
      )
    },
    { 
      key: 'departure', 
      header: 'Departure', 
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          <div>{new Date(value).toLocaleDateString()}</div>
          <div className="text-gray-500">{new Date(value).toLocaleTimeString()}</div>
        </div>
      )
    },
    { 
      key: 'arrival', 
      header: 'Arrival', 
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          <div>{new Date(value).toLocaleDateString()}</div>
          <div className="text-gray-500">{new Date(value).toLocaleTimeString()}</div>
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      filterable: true,
      render: (value, row) => (
        <div>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            value === 'Completed' ? 'bg-green-100 text-green-800' :
            value === 'In Progress' ? 'bg-blue-100 text-blue-800' :
            value === 'Planned' ? 'bg-gray-100 text-gray-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {value}
          </span>
          {value === 'In Progress' && (
            <div className="mt-1">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-blue-600 h-1 rounded-full" 
                  style={{ width: `${row.progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{row.progress}% complete</div>
            </div>
          )}
        </div>
      )
    },
    { key: 'cargo', header: 'Cargo Type', filterable: true },
    { 
      key: 'revenue', 
      header: 'Revenue', 
      sortable: true,
      align: 'right',
      render: (value) => `$${value.toLocaleString()}`
    },
    { 
      key: 'distance', 
      header: 'Distance (NM)', 
      sortable: true,
      align: 'right',
      render: (value) => value.toLocaleString()
    }
  ];

  const voyageActions = [
    {
      label: 'View Details',
      icon: <MapPin className="h-4 w-4" />,
      onClick: (row) => console.log('View voyage details', row.id)
    },
    {
      label: 'Track Progress',
      icon: <Clock className="h-4 w-4" />,
      onClick: (row) => console.log('Track voyage', row.id),
      disabled: (row) => row.status === 'Planned'
    },
    {
      label: 'Financial Report',
      icon: <DollarSign className="h-4 w-4" />,
      onClick: (row) => console.log('Financial report', row.id),
      variant: 'outline'
    }
  ];

  const handleSort = (column, direction) => {
    setSortConfig({ key: column, direction });
    console.log('Sort by', column, direction);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters applied', newFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Voyage Management</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
            Export Data
          </button>
          <button className="px-4 py-2 bg-[#16569e] text-white rounded hover:bg-[#144d8a]">
            Plan New Voyage
          </button>
        </div>
      </div>

      <Table
        data={voyageData}
        columns={voyageColumns}
        actions={voyageActions}
        sortable={true}
        filterable={true}
        paginated={true}
        pageSize={5}
        selectable={true}
        onSort={handleSort}
        onFilter={handleFilter}
        onSelect={setSelectedVoyages}
      />

      {selectedVoyages.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-800">
              {selectedVoyages.length} voyage(s) selected
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                Bulk Actions
              </button>
              <button 
                onClick={() => setSelectedVoyages([])}
                className="px-3 py-1 border border-blue-300 rounded text-sm hover:bg-blue-100"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## Advanced Table Features

```jsx
function AdvancedTableFeatures() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  });

  // Simulate data loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData([
        // Sample data...
      ]);
      setPagination(prev => ({ ...prev, total: 25 }));
      setLoading(false);
    }, 1000);
  }, []);

  const columns = [
    { 
      key: 'select', 
      header: '', 
      width: '50px',
      render: (_, row, isSelected, onSelect) => (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(row, e.target.checked)}
          className="rounded"
        />
      )
    },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'type', header: 'Type', filterable: true },
    { key: 'status', header: 'Status', filterable: true }
  ];

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Advanced Table Features</h3>
      
      {/* Loading State */}
      {loading && (
        <div className="border rounded-lg p-8 text-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-[#16569e] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && data.length === 0 && (
        <div className="border rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Database className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="font-medium text-gray-900 mb-2">No data available</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first entry.</p>
          <button className="px-4 py-2 bg-[#16569e] text-white rounded hover:bg-[#144d8a]">
            Add Entry
          </button>
        </div>
      )}

      {/* Data Table */}
      {!loading && data.length > 0 && (
        <Table
          data={data}
          columns={columns}
          loading={loading}
          emptyMessage="No matching records found"
          sortable={true}
          filterable={true}
          paginated={true}
          pageSize={pagination.pageSize}
          selectable={true}
        />
      )}

      {/* Table with Custom Styling */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h4 className="font-medium">Custom Styled Table</h4>
        </div>
        <Table
          data={data}
          columns={columns}
          className="border-0"
          sortable={true}
        />
      </div>
    </div>
  );
}
```

## Key Features
- **Comprehensive Data Display**: Support for complex maritime data structures
- **Sorting & Filtering**: Multi-column sorting and filtering capabilities
- **Pagination**: Built-in pagination for large datasets
- **Row Selection**: Single and multi-row selection with bulk actions
- **Custom Rendering**: Flexible cell rendering for complex data types
- **Action Integration**: Row-level and bulk actions with permission controls
- **Responsive Design**: Mobile-friendly table layout with horizontal scrolling
- **Loading States**: Built-in loading and empty state handling

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Independent of form systems
- **No external providers**: Works without additional setup

## Maritime Data Types
- **Fleet Management**: Vessel lists, status tracking, performance metrics
- **Crew Management**: Personnel records, certifications, contracts
- **Voyage Tracking**: Route planning, progress monitoring, financial data
- **Compliance**: Inspection records, certificates, audit trails
- **Operations**: Port calls, cargo handling, maintenance schedules

## Best Practices
1. **Column Design**: Use appropriate column widths and alignments
2. **Data Formatting**: Format dates, numbers, and status consistently
3. **Action Placement**: Group related actions logically
4. **Responsive Handling**: Plan for mobile and tablet viewing
5. **Loading States**: Provide feedback during data operations
6. **Filtering Logic**: Implement intuitive filtering patterns
7. **Selection Feedback**: Clear indication of selected rows
8. **Performance**: Optimize for large datasets with pagination

## Common Use Cases
- Fleet vessel management tables
- Crew member databases
- Voyage and route planning
- Inspection and compliance tracking
- Financial and performance reporting
- Equipment and inventory management
- Document and certificate tracking
- Port call and schedule management
- Emergency contact directories
- Training and certification records