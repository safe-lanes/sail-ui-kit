import React, { useState } from 'react';
import { TMSAAppLayout } from 'scomp-ui';
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
  CheckCircle
} from 'lucide-react';

// Notification types for maritime context
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

// Settings panel data structure
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

function TMSAAppLayoutWithNotifications() {
  // Navigation and layout state
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Notifications state
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
    },
    {
      id: '5',
      type: 'safety',
      severity: 'critical',
      title: 'Safety Drill Overdue',
      message: 'Fire drill is overdue by 7 days. Immediate action required.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: false,
      actionRequired: true
    }
  ]);

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

  // UI state
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);

  // User data
  const currentUser = {
    name: 'Captain James Wilson',
    email: 'j.wilson@maritime.com',
    role: 'Master',
    vessel: 'MV Atlantic Star',
    avatar: '/api/placeholder/40/40'
  };

  // Navigation configuration
  const navigation = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      id: 'fleet',
      label: 'Fleet Management',
      path: '/fleet',
      icon: <Ship className="h-5 w-5" />,
      children: [
        { id: 'vessels', label: 'Vessels', path: '/fleet/vessels' },
        { id: 'maintenance', label: 'Maintenance', path: '/fleet/maintenance' },
        { id: 'routes', label: 'Routes', path: '/fleet/routes' }
      ]
    },
    {
      id: 'crew',
      label: 'Crew Management',
      path: '/crew',
      icon: <Users className="h-5 w-5" />,
      badge: notifications.filter(n => n.type === 'crew' && !n.read).length || undefined
    },
    {
      id: 'compliance',
      label: 'TMSA Compliance',
      path: '/compliance',
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  // Notification handlers
  const handleNotificationClick = () => {
    setShowNotificationPanel(true);
    setShowSettingsPanel(false); // Close settings if open
  };

  const handleSettingsClick = () => {
    setShowSettingsPanel(true);
    setShowNotificationPanel(false); // Close notifications if open
  };

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

  // Settings handlers
  const updateSettings = (section: keyof AppSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const saveSettings = () => {
    // Here you would typically save to backend
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

  // Get unread notification count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Get severity icon
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

  // Get severity background color
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

  return (
    <>
      <TMSAAppLayout
        title="Maritime Fleet Management"
        user={currentUser}
        navigation={navigation}
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        showSidebar={true}
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        // CRITICAL: These props make the bell and gear icons functional
        onNotificationClick={handleNotificationClick}
        onSettingsClick={handleSettingsClick}
        notificationCount={unreadCount}
      >
        <div className="p-6">
          {/* Your page content based on currentPath */}
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
                  <p className="text-orange-600">{unreadCount} notifications</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">TMSA Score</h3>
                  <p className="text-blue-600">87% Compliant</p>
                </div>
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
          {currentPath === '/compliance' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">TMSA Compliance</h2>
              <p>TMSA compliance content goes here...</p>
            </div>
          )}
        </div>
      </TMSAAppLayout>

      {/* Notification Panel */}
      {showNotificationPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowNotificationPanel(false)} />
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

      {/* Settings Panel */}
      {showSettingsPanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowSettingsPanel(false)} />
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
    </>
  );
}

export default TMSAAppLayoutWithNotifications;