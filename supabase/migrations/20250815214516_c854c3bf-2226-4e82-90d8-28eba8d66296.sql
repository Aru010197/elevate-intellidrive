-- Create a function to handle new user signup and create profile
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();