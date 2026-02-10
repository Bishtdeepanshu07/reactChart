import NavigationTabs from '@/components/dashboard/NavigationTabs';
import MonthSelector from '@/components/dashboard/MonthSelector';
import RegistrationsCard from '@/components/dashboard/RegistrationsCard';
import ComplianceCard from '@/components/dashboard/ComplianceCard';
import ComplianceTable from '@/components/dashboard/ComplianceTable';
import FilterSection from '@/components/dashboard/FilterSection';
import HorizontalBarChart from '@/components/dashboard/HorizontalBarChart';
import ExcelUploader from '@/components/dashboard/ExcelUploader';
import ThemeToggle from '@/components/dashboard/ThemeToggle';
import { ExcelProvider } from '@/contexts/ExcelContext';

const Index = () => {
  return (
    <ExcelProvider>
      <div className="min-h-screen bg-background p-2 sm:p-4 md:p-6">
        {/* Header */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
          <NavigationTabs />
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
            <ExcelUploader />
            <MonthSelector />
            <ThemeToggle />
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <RegistrationsCard />
          <ComplianceCard />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
          <ComplianceTable />
          <div className="space-y-2 sm:space-y-4">
            <div className="dashboard-card">
              <FilterSection />
            </div>
            <HorizontalBarChart />
          </div>
        </div>
      </div>
    </ExcelProvider>
  );
};

export default Index;
