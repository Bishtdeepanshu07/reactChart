import { useMemo } from 'react';
import GaugeChart from './GaugeChart';
import { useExcelData } from '@/contexts/ExcelContext';

const RegistrationsCard = () => {
  const { data } = useExcelData();

  const stats = useMemo(() => {
    if (data.length === 0) {
      return { required: 0, active: 0, pending: 0, total: 0 };
    }

    // Count registrations based on CertificateStatus
    const required = data.filter(row => 
      row.CertificateStatus === 'Required' || row.CertificateStatus === 'Expired'
    ).length;
    
    const active = data.filter(row => 
      row.CertificateStatus === 'Active' || row.CertificateStatus === 'Valid'
    ).length;
    
    const pending = data.filter(row => 
      row.CertificateStatus === 'Pending' || row.CertificateStatus === 'In Progress'
    ).length;

    const total = required + active + pending || data.length;

    return { required, active, pending, total };
  }, [data]);

  const maxValue = stats.total || 10;

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="text-lg font-semibold">Registrations</h3>
      </div>
      <div className="flex justify-around items-center py-4 sm:py-6 px-1 sm:px-4 overflow-x-auto">
        <GaugeChart
          value={stats.required}
          maxValue={maxValue}
          label="Required REGNs/Licenses"
          color="gray"
        />
        <GaugeChart
          value={stats.active}
          maxValue={maxValue}
          label="Active REGNs/Licenses"
          color="cyan"
        />
        <GaugeChart
          value={stats.pending}
          maxValue={maxValue}
          label="Pending REGNs/Licenses"
          color="yellow"
        />
      </div>
    </div>
  );
};

export default RegistrationsCard;
