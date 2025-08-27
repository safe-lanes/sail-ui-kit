import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

export interface AlertNotificationProps {
  type: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  message: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  timestamp?: string;
  vessel?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'default' | 'secondary' | 'destructive';
  }>;
  className?: string;
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    className: 'border-green-200 bg-green-50',
    iconColor: 'text-green-600',
    titleColor: 'text-green-800',
    messageColor: 'text-green-700'
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-200 bg-yellow-50',
    iconColor: 'text-yellow-600',
    titleColor: 'text-yellow-800',
    messageColor: 'text-yellow-700'
  },
  error: {
    icon: XCircle,
    className: 'border-red-200 bg-red-50',
    iconColor: 'text-red-600',
    titleColor: 'text-red-800',
    messageColor: 'text-red-700'
  },
  info: {
    icon: Info,
    className: 'border-blue-200 bg-blue-50',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-800',
    messageColor: 'text-blue-700'
  }
};

const priorityConfig = {
  low: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Low' },
  medium: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Medium' },
  high: { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'High' },
  critical: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Critical' }
};

export function AlertNotification({
  type,
  title,
  message,
  priority,
  timestamp,
  vessel,
  dismissible = false,
  onDismiss,
  actions = [],
  className = ''
}: AlertNotificationProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <Alert className={`${config.className} ${className} relative`}>
      {/* Dismiss Button */}
      {dismissible && onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-6 w-6 p-0"
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      <div className="flex items-start space-x-3">
        <Icon className={`h-5 w-5 ${config.iconColor} mt-0.5 flex-shrink-0`} />
        
        <div className="flex-1 space-y-2">
          {/* Header */}
          <div className="flex items-center space-x-2">
            {title && (
              <AlertTitle className={`${config.titleColor} text-sm font-medium`}>
                {title}
              </AlertTitle>
            )}
            {priority && (
              <Badge variant="outline" className={priorityConfig[priority].color}>
                {priorityConfig[priority].label}
              </Badge>
            )}
          </div>

          {/* Message */}
          <AlertDescription className={`${config.messageColor} text-sm`}>
            {message}
          </AlertDescription>

          {/* Metadata */}
          {(vessel || timestamp) && (
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              {vessel && (
                <span className="flex items-center">
                  🚢 {vessel}
                </span>
              )}
              {timestamp && (
                <span>
                  {new Date(timestamp).toLocaleString()}
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex items-center space-x-2 pt-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'default'}
                  size="sm"
                  onClick={action.onClick}
                  className="h-8 px-3 text-xs"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Alert>
  );
}