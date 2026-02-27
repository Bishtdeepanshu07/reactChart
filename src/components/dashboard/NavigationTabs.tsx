import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const tabs = [
  { id: 'repository', label: 'Repository' },
  { id: 'regns', label: 'REGNs/Licenses Details', link: 'https://adventmanagementconsulting-my.sharepoint.com/personal/shahabuddin_adventmcs_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fshahabuddin%5Fadventmcs%5Fcom%2FDocuments%2FCompany%20Data%20Share%20Point%2FWhale%20Cloud%2FS%26CE&ga=1' },
  { id: 'returns', label: 'Returns', link: 'https://adventmanagementconsulting-my.sharepoint.com/personal/shahabuddin_adventmcs_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fshahabuddin%5Fadventmcs%5Fcom%2FDocuments%2FCompany%20Data%20Share%20Point%2FWhale%20Cloud%2F2024%2FReturn%5F2024&ga=1&startedResponseCatch=true' },
  { id: 'registers', label: 'Registers and Records', link: 'https://adventmanagementconsulting-my.sharepoint.com/personal/shahabuddin_adventmcs_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fshahabuddin%5Fadventmcs%5Fcom%2FDocuments%2FCompany%20Data%20Share%20Point%2FWhale%20Cloud%2F2025%2FRegisters&ga=1' },
];

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState('repository');
  const [connectOpen, setConnectOpen] = useState(false);

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.link) {
      window.open(tab.link, '_blank');
    } else {
      setActiveTab(tab.id);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 bg-secondary/50 rounded-lg p-1 w-full sm:w-auto">
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

      <Dialog open={connectOpen} onOpenChange={setConnectOpen}>
        <DialogTrigger asChild>
          <button className="ml-1 px-3 py-1.5 rounded-md bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
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
    </div>
  );
};

export default NavigationTabs;
