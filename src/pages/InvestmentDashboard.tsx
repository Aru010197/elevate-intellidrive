import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Dialog } from "@/components/ui/dialog";

function useInvestorAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}

function Sidebar({ onSelectSection, user, onLogout }: { onSelectSection: (section: string) => void, user: any, onLogout: () => void }) {
  return (
    <aside className="w-40 h-screen bg-white border-r flex flex-col justify-between py-6 px-2 fixed left-0 top-0 bottom-0">
      <div>
        <h2 className="text-lg font-bold mb-6">Elevate</h2>
        <nav className="flex flex-col gap-3">
          <button onClick={() => onSelectSection("dashboard")} className="font-medium text-gray-700 hover:text-primary text-left">Dashboard</button>
          <button onClick={() => onSelectSection("opportunities")} className="font-medium text-gray-700 hover:text-primary text-left">Opportunities</button>
          <button onClick={() => onSelectSection("portfolio")} className="font-medium text-gray-700 hover:text-primary text-left">My Portfolio</button>
          <button onClick={() => onSelectSection("documents")} className="font-medium text-gray-700 hover:text-primary text-left">Documents</button>
        </nav>
      </div>
      <div className="border-t pt-4 mt-4 flex flex-col items-center gap-2">
        <div className="text-sm font-semibold">{user?.user_metadata?.name || user?.email}</div>
        <div className="text-xs text-muted-foreground">{user?.user_metadata?.role || "Investor"}</div>
        <button onClick={onLogout} className="mt-2 px-2 py-1 rounded bg-destructive text-white text-xs">Log Out</button>
      </div>
    </aside>
  );
}

