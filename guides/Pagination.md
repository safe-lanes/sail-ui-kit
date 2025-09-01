# Pagination Component Guide

## Overview
The Pagination component provides navigation controls for large datasets in maritime applications. It supports various pagination patterns optimized for fleet management tables, crew records, and vessel listings with TMSA-compliant styling.

## Component Interface

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisible?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'maritime' | 'compact';
}

interface PaginationButtonProps {
  page: number;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}
```

## Key Features
- **Maritime Theme**: TMSA-compliant styling with maritime blue (#16569e)
- **Flexible Display**: Configurable number of visible page buttons
- **Size Variants**: Multiple sizes for different contexts
- **Keyboard Support**: Full keyboard navigation
- **Mobile Responsive**: Touch-friendly controls for mobile devices

## Basic Usage

```tsx
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from 'scomp-ui/sail-ui-kit';

function VesselListPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 25;

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href="#"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="text-[#16569e] hover:bg-blue-50"
          />
        </PaginationItem>
        
        {/* First page */}
        <PaginationItem>
          <PaginationLink 
            href="#"
            onClick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
            className={currentPage === 1 ? "bg-[#16569e] text-white" : "text-[#16569e] hover:bg-blue-50"}
          >
            1
          </PaginationLink>
        </PaginationItem>
        
        {/* Ellipsis if needed */}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        
        {/* Current page and neighbors */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = Math.max(2, Math.min(totalPages - 1, currentPage - 2 + i));
          if (page === 1 || page === totalPages) return null;
          
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(page)}
                isActive={currentPage === page}
                className={currentPage === page ? "bg-[#16569e] text-white" : "text-[#16569e] hover:bg-blue-50"}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        
        {/* Ellipsis if needed */}
        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        
        {/* Last page */}
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => setCurrentPage(totalPages)}
              isActive={currentPage === totalPages}
              className={currentPage === totalPages ? "bg-[#16569e] text-white" : "text-[#16569e] hover:bg-blue-50"}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="text-[#16569e] hover:bg-blue-50"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## Fleet Management Table Pagination

```tsx
interface VesselRecord {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'maintenance' | 'inactive';
  lastUpdate: string;
}

function FleetTableWithPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [vessels, setVessels] = useState<VesselRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const totalPages = Math.ceil(totalRecords / pageSize);

  // Simulate data fetching
  useEffect(() => {
    fetchVessels(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchVessels = async (page: number, size: number) => {
    // Simulate API call
    const mockData: VesselRecord[] = Array.from({ length: size }, (_, i) => ({
      id: `vessel-${(page - 1) * size + i + 1}`,
      name: `MV Container ${(page - 1) * size + i + 1}`,
      type: 'Container Ship',
      status: 'active',
      lastUpdate: new Date().toISOString()
    }));
    
    setVessels(mockData);
    setTotalRecords(247); // Mock total
  };

  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#16569e]">Fleet Registry</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Show:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:border-[#16569e] focus:ring-[#16569e]"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>
      </div>

      {/* Vessel Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vessel Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Update
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vessels.map((vessel) => (
              <tr key={vessel.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {vessel.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vessel.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    vessel.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : vessel.status === 'maintenance'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {vessel.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(vessel.lastUpdate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords} vessels
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="text-[#16569e] hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
              let page: number;
              if (totalPages <= 7) {
                page = i + 1;
              } else if (currentPage <= 4) {
                page = i + 1;
              } else if (currentPage >= totalPages - 3) {
                page = totalPages - 6 + i;
              } else {
                page = currentPage - 3 + i;
              }
              
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className={currentPage === page 
                      ? "bg-[#16569e] text-white border-[#16569e]" 
                      : "text-[#16569e] hover:bg-blue-50 border-gray-300"
                    }
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="text-[#16569e] hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
```

## Crew Appraisals Pagination

