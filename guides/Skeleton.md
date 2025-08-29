# Skeleton Component Guide

## Overview
Skeleton provides loading state placeholders for maritime applications while data is being fetched or processed. It offers various skeleton shapes and patterns optimized for vessel information, crew data, and operational displays with consistent maritime application styling.

## Component Interface

```typescript
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'default' | 'circle' | 'rectangle' | 'text';
  width?: string | number;
  height?: string | number;
  lines?: number; // For text variant
  animation?: 'pulse' | 'wave' | 'none';
}

// Pre-built skeleton patterns
interface SkeletonCardProps {
  showAvatar?: boolean;
  showActions?: boolean;
  lines?: number;
  className?: string;
}

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}
```

## Basic Usage

```jsx
import { Skeleton } from 'scomp-ui';

function BasicSkeletonExample() {
  return (
    <div className="space-y-4">
      {/* Basic skeleton shapes */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Circle skeleton for avatars */}
      <div className="flex items-center space-x-3">
        <Skeleton variant="circle" className="h-12 w-12" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Rectangle for images */}
      <Skeleton variant="rectangle" className="h-32 w-full rounded" />
    </div>
  );
}
```

## Vessel Information Loading States

```jsx
function VesselLoadingSkeletons() {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Ship className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium">MV Atlantic Star</h3>
            <p className="text-gray-600">Container Ship • IMO: 1234567</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-medium text-green-600">Operational</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-medium">Port of Rotterdam</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-6">
      {/* Vessel header skeleton */}
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton variant="circle" className="h-12 w-12" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Details skeleton */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
}
```

## Fleet Dashboard Loading

```jsx
function FleetDashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <Skeleton variant="circle" className="h-8 w-8" />
              <Skeleton className="h-6 w-12" />
            </div>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>

      {/* Vessel list skeleton */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>
        
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center space-x-3">
                <Skeleton variant="circle" className="h-10 w-10" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Table Loading Skeleton

```jsx
function TableLoadingSkeleton({ rows = 5, columns = 6 }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      {/* Table header skeleton */}
      <div className="border-b bg-gray-50">
        <div className="flex">
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="flex-1 p-3">
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>

      {/* Table rows skeleton */}
      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="flex-1 p-3">
                {colIndex === 0 ? (
                  // First column with avatar
                  <div className="flex items-center space-x-3">
                    <Skeleton variant="circle" className="h-8 w-8" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ) : colIndex === columns - 1 ? (
                  // Last column with actions
                  <div className="flex space-x-2">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-6" />
                  </div>
                ) : (
                  // Regular data columns
                  <Skeleton className="h-4 w-full" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CrewManagementTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-32" />
      </div>
      
      <TableLoadingSkeleton rows={8} columns={7} />
      
      {/* Pagination skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <div className="flex space-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-8" />
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Form Loading Skeleton

```jsx
function FormLoadingSkeleton() {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-6">
      {/* Form header */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      {/* Large text area */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-24 w-full" />
      </div>

      {/* Form actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
```

## Chart and Analytics Skeleton

```jsx
function ChartLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Analytics header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton variant="circle" className="h-6 w-6" />
            </div>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-6 w-32" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
        
        {/* Bar chart skeleton */}
        <div className="h-64 flex items-end justify-between space-x-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full"
              style={{ height: `${Math.random() * 80 + 20}%` }}
            />
          ))}
        </div>
        
        {/* Chart legend */}
        <div className="flex justify-center space-x-6 mt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Skeleton className="h-3 w-3" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Pre-built Skeleton Components

```jsx
function SkeletonCard({ showAvatar = true, showActions = true, lines = 3 }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {showAvatar && <Skeleton variant="circle" className="h-10 w-10" />}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        {showActions && (
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-6" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            className={`h-3 ${
              index === lines - 1 ? 'w-2/3' : 'w-full'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function SkeletonList({ items = 5, showActions = true }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center justify-between p-3 border rounded">
          <div className="flex items-center space-x-3">
            <Skeleton variant="circle" className="h-8 w-8" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          {showActions && (
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PrebuiltSkeletonExamples() {
  return (
    <div className="space-y-6">
      <h3 className="font-medium">Pre-built Skeleton Components</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card skeletons */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Card Skeletons</h4>
          <SkeletonCard />
          <SkeletonCard showAvatar={false} lines={2} />
          <SkeletonCard showActions={false} lines={4} />
        </div>

        {/* List skeletons */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">List Skeletons</h4>
          <SkeletonList items={4} />
        </div>
      </div>
    </div>
  );
}
```

## Animation Variants

```jsx
function SkeletonAnimationVariants() {
  return (
    <div className="space-y-6">
      <h3 className="font-medium">Animation Variants</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Pulse Animation (Default)</h4>
          <div className="space-y-2">
            <Skeleton animation="pulse" className="h-4 w-full" />
            <Skeleton animation="pulse" className="h-4 w-3/4" />
            <Skeleton animation="pulse" className="h-4 w-1/2" />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm">Wave Animation</h4>
          <div className="space-y-2">
            <Skeleton animation="wave" className="h-4 w-full" />
            <Skeleton animation="wave" className="h-4 w-3/4" />
            <Skeleton animation="wave" className="h-4 w-1/2" />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm">No Animation</h4>
          <div className="space-y-2">
            <Skeleton animation="none" className="h-4 w-full" />
            <Skeleton animation="none" className="h-4 w-3/4" />
            <Skeleton animation="none" className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Key Features
- **Multiple Variants**: Text, circle, rectangle shapes for different content types
- **Animation Options**: Pulse, wave, and static animation variants
- **Pre-built Patterns**: Card, list, and table skeleton components
- **Responsive Design**: Adapts to container sizes and screen dimensions
- **Maritime Context**: Optimized for vessel data, crew information, and operational displays
- **Performance Optimized**: Lightweight animations without impacting performance
- **Accessibility**: Proper ARIA labels for screen readers
- **Customizable**: Flexible sizing and styling options

## Context Requirements
- **No context needed**: Self-contained component
- **No form context**: Independent of form systems
- **No external providers**: Works without additional setup

## Animation Guidelines
- **Pulse**: Default choice for most loading states
- **Wave**: For data-heavy components and charts
- **None**: For minimal interfaces or accessibility concerns

## Best Practices
1. **Realistic Shapes**: Match skeleton dimensions to actual content
2. **Consistent Animation**: Use same animation type across related components
3. **Performance**: Use CSS animations for smooth rendering
4. **Accessibility**: Include appropriate ARIA labels
5. **Timing**: Show skeletons for loading states longer than 300ms
6. **Progressive Enhancement**: Gracefully handle no-JavaScript scenarios
7. **Mobile Optimization**: Ensure skeletons work well on touch devices

## Common Use Cases
- Fleet dashboard loading states
- Vessel information fetching
- Crew data table loading
- Chart and analytics loading
- Form field initialization
- Navigation menu loading
- Document list loading
- Search results loading
- Real-time data updates
- Image and media loading placeholders