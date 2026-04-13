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
import { useRef, useState, useMemo, useEffect } from 'react';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { useUserCompanyData } from '@/hooks/useUserCompanyData';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Building2, X } from 'lucide-react';
import PreviousDataButton from '@/components/dashboard/PreviousDataButton';

const CompanyFilter = () => {
  const { selectedCompany, setSelectedCompany, companyNames } = useExcelData();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(selectedCompany);

  const filtered = useMemo(() => {
    if (!inputValue.trim()) return companyNames;
    const search = inputValue.toLowerCase().trim();
    return companyNames.filter(name => name.toLowerCase().includes(search));
  }, [companyNames, inputValue]);

  const handleSelect = (name: string) => {
    setSelectedCompany(name);
    setInputValue(name);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCompany('');
    setInputValue('');
  };

  return (
    <Popover open={open} onOpenChange={(o) => { setOpen(o); if (o) setInputValue(selectedCompany); }}>
      <PopoverTrigger asChild>
        <button className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${selectedCompany ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
          <Building2 className="h-3.5 w-3.5" />
          {selectedCompany || 'Filter Company'}
          {selectedCompany && (
            <X className="h-3 w-3 ml-1 cursor-pointer" onClick={handleClear} />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <div className="p-2 border-b border-border">
          <Input
            placeholder="Type company name..."
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); setSelectedCompany(e.target.value); }}
            autoFocus
            className="h-8 text-sm"
          />
        </div>
        {filtered.length > 0 && (
          <div className="max-h-48 overflow-y-auto p-1">
            {filtered.map((name) => (
              <button
                key={name}
                onClick={() => handleSelect(name)}
                className="w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors truncate"
              >
                {name}
              </button>
            ))}
          </div>
        )}
        {filtered.length === 0 && inputValue.trim() && (
          <div className="p-3 text-sm text-muted-foreground text-center">No companies found</div>
        )}
      </PopoverContent>
    </Popover>
  );
};

const DashboardContent = () => {
  const { data, registrationData, isLoading, setData, setRegistrationData } = useExcelData();
  const { isAdmin } = useIsAdmin();
  const { complianceData: userData, registrationData: userRegData, loading: userLoading, assignedCompany } = useUserCompanyData();

  // For non-admin users, auto-load their assigned company data
  useEffect(() => {
    if (!isAdmin && !userLoading && userData.length > 0) {
      setData(userData);
      setRegistrationData(userRegData);
    }
  }, [isAdmin, userLoading, userData, userRegData, setData, setRegistrationData]);

  const hasData = data.length > 0 || registrationData.length > 0;
  const loadCount = useRef(0);
  if (hasData) loadCount.current += 1;
  const triggerKey = `${hasData}-${data.length}-${registrationData.length}`;
  const showLoading = isLoading || (!isAdmin && userLoading);

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4 md:p-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <NavigationTabs />
          {isAdmin && <ConnectButton />}
          {isAdmin && <CompanyFilter />}
          {isAdmin && <PreviousDataButton />}
          {!isAdmin && assignedCompany && (
            <span className="px-3 py-1.5 rounded-md text-sm font-medium bg-primary/10 text-primary flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              {assignedCompany}
            </span>
          )}
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          {isAdmin && <ExcelUploader />}
          <MonthSelector />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
        {showLoading ? (
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
        {showLoading ? (
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
