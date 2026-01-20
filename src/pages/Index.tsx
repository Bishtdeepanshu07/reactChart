import NavigationTabs from '@/components/dashboard/NavigationTabs';
import MonthSelector from '@/components/dashboard/MonthSelector';
import RegistrationsCard from '@/components/dashboard/RegistrationsCard';
import ComplianceCard from '@/components/dashboard/ComplianceCard';
import ComplianceTable from '@/components/dashboard/ComplianceTable';
import FilterSection from '@/components/dashboard/FilterSection';
import HorizontalBarChart from '@/components/dashboard/HorizontalBarChart';

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <NavigationTabs />
        <MonthSelector />
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <RegistrationsCard />
        <ComplianceCard />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ComplianceTable />
        <div className="space-y-4">
          <div className="dashboard-card">
            <FilterSection />
          </div>
          <HorizontalBarChart />
        </div>
      </div>
    </div>
  );
};

export default Index;
