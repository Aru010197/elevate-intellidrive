import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  TrendingUp, 
  Building2, 
  Clock, 
  Plus, 
  Search, 
  UserPlus,
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  BarChart3,
  Settings,
  Activity,
  FileBarChart,
  DollarSign,
  TrendingDown,
  AlertCircle,
  LogOut,
  Download,
  Trash2,
  UserX,
  Mail
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserFilter, setSelectedUserFilter] = useState("all");
  const [selectedOpportunityFilter, setSelectedOpportunityFilter] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  const platformMetrics = [
    { title: "Total Users", value: "41", change: "+5 growth (previous 32 increased)", icon: Users, color: "text-green-600" },
    { title: "Total AUM", value: "₹5.2 Cr", change: "+19% growth YoY", icon: TrendingUp, color: "text-blue-600" },
    { title: "Active Opportunities", value: "12", change: "+3 added this month", icon: Building2, color: "text-purple-600" },
    { title: "Pending Approvals", value: "2", change: "+2 opportunities awaiting review", icon: Clock, color: "text-orange-600" }
  ];

  const pendingApprovals = [
    { name: "Reliance Retail Bond", type: "Bond", yield: "9.5%", submittedBy: "Sarah Parker", timeAgo: "3 days ago", status: "pending" },
    { name: "L&T Finance ICD", type: "ICD", yield: "8.7%", submittedBy: "Michael Johnson", timeAgo: "1 week ago", status: "pending" }
  ];

  const recentActivities = [
    { activity: "Raj Patel (Investor) was added by Sarah Parker", timeAgo: "2 days ago" },
    { activity: "New opportunity HDFC Ltd ICD (8.7%) was created by Michael Johnson", timeAgo: "4 days ago" },
    { activity: "Alex Mathew invested ₹25,00,000 in Tata Motors Bond", timeAgo: "1 week ago" },
    { activity: "Neha Sharma (Investor) was onboarded by Sarah Parker", timeAgo: "2 weeks ago" }
  ];

  const platformHealth = [
    { service: "User Authentication", status: "Operational" },
    { service: "Investment Processing", status: "Operational" },
    { service: "Report Generation", status: "Operational" },
    { service: "Data Storage", status: "Operational" },
    { service: "AI Assistant", status: "Operational" }
  ];

  const users = [
    { name: "Sarah Parker", email: "sarah.p@example.com", role: "Wealth Partner", status: "Active", joinedDate: "10-Jan-2024", details: "8 investors, ₹3.7 Cr AUM" },
    { name: "Michael Johnson", email: "michael.j@example.com", role: "Wealth Partner", status: "Active", joinedDate: "15-Mar-2024", details: "4 investors, ₹1.5 Cr AUM" },
    { name: "Priya Sharma", email: "priya.s@example.com", role: "Wealth Partner", status: "Active", joinedDate: "05-Apr-2024", details: "5 investors, ₹0.8 Cr AUM" },
    { name: "Alex Mathew", email: "alex.m@example.com", role: "Investor", status: "Active", joinedDate: "18-Jun-2024", details: "Partner: Sarah Parker, Invested: ₹25,00,000" },
    { name: "Neha Sharma", email: "neha.s@example.com", role: "Investor", status: "Active", joinedDate: "23-Jul-2024", details: "Partner: Sarah Parker, Invested: ₹12,00,000" },
    { name: "Raj Patel", email: "raj.p@example.com", role: "Investor", status: "Pending", joinedDate: "05-Aug-2024", details: "Partner: Sarah Parker, Invested: ₹43,00,000" },
    { name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active", joinedDate: "01-Jan-2024", details: "Permissions: Full Access" }
  ];

  const investments = [
    { name: "Tata Motors Bond", type: "Bond", yield: "9.3%", tenor: "3 years", minInvestment: "₹10,00,000", status: "Active", createdBy: "Sarah Parker" },
    { name: "Bajaj Housing Finance ICD", type: "ICD", yield: "9.0%", tenor: "180 days", minInvestment: "₹5,00,000", status: "Active", createdBy: "Michael Johnson" },
    { name: "Aditya Birla Finance Bond", type: "Bond", yield: "9.8%", tenor: "5 years", minInvestment: "₹25,00,000", status: "Active", createdBy: "Sarah Parker" },
    { name: "Mahindra Finance ICD", type: "ICD", yield: "8.8%", tenor: "90 days", minInvestment: "₹10,00,000", status: "Active", createdBy: "Michael Johnson" },
    { name: "Piramal Enterprises Bond", type: "Bond", yield: "10.1%", tenor: "4 years", minInvestment: "₹15,00,000", status: "Closed", createdBy: "Sarah Parker" },
    { name: "HDFC Ltd ICD", type: "ICD", yield: "8.7%", tenor: "270 days", minInvestment: "₹20,00,000", status: "Active", createdBy: "Priya Sharma" },
    { name: "Reliance Industries Bond", type: "Bond", yield: "9.2%", tenor: "3 years", minInvestment: "₹10,00,000", status: "Active", createdBy: "Michael Johnson" },
    { name: "Reliance Retail Bond", type: "Bond", yield: "9.5%", tenor: "3 years", minInvestment: "₹15,00,000", status: "Draft", createdBy: "Sarah Parker" },
    { name: "L&T Finance ICD", type: "ICD", yield: "8.7%", tenor: "180 days", minInvestment: "₹5,00,000", status: "Draft", createdBy: "Michael Johnson" }
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to log out. Please try again.",
        });
      } else {
        toast({
          title: "Logged out",
          description: "You have been successfully logged out.",
        });
        navigate("/auth");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    }
  };

  const handleApproveRequest = (requestName: string) => {
    toast({
      title: "Request Approved",
      description: `${requestName} has been approved successfully.`,
    });
  };

  const handleRejectRequest = (requestName: string) => {
    toast({
      variant: "destructive",
      title: "Request Rejected",
      description: `${requestName} has been rejected.`,
    });
  };

  const handleInviteUser = () => {
    toast({
      title: "Invite Sent",
      description: "User invitation has been sent successfully.",
    });
  };

  const handleDeleteUser = (userName: string) => {
    toast({
      variant: "destructive",
      title: "User Deleted",
      description: `${userName} has been removed from the platform.`,
    });
  };

  const handleCreateOpportunity = () => {
    toast({
      title: "Opportunity Created",
      description: "New investment opportunity has been created.",
    });
  };

  const handleGenerateInsight = () => {
    toast({
      title: "Generating Insight",
      description: "AI is analyzing the data. Results will be available shortly.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Data export has started. You'll receive an email when ready.",
    });
  };

  // Filter functions
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedUserFilter === "all" || 
                         user.role.toLowerCase().replace(" ", "-") === selectedUserFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredOpportunities = investments.filter(investment => {
    const matchesSearch = investment.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedOpportunityFilter === "all" || 
                         investment.status.toLowerCase() === selectedOpportunityFilter;
    return matchesSearch && matchesFilter;
  });


  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            AI Insights
          </CardTitle>
          <CardDescription>What would you like to know about the platform?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Ask a question or request an analysis..." />
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" onClick={() => handleGenerateInsight()}>Generate weekly activity report</Button>
              <Button variant="outline" size="sm" onClick={() => handleGenerateInsight()}>List users with over ₹1M invested</Button>
              <Button variant="outline" size="sm" onClick={() => handleGenerateInsight()}>Show all pending investment opportunities</Button>
              <Button className="ml-auto" onClick={handleGenerateInsight}>Generate Insight</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Pending Approvals</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((approval, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{approval.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{approval.type}</Badge>
                      <span>{approval.yield}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Submitted by {approval.submittedBy} • {approval.timeAgo}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleRejectRequest(approval.name)}
                    >
                      Reject
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleApproveRequest(approval.name)}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Activities</CardTitle>
            <Button variant="ghost" size="sm">View All Activity</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <Activity className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">{activity.timeAgo}</p>
                  </div>
                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Health */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Platform Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {platformHealth.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">{service.service}</p>
                  <p className="text-xs text-green-600">{service.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Building2 className="w-4 h-4 text-green-600 mr-2" />
            <CardTitle className="text-sm font-medium">Wealth Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Users className="w-4 h-4 text-blue-600 mr-2" />
            <CardTitle className="text-sm font-medium">Investors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Settings className="w-4 h-4 text-purple-600 mr-2" />
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search users by name, email, or role..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
              <DialogDescription>
                Send an invitation to a new user to join the platform.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Email address" />
              <select className="w-full p-2 border rounded">
                <option value="investor">Investor</option>
                <option value="wealth-partner">Wealth Partner</option>
                <option value="admin">Admin</option>
              </select>
              <Button onClick={handleInviteUser} className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Users</CardTitle>
          <Tabs value={selectedUserFilter} onValueChange={setSelectedUserFilter}>
            <TabsList>
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="wealth-partner">Wealth Partners</TabsTrigger>
              <TabsTrigger value="investor">Investors</TabsTrigger>
              <TabsTrigger value="admin">Admins</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'Admin' ? 'default' : user.role === 'Wealth Partner' ? 'secondary' : 'outline'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinedDate}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.details}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {user.role !== "Admin" && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete User</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {user.name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteUser(user.name)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Access Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Access Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <span className="font-medium">Sarah Parker</span>
                <Badge variant="secondary" className="ml-2">Wealth Partner</Badge>
                <p className="text-sm text-muted-foreground">Login • 192.168.1.45 • 2 hours ago</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <span className="font-medium">Admin User</span>
                <Badge variant="default" className="ml-2">Admin</Badge>
                <p className="text-sm text-muted-foreground">Updated User Settings • 192.168.1.12 • Yesterday</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <span className="font-medium">Michael Johnson</span>
                <Badge variant="secondary" className="ml-2">Wealth Partner</Badge>
                <p className="text-sm text-muted-foreground">Created Opportunity • 192.168.1.78 • 2 days ago</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <span className="font-medium">Alex Mathew</span>
                <Badge variant="outline" className="ml-2">Investor</Badge>
                <p className="text-sm text-muted-foreground">Expressed Interest • 192.168.1.60 • 3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOpportunityManagement = () => (
    <div className="space-y-6">
      {/* Opportunity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Edit className="w-4 h-4 text-yellow-600 mr-2" />
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <XCircle className="w-4 h-4 text-gray-600 mr-2" />
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Create */}
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search opportunities..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleCreateOpportunity}>
          <Plus className="w-4 h-4 mr-2" />
          Create Opportunity
        </Button>
      </div>

      {/* Investment Opportunities Table */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Opportunities</CardTitle>
          <Tabs value={selectedOpportunityFilter} onValueChange={setSelectedOpportunityFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Yield</TableHead>
                <TableHead>Tenor</TableHead>
                <TableHead>Min. Investment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOpportunities.map((investment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{investment.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{investment.type}</Badge>
                  </TableCell>
                  <TableCell>{investment.yield}</TableCell>
                  <TableCell>{investment.tenor}</TableCell>
                  <TableCell>{investment.minInvestment}</TableCell>
                  <TableCell>
                    <Badge variant={
                      investment.status === 'Active' ? 'default' :
                      investment.status === 'Draft' ? 'secondary' : 'outline'
                    }>
                      {investment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{investment.createdBy}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Opportunity Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Opportunity Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Top Performing Opportunity</h4>
              <p className="text-sm text-muted-foreground">Reliance Industries Bond has the highest investor interest rate at 78% and has raised ₹1.5 Cr in the last month.</p>
            </div>
            <div>
              <h4 className="font-medium">Investment Trend</h4>
              <p className="text-sm text-muted-foreground">Short-term ICDs (90-180 days) are seeing 35% more interest than long-term bonds in the current market conditions.</p>
            </div>
            <div>
              <h4 className="font-medium">Yield Analysis</h4>
              <p className="text-sm text-muted-foreground">Opportunities with yields above 9% receive 2.5x more views than those with lower yields, regardless of tenor or investment minimum.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Control Panel</h1>
              <p className="text-muted-foreground">Platform overview and management</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleExportData}>
                <FileBarChart className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to logout? You'll need to sign in again to access the admin panel.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="settings">Platform Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="users">
            {renderUserManagement()}
          </TabsContent>

          <TabsContent value="opportunities">
            {renderOpportunityManagement()}
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure and manage system-wide settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">General Settings</h4>
                    <p className="text-sm text-muted-foreground">Configure basic platform settings</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Security</h4>
                    <p className="text-sm text-muted-foreground">Manage security configurations</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Notifications</h4>
                    <p className="text-sm text-muted-foreground">Configure notification settings</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Advanced</h4>
                    <p className="text-sm text-muted-foreground">Advanced platform configurations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;