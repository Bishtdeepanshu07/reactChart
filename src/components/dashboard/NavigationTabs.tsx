import { useState } from 'react';

const tabs = [
  { id: 'repository', label: 'Repository' },
  { id: 'regns', label: 'REGNs/Licenses Details', link: 'https://adventmanagementconsulting-my.sharepoint.com/personal/shahabuddin_adventmcs_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fshahabuddin%5Fadventmcs%5Fcom%2FDocuments%2FCompany%20Data%20Share%20Point%2FWhale%20Cloud%2FS%26CE&ga=1' },
  { id: 'returns', label: 'Returns', link: 'https://adventmanagementconsulting-my.sharepoint.com/personal/shahabuddin_adventmcs_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fshahabuddin%5Fadventmcs%5Fcom%2FDocuments%2FCompany%20Data%20Share%20Point%2FWhale%20Cloud%2F2024%2FReturn%5F2024&ga=1&startedResponseCatch=true' },
  { id: 'registers', label: 'Registers and Records', link: 'https://adventmanagementconsulting-my.sharepoint.com/personal/shahabuddin_adventmcs_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fshahabuddin%5Fadventmcs%5Fcom%2FDocuments%2FCompany%20Data%20Share%20Point%2FWhale%20Cloud%2F2025%2FRegisters&ga=1' },
];

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
