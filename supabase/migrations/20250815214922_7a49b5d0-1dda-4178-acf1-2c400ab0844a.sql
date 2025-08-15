-- Fix the critical RBAC issues

-- 1. Enable RLS on profiles table (it has policies but RLS is disabled!)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Create a security definer function to get user role to avoid infinite recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- 3. Add policies for other critical tables

-- Investment requests should be visible to users and admins
CREATE POLICY "Users can view their own investment requests" 
ON public.investment_requests FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all investment requests" 
ON public.investment_requests FOR SELECT 
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Users can create their own investment requests" 
ON public.investment_requests FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update investment requests" 
ON public.investment_requests FOR UPDATE 
USING (public.get_current_user_role() = 'admin');

-- KYC requests should be visible to users and admins
CREATE POLICY "Users can view their own kyc requests" 
ON public.kyc_requests FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all kyc requests" 
ON public.kyc_requests FOR SELECT 
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Users can create their own kyc requests" 
ON public.kyc_requests FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update kyc requests" 
ON public.kyc_requests FOR UPDATE 
USING (public.get_current_user_role() = 'admin');

-- Pending requests should be visible to users and admins
CREATE POLICY "Users can view their own pending requests" 
ON public.pending_requests FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all pending requests" 
ON public.pending_requests FOR SELECT 
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Users can create their own pending requests" 
ON public.pending_requests FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update pending requests" 
ON public.pending_requests FOR UPDATE 
USING (public.get_current_user_role() = 'admin');

-- Investments should be viewable by all authenticated users but only admins can modify
CREATE POLICY "Anyone can view investments" 
ON public.investments FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage investments" 
ON public.investments FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Invites should only be manageable by admins
CREATE POLICY "Admins can manage invites" 
ON public.invites FOR ALL 
USING (public.get_current_user_role() = 'admin');