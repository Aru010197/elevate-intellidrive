import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminSignupForm() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
        <div>
          <h3 className="font-medium text-warning-foreground">Admin Access Restricted</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Admin accounts are created exclusively by the system administrator. 
            Please contact your system administrator for access.
          </p>
        </div>
      </div>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        disabled
      >
        Admin Signup Disabled
      </Button>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          For admin access requests, please contact support at{" "}
          <span className="text-primary">admin@elevate-wealth.com</span>
        </p>
      </div>
    </div>
  );
}