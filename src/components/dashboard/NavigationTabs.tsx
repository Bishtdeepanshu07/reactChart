import { useState } from 'react';

const tabs = [
  { id: 'repository', label: 'Repository' },
  { id: 'regns', label: 'REGNs/Licenses Details' },
  { id: 'returns', label: 'Returns' },
  { id: 'registers', label: 'Registers and Records' },
];

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState('repository');

  return (
    <div className="flex gap-1 bg-secondary/50 rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`nav-tab ${
            activeTab === tab.id ? 'nav-tab-active' : 'nav-tab-inactive'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
