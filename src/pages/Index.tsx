import NavigationTabs, { ConnectButton } from '@/components/dashboard/NavigationTabs';
import MonthSelector from '@/components/dashboard/MonthSelector';
import RegistrationsCard from '@/components/dashboard/RegistrationsCard';
import ComplianceCard from '@/components/dashboard/ComplianceCard';
import ComplianceTable from '@/components/dashboard/ComplianceTable';
import FilterSection from '@/components/dashboard/FilterSection';
import HorizontalBarChart from '@/components/dashboard/HorizontalBarChart';
import ExcelUploader from '@/components/dashboard/ExcelUploader';
import ThemeToggle from '@/components/dashboard/ThemeToggle';
import AnimatedCard from '@/components/dashboard/AnimatedCard';
import { CardSkeleton, TableSkeleton, FilterSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { ExcelProvider, useExcelData } from '@/contexts/ExcelContext';
import { useRef } from 'react';
import { useIsAdmin } from '@/hooks/useIsAdmin';

const DashboardContent = () => {
  const { data, registrationData, isLoading } = useExcelData();
  const { isAdmin } = useIsAdmin();
  const hasData = data.length > 0 || registrationData.length > 0;
  const loadCount = useRef(0);
  if (hasData) loadCount.current += 1;
  const triggerKey = `${hasData}-${data.length}-${registrationData.length}`;

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4 md:p-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <NavigationTabs />
          <ConnectButton />
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <ExcelUploader />
          <MonthSelector />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <AnimatedCard delay={100} triggerKey={triggerKey}>
              <RegistrationsCard />
            </AnimatedCard>
            <AnimatedCard delay={250} triggerKey={triggerKey}>
              <ComplianceCard />
            </AnimatedCard>
          </>
        )}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
        {isLoading ? (
          <>
            <TableSkeleton />
            <FilterSkeleton />
          </>
        ) : (
          <>
            <AnimatedCard delay={400} triggerKey={triggerKey}>
              <ComplianceTable />
            </AnimatedCard>
            <AnimatedCard delay={550} triggerKey={triggerKey}>
              <div className="space-y-2 sm:space-y-4">
                <div className="dashboard-card">
                  <FilterSection />
                </div>
                <HorizontalBarChart />
              </div>
            </AnimatedCard>
          </>
        )}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <ExcelProvider>
      <DashboardContent />
    </ExcelProvider>
  );
};

export default Index;
