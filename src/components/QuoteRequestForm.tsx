import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PHONE } from "@/config/site";
import { useToast } from "@/hooks/use-toast";

const QuoteRequestForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceNeeded: "",
    description: "",
    preferredTimeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-quote-request', {
        body: formData
      });

      if (error) throw error;

      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you within 24 hours with a detailed estimate.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        serviceNeeded: "",
        description: "",
        preferredTimeline: ""
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <MessageSquare className="w-6 h-6 mr-3 text-primary" />
          Request a Quote
        </CardTitle>
        <p className="text-muted-foreground">
          Fill out the form below and we'll get back to you within 24 hours with a detailed estimate.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">First Name *</label>
              <Input 
                placeholder="John" 
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Last Name *</label>
              <Input 
                placeholder="Doe" 
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email *</label>
              <Input 
                type="email" 
                placeholder="john@example.com" 
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone</label>
              <Input 
                type="tel" 
                placeholder={PHONE.display} 
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Service Needed *</label>
            <select 
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              value={formData.serviceNeeded}
              onChange={(e) => setFormData(prev => ({ ...prev, serviceNeeded: e.target.value }))}
              required
            >
              <option value="">Select a service...</option>
              <option value="General Repairs">General Repairs</option>
              <option value="Furniture Assembly">Furniture Assembly</option>
              <option value="TV Mounting">TV Mounting</option>
              <option value="Drywall Patching">Drywall Patching</option>
              <option value="Painting">Painting</option>
              <option value="Plumbing Repairs">Plumbing Repairs</option>
              <option value="Light Electrical">Light Electrical</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Project Description</label>
            <Textarea 
              placeholder="Please describe your project in detail..." 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Preferred Timeline</label>
            <select 
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              value={formData.preferredTimeline}
              onChange={(e) => setFormData(prev => ({ ...prev, preferredTimeline: e.target.value }))}
            >
              <option value="">Select timeline...</option>
              <option value="ASAP (Emergency)">ASAP (Emergency)</option>
              <option value="Within a week">Within a week</option>
              <option value="Within a month">Within a month</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Send Quote Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuoteRequestForm;