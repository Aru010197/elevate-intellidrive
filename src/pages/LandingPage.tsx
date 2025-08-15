import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Shield, TrendingUp, MessageSquare, BarChart3 } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Beta Badge */}
      <header className="border-b bg-card shadow-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Elevate</h1>
                <p className="text-sm text-muted-foreground">Wealth Investment Platform</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              BETA
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-5xl font-bold text-primary-foreground mb-6">
              AI-Driven Wealth Investment Platform
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Streamlined investment workflows for Inter-Corporate Deposits and unlisted bonds.
              Secure, segregated portals with intelligent automation.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Shield className="w-5 h-5" />
                <span>Secure & Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <MessageSquare className="w-5 h-5" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <BarChart3 className="w-5 h-5" />
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Access Cards */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Portal
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access your dedicated workspace with role-based features and AI assistance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Investor Portal */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                  <TrendingUp className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground">Investor Portal</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Discover investment opportunities in ICDs and unlisted bonds
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    View investment opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    AI-powered investment insights
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Portfolio tracking & reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Secure document management
                  </li>
                </ul>
                <Button variant="portal" className="w-full" onClick={() => window.location.href = '/auth'}>
                  Access Investor Portal
                </Button>
              </CardContent>
            </Card>

            {/* Wealth Partner Portal */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground">Wealth Partner Portal</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your investor network and relationships
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Add & manage investors
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Client portfolio overview
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Commission tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Performance analytics
                  </li>
                </ul>
                <Button variant="portal" className="w-full" onClick={() => window.location.href = '/auth'}>
                  Access Partner Portal
                </Button>
              </CardContent>
            </Card>

            {/* Admin Portal */}
            <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-glow">
                  <Building2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground">Admin Portal</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Platform administration and user management
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Send invitations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Manage users & permissions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Investment opportunity setup
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    System analytics & reports
                  </li>
                </ul>
                <Button variant="portal" className="w-full" onClick={() => window.location.href = '/auth'}>
                  Access Admin Portal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-foreground mb-8">
              Powered by Artificial Intelligence
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 hover:shadow-card transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Intelligent Assistant</h4>
                    <p className="text-sm text-muted-foreground">AI-powered chat support</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Get instant answers about investments, portfolio performance, and platform features through our conversational AI interface.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-card transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Smart Analytics</h4>
                    <p className="text-sm text-muted-foreground">Data-driven insights</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Automated report generation, risk assessment, and performance analytics powered by machine learning algorithms.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Elevate Platform</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 EMB Group. All rights reserved. | Demo Environment
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;