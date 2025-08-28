import React from 'react';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export interface ProgressStep {
  id: string;
  label: string;
  status: 'pending' | 'current' | 'completed' | 'error';
  description?: string;
  timestamp?: string;
  optional?: boolean;
}

export interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep?: string;
  showProgress?: boolean;
  showTimestamps?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-gray-400',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-200',
  },
  current: {
    icon: Clock,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-500',
  },
  completed: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-500',
  },
  error: {
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-500',
  },
};

export function ProgressIndicator({
  steps,
  currentStep,
  showProgress = true,
  showTimestamps = false,
  orientation = 'horizontal',
  size = 'md',
  className = '',
}: ProgressIndicatorProps) {
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalSteps = steps.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const currentStepIndex = currentStep
    ? steps.findIndex(step => step.id === currentStep)
    : steps.findIndex(step => step.status === 'current');

  const sizeConfig = {
    sm: {
      iconSize: 'h-4 w-4',
      padding: 'p-1.5',
      textSize: 'text-xs',
      badgeSize: 'text-xs px-2 py-0.5',
    },
    md: {
      iconSize: 'h-5 w-5',
      padding: 'p-2',
      textSize: 'text-sm',
      badgeSize: 'text-sm px-2.5 py-0.5',
    },
    lg: {
      iconSize: 'h-6 w-6',
      padding: 'p-3',
      textSize: 'text-base',
      badgeSize: 'text-sm px-3 py-1',
    },
  };

  if (orientation === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Progress Bar */}
        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-xs text-gray-500">
              {completedSteps} of {totalSteps} steps completed
            </div>
          </div>
        )}

        {/* Vertical Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const config = statusConfig[step.status];
            const Icon = config.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="relative">
                {/* Connection Line */}
                {!isLast && <div className="absolute left-4 top-8 w-0.5 h-8 bg-gray-200" />}

                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div
                    className={`${sizeConfig[size].padding} rounded-full ${config.bgColor} ${config.borderColor} border-2 flex-shrink-0`}
                  >
                    <Icon className={`${sizeConfig[size].iconSize} ${config.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-medium ${sizeConfig[size].textSize}`}>{step.label}</h4>
                      {step.optional && (
                        <Badge variant="outline" className="text-xs">
                          Optional
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className={`${sizeConfig[size].badgeSize} ${config.bgColor} ${config.color} border-transparent`}
                      >
                        {step.status}
                      </Badge>
                    </div>

                    {step.description && (
                      <p className="text-sm text-gray-600">{step.description}</p>
                    )}

                    {showTimestamps && step.timestamp && (
                      <p className="text-xs text-gray-500">
                        {new Date(step.timestamp).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Horizontal Layout
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Progress Bar */}
      {showProgress && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}

      {/* Horizontal Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const config = statusConfig[step.status];
          const Icon = config.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center space-y-2">
                {/* Icon */}
                <div
                  className={`${sizeConfig[size].padding} rounded-full ${config.bgColor} ${config.borderColor} border-2`}
                >
                  <Icon className={`${sizeConfig[size].iconSize} ${config.color}`} />
                </div>

                {/* Label */}
                <div className="text-center max-w-24">
                  <p className={`font-medium ${sizeConfig[size].textSize} truncate`}>
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-500 truncate">{step.description}</p>
                  )}
                  {showTimestamps && step.timestamp && (
                    <p className="text-xs text-gray-400">
                      {new Date(step.timestamp).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Connection Line */}
              {!isLast && <div className="flex-1 h-0.5 bg-gray-200 mx-2" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Simple Linear Progress Indicator
export interface LinearProgressProps {
  label?: string;
  value: number;
  max?: number;
  showPercentage?: boolean;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'yellow' | 'red';
  className?: string;
}

export function LinearProgress({
  label,
  value,
  max = 100,
  showPercentage = true,
  showValue = false,
  size = 'md',
  color = 'blue',
  className = '',
}: LinearProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeConfig = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorConfig = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showPercentage || showValue) && (
        <div className="flex justify-between text-sm">
          {label && <span>{label}</span>}
          <div className="flex items-center space-x-2">
            {showValue && (
              <span>
                {value}/{max}
              </span>
            )}
            {showPercentage && <span>{Math.round(percentage)}%</span>}
          </div>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeConfig[size]}`}>
        <div
          className={`${colorConfig[color]} ${sizeConfig[size]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
