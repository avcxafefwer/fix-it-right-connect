-- Create services table for managing available services
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  rate_type TEXT NOT NULL CHECK (rate_type IN ('hourly', 'flat', 'range')),
  min_rate INTEGER, -- in cents
  max_rate INTEGER, -- in cents
  estimated_hours_min INTEGER DEFAULT 1,
  estimated_hours_max INTEGER DEFAULT 4,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quote requests table
CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_needed TEXT NOT NULL,
  description TEXT,
  preferred_timeline TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'accepted', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create time slots table for availability management
CREATE TABLE public.time_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date, start_time)
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  service_id UUID REFERENCES public.services(id),
  service_name TEXT NOT NULL,
  description TEXT,
  estimated_hours INTEGER DEFAULT 2,
  estimated_cost INTEGER NOT NULL, -- in cents
  deposit_amount INTEGER DEFAULT 10000, -- $100 in cents
  scheduled_date DATE,
  scheduled_start_time TIME,
  scheduled_end_time TIME,
  status TEXT DEFAULT 'pending_payment' CHECK (status IN ('pending_payment', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'deposit_paid', 'fully_paid')),
  payment_id TEXT, -- PayPal transaction ID
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to services and time slots
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);
CREATE POLICY "Time slots are viewable by everyone" ON public.time_slots FOR SELECT USING (true);

-- Create policies for quote requests (anyone can create, only staff can view all)
CREATE POLICY "Anyone can create quote requests" ON public.quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own quote requests" ON public.quote_requests FOR SELECT USING (email = auth.email());

-- Create policies for bookings
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (customer_email = auth.email() OR user_id = auth.uid());
CREATE POLICY "Users can update their own bookings" ON public.bookings FOR UPDATE USING (customer_email = auth.email() OR user_id = auth.uid());

-- Insert default services
INSERT INTO public.services (name, description, rate_type, min_rate, max_rate, estimated_hours_min, estimated_hours_max) VALUES
('General Repairs', 'Quick fixes and maintenance for your home', 'hourly', 8000, 12000, 1, 3),
('Furniture Assembly', 'Professional assembly of all furniture types', 'flat', 7500, 7500, 1, 2),
('TV Mounting', 'Professional TV mounting service', 'range', 10000, 15000, 1, 2),
('Drywall Patching', 'Professional drywall repair and finishing', 'range', 15000, 30000, 2, 4),
('Painting', 'Interior and exterior painting services', 'range', 30000, 60000, 4, 8),
('Plumbing Repairs', 'Faucets, toilets, and minor plumbing fixes', 'range', 10000, 20000, 1, 3),
('Light Electrical', 'Safe electrical work for your home', 'range', 8000, 15000, 1, 3);

-- Manually insert time slots for the next 30 days (9 AM to 5 PM, Monday to Saturday)
DO $$
DECLARE
  current_date_var DATE := CURRENT_DATE + 1;
  end_date DATE := CURRENT_DATE + 30;
  slot_time TIME;
BEGIN
  WHILE current_date_var <= end_date LOOP
    -- Only add slots for Monday to Saturday (DOW 1-6)
    IF EXTRACT(DOW FROM current_date_var) BETWEEN 1 AND 6 THEN
      slot_time := '09:00'::TIME;
      WHILE slot_time <= '15:00'::TIME LOOP
        INSERT INTO public.time_slots (date, start_time, end_time)
        VALUES (current_date_var, slot_time, slot_time + interval '2 hours');
        slot_time := slot_time + interval '2 hours';
      END LOOP;
    END IF;
    current_date_var := current_date_var + 1;
  END LOOP;
END $$;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quote_requests_updated_at BEFORE UPDATE ON public.quote_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();