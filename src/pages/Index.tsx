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
import { useRef, useState } from 'react';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Building2, X } from 'lucide-react';

const CompanyFilter = () => {
  const { selectedCompany, setSelectedCompany } = useExcelData();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${selectedCompany ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
          <Building2 className="h-3.5 w-3.5" />
          {selectedCompany || 'Filter Company'}
          {selectedCompany && (
            <X className="h-3 w-3 ml-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedCompany(''); }} />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <Input
          placeholder="Type company name..."
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
};

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
          {isAdmin && <ConnectButton />}
          <CompanyFilter />
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          {isAdmin && <ExcelUploader />}
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
