import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuoteRequestData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  serviceNeeded: string;
  description?: string;
  preferredTimeline?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key to bypass RLS
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const requestData: QuoteRequestData = await req.json();

    // Validate required fields
    if (!requestData.firstName || !requestData.lastName || !requestData.email || !requestData.serviceNeeded) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Insert quote request into database
    const { data, error } = await supabaseClient
      .from('quote_requests')
      .insert({
        first_name: requestData.firstName,
        last_name: requestData.lastName,
        email: requestData.email,
        phone: requestData.phone,
        service_needed: requestData.serviceNeeded,
        description: requestData.description,
        preferred_timeline: requestData.preferredTimeline,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting quote request:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to submit quote request' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('Quote request submitted successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Quote request submitted successfully. We will contact you within 24 hours.',
        id: data.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in submit-quote-request function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);