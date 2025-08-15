import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";
import { InvestorSignupForm } from "@/components/auth/InvestorSignupForm";
import { WealthPartnerSignupForm } from "@/components/auth/WealthPartnerSignupForm";
import { AdminSignupForm } from "@/components/auth/AdminSignupForm";

type UserRole = "investor" | "wealth-partner" | "admin";

export default function Auth() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("investor");
  const [isSignupMode, setIsSignupMode] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 
            className="text-3xl font-bold text-white mb-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            Elevate <span className="text-xs bg-warning text-warning-foreground px-2 py-1 rounded-full ml-2">BETA</span>
          </h1>
          <p className="text-white/80">
            {isSignupMode ? "Create your account" : "Welcome back"}
          </p>
        </div>

        {/* Role Selector */}
        <Card className="shadow-elegant border-0">
          <CardContent className="p-6">
            <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger 
                  value="investor" 
                  className="text-sm transition-all duration-300"
                >
                  Investor
                </TabsTrigger>
                <TabsTrigger 
                  value="wealth-partner"
                  className="text-sm transition-all duration-300"
                >
                  Wealth Partner
                </TabsTrigger>
                <TabsTrigger 
                  value="admin"
                  className="text-sm transition-all duration-300"
                >
                  Admin
                </TabsTrigger>
              </TabsList>

              {/* Login Forms */}
              {!isSignupMode && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Sign In</h2>
                    <p className="text-muted-foreground text-sm">
                      {selectedRole === "investor" && "Access your investment dashboard"}
                      {selectedRole === "wealth-partner" && "Manage your client portfolios"}
                      {selectedRole === "admin" && "Admin portal access"}
                    </p>
                  </div>
                  <LoginForm role={selectedRole} />
                  <div className="text-center">
                    <button
                      onClick={() => setIsSignupMode(true)}
                      className="text-primary hover:text-primary-hover text-sm transition-colors"
                    >
                      Don't have an account? Sign up
                    </button>
                  </div>
                </div>
              )}

              {/* Signup Forms */}
              {isSignupMode && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Create Account</h2>
                    <p className="text-muted-foreground text-sm">
                      {selectedRole === "investor" && "Join our exclusive investment platform"}
                      {selectedRole === "wealth-partner" && "Partner with us to serve clients"}
                      {selectedRole === "admin" && "Administrative access"}
                    </p>
                  </div>
                  
                  <TabsContent value="investor" className="mt-0">
                    <InvestorSignupForm onSuccess={() => setIsSignupMode(false)} />
                  </TabsContent>
                  
                  <TabsContent value="wealth-partner" className="mt-0">
                    <WealthPartnerSignupForm onSuccess={() => setIsSignupMode(false)} />
                  </TabsContent>
                  
                  <TabsContent value="admin" className="mt-0">
                    <AdminSignupForm />
                  </TabsContent>

                  <div className="text-center">
                    <button
                      onClick={() => setIsSignupMode(false)}
                      className="text-primary hover:text-primary-hover text-sm transition-colors"
                    >
                      Already have an account? Sign in
                    </button>
                  </div>
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}