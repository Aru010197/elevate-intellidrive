-- Add policies for remaining tables to complete RBAC

-- Bond requests - should be accessible to users and admins
CREATE POLICY "Users can view their own bond requests" 
ON public.bond_requests FOR SELECT 
USING (auth.uid() = investorid);

CREATE POLICY "Admins can view all bond requests" 
ON public.bond_requests FOR SELECT 
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Users can create bond requests" 
ON public.bond_requests FOR INSERT 
WITH CHECK (auth.uid() = investorid);

CREATE POLICY "Admins can update bond requests" 
ON public.bond_requests FOR UPDATE 
USING (public.get_current_user_role() = 'admin');

-- ICD requests - should be accessible to users and admins
CREATE POLICY "Users can view their own icd requests" 
ON public.icd_requests FOR SELECT 
USING (auth.uid() = investorid);

CREATE POLICY "Admins can view all icd requests" 
ON public.icd_requests FOR SELECT 
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Users can create icd requests" 
ON public.icd_requests FOR INSERT 
WITH CHECK (auth.uid() = investorid);

CREATE POLICY "Admins can update icd requests" 
ON public.icd_requests FOR UPDATE 
USING (public.get_current_user_role() = 'admin');

-- REIT requests - should be accessible to users and admins
CREATE POLICY "Users can view their own reit requests" 
ON public.reit_requests FOR SELECT 
USING (auth.uid() = investorid);

CREATE POLICY "Admins can view all reit requests" 
ON public.reit_requests FOR SELECT 
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Users can create reit requests" 
ON public.reit_requests FOR INSERT 
WITH CHECK (auth.uid() = investorid);

CREATE POLICY "Admins can update reit requests" 
ON public.reit_requests FOR UPDATE 
USING (public.get_current_user_role() = 'admin');

-- Commission reports - only admins should access
CREATE POLICY "Admins can manage commission reports" 
ON public.commission_reports FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Investor performance - admins and wealth partners should access
CREATE POLICY "Admins can view all investor performance" 
ON public.investor_performance FOR SELECT 
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Wealth partners can view investor performance" 
ON public.investor_performance FOR SELECT 
USING (public.get_current_user_role() = 'wealth-partner');

CREATE POLICY "Admins can manage investor performance" 
ON public.investor_performance FOR ALL 
USING (public.get_current_user_role() = 'admin');

-- Investors table - should be viewable by admins and wealth partners
CREATE POLICY "Admins can manage investors" 
ON public.investors FOR ALL 
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Wealth partners can view investors" 
ON public.investors FOR SELECT 
USING (public.get_current_user_role() = 'wealth-partner');

-- Referrals - wealth partners can view their referrals, admins can see all
CREATE POLICY "Wealth partners can view their referrals" 
ON public.referrals FOR SELECT 
USING (public.get_current_user_role() = 'wealth-partner' AND auth.jwt() ->> 'email' = partneremail);

CREATE POLICY "Admins can manage all referrals" 
ON public.referrals FOR ALL 
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Wealth partners can create referrals" 
ON public.referrals FOR INSERT 
WITH CHECK (public.get_current_user_role() = 'wealth-partner' AND auth.jwt() ->> 'email' = partneremail);