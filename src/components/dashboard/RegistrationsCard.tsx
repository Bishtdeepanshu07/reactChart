import { useMemo } from 'react';
import GaugeChart from './GaugeChart';
import { useExcelData } from '@/contexts/ExcelContext';

const RegistrationsCard = () => {
  const { registrationData } = useExcelData();

  const stats = useMemo(() => {
    if (registrationData.length === 0) {
      return { freshRequired: 0, active: 0, pending: 0, total: 0 };
    }

    // Sum values from 2nd sheet registration data
    const freshRequired = registrationData.reduce((sum, row) => sum + row.FreshRequired, 0);
    const active = registrationData.filter(row => row.Status === 'Active').length;
    const pending = registrationData.filter(row => 
      row.RenewalStatus === 'Pending' || row.AmendmentStatus === 'Pending'
    ).length;

    const total = registrationData.length;

    return { freshRequired, active, pending, total };
  }, [registrationData]);

  const maxValue = Math.max(stats.freshRequired, stats.active, stats.pending, stats.total) || 10;

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="text-lg font-semibold">Registrations</h3>
      </div>
      <div className="flex justify-around items-center py-4 sm:py-6 px-1 sm:px-4 overflow-x-auto">
        <GaugeChart
          value={stats.freshRequired}
          maxValue={maxValue}
          label="Fresh Required"
          color="gray"
        />
        <GaugeChart
          value={stats.active}
          maxValue={maxValue}
          label="Active"
          color="cyan"
        />
        <GaugeChart
          value={stats.pending}
          maxValue={maxValue}
          label="Pending"
          color="yellow"
        />
      </div>
    </div>
  );
};

export default RegistrationsCard;