export default function InvestmentDashboard() {
  const { user, loading } = useInvestorAuth();
  const [kycStatus, setKycStatus] = useState("pending");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [opportunityFilter, setOpportunityFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  // Sample data
  const investments = [
    { name: "Reliance Retail Bond", type: "Bond", amount: "₹25,00,000", rate: "9.5%", maturity: "20-Oct-2025", status: "Active", details: "High-rated retail bond with quarterly payouts." },
    { name: "Tata Capital ICD", type: "ICD", amount: "₹15,00,000", rate: "8.9%", maturity: "15-Dec-2024", status: "Active", details: "Short-term corporate deposit with attractive yield." },
    { name: "HDFC Bond", type: "Bond", amount: "₹20,00,000", rate: "9.1%", maturity: "05-Mar-2026", status: "Active", details: "Stable bond investment with annual payouts." },
  ];
  const opportunities = [
    { name: "Tata Motors Bond", type: "Bond", yield: "9.3%", tenor: "3 years", min: "₹10,00,000", rating: "AA+", risk: "Low-Medium", details: "Automotive sector bond with strong rating." },
    { name: "Bajaj Housing Finance ICD", type: "ICD", yield: "9.0%", tenor: "180 days", min: "₹5,00,000", rating: "AAA", risk: "Low", details: "Short-term deposit with AAA rating." },
    { name: "Aditya Birla Finance Bond", type: "Bond", yield: "9.6%", tenor: "5 years", min: "₹25,00,000", rating: "AA+", risk: "Medium", details: "Long-term bond with moderate risk." },
    { name: "Mahindra Finance ICD", type: "ICD", yield: "8.8%", tenor: "90 days", min: "₹10,00,000", rating: "AAA", risk: "Low", details: "Quick turnaround corporate deposit." },
    { name: "Piramal Enterprises Bond", type: "Bond", yield: "10.1%", tenor: "4 years", min: "₹15,00,000", rating: "A+", risk: "Medium-High", details: "Higher yield bond with increased risk." },
    { name: "HDFC Ltd ICD", type: "ICD", yield: "8.7%", tenor: "270 days", min: "₹10,00,000", rating: "AAA", risk: "Low", details: "Stable deposit from HDFC." },
    { name: "Reliance Industries Bond", type: "Bond", yield: "9.2%", tenor: "3 years", min: "₹20,00,000", rating: "AAA", risk: "Low", details: "Blue-chip bond investment." },
    { name: "L&T Finance ICD", type: "ICD", yield: "8.9%", tenor: "180 days", min: "₹5,00,000", rating: "AAA", risk: "Low", details: "Short-term deposit from L&T." },
  ];

  // Filtered opportunities
  const filteredOpportunities = opportunities.filter(o =>
    (opportunityFilter === "All" || o.type === opportunityFilter) &&
    o.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (user) {
      // Example: fetch KYC status from Supabase
      supabase.from("investors").select("kyc_status").eq("id", user.id).single().then(({ data }) => {
        if (data?.kyc_status) setKycStatus(data.kyc_status);
      });
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in as an investor to access your dashboard.</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onSelectSection={setActiveSection} user={user} onLogout={handleLogout} />
      <main className="flex-1 p-6 md:p-8 space-y-8 ml-56">
        {activeSection === "dashboard" && (
          <div>
            {/* Welcome Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Welcome back, {user.user_metadata?.name || user.email}.</h1>
              <p className="text-muted-foreground">Here's an overview of your investments.</p>
            </div>
            {/* Investment Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total Investment</div>
                  <div className="text-2xl font-bold">₹85,00,000</div>
                  <div className="text-green-600 text-xs mt-1">↑ 12% YoY</div>
                </div>
                <div className="mt-4 flex justify-end">
                  <span className="bg-gray-100 p-2 rounded-full">
                    <svg width="20" height="20" fill="none"><rect width="20" height="20" rx="6" fill="#E5E7EB"/></svg>
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Projected Annual Return</div>
                  <div className="text-2xl font-bold">9.2%</div>
                  <div className="text-green-600 text-xs mt-1">↑ 0.3% vs Last Quarter</div>
                </div>
                <div className="mt-4 flex justify-end">
                  <span className="bg-gray-100 p-2 rounded-full">
                    <svg width="20" height="20" fill="none"><rect width="20" height="20" rx="6" fill="#E5E7EB"/></svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="font-semibold mb-4">My Investments</div>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-muted-foreground text-sm">
                        <th className="p-2">Investment Name</th>
                        <th className="p-2">Type</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Rate</th>
                        <th className="p-2">Maturity Date</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investments.map((inv, idx) => (
                        <tr key={idx}>
                          <td className="p-2">{inv.name}</td>
                          <td className="p-2">{inv.type}</td>
                          <td className="p-2">{inv.amount}</td>
                          <td className="p-2">{inv.rate}</td>
                          <td className="p-2">{inv.maturity}</td>
                          <td className="p-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{inv.status}</span></td>
                          <td className="p-2"><button className="bg-gray-100 px-3 py-1 rounded" onClick={() => setSelectedInvestment(inv)}>View Details</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-right mt-2">
                    <a href="#" className="text-primary text-sm font-medium">View All &rarr;</a>
                  </div>
                  {/* Investment Details Modal */}
                  {selectedInvestment && (
                    <Dialog open={!!selectedInvestment} onOpenChange={() => setSelectedInvestment(null)}>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2">{selectedInvestment.name}</h3>
                        <p className="mb-2">Type: {selectedInvestment.type}</p>
                        <p className="mb-2">Amount: {selectedInvestment.amount}</p>
                        <p className="mb-2">Rate: {selectedInvestment.rate}</p>
                        <p className="mb-2">Maturity: {selectedInvestment.maturity}</p>
                        <p className="mb-2">Status: {selectedInvestment.status}</p>
                        <p className="mb-2">Details: {selectedInvestment.details}</p>
                        <button className="mt-4 px-4 py-2 bg-primary text-white rounded" onClick={() => setSelectedInvestment(null)}>Close</button>
                      </div>
                    </Dialog>
                  )}
                </div>
              </div>
              <div>
                <div className="bg-white rounded-lg shadow p-4 w-full max-w-xs mx-auto flex flex-col items-center">
                  <div className="font-semibold mb-4">Portfolio Allocation</div>
                  <div className="w-24 h-24 mb-4 flex items-center justify-center">
                    <svg viewBox="0 0 32 32" width="100%" height="100%">
                      <circle r="16" cx="16" cy="16" fill="#E5E7EB" />
                      <path d="M16 16 L16 0 A16 16 0 0 1 28 10 Z" fill="#16A34A" />
                      <path d="M16 16 L28 10 A16 16 0 0 1 24 28 Z" fill="#A7F3D0" />
                      <path d="M16 16 L24 28 A16 16 0 0 1 16 32 Z" fill="#FBBF24" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2 items-center text-xs">
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                      <span>ICD: 60%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-200 mr-2"></span>
                      <span>Unlisted Bonds: 30%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
                      <span>REITs: 10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-4" />
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="font-semibold mb-4">Recommended Opportunities</div>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-muted-foreground text-sm">
                    <th className="p-2">Opportunity</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Yield</th>
                    <th className="p-2">Tenor</th>
                    <th className="p-2">Min. Investment</th>
                    <th className="p-2">Rating</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">Tata Motors Bond</td>
                    <td className="p-2">Bond</td>
                    <td className="p-2">9.3%</td>
                    <td className="p-2">3 years</td>
                    <td className="p-2">₹10,00,000</td>
                    <td className="p-2"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">AA+</span></td>
                    <td className="p-2"><button className="bg-gray-100 px-3 py-1 rounded">View Details</button></td>
                  </tr>
                  <tr>
                    <td className="p-2">Bajaj Housing Finance ICD</td>
                    <td className="p-2">ICD</td>
                    <td className="p-2">9.0%</td>
                    <td className="p-2">180 days</td>
                    <td className="p-2">₹5,00,000</td>
                    <td className="p-2"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">AAA</span></td>
                    <td className="p-2"><button className="bg-gray-100 px-3 py-1 rounded">View Details</button></td>
                  </tr>
                  <tr>
                    <td className="p-2">Aditya Birla Finance Bond</td>
                    <td className="p-2">Bond</td>
                    <td className="p-2">9.6%</td>
                    <td className="p-2">5 years</td>
                    <td className="p-2">₹25,00,000</td>
                    <td className="p-2"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">AA</span></td>
                    <td className="p-2"><button className="bg-gray-100 px-3 py-1 rounded">View Details</button></td>
                  </tr>
                </tbody>
              </table>
              <div className="text-right mt-2">
                <a href="#" className="text-primary text-sm font-medium">View All &rarr;</a>
              </div>
            </div>
            {/* Market Insights */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="font-semibold mb-4">Market Insights</div>
              <div className="mb-2">
                <div className="font-medium text-green-700">RBI Holds Repo Rate at 6.5%</div>
                <div className="text-sm text-muted-foreground">The Reserve Bank of India's Monetary Policy Committee has decided to maintain the repo rate at 6.5%, which is expected to positively impact corporate bond yields.</div>
              </div>
              <div>
                <div className="font-medium text-green-700">Corporate Earnings Beat Expectations</div>
                <div className="text-sm text-muted-foreground">Q2 corporate earnings have exceeded market expectations, with key sectors like IT, banking, and consumer goods showing strong performance.</div>
              </div>
              <div className="text-right mt-2">
                <a href="#" className="text-primary text-sm font-medium">View All Insights</a>
              </div>
            </div>
          </div>
        )}
        {activeSection === "opportunities" && (
          <Card className="p-6 mb-8" id="opportunities">
            <h2 className="text-xl font-bold mb-2">Explore Investment Opportunities</h2>
            <p className="text-muted-foreground mb-4">Discover and express interest in available investment opportunities.</p>
            <div className="flex items-center gap-2 mb-4">
              <input type="text" placeholder="Search opportunities..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="border rounded px-3 py-2 w-full max-w-md" />
              <button className="px-4 py-2 rounded bg-gray-200">Filter</button>
            </div>
            {/* Filter Tabs */}
            <div className="mb-4 flex gap-2">
              {["All", "Bond", "ICD"].map(tab => (
                <button key={tab} className={`px-4 py-2 rounded ${opportunityFilter === tab ? "bg-primary text-white" : "bg-gray-200"}`} onClick={() => setOpportunityFilter(tab)}>{tab}</button>
              ))}
            </div>
            {/* Featured Opportunities Table */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Featured Opportunities</h3>
              <table className="w-full text-left border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2"></th>
                    <th className="p-2">Opportunity</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Yield</th>
                    <th className="p-2">Tenor</th>
                    <th className="p-2">Min. Investment</th>
                    <th className="p-2">Rating</th>
                    <th className="p-2">Risk Level</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOpportunities.slice(0, 3).map((o, idx) => (
                    <tr key={idx}>
                      <td className="p-2 text-yellow-500">★</td>
                      <td className="p-2">{o.name}</td>
                      <td className="p-2">{o.type}</td>
                      <td className="p-2">{o.yield}</td>
                      <td className="p-2">{o.tenor}</td>
                      <td className="p-2">{o.min}</td>
                      <td className="p-2">{o.rating}</td>
                      <td className="p-2"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{o.risk}</span></td>
                      <td className="p-2"><button className="text-primary underline" onClick={() => setSelectedOpportunity(o)}>View Details</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* All Opportunities Table */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">All Opportunities</h3>
              <table className="w-full text-left border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Opportunity</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Yield</th>
                    <th className="p-2">Tenor</th>
                    <th className="p-2">Min. Investment</th>
                    <th className="p-2">Rating</th>
                    <th className="p-2">Risk Level</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOpportunities.map((o, idx) => (
                    <tr key={idx}>
                      <td className="p-2">{o.name}</td>
                      <td className="p-2">{o.type}</td>
                      <td className="p-2">{o.yield}</td>
                      <td className="p-2">{o.tenor}</td>
                      <td className="p-2">{o.min}</td>
                      <td className="p-2">{o.rating}</td>
                      <td className="p-2"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{o.risk}</span></td>
                      <td className="p-2"><button className="text-primary underline" onClick={() => setSelectedOpportunity(o)}>View Details</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Opportunity Details Modal */}
            {selectedOpportunity && (
              <Dialog open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{selectedOpportunity.name}</h3>
                  <p className="mb-2">Type: {selectedOpportunity.type}</p>
                  <p className="mb-2">Yield: {selectedOpportunity.yield}</p>
                  <p className="mb-2">Tenor: {selectedOpportunity.tenor}</p>
                  <p className="mb-2">Min. Investment: {selectedOpportunity.min}</p>
                  <p className="mb-2">Rating: {selectedOpportunity.rating}</p>
                  <p className="mb-2">Risk Level: {selectedOpportunity.risk}</p>
                  <p className="mb-2">Details: {selectedOpportunity.details}</p>
                  <button className="mt-4 px-4 py-2 bg-primary text-white rounded" onClick={() => setSelectedOpportunity(null)}>Close</button>
                </div>
              </Dialog>
            )}
            {/* Risk Level Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="border rounded p-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Low</span>
                <div className="mt-2 text-xs text-muted-foreground">Investments with high credit ratings (AAA/AA+) and shorter tenors. Lower returns but highest safety.</div>
              </div>
              <div className="border rounded p-3">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Medium</span>
                <div className="mt-2 text-xs text-muted-foreground">Investments with good credit ratings (AA/A+) and moderate tenors. Balanced risk-reward profile.</div>
              </div>
              <div className="border rounded p-3">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Medium-High</span>
                <div className="mt-2 text-xs text-muted-foreground">Investments with moderate credit ratings (A/BBB+) or longer tenors. Higher returns but increased risk.</div>
              </div>
              <div className="border rounded p-3">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">High</span>
                <div className="mt-2 text-xs text-muted-foreground">Investments with lower credit ratings (BBB and below). Highest returns but significant risk exposure.</div>
              </div>
            </div>
          </Card>
        )}
        {activeSection === "portfolio" && (
          <div>
            {/* My Portfolio Header */}
            <div className="mb-4">
              <h1 className="text-xl font-bold">My Portfolio</h1>
              <p className="text-muted-foreground">Track and manage your active investments.</p>
            </div>
            {/* Portfolio Allocation & Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white rounded shadow p-4 flex flex-col items-center justify-center col-span-1">
                <div className="font-semibold mb-2">Portfolio Allocation</div>
                <div className="w-32 h-32 mb-2">
                  {/* Pie chart placeholder */}
                  <svg viewBox="0 0 32 32" width="100%" height="100%">
                    <circle r="16" cx="16" cy="16" fill="#E5E7EB" />
                    <path d="M16 16 L16 0 A16 16 0 0 1 32 16 Z" fill="#16A34A" />
                    <path d="M16 16 L32 16 A16 16 0 0 1 16 32 Z" fill="#A7F3D0" />
                  </svg>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-600 mr-1"></span>ICD</span>
                  <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-300 mr-1"></span>Unlisted Bond</span>
                </div>
              </div>
              <div className="bg-white rounded shadow p-4 flex flex-col justify-center items-center">
                <div className="font-semibold mb-2">Total Portfolio Value</div>
                <div className="text-2xl font-bold">₹85,00,000</div>
              </div>
              <div className="bg-white rounded shadow p-4 flex flex-col justify-center items-center">
                <div className="font-semibold mb-2">Weighted Avg Yield</div>
                <div className="text-2xl font-bold">9.2%</div>
              </div>
              <div className="bg-white rounded shadow p-4 flex flex-col justify-center items-center">
                <div className="font-semibold mb-2">Next Payout Date</div>
                <div className="text-2xl font-bold">30 Sep 2024</div>
              </div>
            </div>
            {/* Upcoming Payments */}
            <div className="bg-white rounded shadow p-4 mb-4">
              <div className="font-semibold mb-2">Upcoming Payments</div>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-50 rounded p-3 flex-1 min-w-[200px]">
                  <div className="font-medium">L&T Finance ICD</div>
                  <div className="text-xl font-bold">₹43,500</div>
                  <div className="text-xs text-muted-foreground">On Maturity payment</div>
                  <div className="text-xs text-green-700 mt-1">15-Sep-2024</div>
                </div>
                <div className="bg-gray-50 rounded p-3 flex-1 min-w-[200px]">
                  <div className="font-medium">Reliance Retail Bond</div>
                  <div className="text-xl font-bold">₹2,37,500</div>
                  <div className="text-xs text-muted-foreground">Annual payment</div>
                  <div className="text-xs text-green-700 mt-1">20-Oct-2024</div>
                </div>
                <div className="bg-gray-50 rounded p-3 flex-1 min-w-[200px]">
                  <div className="font-medium">Tata Capital ICD</div>
                  <div className="text-xl font-bold">₹66,750</div>
                  <div className="text-xs text-muted-foreground">On Maturity payment</div>
                  <div className="text-xs text-green-700 mt-1">15-Dec-2024</div>
                </div>
              </div>
            </div>
            {/* My Investments */}
            <div className="bg-white rounded shadow p-4 mb-4">
              <div className="font-semibold mb-2">My Investments</div>
              <div className="mb-2 flex gap-2">
                {['All', 'Bonds', 'ICDs'].map(tab => (
                  <button key={tab} className={`px-4 py-1 rounded ${opportunityFilter === tab ? 'bg-primary text-white' : 'bg-gray-200'}`} onClick={() => setOpportunityFilter(tab)}>{tab}</button>
                ))}
                <div className="ml-auto flex items-center gap-2">
                  <input type="text" placeholder="Search investments..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="border rounded px-3 py-1 text-sm" />
                  <button className="px-3 py-1 rounded bg-gray-200 text-sm">Filter</button>
                </div>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100 text-xs">
                    <th className="p-2">Investment Name</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Rate</th>
                    <th className="p-2">Invested Date</th>
                    <th className="p-2">Maturity Date</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.filter(inv =>
                    (opportunityFilter === 'All' || inv.type === opportunityFilter.slice(0, -1)) &&
                    inv.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((inv, idx) => (
                    <tr key={idx} className={idx % 2 === 1 ? 'bg-gray-50' : ''}>
                      <td className="p-2">{inv.name}</td>
                      <td className="p-2">{inv.type}</td>
                      <td className="p-2">{inv.amount}</td>
                      <td className="p-2">{inv.rate}</td>
                      <td className="p-2">{inv.invested || '15-Jan-2023'}</td>
                      <td className="p-2">{inv.maturity}</td>
                      <td className="p-2"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Active</span></td>
                      <td className="p-2"><button className="bg-gray-100 px-3 py-1 rounded" onClick={() => setSelectedInvestment(inv)}>View Details</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Investment Details Modal */}
              {selectedInvestment && (
                <Dialog open={!!selectedInvestment} onOpenChange={() => setSelectedInvestment(null)}>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{selectedInvestment.name}</h3>
                    <p className="mb-2">Type: {selectedInvestment.type}</p>
                    <p className="mb-2">Amount: {selectedInvestment.amount}</p>
                    <p className="mb-2">Rate: {selectedInvestment.rate}</p>
                    <p className="mb-2">Invested Date: {selectedInvestment.invested || '15-Jan-2023'}</p>
                    <p className="mb-2">Maturity: {selectedInvestment.maturity}</p>
                    <p className="mb-2">Status: Active</p>
                    <p className="mb-2">Details: {selectedInvestment.details}</p>
                    <button className="mt-4 px-4 py-2 bg-primary text-white rounded" onClick={() => setSelectedInvestment(null)}>Close</button>
                  </div>
                </Dialog>
              )}
            </div>
            {/* Return Projection */}
            <div className="bg-white rounded shadow p-4 mb-4">
              <div className="font-semibold mb-2">Return Projection</div>
              <div className="bg-gray-50 rounded p-6 mb-4 text-center text-muted-foreground">Projected returns chart will be displayed here</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded shadow p-4 flex flex-col items-center">
                  <div className="font-semibold">Total Invested</div>
                  <div className="text-xl font-bold">₹85,00,000</div>
                </div>
                <div className="bg-white rounded shadow p-4 flex flex-col items-center">
                  <div className="font-semibold">Projected Interest (12 mo)</div>
                  <div className="text-xl font-bold">₹7,82,000</div>
                </div>
                <div className="bg-white rounded shadow p-4 flex flex-col items-center">
                  <div className="font-semibold">Effective Annual Yield</div>
                  <div className="text-xl font-bold">9.2%</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeSection === "documents" && (
          <div>
            {/* My Documents Header */}
            <div className="mb-4">
              <h1 className="text-xl font-bold">My Documents</h1>
              <p className="text-muted-foreground">Access and download your investment-related documents.</p>
            </div>
            {/* Document Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white rounded shadow p-4 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1"><span className="text-green-600"><svg width="20" height="20" fill="none"><rect width="20" height="20" rx="6" fill="#E5E7EB"/></svg></span>Agreements</div>
                <div className="text-2xl font-bold">4</div>
              </div>
              <div className="bg-white rounded shadow p-4 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1"><span className="text-green-600"><svg width="20" height="20" fill="none"><rect width="20" height="20" rx="6" fill="#E5E7EB"/></svg></span>Receipts</div>
                <div className="text-2xl font-bold">2</div>
              </div>
              <div className="bg-white rounded shadow p-4 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1"><span className="text-green-600"><svg width="20" height="20" fill="none"><rect width="20" height="20" rx="6" fill="#E5E7EB"/></svg></span>Statements</div>
                <div className="text-2xl font-bold">3</div>
              </div>
              <div className="bg-white rounded shadow p-4 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1"><span className="text-green-600"><svg width="20" height="20" fill="none"><rect width="20" height="20" rx="6" fill="#E5E7EB"/></svg></span>Tax Documents</div>
                <div className="text-2xl font-bold">1</div>
              </div>
            </div>
            {/* Search and Filter */}
            <div className="flex items-center gap-2 mb-4">
              <input type="text" placeholder="Search documents..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="border rounded px-3 py-2 w-full max-w-md" />
              <button className="px-4 py-2 rounded bg-gray-200">Filter</button>
            </div>
            {/* Document Repository Tabs */}
            <div className="mb-2 flex gap-2">
              {['All Documents', 'Agreements', 'Receipts', 'Statements & Tax'].map(tab => (
                <button key={tab} className={`px-4 py-1 rounded ${opportunityFilter === tab ? 'bg-primary text-white' : 'bg-gray-200'}`} onClick={() => setOpportunityFilter(tab)}>{tab}</button>
              ))}
            </div>
            {/* Document Table */}
            <div className="bg-white rounded shadow p-4 mb-4">
              <div className="font-semibold mb-2">Document Repository</div>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-100 text-xs">
                    <th className="p-2">Document Name</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sample documents, filter and search logic applied */}
                  {[
                    { name: "Reliance Retail Bond Agreement", type: "Investment Agreement", date: "20-Oct-2022", status: "Signed" },
                    { name: "Tata Capital ICD Agreement", type: "Investment Agreement", date: "15-Jun-2024", status: "Signed" },
                    { name: "HDFC Bond Agreement", type: "Investment Agreement", date: "05-Mar-2023", status: "Signed" },
                    { name: "L&T Finance ICD Agreement", type: "Investment Agreement", date: "30-Mar-2024", status: "Signed" },
                    { name: "Reliance Retail Bond Interest Payment Receipt", type: "Receipt", date: "20-Oct-2023", status: "Processed" },
                    { name: "HDFC Bond Interest Payment Receipt", type: "Receipt", date: "05-Mar-2024", status: "Processed" },
                    { name: "Quarterly Portfolio Statement – Q2 2024", type: "Statement", date: "30-Jun-2024", status: "Available" },
                    { name: "Quarterly Portfolio Statement – Q1 2024", type: "Statement", date: "31-Mar-2024", status: "Available" },
                    { name: "Quarterly Portfolio Statement – Q4 2023", type: "Statement", date: "31-Dec-2023", status: "Available" },
                    { name: "Annual Tax Statement – FY 2023-24", type: "Tax Document", date: "30-Apr-2024", status: "Available" },
                  ].filter(doc =>
                    (opportunityFilter === 'All Documents' ||
                      (opportunityFilter === 'Agreements' && doc.type === 'Investment Agreement') ||
                      (opportunityFilter === 'Receipts' && doc.type === 'Receipt') ||
                      (opportunityFilter === 'Statements & Tax' && (doc.type === 'Statement' || doc.type === 'Tax Document'))
                    ) &&
                    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((doc, idx) => (
                    <tr key={idx} className={idx % 2 === 1 ? 'bg-gray-50' : ''}>
                      <td className="p-2">{doc.name}</td>
                      <td className="p-2">{doc.type}</td>
                      <td className="p-2">{doc.date}</td>
                      <td className="p-2">
                        {doc.status === 'Signed' && <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Signed</span>}
                        {doc.status === 'Processed' && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Processed</span>}
                        {doc.status === 'Available' && <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Available</span>}
                      </td>
                      <td className="p-2"><button className="bg-gray-100 px-3 py-1 rounded flex items-center gap-1"><span>Download</span><svg width="16" height="16" fill="none"><rect width="16" height="16" rx="4" fill="#E5E7EB"/></svg></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Recent Document Activity */}
            <div className="bg-white rounded shadow p-4">
              <div className="font-semibold mb-2">Recent Document Activity</div>
              <ul className="text-sm">
                <li className="flex items-center gap-2 mb-2"><span className="text-green-600"><svg width="16" height="16" fill="none"><rect width="16" height="16" rx="4" fill="#E5E7EB"/></svg></span>Downloaded Quarterly Portfolio Statement – Q2 2024 <span className="text-muted-foreground ml-2">2 hours ago</span></li>
                <li className="flex items-center gap-2 mb-2"><span className="text-green-600"><svg width="16" height="16" fill="none"><rect width="16" height="16" rx="4" fill="#E5E7EB"/></svg></span>Viewed HDFC Bond Interest Payment Receipt <span className="text-muted-foreground ml-2">Yesterday</span></li>
                <li className="flex items-center gap-2"><span className="text-green-600"><svg width="16" height="16" fill="none"><rect width="16" height="16" rx="4" fill="#E5E7EB"/></svg></span>Downloaded Annual Tax Statement – FY 2023-24 <span className="text-muted-foreground ml-2">3 days ago</span></li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}