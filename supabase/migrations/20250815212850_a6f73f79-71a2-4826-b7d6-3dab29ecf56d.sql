-- Create profiles for existing users
INSERT INTO public.profiles (id, role)
VALUES 
  ('da54d544-0bcb-4590-9846-f3925ac4208a', 'admin'),
  ('9598ef77-c8d5-47b5-af3b-73cf5835404a', 'investor'),
  ('3439b038-5296-438f-8a8e-ad45c4d25197', 'wealth-partner'),
  ('1641d149-bbfb-4362-bc54-d57d8f45f687', 'investor')
ON CONFLICT (id) DO NOTHING;