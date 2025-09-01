# ScrollArea Component Guide

## Overview
The ScrollArea component provides custom-styled scrollable containers for maritime applications. It offers consistent scrolling behavior across platforms with TMSA-compliant styling for crew lists, vessel records, and navigation panels.

## Component Interface

```typescript
interface ScrollAreaProps {
  className?: string;
  children: React.ReactNode;
  type?: 'auto' | 'always' | 'scroll' | 'hover';
  scrollHideDelay?: number;
  dir?: 'ltr' | 'rtl';
}

interface ScrollBarProps {
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}
```

## Key Features
- **Custom Styling**: TMSA-compliant scrollbar appearance
- **Cross-Platform**: Consistent behavior across different browsers
- **Touch Support**: Optimized for mobile and tablet interactions
- **Performance**: Virtualization support for large datasets
- **Accessibility**: Keyboard navigation and screen reader support

## Basic Usage

```tsx
import { ScrollArea } from 'scomp-ui/sail-ui-kit';

function CrewMembersList() {
  const crewMembers = Array.from({ length: 100 }, (_, i) => ({
    id: `crew-${i + 1}`,
    name: `John Smith ${i + 1}`,
    rank: 'Captain',
    vessel: `MV Container ${i + 1}`,
    status: 'active'
  }));

  return (
    <div className="w-80 h-96 border border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-[#16569e]">Crew Members</h3>
        <p className="text-sm text-gray-600">{crewMembers.length} total members</p>
      </div>
      
      <ScrollArea className="h-80 p-4">
        <div className="space-y-3">
          {crewMembers.map((member) => (
            <div 
              key={member.id}
              className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <div className="h-10 w-10 bg-[#16569e] rounded-full flex items-center justify-center text-white text-sm font-medium">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {member.name}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {member.rank} • {member.vessel}
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
```

## Vessel Registry Scroll Area

