# Input OTP Component Implementation Guide

## Component Overview
The `InputOTP` component from `scomp-ui/sail-ui-kit` provides secure one-time password input for maritime applications. Essential for two-factor authentication, security codes, and access control in fleet management systems.

## Props Interface
```typescript
interface InputOTPProps {
  maxLength: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  pattern?: string;
  containerClassName?: string;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  pushPasswordManagerStrategy?: "increase" | "none";
  render?: ({ slots }: { slots: SlotProps[] }) => React.ReactNode;
}

interface InputOTPGroupProps {
  className?: string;
  children: React.ReactNode;
}

interface InputOTPSlotProps {
  index: number;
  className?: string;
  char?: string;
  hasFakeCaret?: boolean;
  isActive?: boolean;
}

interface InputOTPSeparatorProps {
  className?: string;
}
```

## Basic Usage Example
```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "scomp-ui/sail-ui-kit";
import { Button } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Shield, Smartphone } from "lucide-react";
import { useState } from "react";

function MaritimeSecurityOTP() {
  const [otpValue, setOtpValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleComplete = async (value: string) => {
    setIsVerifying(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("OTP verified:", value);
      alert("Access granted to fleet management system");
    } catch (error) {
      console.error("OTP verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Shield className="h-5 w-5 text-[#16569e]" />
          Security Verification
        </CardTitle>
        <CardDescription>
          Enter the 6-digit security code sent to your mobile device
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center">
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={setOtpValue}
            onComplete={handleComplete}
            disabled={isVerifying}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Smartphone className="h-3 w-3" />
            <span>Code sent to: +44 7XXX XXX789</span>
          </div>
          <p>Enter all 6 digits to verify your identity</p>
        </div>
        
        {isVerifying && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-sm">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#16569e]"></div>
              Verifying security code...
            </div>
          </div>
        )}
        
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="sm"
            disabled={isVerifying}
            onClick={() => console.log("Resend OTP")}
          >
            Didn't receive code? Resend
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Advanced Maritime Implementation
```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "scomp-ui/sail-ui-kit";
import { Button, Input, Label } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Badge, Alert, AlertDescription } from "scomp-ui/sail-ui-kit";
import { Shield, Smartphone, Key, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface VesselAccessControlProps {
  vesselName: string;
  requiredClearanceLevel: string;
  onAccessGranted: () => void;
  onAccessDenied: () => void;
}

function VesselAccessControl({ 
  vesselName, 
  requiredClearanceLevel, 
  onAccessGranted, 
  onAccessDenied 
}: VesselAccessControlProps) {
  const [step, setStep] = useState<"credentials" | "otp" | "success" | "error">("credentials");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [otpValue, setOtpValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate credentials verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (credentials.username && credentials.password) {
        setStep("otp");
        setCountdown(30); // 30 second countdown for resend
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setStep("error");
      setAttempts(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPComplete = async (value: string) => {
    setIsLoading(true);

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (value === "123456") { // Mock verification
        setStep("success");
        setTimeout(() => {
          onAccessGranted();
        }, 2000);
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      setAttempts(prev => prev + 1);
      setOtpValue("");
      
      if (attempts >= 2) {
        setStep("error");
        onAccessDenied();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    console.log("Resending OTP...");
    setCountdown(30);
    setOtpValue("");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Shield className="h-5 w-5 text-[#16569e]" />
          Vessel Access Control
        </CardTitle>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Accessing: <strong>{vesselName}</strong>
          </p>
          <Badge variant="outline" className="text-xs">
            Clearance Required: {requiredClearanceLevel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {/* Step 1: Credentials */}
        {step === "credentials" && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter maritime ID"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter password"
                required
              />
            </div>
            
            {attempts > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Invalid credentials. Attempts: {attempts}/3
                </AlertDescription>
              </Alert>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-[#16569e] hover:bg-[#16569e]/90"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Continue to Security Code"}
            </Button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Smartphone className="h-4 w-4 text-[#16569e]" />
                <span className="text-sm">Security code sent</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the 6-digit code sent to your registered device
              </p>
            </div>

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={setOtpValue}
                onComplete={handleOTPComplete}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {isLoading && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-sm text-[#16569e]">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#16569e]"></div>
                  Verifying access code...
                </div>
              </div>
            )}

            {attempts > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Invalid security code. Attempts: {attempts}/3
                </AlertDescription>
              </Alert>
            )}

            <div className="text-center">
              <Button 
                variant="outline" 
                size="sm"
                disabled={countdown > 0 || isLoading}
                onClick={handleResendOTP}
              >
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Access Granted</h3>
              <p className="text-sm text-green-600">
                Welcome aboard {vesselName}
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              Redirecting to vessel systems...
            </div>
          </div>
        )}

        {/* Step 4: Error */}
        {step === "error" && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-red-800">Access Denied</h3>
              <p className="text-sm text-red-600">
                Too many failed attempts. Please contact your system administrator.
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setStep("credentials");
                setAttempts(0);
                setCredentials({ username: "", password: "" });
                setOtpValue("");
              }}
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

## Emergency Override Code
```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "scomp-ui/sail-ui-kit";
import { Button } from "scomp-ui/sail-ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "scomp-ui/sail-ui-kit";
import { Alert, AlertDescription } from "scomp-ui/sail-ui-kit";
import { AlertTriangle, Shield } from "lucide-react";
import { useState } from "react";

function EmergencyOverrideSystem({ onOverrideSuccess }: { onOverrideSuccess: () => void }) {
  const [overrideCode, setOverrideCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleOverrideComplete = async (value: string) => {
    setIsVerifying(true);
    
    try {
      // Simulate emergency override verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (value === "911999") { // Emergency override code
        onOverrideSuccess();
      } else {
        throw new Error("Invalid override code");
      }
    } catch (error) {
      setAttempts(prev => prev + 1);
      setOverrideCode("");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-red-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-red-700">
          <AlertTriangle className="h-5 w-5" />
          Emergency Override
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Emergency override codes should only be used in critical situations. 
            All usage is logged and monitored.
          </AlertDescription>
        </Alert>

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit emergency override code
          </p>

          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={overrideCode}
              onChange={setOverrideCode}
              onComplete={handleOverrideComplete}
              disabled={isVerifying}
              pattern="[0-9]*"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="border-red-300 focus:border-red-500" />
                <InputOTPSlot index={1} className="border-red-300 focus:border-red-500" />
                <InputOTPSlot index={2} className="border-red-300 focus:border-red-500" />
                <InputOTPSlot index={3} className="border-red-300 focus:border-red-500" />
                <InputOTPSlot index={4} className="border-red-300 focus:border-red-500" />
                <InputOTPSlot index={5} className="border-red-300 focus:border-red-500" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {isVerifying && (
            <div className="inline-flex items-center gap-2 text-sm text-red-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
              Verifying emergency override...
            </div>
          )}

          {attempts > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Invalid override code. Failed attempts: {attempts}/5
              </AlertDescription>
            </Alert>
          )}

          <div className="text-xs text-red-600">
            Warning: Emergency override usage is tracked and requires justification
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Context Requirements
- **No special context required** - Standalone component
- **Pattern validation**: Optional regex pattern for input validation
- **Auto-focus**: Built-in focus management for smooth UX

## Maritime-Specific Use Cases
1. **Vessel Access Control**: Secure access to vessel systems and areas
2. **Emergency Override**: Emergency access codes for critical situations
3. **Two-Factor Authentication**: Secondary authentication for sensitive operations
4. **Safe Combination**: Digital safe and secure storage access
5. **System Activation**: Activation codes for critical maritime equipment
6. **Port Security**: Access codes for restricted port areas
7. **Communication Security**: Secure communication channel activation

## Integration with Fleet Management
```tsx
// Example: OTP with authentication service
function OTPWithAuth({ onVerificationComplete }: { 
  onVerificationComplete: (success: boolean) => void 
}) {
  const verifyOTP = useMutation({
    mutationFn: (otp: string) => apiRequest("/api/auth/verify-otp", {
      method: "POST",
      body: { otp },
    }),
    onSuccess: () => {
      onVerificationComplete(true);
    },
    onError: () => {
      onVerificationComplete(false);
    },
  });

  return (
    <InputOTP
      maxLength={6}
      onComplete={(value) => verifyOTP.mutate(value)}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
```

## Styling and Theming
The InputOTP component follows maritime blue theme (#16569e) and supports:
- **Accessible design**: High contrast and clear visual feedback
- **Responsive sizing**: Adapts to mobile and desktop interfaces
- **Maritime styling**: Security-focused visual design
- **State indication**: Clear active, filled, and disabled states

## Troubleshooting
1. **Auto-focus not working**: Check autoFocus prop and ensure no competing focus
2. **Pattern validation failing**: Verify regex pattern syntax
3. **Completion not triggering**: Ensure onComplete handler is properly connected
4. **Mobile keyboard issues**: Test with different mobile keyboards and input modes
5. **Styling inconsistencies**: Check slot className application and theme variables

## Best Practices
- Use appropriate patterns for maritime security codes (numbers vs alphanumeric)
- Implement proper timeout mechanisms for security
- Provide clear feedback for invalid codes
- Log all security code attempts for audit purposes
- Use appropriate countdown timers for resend functionality
- Implement rate limiting to prevent brute force attacks
- Provide accessible feedback for screen readers
- Consider offline scenarios for emergency override systems
- Use appropriate security measures for storing and transmitting codes