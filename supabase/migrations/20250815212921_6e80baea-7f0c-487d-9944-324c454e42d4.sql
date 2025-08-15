-- Enable RLS on all existing tables that don't have it
ALTER TABLE public.bond_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.icd_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reit_requests ENABLE ROW LEVEL SECURITY;