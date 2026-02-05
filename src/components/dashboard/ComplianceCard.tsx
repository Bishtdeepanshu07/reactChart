import { useMemo } from 'react';
import GaugeChart from './GaugeChart';
import { useExcelData } from '@/contexts/ExcelContext';

const ComplianceCard = () => {
  const { data, selectedMonths } = useExcelData();

  const filteredData = useMemo(() => {
    if (selectedMonths.length === 0) return data;
    return data.filter(row => selectedMonths.includes(row.Month));
  }, [data, selectedMonths]);

  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return { notDue: 0, pending: 0, completed: 0, total: 0 };
    }

    const notDue = filteredData.reduce((sum, row) => sum + (row.NotDue || 0), 0);
    const pending = filteredData.reduce((sum, row) => sum + (row.Pending || 0), 0);
    const completed = filteredData.reduce((sum, row) => sum + (row.Completed || 0), 0);
    const total = notDue + pending + completed;

    return { notDue, pending, completed, total };
  }, [filteredData]);

  const maxValue = stats.total || 30;

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="text-lg font-semibold">Overall Compliance</h3>
      </div>
      <div className="flex justify-around items-center py-4 sm:py-6 px-1 sm:px-4 overflow-x-auto">
        <GaugeChart
          value={stats.notDue}
          maxValue={maxValue}
          label="Not Due"
          color="gray"
        />
        <GaugeChart
          value={stats.pending}
          maxValue={maxValue}
          label="Pending"
          color="yellow"
        />
        <GaugeChart
          value={stats.completed}
          maxValue={maxValue}
          label="Completed"
          color="cyan"
        />
      </div>
    </div>
  );
};

export default ComplianceCard;
