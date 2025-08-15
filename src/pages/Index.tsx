import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LandingPage from "./LandingPage";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Index component state:', { loading, user: !!user, profile });
    if (!loading && user && profile) {
      // Redirect authenticated users to their appropriate dashboard
      console.log('Redirecting user with role:', profile.role);
      switch (profile.role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'wealth-partner':
          navigate('/partner-dashboard');
          break;
        case 'investor':
          navigate('/investor-dashboard');
          break;
      }
    } else if (!loading && user && !profile) {
      console.log('User exists but no profile found - staying on landing page');
    }
  }, [user, profile, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return <LandingPage />;
};

export default Index;