```tsx
interface CrewAppraisal {
  id: string;
  crewMemberId: string;
  crewName: string;
  rank: string;
  vesselName: string;
  appraisalDate: string;
  status: 'completed' | 'pending' | 'overdue';
  score: number;
}

function CrewAppraisalsPagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [appraisals, setAppraisals] = useState<CrewAppraisal[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    rank: 'all',
    vessel: 'all'
  });

  const pageSize = 15;
  const totalPages = 12; // Mock total pages

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:border-[#16569e] focus:ring-[#16569e]"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rank
            </label>
            <select
              value={filters.rank}
              onChange={(e) => setFilters({...filters, rank: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:border-[#16569e] focus:ring-[#16569e]"
            >
              <option value="all">All Ranks</option>
              <option value="captain">Captain</option>
              <option value="first-officer">First Officer</option>
              <option value="engineer">Chief Engineer</option>
              <option value="bosun">Bosun</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vessel
            </label>
            <select
              value={filters.vessel}
              onChange={(e) => setFilters({...filters, vessel: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:border-[#16569e] focus:ring-[#16569e]"
            >
              <option value="all">All Vessels</option>
              <option value="mv-container-1">MV Container 1</option>
              <option value="mv-tanker-2">MV Tanker 2</option>
              <option value="mv-bulk-3">MV Bulk 3</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setCurrentPage(1)}
              className="w-full bg-[#16569e] text-white px-4 py-2 rounded hover:bg-[#134a87] transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages} • Showing {pageSize} appraisals per page
        </div>
        <div className="text-sm text-gray-600">
          Total: 178 appraisals found
        </div>
      </div>

      {/* Appraisals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: pageSize }, (_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">John Smith {i + 1}</h3>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Completed
              </span>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Rank: Captain</p>
              <p>Vessel: MV Container {i + 1}</p>
              <p>Score: 4.2/5.0</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Maritime-styled Pagination */}
      <div className="bg-[#16569e] text-white p-4 rounded-lg">
        <Pagination>
          <PaginationContent className="justify-center">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="text-white hover:bg-blue-600 disabled:opacity-50"
              />
            </PaginationItem>
            
            {/* Compact pagination for mobile */}
            <div className="hidden md:flex">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = Math.max(1, Math.min(totalPages, currentPage - 2 + i));
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className={currentPage === page 
                        ? "bg-white text-[#16569e] border-white" 
                        : "text-white hover:bg-blue-600 border-blue-400"
                      }
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            </div>
            
            {/* Mobile page indicator */}
            <div className="md:hidden px-4 py-2 text-sm">
              {currentPage} / {totalPages}
            </div>
            
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="text-white hover:bg-blue-600 disabled:opacity-50"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
```

## Compact Mobile Pagination

```tsx
function MobilePagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-[#16569e] bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-[#16569e] bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {/* Show first, current-1, current, current+1, last */}
              {[1, currentPage - 1, currentPage, currentPage + 1, totalPages]
                .filter((page, index, arr) => page >= 1 && page <= totalPages && arr.indexOf(page) === index)
                .map((page, index, arr) => (
                  <React.Fragment key={page}>
                    {index > 0 && arr[index - 1] < page - 1 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        onClick={() => onPageChange(page)}
                        isActive={currentPage === page}
                        className={currentPage === page ? "bg-[#16569e] text-white" : "text-[#16569e] hover:bg-blue-50"}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  </React.Fragment>
                ))}
              
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
```

## Best Practices

1. **Performance**: Use server-side pagination for large datasets
2. **User Experience**: Show loading states during page transitions
3. **Mobile Optimization**: Provide compact pagination for small screens
4. **Accessibility**: Ensure keyboard navigation and screen reader support
5. **Context**: Display current page and total records information
6. **Maritime Theme**: Use consistent TMSA-compliant styling

## Context Requirements

The Pagination component works with:
- **Data Tables**: Integration with table components
- **API Services**: Server-side pagination support
- **State Management**: Current page and filtering state
- **Responsive Framework**: Mobile and desktop layouts

## Troubleshooting

### Common Issues

**Page numbers not updating correctly**
```tsx
// Ensure proper state management
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  // Reset to page 1 when filters change
  setCurrentPage(1);
}, [filters]);
```

**Mobile pagination not responsive**
```tsx
// Use responsive design patterns
<div className="block sm:hidden">
  <MobilePagination />
</div>
<div className="hidden sm:block">
  <DesktopPagination />
</div>
```

**Performance issues with large datasets**
```tsx
// Implement proper data fetching
const fetchData = useCallback(async (page: number, pageSize: number) => {
  setLoading(true);
  try {
    const data = await api.fetchVessels({ page, pageSize, ...filters });
    setVessels(data.items);
    setTotalRecords(data.total);
  } finally {
    setLoading(false);
  }
}, [filters]);
```