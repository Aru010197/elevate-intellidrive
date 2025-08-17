import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home, 
  Target, 
  PieChart, 
  FileText, 
  Search, 
  Filter, 
  TrendingUp, 
  LogOut,
  Eye,
  Plus,
  Menu,
  X
} from "lucide-react";

const InvestorDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/auth");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log out. Please try again.",
      });
    }
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "opportunities", label: "Opportunities", icon: Target },
    { id: "portfolio", label: "My Portfolio", icon: PieChart },
    { id: "documents", label: "Documents", icon: FileText },
  ];

  // Sample data
  const investments = [
    { name: "Reliance Retail Bond", type: "Bond", amount: "₹25,00,000", rate: "9.5%", maturity: "20-Oct-2025", status: "Active" },
    { name: "Tata Capital ICD", type: "ICD", amount: "₹15,00,000", rate: "8.9%", maturity: "15-Dec-2024", status: "Active" },
    { name: "HDFC Bond", type: "Bond", amount: "₹20,00,000", rate: "9.1%", maturity: "05-Mar-2026", status: "Active" },
  ];

  const opportunities = [
    { name: "Tata Motors Bond", type: "Bond", yield: "9.3%", tenor: "3 years", min: "₹10,00,000", rating: "AA+", risk: "Low-Medium", featured: true },
    { name: "Bajaj Housing Finance ICD", type: "ICD", yield: "9.0%", tenor: "180 days", min: "₹5,00,000", rating: "AAA", risk: "Low", featured: true },
    { name: "HDFC Ltd ICD", type: "ICD", yield: "8.7%", tenor: "270 days", min: "₹10,00,000", rating: "AAA", risk: "Low", featured: true },
    { name: "Reliance Industries Bond", type: "Bond", yield: "9.2%", tenor: "3 years", min: "₹20,00,000", rating: "AAA", risk: "Low", featured: true },
    { name: "Aditya Birla Finance Bond", type: "Bond", yield: "9.6%", tenor: "5 years", min: "₹25,00,000", rating: "AA", risk: "Medium", featured: false },
    { name: "Mahindra Finance ICD", type: "ICD", yield: "8.8%", tenor: "90 days", min: "₹10,00,000", rating: "AAA", risk: "Low", featured: false },
  ];

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);


  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || opp.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>;
  }

  const renderSidebar = () => (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-card border-r border-border flex-col h-screen fixed left-0 top-0 z-30">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Elevate</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors mb-1 ${
                  activeSection === item.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">{user?.email?.[0]?.toUpperCase()}</span>
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{user?.email}</div>
              <div className="text-xs text-muted-foreground">Investor</div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border flex flex-col z-50">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-lg text-foreground">Elevate</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <nav className="flex-1 p-4">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors mb-1 ${
                      activeSection === item.id 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{user?.email?.[0]?.toUpperCase()}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{user?.email}</div>
                  <div className="text-xs text-muted-foreground">Investor</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </aside>
        </div>
      )}
    </>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back, {user?.email}</h1>
        <p className="text-muted-foreground">Here's an overview of your investments.</p>
      </div>

      {/* Investment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Investment</p>
                <p className="text-2xl font-bold text-foreground">₹60,00,000</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% YoY</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Projected Annual Return</p>
                <p className="text-2xl font-bold text-foreground">9.2%</p>
                <p className="text-xs text-green-600 mt-1">↑ 0.3% vs Last Quarter</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <PieChart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Investments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">My Investments</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setActiveSection("portfolio")}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investment Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Rate</TableHead>
                  <TableHead className="hidden lg:table-cell">Maturity Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {investments.map((investment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{investment.name}</div>
                      <div className="text-xs text-muted-foreground sm:hidden">
                        {investment.type} • {investment.rate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{investment.type}</TableCell>
                  <TableCell>{investment.amount}</TableCell>
                  <TableCell className="hidden md:table-cell">{investment.rate}</TableCell>
                  <TableCell className="hidden lg:table-cell">{investment.maturity}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="default">{investment.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4 sm:mr-1" />
                      <span className="hidden sm:inline">View Details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Opportunities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recommended Opportunities</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setActiveSection("opportunities")}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opportunity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Yield</TableHead>
                <TableHead>Tenor</TableHead>
                <TableHead>Min. Investment</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.filter(opp => opp.featured).slice(0, 3).map((opportunity, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{opportunity.name}</TableCell>
                  <TableCell>{opportunity.type}</TableCell>
                  <TableCell>{opportunity.yield}</TableCell>
                  <TableCell>{opportunity.tenor}</TableCell>
                  <TableCell>{opportunity.min}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{opportunity.rating}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderOpportunities = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Investment Opportunities</h1>
        <p className="text-muted-foreground">Discover and invest in available opportunities.</p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filterType} onValueChange={setFilterType}>
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Bond">Bonds</TabsTrigger>
          <TabsTrigger value="ICD">ICDs</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Opportunities Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opportunity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Yield</TableHead>
                <TableHead>Tenor</TableHead>
                <TableHead>Min. Investment</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.map((opportunity, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {opportunity.featured && <span className="text-yellow-500">★</span>}
                      {opportunity.name}
                    </div>
                  </TableCell>
                  <TableCell>{opportunity.type}</TableCell>
                  <TableCell>{opportunity.yield}</TableCell>
                  <TableCell>{opportunity.tenor}</TableCell>
                  <TableCell>{opportunity.min}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{opportunity.rating}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={opportunity.risk === "Low" ? "default" : opportunity.risk === "Medium" ? "secondary" : "destructive"}>
                      {opportunity.risk}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Invest
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">My Portfolio</h1>
        <p className="text-muted-foreground">Track your investment performance and holdings.</p>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
              <p className="text-2xl font-bold text-foreground">₹60,00,000</p>
              <p className="text-xs text-green-600 mt-1">+₹5,40,000 gains</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Active Investments</p>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-xs text-blue-600 mt-1">All performing well</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Annual Yield</p>
              <p className="text-2xl font-bold text-foreground">9.2%</p>
              <p className="text-xs text-green-600 mt-1">Above market average</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Holdings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Investment Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investment</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount Invested</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Gain/Loss</TableHead>
                <TableHead>Yield</TableHead>
                <TableHead>Maturity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investments.map((investment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{investment.name}</TableCell>
                  <TableCell>{investment.type}</TableCell>
                  <TableCell>{investment.amount}</TableCell>
                  <TableCell>{investment.amount}</TableCell>
                  <TableCell className="text-green-600">+₹1,80,000</TableCell>
                  <TableCell>{investment.rate}</TableCell>
                  <TableCell>{investment.maturity}</TableCell>
                  <TableCell>
                    <Badge variant="default">{investment.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Documents</h1>
        <p className="text-muted-foreground">Access your investment documents and statements.</p>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-medium text-foreground">Investment Certificates</p>
                <p className="text-sm text-muted-foreground">3 documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium text-foreground">Monthly Statements</p>
                <p className="text-sm text-muted-foreground">12 documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-600" />
              <div>
                <p className="font-medium text-foreground">Tax Documents</p>
                <p className="text-sm text-muted-foreground">5 documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-foreground">Reliance Retail Bond Certificate</p>
                  <p className="text-xs text-muted-foreground">Investment Certificate • 15 Dec 2024</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Download
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-foreground">November 2024 Statement</p>
                  <p className="text-xs text-muted-foreground">Monthly Statement • 01 Dec 2024</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Download
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-foreground">TDS Certificate Q3 2024</p>
                  <p className="text-xs text-muted-foreground">Tax Document • 28 Nov 2024</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "opportunities":
        return renderOpportunities();
      case "portfolio":
        return renderPortfolio();
      case "documents":
        return renderDocuments();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderSidebar()}
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-card border-b border-border p-4 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">Elevate</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">{user?.email?.[0]?.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="lg:ml-64 p-4 sm:p-6 pt-20 lg:pt-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default InvestorDashboard;