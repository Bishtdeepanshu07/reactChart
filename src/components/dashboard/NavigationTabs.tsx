import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useExcelData } from '@/contexts/ExcelContext';
import { toast } from 'sonner';
import { UserPlus, Check, Loader2 } from 'lucide-react';

const tabs = [
  { id: 'repository', label: 'Repository' },
  { id: 'regns', label: 'REGNs/Licenses Details', link: 'https://adventmanagementconsulting-my.sharepoint.com/personal/shahabuddin_adventmcs_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fshahabuddin%5Fadventmcs%5Fcom%2FDocuments%2FCompany%20Data%20Share%20Point%2FWhale%20Cloud%2FS%26CE&ga=1' },
  { id: 'returns', label: 'Returns', link: 'https://adventmanagementconsulting-my.sharepoint.com/personal/shahabuddin_adventmcs_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fshahabuddin%5Fadventmcs%5Fcom%2FDocuments%2FCompany%20Data%20Share%20Point%2FWhale%20Cloud%2F2024%2FReturn%5F2024&ga=1&startedResponseCatch=true' },
  { id: 'registers', label: 'Registers and Records', link: 'https://adventmanagementconsulting-my.sharepoint.com/personal/shahabuddin_adventmcs_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fshahabuddin%5Fadventmcs%5Fcom%2FDocuments%2FCompany%20Data%20Share%20Point%2FWhale%20Cloud%2F2025%2FRegisters&ga=1' }
];

interface UserProfile {
  id: string;
  username: string;
}

export const ConnectButton = () => {
  const [connectOpen, setConnectOpen] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState<string | null>(null);
  const { user } = useAuth();
  const { selectedCompany, companyNames } = useExcelData();

  useEffect(() => {
    if (!connectOpen) return;
    const fetchUsers = async () => {
      setLoading(true);
      // Fetch all profiles (admin can see via has_role check in app)
      const { data, error } = await supabase.from('profiles').select('id, username');
      if (!error && data) {
        // Filter out current admin user
        setUsers(data.filter(u => u.id !== user?.id));
      }
      setLoading(false);
    };
    fetchUsers();
  }, [connectOpen, user?.id]);

  const handleAssign = async (targetUserId: string) => {
    if (!selectedCompany.trim()) {
      toast.error('Please select a company using the Company Filter first');
      return;
    }

    setAssigning(targetUserId);
    try {
      // Assign user to company
      const { error: assignError } = await (supabase as any)
        .from('user_companies')
        .upsert({
          user_id: targetUserId,
          company_name: selectedCompany,
          assigned_by: user?.id,
        }, { onConflict: 'user_id,company_name' });

      if (assignError) throw assignError;

      toast.success(`Company "${selectedCompany}" assigned successfully`);
      setConnectOpen(false);
    } catch (err: any) {
      console.error('Assignment error:', err);
      toast.error(err.message || 'Failed to assign company');
    } finally {
      setAssigning(null);
    }
  };

  return (
    <Dialog open={connectOpen} onOpenChange={setConnectOpen}>
      <DialogTrigger asChild>
        <button className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80">
          Connect +
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-card border-border p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Assign Company to User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Selected Company</Label>
            <div className={`px-3 py-2 rounded-md text-sm ${selectedCompany ? 'bg-primary/10 text-primary font-medium' : 'bg-muted text-muted-foreground italic'}`}>
              {selectedCompany || 'No company selected — use Company Filter first'}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Select User</Label>
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : users.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No other users found</p>
            ) : (
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {users.map(u => (
                  <button
                    key={u.id}
                    onClick={() => handleAssign(u.id)}
                    disabled={!selectedCompany.trim() || assigning === u.id}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      {u.username}
                    </span>
                    {assigning === u.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState('repository');

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.link) {
      window.open(tab.link, '_blank');
    } else {
      setActiveTab(tab.id);
    }
  };

  return (
    <div className="flex flex-wrap gap-1 bg-secondary/50 rounded-lg p-1 w-full sm:w-auto">
      {tabs.map((tab) =>
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab)}
          className={`nav-tab ${activeTab === tab.id && !tab.link ? 'nav-tab-active' : 'nav-tab-inactive'}`}
        >
          {tab.label}
        </button>
      )}
    </div>
  );
};

export default NavigationTabs;
