
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
import { 
  Home, 
  Users, 
  Target, 
  FileBarChart, 
  Search, 
  Filter, 
  TrendingUp, 
  AlertCircle,
  UserCheck,
  FileText,
  Plus,
  Eye,
  Share2,
  Download,
  LogOut
} from "lucide-react";

const WealthPartnerDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "investors", label: "My Investors", icon: Users },
    { id: "opportunities", label: "Opportunities", icon: Target },
    { id: "reports", label: "Reports", icon: FileBarChart },
  ];

  // Sample data
  const investors = [
    { name: "Alex Mathew", email: "alex.m@example.com", onboarded: "16-Jun-2024", investment: "₹85,00,000", kycStatus: "Verified", lastActivity: "2 days ago" },
    { name: "Neha Sharma", email: "neha.s@example.com", onboarded: "23-Jul-2024", investment: "₹62,50,000", kycStatus: "Verified", lastActivity: "Today" },
    { name: "Raj Patel", email: "raj.p@example.com", onboarded: "05-Aug-2024", investment: "₹45,00,000", kycStatus: "Pending", lastActivity: "Yesterday" },
    { name: "Priya Singh", email: "priya.s@example.com", onboarded: "12-Jul-2024", investment: "₹75,00,000", kycStatus: "Verified", lastActivity: "3 days ago" },
    { name: "Arun Kumar", email: "arun.k@example.com", onboarded: "18-May-2024", investment: "₹1,20,00,000", kycStatus: "Verified", lastActivity: "1 week ago" },
    { name: "Sanjay Mehta", email: "sanjay.m@example.com", onboarded: "02-Mar-2024", investment: "₹90,00,000", kycStatus: "Verified", lastActivity: "2 weeks ago" },
    { name: "Kavita Reddy", email: "kavita.r@example.com", onboarded: "14-Feb-2024", investment: "₹55,00,000", kycStatus: "Verified", lastActivity: "1 month ago" },
    { name: "Vikram Malhotra", email: "vikram.m@example.com", onboarded: "29-Jun-2024", investment: "₹40,00,000", kycStatus: "Pending", lastActivity: "1 week ago" },
    { name: "Anita Desai", email: "anita.d@example.com", onboarded: "08-Jan-2024", investment: "₹1,05,00,000", kycStatus: "Verified", lastActivity: "3 weeks ago" },
  ];

  const opportunities = [
    { name: "Tata Motors Bond", type: "Bond", yield: "9.3%", tenor: "3 years", minInvestment: "₹10,00,000", rating: "AA+", risk: "Low-Medium", featured: true },
    { name: "Bajaj Housing Finance ICD", type: "ICD", yield: "9.0%", tenor: "180 days", minInvestment: "₹5,00,000", rating: "AAA", risk: "Low", featured: true },
    { name: "HDFC Ltd ICD", type: "ICD", yield: "8.7%", tenor: "270 days", minInvestment: "₹10,00,000", rating: "AAA", risk: "Low", featured: true },
    { name: "Reliance Industries Bond", type: "Bond", yield: "9.2%", tenor: "3 years", minInvestment: "₹20,00,000", rating: "AAA", risk: "Low", featured: true },
    { name: "Aditya Birla Finance Bond", type: "Bond", yield: "9.6%", tenor: "5 years", minInvestment: "₹25,00,000", rating: "AA", risk: "Medium", featured: false },
    { name: "Mahindra Finance ICD", type: "ICD", yield: "8.8%", tenor: "90 days", minInvestment: "₹10,00,000", rating: "AAA", risk: "Low", featured: false },
    { name: "Piramal Enterprises Bond", type: "Bond", yield: "10.1%", tenor: "4 years", minInvestment: "₹15,00,000", rating: "A+", risk: "Medium-High", featured: false },
    { name: "L&T Finance ICD", type: "ICD", yield: "8.9%", tenor: "180 days", minInvestment: "₹5,00,000", rating: "AAA", risk: "Low", featured: false },
  ];

  const recentActivity = [
    { type: "interest", client: "Alex Mathew", action: "expressed interest in Tata Capital ICD", amount: "₹10,00,000", time: "2 days ago" },
    { type: "onboarding", client: "Raj Patel", action: "onboarding in progress", amount: "", time: "3 days ago" },
    { type: "investment", client: "Neha Sharma", action: "invested in HDFC Bond", amount: "₹20,00,000", time: "1 week ago" },
  ];

  const actionItems = [
    { task: "Follow up with Neha Sharma on Tata Capital ICD Interest", due: "Due in 2 days" },
    { task: "Complete onboarding for Raj Patel", status: "KYC pending" },
    { task: "Review maturity schedule for upcoming ICDs", due: "3 ICDs maturing in the next 30 days" },
  ];

  const recommendations = [
    { opportunity: "Shared Bajaj Housing Finance ICD with Neha Sharma", time: "3 days ago", status: "Interested" },
    { opportunity: "Shared HDFC Ltd ICD with Alex Mathew", time: "1 week ago", status: "Reviewing" },
    { opportunity: "Shared Tata Motors Bond with Priya Singh", time: "2 weeks ago", status: "Invested" },
  ];

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || 
                         (filterType === "Active" && investor.kycStatus === "Verified") ||
                         (filterType === "Pending KYC" && investor.kycStatus === "Pending") ||
                         (filterType === "Pending Invitations");
    return matchesSearch && matchesFilter;
  });

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  if (!user) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>;
  }

  const renderSidebar = () => (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen fixed left-0 top-0">
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
            <div className="text-xs text-muted-foreground">Wealth Partner</div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back, {user?.email}</h1>
        <p className="text-muted-foreground">Here's an overview of your clients and their investments.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Managed Investors</p>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-green-600 mt-1">+3 new this month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total AUM</p>
                <p className="text-2xl font-bold text-foreground">₹5.2 Cr</p>
                <p className="text-xs text-green-600 mt-1">+8% growth YoY</p>
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
                <p className="text-sm text-muted-foreground">Pending Actions</p>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-xs text-orange-600 mt-1">+1 KYC verification</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.client} {activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.amount} • {activity.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Follow up</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Investors Preview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">My Investors</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setActiveSection("investors")}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor Name</TableHead>
                <TableHead>Onboarded Date</TableHead>
                <TableHead>Total Investment</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investors.slice(0, 3).map((investor, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{investor.name}</TableCell>
                  <TableCell>{investor.onboarded}</TableCell>
                  <TableCell>{investor.investment}</TableCell>
                  <TableCell>
                    <Badge variant={investor.kycStatus === "Verified" ? "default" : "secondary"}>
                      {investor.kycStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{investor.lastActivity}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Action Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {actionItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.task}</p>
                  <p className="text-xs text-muted-foreground">{item.due || item.status}</p>
                </div>
                <Button variant="ghost" size="sm">View Profile</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInvestors = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Manage Investors</h1>
        <p className="text-muted-foreground">View and manage your client investors.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Investors</p>
                <p className="text-2xl font-bold text-foreground">7</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending KYC</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total AUM</p>
                <p className="text-2xl font-bold text-foreground">₹5.2 Cr</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Invitations</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search investors..."
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
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Investor
        </Button>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filterType} onValueChange={setFilterType}>
        <TabsList>
          <TabsTrigger value="All">All investors</TabsTrigger>
          <TabsTrigger value="Active">Active</TabsTrigger>
          <TabsTrigger value="Pending KYC">Pending KYC</TabsTrigger>
          <TabsTrigger value="Pending Invitations">Pending Invitations</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Investors Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Onboarded Date</TableHead>
                <TableHead>Total Investment</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestors.map((investor, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{investor.name}</TableCell>
                  <TableCell>{investor.email}</TableCell>
                  <TableCell>{investor.onboarded}</TableCell>
                  <TableCell>{investor.investment}</TableCell>
                  <TableCell>
                    <Badge variant={investor.kycStatus === "Verified" ? "default" : "secondary"}>
                      {investor.kycStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{investor.lastActivity}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Profile
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
        <p className="text-muted-foreground">Browse and share investment opportunities with your clients.</p>
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

      {/* Featured Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-yellow-500">★</span>
            Featured Opportunities
          </CardTitle>
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
                <TableHead>Risk Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.filter(opp => opp.featured).map((opportunity, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{opportunity.name}</TableCell>
                  <TableCell>{opportunity.type}</TableCell>
                  <TableCell>{opportunity.yield}</TableCell>
                  <TableCell>{opportunity.tenor}</TableCell>
                  <TableCell>{opportunity.minInvestment}</TableCell>
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
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* All Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={filterType} onValueChange={setFilterType}>
            <TabsList className="mb-4">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Bond">Bonds</TabsTrigger>
              <TabsTrigger value="ICD">ICDs</TabsTrigger>
            </TabsList>
          </Tabs>

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
                <TableHead>Actions</TableHead>
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
                  <TableCell>{opportunity.minInvestment}</TableCell>
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
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{rec.opportunity}</p>
                  <p className="text-xs text-muted-foreground">{rec.time}</p>
                </div>
                <Badge variant={rec.status === "Invested" ? "default" : "secondary"}>
                  {rec.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Reports</h1>
        <p className="text-muted-foreground">Access and generate reports for your clients and investments.</p>
      </div>

      {/* Report Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generate Report</CardTitle>
              <p className="text-sm text-muted-foreground">Create customized reports</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Report Type</label>
                <select className="w-full p-2 border border-border rounded-md">
                  <option>Portfolio Performance</option>
                  <option>Asset Allocation Analysis</option>
                  <option>Transaction History</option>
                  <option>Revenue Report</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Time Period</label>
                <select className="w-full p-2 border border-border rounded-md">
                  <option>Quarterly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <Button className="w-full">
                Generate
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Report Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64 bg-muted/30 rounded-lg">
              <div className="text-center">
                <FileBarChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Report preview will be displayed here</p>
                <p className="text-sm text-muted-foreground">Select report type and time period</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Reports</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <FileBarChart className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-foreground">Q2 2024 Portfolio Performance Report</p>
                  <p className="text-xs text-muted-foreground">Performance • 03 Jul 2024 • 1.2 MB</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <FileBarChart className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-foreground">Asset Allocation Analysis - July 2024</p>
                  <p className="text-xs text-muted-foreground">Allocation • 01 Aug 2024 • 1.8 MB</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <FileBarChart className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-foreground">H1 2024 Revenue Report</p>
                  <p className="text-xs text-muted-foreground">Revenue • 02 Jul 2024 • 980 KB</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Report Types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Report Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <FileBarChart className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-foreground">Portfolio Performance Reports</p>
                <p className="text-xs text-muted-foreground">Detailed performance analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <FileBarChart className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-foreground">Asset Allocation Reports</p>
                <p className="text-xs text-muted-foreground">Investment distribution analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <FileBarChart className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-foreground">Transaction History Reports</p>
                <p className="text-xs text-muted-foreground">Complete transaction records</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <FileBarChart className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-foreground">Revenue Reports</p>
                <p className="text-xs text-muted-foreground">Commission and earning reports</p>
              </div>
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
      case "investors":
        return renderInvestors();
      case "opportunities":
        return renderOpportunities();
      case "reports":
        return renderReports();
      default:
        return renderDashboard();
    }
  };

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || opp.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {renderSidebar()}
      <main className="ml-64 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default WealthPartnerDashboard;
