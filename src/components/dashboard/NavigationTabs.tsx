import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';

interface NavTab {
  id: string;
  label: string;
  link?: string;
}

const staticTabs: NavTab[] = [
  { id: 'repository', label: 'Repository' },
];

export const ConnectButton = () => {
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <Dialog open={connectOpen} onOpenChange={setConnectOpen}>
      <DialogTrigger asChild>
        <button className="px-3 py-1.5 rounded-md bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors">
          Connect +
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[340px] bg-muted border-none p-6">
        <DialogHeader>
          <DialogTitle className="sr-only">Connect</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="connect-id" className="text-sm font-semibold text-foreground">ID</Label>
            <Input id="connect-id" placeholder="Enter your ID" className="bg-background" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="connect-password" className="text-sm font-semibold text-foreground">PASSWORD</Label>
            <Input id="connect-password" type="password" placeholder="Enter your password" className="bg-background" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState('repository');
  const [tabs, setTabs] = useState<NavTab[]>(staticTabs);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-nav-links');
        if (error || !data?.links) return;

        const dynamicTabs: NavTab[] = Object.entries(data.links).map(([id, val]: [string, any]) => ({
          id,
          label: val.label,
          link: val.link,
        }));

        setTabs([...staticTabs, ...dynamicTabs]);
      } catch {
        // Fallback to static tabs only
      }
    };

    fetchLinks();
  }, []);

  const handleTabClick = (tab: NavTab) => {
    if (tab.link) {
      window.open(tab.link, '_blank');
    } else {
      setActiveTab(tab.id);
    }
  };

  return (
    <div className="flex flex-wrap gap-1 bg-secondary/50 rounded-lg p-1 w-full sm:w-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab)}
          className={`nav-tab ${
            activeTab === tab.id && !tab.link ? 'nav-tab-active' : 'nav-tab-inactive'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