```tsx
interface Vessel {
  id: string;
  name: string;
  type: string;
  imo: string;
  flag: string;
  built: number;
  dwt: number;
  status: 'active' | 'maintenance' | 'laid-up';
  location: string;
  lastUpdate: string;
}

function VesselRegistryScrollArea() {
  const vessels: Vessel[] = Array.from({ length: 250 }, (_, i) => ({
    id: `vessel-${i + 1}`,
    name: `MV Container ${i + 1}`,
    type: 'Container Ship',
    imo: `912345${String(i).padStart(3, '0')}`,
    flag: ['Panama', 'Liberia', 'Marshall Islands', 'Singapore'][i % 4],
    built: 2010 + (i % 14),
    dwt: 50000 + (i * 1000),
    status: ['active', 'maintenance', 'laid-up'][i % 3] as Vessel['status'],
    location: ['Singapore', 'Rotterdam', 'Long Beach', 'Hamburg'][i % 4],
    lastUpdate: new Date(Date.now() - i * 1000000).toISOString()
  }));

  const getStatusColor = (status: Vessel['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'laid-up': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-[#16569e]">Fleet Registry</h2>
            <p className="text-sm text-gray-600 mt-1">{vessels.length} vessels in database</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
              Add Vessel
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Export List
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search vessels by name, IMO, or flag state..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
          />
        </div>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="p-4">
          <div className="space-y-2">
            {vessels.map((vessel) => (
              <div 
                key={vessel.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 bg-[#16569e] rounded-lg flex items-center justify-center text-white">
                    <Ship className="h-6 w-6" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {vessel.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {vessel.type}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-900">IMO: {vessel.imo}</div>
                    <div className="text-sm text-gray-500">Flag: {vessel.flag}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-900">Built: {vessel.built}</div>
                    <div className="text-sm text-gray-500">DWT: {vessel.dwt.toLocaleString()}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-900">Location</div>
                    <div className="text-sm text-gray-500">{vessel.location}</div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vessel.status)}`}>
                      {vessel.status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(vessel.lastUpdate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
```

## Maritime Document Viewer

```tsx
interface Document {
  id: string;
  title: string;
  type: 'certificate' | 'manual' | 'procedure' | 'regulation';
  category: string;
  size: string;
  uploadDate: string;
  expiryDate?: string;
  status: 'current' | 'expiring' | 'expired';
}

function MaritimeDocumentViewer() {
  const documents: Document[] = Array.from({ length: 150 }, (_, i) => ({
    id: `doc-${i + 1}`,
    title: `Maritime Document ${i + 1}`,
    type: ['certificate', 'manual', 'procedure', 'regulation'][i % 4] as Document['type'],
    category: ['Safety', 'Navigation', 'Engine', 'Cargo', 'Crew'][i % 5],
    size: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)}MB`,
    uploadDate: new Date(Date.now() - i * 86400000).toISOString(),
    expiryDate: i % 3 === 0 ? new Date(Date.now() + (365 - i) * 86400000).toISOString() : undefined,
    status: ['current', 'expiring', 'expired'][i % 3] as Document['status']
  }));

  const getTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'certificate': return <Award className="h-5 w-5 text-yellow-600" />;
      case 'manual': return <Book className="h-5 w-5 text-blue-600" />;
      case 'procedure': return <ClipboardList className="h-5 w-5 text-green-600" />;
      case 'regulation': return <Scale className="h-5 w-5 text-purple-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Categories */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#16569e]">Document Categories</h3>
        </div>
        
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-2">
            {['All Documents', 'Safety', 'Navigation', 'Engine', 'Cargo', 'Crew'].map((category) => (
              <button
                key={category}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <span className="text-xs text-gray-500">
                    {category === 'All Documents' ? documents.length : Math.floor(documents.length / 5)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Document List */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#16569e]">Maritime Documents</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors">
                Upload Document
              </button>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]">
                <option>Sort by Upload Date</option>
                <option>Sort by Expiry Date</option>
                <option>Sort by Name</option>
                <option>Sort by Type</option>
              </select>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div 
                  key={doc.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(doc.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {doc.title}
                        </h4>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                      
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="font-medium">{doc.category}</span>
                          <span className="mx-1">•</span>
                          <span>{doc.size}</span>
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                        </div>
                        
                        {doc.expiryDate && (
                          <div className="text-xs text-gray-500">
                            Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 flex space-x-2">
                        <button className="text-xs text-[#16569e] hover:underline">
                          View
                        </button>
                        <button className="text-xs text-[#16569e] hover:underline">
                          Download
                        </button>
                        <button className="text-xs text-gray-500 hover:underline">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
```

## Horizontal Scroll Example

```tsx
function VesselTimelineScroll() {
  const timelineEvents = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    date: new Date(Date.now() + i * 86400000),
    event: ['Port Call', 'Maintenance', 'Inspection', 'Dry Dock', 'Crew Change'][i % 5],
    location: ['Singapore', 'Rotterdam', 'Los Angeles', 'Hamburg', 'Tokyo'][i % 5],
    status: ['scheduled', 'in-progress', 'completed'][i % 3]
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-[#16569e]">Vessel Operations Timeline</h3>
        <p className="text-sm text-gray-600">MV Container 1 • Next 50 events</p>
      </div>
      
      <ScrollArea 
        className="w-full" 
        orientation="horizontal"
      >
        <div className="flex space-x-4 p-4" style={{ width: timelineEvents.length * 250 }}>
          {timelineEvents.map((event) => (
            <div 
              key={event.id}
              className="flex-shrink-0 w-60 bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">
                  {event.date.toLocaleDateString()}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
              
              <h4 className="text-base font-semibold text-[#16569e] mb-1">
                {event.event}
              </h4>
              
              <p className="text-sm text-gray-600 mb-3">
                {event.location}
              </p>
              
              <div className="text-xs text-gray-500">
                {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
```

## Chat/Messages Scroll Area

```tsx
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  type: 'incoming' | 'outgoing';
  urgent?: boolean;
}

function MaritimeCommunicationPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Sample messages
  useEffect(() => {
    const sampleMessages: Message[] = Array.from({ length: 30 }, (_, i) => ({
      id: `msg-${i + 1}`,
      sender: i % 2 === 0 ? 'Shore Control' : 'MV Container 1',
      content: `Message ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${i % 5 === 0 ? 'This is an urgent message requiring immediate attention.' : ''}`,
      timestamp: new Date(Date.now() - (30 - i) * 300000),
      type: i % 2 === 0 ? 'incoming' : 'outgoing',
      urgent: i % 5 === 0
    }));
    setMessages(sampleMessages);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        sender: 'Fleet Manager',
        content: newMessage,
        timestamp: new Date(),
        type: 'outgoing'
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-96 bg-white border border-gray-200 rounded-lg flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#16569e]">Ship-Shore Communication</h3>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-3">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'outgoing' 
                  ? 'bg-[#16569e] text-white' 
                  : message.urgent
                  ? 'bg-red-100 border-2 border-red-300 text-red-900'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium opacity-75">
                    {message.sender}
                  </span>
                  {message.urgent && (
                    <AlertTriangle className="h-3 w-3 text-red-600" />
                  )}
                </div>
                <p className="text-sm">{message.content}</p>
                <div className="text-xs opacity-75 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:border-[#16569e] focus:ring-[#16569e]"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-[#16569e] text-white rounded-md hover:bg-[#134a87] transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Best Practices

1. **Performance**: Use virtualization for very large lists (1000+ items)
2. **Smooth Scrolling**: Ensure consistent scroll behavior across devices
3. **Visual Feedback**: Show scroll position indicators when appropriate
4. **Mobile Optimization**: Test touch scrolling on mobile devices
5. **Accessibility**: Provide keyboard navigation support
6. **Auto-scroll**: Implement auto-scroll for real-time data updates

## Context Requirements

The ScrollArea component works with:
- **Virtualization Libraries**: For handling large datasets efficiently
- **State Management**: Scroll position persistence
- **Theme Context**: Maritime color scheme and styling
- **Responsive Framework**: Mobile and desktop scroll behaviors

## Troubleshooting

### Common Issues

**Scroll area not working**
```tsx
// Ensure proper height constraints
<div className="h-96"> {/* Fixed height container */}
  <ScrollArea className="h-full">
    {/* content */}
  </ScrollArea>
</div>
```

**Performance issues with large lists**
```tsx
// Use virtual scrolling for large datasets
import { FixedSizeList as List } from 'react-window';

<ScrollArea className="h-96">
  <List
    height={384}
    itemCount={items.length}
    itemSize={60}
  >
    {({ index, style }) => (
      <div style={style}>
        <ItemComponent item={items[index]} />
      </div>
    )}
  </List>
</ScrollArea>
```

**Horizontal scroll not working**
```tsx
// Ensure content width exceeds container
<ScrollArea className="w-full" orientation="horizontal">
  <div className="flex space-x-4" style={{ width: 'max-content' }}>
    {/* horizontal content */}
  </div>
</ScrollArea>
```