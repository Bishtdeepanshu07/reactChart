import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'signup';
}

const AuthDialog = ({ open, onOpenChange, defaultTab = 'login' }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);
  useEffect(() => { setActiveTab(defaultTab); }, [defaultTab]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fakeEmail = (uname: string) => `${uname.toLowerCase().trim()}@dashboard.local`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      toast({ title: 'Error', description: 'Please fill in all fields.', variant: 'destructive' });
      return;
    }

    if (activeTab === 'signup' && password !== confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match.', variant: 'destructive' });
      return;
    }

    if (password.length < 6) {
      toast({ title: 'Error', description: 'Password must be at least 6 characters.', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    try {
      if (activeTab === 'signup') {
        // Check if username already exists via edge function
        const { data: checkResult, error: checkError } = await supabase.functions.invoke('check-username', {
          body: { username: username.trim() },
        });

        if (checkError) throw checkError;

        if (checkResult?.exists) {
          toast({ title: 'Error', description: 'Username already taken.', variant: 'destructive' });
          setIsSubmitting(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email: fakeEmail(username),
          password,
          options: {
            data: { username: username.trim() },
          },
        });

        if (error) throw error;

        toast({ title: 'Success', description: 'Account created! You are now logged in.' });
        onOpenChange(false);
        navigate('/dashboard');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: fakeEmail(username),
          password,
        });

        if (error) throw error;

        toast({ title: 'Success', description: 'Logged in successfully!' });
        onOpenChange(false);
        navigate('/dashboard');
      }
    } catch (error: any) {
      const msg = error?.message || 'An error occurred';
      toast({
        title: 'Error',
        description: msg === 'Invalid login credentials' ? 'Invalid username or password.' : msg,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-4 border-[#5b6abf] rounded-2xl bg-white">
        <div className="flex flex-col items-center pt-8 pb-2 px-8">
          <div className="w-16 h-16 rounded-full bg-[#5b6abf]/10 flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-[#5b6abf]" />
          </div>
          <h2 className="text-2xl font-bold text-[#333] mb-1">Welcome</h2>
          <p className="text-sm text-gray-500 mb-6">Sign in to your account or create a new one</p>

          <div className="flex w-full rounded-lg border border-gray-200 overflow-hidden mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === 'login'
                  ? 'bg-white text-[#333] shadow-sm'
                  : 'bg-gray-50 text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                activeTab === 'signup'
                  ? 'bg-white text-[#333] shadow-sm'
                  : 'bg-gray-50 text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#333]">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={activeTab === 'login' ? 'Enter your username' : 'Choose a username'}
                className="pl-10 h-11 border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#333]">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={activeTab === 'login' ? 'Enter your password' : 'Create a password'}
                className="pl-10 pr-10 h-11 border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {activeTab === 'signup' && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#333]">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 h-11 border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-lg text-white font-semibold text-base disabled:opacity-50"
            style={{
              background: 'linear-gradient(to right, #5b6abf, #9b59b6)',
            }}
          >
            {isSubmitting ? 'Please wait...' : activeTab === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
