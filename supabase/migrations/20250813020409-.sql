-- Add pricing fields to services and ensure updated_at auto-updates
ALTER TABLE public.services
ADD COLUMN IF NOT EXISTS hourly_rate integer,
ADD COLUMN IF NOT EXISTS base_fee integer,
ADD COLUMN IF NOT EXISTS materials_markup_percent integer DEFAULT 0;

-- Ensure updated_at column auto-updates on changes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_services_updated_at'
  ) THEN
    CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;