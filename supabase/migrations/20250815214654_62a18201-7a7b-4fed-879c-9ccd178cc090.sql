-- Create a simple migration to fix the function and test trigger
-- Just recreate the function with correct search path
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, role, investor_code, referral_code)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'role', 'investor'),
    new.raw_user_meta_data->>'investor_code',
    new.raw_user_meta_data->>'referral_code'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;