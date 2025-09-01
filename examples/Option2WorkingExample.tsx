import React, { useState } from 'react';
import { 
  TopNavigationBar, 
  LeftSidebar, 
  SidebarProvider 
} from 'scomp-ui';
import { 
  Ship, 
  Users, 
  FileText, 
  Settings, 
  BarChart3,
  Bell,
  X,
  AlertTriangle,
  Info,
  CheckCircle,
  Wrench,
  Cloud,
  User
} from 'lucide-react';

// Notification interface
interface Notification {
  id: string;
  type: 'weather' | 'maintenance' | 'safety' | 'compliance' | 'crew';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
}

// Profile interface
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  vessel: string;
  department: string;
  joinDate: string;
  phoneNumber: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  certifications: {
    name: string;
    issueDate: string;
    expiryDate: string;
    status: 'valid' | 'expiring' | 'expired';
  }[];
}

// Settings interface
interface AppSettings {
  notifications: {
    emailAlerts: boolean;
    smsAlerts: boolean;
    weatherAlerts: boolean;
    maintenanceReminders: boolean;
  };
  display: {
    theme: 'light' | 'dark';
    language: string;
    timezone: string;
  };
  vessel: {
    defaultVessel: string;
    autoSync: boolean;
  };
}

function Option2WorkingExample() {
  // Layout state
  const [currentPath, setCurrentPath] = useState('/dashboard');
  
  // Panel state
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);

  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'weather',
      severity: 'high',
      title: 'Severe Weather Alert',
      message: 'Strong winds and high seas forecast for your current route. Consider alternative passage.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
      actionRequired: true
    },
    {
      id: '2',
      type: 'maintenance',
      severity: 'medium',
      title: 'Engine Maintenance Due',
      message: 'Main engine maintenance is due in 48 hours. Schedule maintenance window.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      actionRequired: true
    },
    {
      id: '3',
      type: 'crew',
      severity: 'medium',
      title: 'Certificate Expiry',
      message: '2 crew members have certificates expiring within 30 days.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      read: false,
      actionRequired: false
    },
    {
      id: '4',
      type: 'compliance',
      severity: 'low',
      title: 'TMSA Assessment',
      message: 'Monthly TMSA self-assessment completed. Review results.',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      read: true,
      actionRequired: false
    }
  ]);

  // Profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'Captain James Wilson',
    email: 'j.wilson@maritime.com',
    role: 'Master',
    avatar: '/api/placeholder/40/40',
    vessel: 'MV Atlantic Star',
    department: 'Navigation',
    joinDate: '2019-03-15',
    phoneNumber: '+1-555-0123',
    emergencyContact: {
      name: 'Sarah Wilson',
      phone: '+1-555-0456',
      relationship: 'Spouse'
    },
    certifications: [
      {
        name: 'Master Mariner License',
        issueDate: '2018-01-15',
        expiryDate: '2026-01-15',
        status: 'valid'
      },
      {
        name: 'STCW Basic Safety Training',
        issueDate: '2020-06-10',
        expiryDate: '2025-06-10',
        status: 'expiring'
      },
      {
        name: 'Radar Observer Certificate',
        issueDate: '2019-03-20',
        expiryDate: '2024-03-20',
        status: 'expired'
      }
    ]
  });

  // Settings state
  const [settings, setSettings] = useState<AppSettings>({
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      weatherAlerts: true,
      maintenanceReminders: true
    },
    display: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC'
    },
    vessel: {
      defaultVessel: 'MV Atlantic Star',
      autoSync: true
    }
  });

  // User data
  const currentUser = {
    id: '1',
    name: 'Captain James Wilson',
    email: 'j.wilson@maritime.com',
    role: 'Master',
    avatar: '/api/placeholder/40/40'
  };

  // Menu items for sidebar
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: <BarChart3 className="h-5 w-5" />,
      isActive: currentPath === '/dashboard'
    },
    {
      id: 'fleet',
      label: 'Fleet Management',
      path: '/fleet',
      icon: <Ship className="h-5 w-5" />,
      isActive: currentPath === '/fleet'
    },
    {
      id: 'crew',
      label: 'Crew Management',
      path: '/crew',
      icon: <Users className="h-5 w-5" />,
      isActive: currentPath === '/crew',
      count: notifications.filter(n => n.type === 'crew' && !n.read).length || undefined
    },
    {
      id: 'compliance',
      label: 'TMSA Compliance',
      path: '/compliance',
      icon: <FileText className="h-5 w-5" />,
      isActive: currentPath === '/compliance'
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
      isActive: currentPath === '/settings'
    }
  ];

  // Handler functions
  const handleNotificationClick = () => {
    console.log("Bell icon clicked!");
    setShowNotificationPanel(true);
    setShowSettingsPanel(false); // Close settings if open
    setShowProfilePanel(false); // Close profile if open
  };

  const handleSettingsClick = () => {
    console.log("Gear icon clicked!");
    setShowSettingsPanel(true);
    setShowNotificationPanel(false); // Close notifications if open
    setShowProfilePanel(false); // Close profile if open
  };

  const handleProfileClick = () => {
    console.log("Profile clicked!");
    setShowProfilePanel(true);
    setShowNotificationPanel(false); // Close notifications if open
    setShowSettingsPanel(false); // Close settings if open
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Implement logout logic here
  };

  const handleModuleChange = (moduleId: string) => {
    console.log("Module changed to:", moduleId);
    // Implement module change logic here
  };

  // Notification functions
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(n => n.id !== notificationId)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Settings functions
  const updateSettings = (section: keyof AppSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  // Profile functions
  const updateProfile = (field: keyof UserProfile, value: any) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateEmergencyContact = (field: string, value: string) => {
    setUserProfile(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  const saveProfile = () => {
    console.log('Saving profile:', userProfile);
    setShowProfilePanel(false);
    
    // Show success notification
    const successNotification: Notification = {
      id: Date.now().toString(),
      type: 'compliance',
      severity: 'low',
      title: 'Profile Updated',
      message: 'Your profile information has been updated successfully.',
      timestamp: new Date(),
      read: false,
      actionRequired: false
    };
    setNotifications(prev => [successNotification, ...prev]);
  };

  const saveSettings = () => {
    console.log('Saving settings:', settings);
    setShowSettingsPanel(false);
    
    // Show success notification
    const successNotification: Notification = {
      id: Date.now().toString(),
      type: 'compliance',
      severity: 'low',
      title: 'Settings Saved',
      message: 'Your application settings have been updated successfully.',
      timestamp: new Date(),
      read: false,
      actionRequired: false
    };
    setNotifications(prev => [successNotification, ...prev]);
  };

  // Helper functions
  const unreadCount = notifications.filter(n => !n.read).length;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'high':
        return 'bg-orange-50 border-orange-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <Cloud className="h-4 w-4" />;
      case 'maintenance':
        return <Wrench className="h-4 w-4" />;
      case 'crew':
        return <Users className="h-4 w-4" />;
      case 'safety':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <>
      {/* Main Layout - Option 2: Using components directly */}
      <div className="min-h-screen bg-gray-50">
        {/* TopNavigationBar with functional bell and gear icons */}
        <TopNavigationBar
          moduleName="Fleet Management System"
          currentModule="fleet"
          onModuleChange={handleModuleChange}
          user={currentUser}
          showNotifications={true}
          onNotificationClick={handleNotificationClick}  // ✅ Bell icon works!
          onSettingsClick={handleSettingsClick}          // ✅ Gear icon works!
          onLogout={handleLogout}
        />
        
        {/* Sidebar Layout */}
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-[calc(100vh-4rem)]">
            {/* Left Sidebar */}
            <LeftSidebar 
              menuItems={menuItems} 
              moduleName="Fleet Management System" 
            />
            
            {/* Main Content Area */}
            <main className="flex-1 p-6 overflow-y-auto">
              <div className="mx-auto max-w-7xl">
                {/* Content based on current path */}
                {currentPath === '/dashboard' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Vessel Status</h3>
                        <p className="text-green-600">All vessels operational</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Active Alerts</h3>
                        <p className="text-orange-600">{unreadCount} unread notifications</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">TMSA Score</h3>
                        <p className="text-blue-600">87% Compliant</p>
                      </div>
                    </div>
                    
                    {/* Quick test buttons */}
                    <div className="mt-8 space-x-4">
                      <button 
                        onClick={handleNotificationClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      >
                        Test Bell Icon
                      </button>
                      <button 
                        onClick={handleSettingsClick}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                      >
                        Test Gear Icon
                      </button>
                      <button 
                        onClick={handleProfileClick}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Test Profile
                      </button>
                    </div>
                  </div>
                )}
                
                {currentPath === '/fleet' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Fleet Management</h2>
                    <p>Fleet management content goes here...</p>
                  </div>
                )}
                
                {currentPath === '/crew' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Crew Management</h2>
                    <p>Crew management content goes here...</p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>

      {/* Notification Panel - Slides out when bell icon is clicked */}
      {showNotificationPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowNotificationPanel(false)} 
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotificationPanel(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Notification List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No notifications</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          notification.read 
                            ? 'bg-gray-50 border-gray-200' 
                            : `${getSeverityBg(notification.severity)}`
                        }`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getTypeIcon(notification.type)}
                              {getSeverityIcon(notification.severity)}
                              <h3 className="font-medium text-sm">{notification.title}</h3>
                              {notification.actionRequired && (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                  Action Required
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                            <p className="text-xs text-gray-400">
                              {notification.timestamp.toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <X className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="border-t p-4">
                  <button
                    onClick={clearAllNotifications}
                    className="w-full py-2 text-sm text-red-600 hover:text-red-800 border border-red-200 rounded hover:bg-red-50"
                  >
                    Clear All Notifications
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel - Slides out when gear icon is clicked */}
      {showSettingsPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowSettingsPanel(false)} 
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Settings</h2>
                </div>
                <button
                  onClick={() => setShowSettingsPanel(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Settings Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Notification Settings */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span>Email Alerts</span>
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailAlerts}
                        onChange={(e) => updateSettings('notifications', 'emailAlerts', e.target.checked)}
                        className="rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>SMS Alerts</span>
                      <input
                        type="checkbox"
                        checked={settings.notifications.smsAlerts}
                        onChange={(e) => updateSettings('notifications', 'smsAlerts', e.target.checked)}
                        className="rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Weather Alerts</span>
                      <input
                        type="checkbox"
                        checked={settings.notifications.weatherAlerts}
                        onChange={(e) => updateSettings('notifications', 'weatherAlerts', e.target.checked)}
                        className="rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span>Maintenance Reminders</span>
                      <input
                        type="checkbox"
                        checked={settings.notifications.maintenanceReminders}
                        onChange={(e) => updateSettings('notifications', 'maintenanceReminders', e.target.checked)}
                        className="rounded"
                      />
                    </label>
                  </div>
                </div>

                {/* Display Settings */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Display Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Theme</label>
                      <select
                        value={settings.display.theme}
                        onChange={(e) => updateSettings('display', 'theme', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Language</label>
                      <select
                        value={settings.display.language}
                        onChange={(e) => updateSettings('display', 'language', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Timezone</label>
                      <select
                        value={settings.display.timezone}
                        onChange={(e) => updateSettings('display', 'timezone', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="UTC">UTC</option>
                        <option value="GMT">GMT</option>
                        <option value="EST">EST</option>
                        <option value="PST">PST</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Vessel Settings */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Vessel Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Default Vessel</label>
                      <select
                        value={settings.vessel.defaultVessel}
                        onChange={(e) => updateSettings('vessel', 'defaultVessel', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="MV Atlantic Star">MV Atlantic Star</option>
                        <option value="MV Pacific Dawn">MV Pacific Dawn</option>
                        <option value="MV Northern Light">MV Northern Light</option>
                      </select>
                    </div>
                    <label className="flex items-center justify-between">
                      <span>Auto-sync data</span>
                      <input
                        type="checkbox"
                        checked={settings.vessel.autoSync}
                        onChange={(e) => updateSettings('vessel', 'autoSync', e.target.checked)}
                        className="rounded"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t p-4 flex gap-3">
                <button
                  onClick={() => setShowSettingsPanel(false)}
                  className="flex-1 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSettings}
                  className="flex-1 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Panel - Shows when profile is clicked */}
      {showProfilePanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowProfilePanel(false)} 
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Profile</h2>
                </div>
                <button
                  onClick={() => setShowProfilePanel(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Profile Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={userProfile.name}
                        onChange={(e) => updateProfile('name', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => updateProfile('email', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Role</label>
                      <select
                        value={userProfile.role}
                        onChange={(e) => updateProfile('role', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="Master">Master</option>
                        <option value="Chief Officer">Chief Officer</option>
                        <option value="Second Officer">Second Officer</option>
                        <option value="Third Officer">Third Officer</option>
                        <option value="Chief Engineer">Chief Engineer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Vessel</label>
                      <select
                        value={userProfile.vessel}
                        onChange={(e) => updateProfile('vessel', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="MV Atlantic Star">MV Atlantic Star</option>
                        <option value="MV Pacific Dawn">MV Pacific Dawn</option>
                        <option value="MV Northern Light">MV Northern Light</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={userProfile.phoneNumber}
                        onChange={(e) => updateProfile('phoneNumber', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Name</label>
                      <input
                        type="text"
                        value={userProfile.emergencyContact.name}
                        onChange={(e) => updateEmergencyContact('name', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Phone</label>
                      <input
                        type="tel"
                        value={userProfile.emergencyContact.phone}
                        onChange={(e) => updateEmergencyContact('phone', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Relationship</label>
                      <select
                        value={userProfile.emergencyContact.relationship}
                        onChange={(e) => updateEmergencyContact('relationship', e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value="Spouse">Spouse</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Child">Child</option>
                        <option value="Friend">Friend</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Certifications</h3>
                  <div className="space-y-3">
                    {userProfile.certifications.map((cert, index) => (
                      <div key={index} className="border rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{cert.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded ${
                            cert.status === 'expired' ? 'bg-red-100 text-red-800' :
                            cert.status === 'expiring' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {cert.status === 'expired' ? 'Expired' :
                             cert.status === 'expiring' ? 'Expiring Soon' : 'Valid'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Issued: {new Date(cert.issueDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t p-4 flex gap-3">
                <button
                  onClick={() => setShowProfilePanel(false)}
                  className="flex-1 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProfile}
                  className="flex-1 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Option2WorkingExample;