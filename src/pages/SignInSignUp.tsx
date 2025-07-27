import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Mail, Apple } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SignInSignUp = () => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        if (redirectTo === 'quote') {
          navigate('/quote');
        } else {
          navigate('/');
        }
      }
    };
    
    checkAuth();
  }, [navigate, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (tab === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: "Sign In Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Signed In", description: "Welcome back!" });
        if (redirectTo === 'quote') {
          navigate('/quote');
        } else {
          navigate('/');
        }
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast({ title: "Sign Up Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "A confirmation link has been sent." });
        if (redirectTo === 'quote') {
          navigate('/quote');
        } else {
          navigate('/');
        }
      }
    }
    setIsLoading(false);
  };

  const handleOAuth = async (provider: "google" | "facebook" | "apple") => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      toast({ title: "OAuth Error", description: error.message, variant: "destructive" });
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-background rounded-lg shadow-material-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{tab === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg bg-muted p-1">
          <button
            type="button"
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none ${tab === 'signin' ? 'bg-background shadow text-primary' : 'text-muted-foreground hover:text-primary'}`}
            onClick={() => setTab('signin')}
            aria-selected={tab === 'signin'}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none ${tab === 'signup' ? 'bg-background shadow text-primary' : 'text-muted-foreground hover:text-primary'}`}
            onClick={() => setTab('signup')}
            aria-selected={tab === 'signup'}
          >
            Sign Up
          </button>
        </div>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {tab === 'signin' ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
      <div className="text-center my-4 text-muted-foreground">or</div>
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => handleOAuth("google")} disabled={isLoading}>
          <Mail className="w-5 h-5 mr-2" /> Google
        </Button>
        <Button variant="outline" onClick={() => handleOAuth("facebook")} disabled={isLoading}>
          <Facebook className="w-5 h-5 mr-2" /> Facebook
        </Button>
        <Button variant="outline" onClick={() => handleOAuth("apple")} disabled={isLoading}>
          <Apple className="w-5 h-5 mr-2" /> Apple
        </Button>
      </div>
    </div>
  );
};

export default SignInSignUp;
