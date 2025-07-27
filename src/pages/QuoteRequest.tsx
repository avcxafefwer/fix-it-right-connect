import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const QuoteRequest = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/signin?redirect=quote');
      }
    };
    
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Request Your Quote
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours with a detailed estimate.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <QuoteRequestForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuoteRequest;
