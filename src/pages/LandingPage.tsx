import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Shield, TrendingUp, MessageSquare, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Beta Badge */}
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">Elevate</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden xs:block">Wealth Investment Platform</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs sm:text-sm">
              BETA
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 sm:mb-6">
              AI-Driven Wealth Investment Platform
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
              Streamlined investment workflows for Inter-Corporate Deposits and unlisted bonds.
              Secure, segregated portals with intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Secure & Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Access Cards */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              Choose Your Portal
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
              Access your dedicated workspace with role-based features and AI assistance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Investor Portal */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-3 sm:pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:animate-glow">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg sm:text-xl text-foreground">Investor Portal</CardTitle>
                <CardDescription className="text-muted-foreground text-sm sm:text-base">
                  Discover investment opportunities in ICDs and unlisted bonds
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-6 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    View investment opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    AI-powered investment insights
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    Portfolio tracking & reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    Secure document management
                  </li>
                </ul>
                <Button variant="portal" className="w-full text-sm sm:text-base py-2 sm:py-3" onClick={() => navigate('/investor-dashboard')}>
                  Access Investor Portal
                </Button>
              </CardContent>
            </Card>

            {/* Wealth Partner Portal */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-3 sm:pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:animate-glow">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg sm:text-xl text-foreground">Wealth Partner Portal</CardTitle>
                <CardDescription className="text-muted-foreground text-sm sm:text-base">
                  Manage your investor network and relationships
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-6 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    Add & manage investors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    Client portfolio overview
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    Commission tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    Performance analytics
                  </li>
                </ul>
                <Button variant="portal" className="w-full text-sm sm:text-base py-2 sm:py-3" onClick={() => navigate('/partner-dashboard')}>
                  Access Partner Portal
                </Button>
              </CardContent>
            </Card>

            {/* Admin Portal */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 border-2 hover:border-primary/20 sm:col-span-2 lg:col-span-1 lg:col-start-auto">
              <CardHeader className="text-center pb-3 sm:pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:animate-glow">
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg sm:text-xl text-foreground">Admin Portal</CardTitle>
                <CardDescription className="text-muted-foreground text-sm sm:text-base">
                  Platform administration and user management
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-6 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    Send invitations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    Manage users & permissions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    Investment opportunity setup
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    System analytics & reports
                  </li>
                </ul>
                <Button variant="portal" className="w-full text-sm sm:text-base py-2 sm:py-3" onClick={() => navigate('/admin-dashboard')}>
                  Access Admin Portal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">
              Powered by Artificial Intelligence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <Card className="p-4 sm:p-6 hover:shadow-card transition-shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground text-base sm:text-lg">Intelligent Assistant</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">AI-powered chat support</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base text-left">
                  Get instant answers about investments, portfolio performance, and platform features through our conversational AI interface.
                </p>
              </Card>

              <Card className="p-4 sm:p-6 hover:shadow-card transition-shadow">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground text-base sm:text-lg">Smart Analytics</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Data-driven insights</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base text-left">
                  Automated report generation, risk assessment, and performance analytics powered by machine learning algorithms.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate('/')}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground text-sm sm:text-base">Elevate Platform</span>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground text-center">
              © 2024 EMB Group. All rights reserved. | Demo Environment
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;