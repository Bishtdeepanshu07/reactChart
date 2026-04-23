import { useMemo, useState } from 'react';
import GaugeChart from './GaugeChart';
import DataPopup from './DataPopup';
import { useExcelData } from '@/contexts/ExcelContext';

const COMPLIANCE_COLUMNS = [
  { key: 'ActName', label: 'Act Name' },
  { key: 'ActivitiesName', label: 'Activity' },
  { key: 'Month', label: 'Month' },
  { key: 'Location', label: 'Location' },
  { key: 'State', label: 'State' },
  { key: 'TaskCycle', label: 'Task Cycle' },
  { key: 'DueDate', label: 'Due Date' },
  { key: 'ComplianceStatus', label: 'Status' },
  { key: 'CompanyName', label: 'Company' },
  { key: 'ComplianceScore', label: 'Compliance Score' },
];

const PENDING_COMPLIANCE_COLUMNS = [
  { key: 'ActName', label: 'Act Name' },
  { key: 'ActivitiesName', label: 'Activity' },
  { key: 'Month', label: 'Month' },
  { key: 'Location', label: 'Location' },
  { key: 'State', label: 'State' },
  { key: 'TaskCycle', label: 'Task Cycle' },
  { key: 'DueDate', label: 'Due Date' },
  { key: 'ComplianceStatus', label: 'Status' },
  { key: 'Comment', label: 'Reason' },
  { key: 'CompanyName', label: 'Company' },
  { key: 'ComplianceScore', label: 'Compliance Score' },
];

type PopupType = 'notDue' | 'pending' | 'completed' | null;

const ComplianceCard = () => {
  const { data, selectedMonths } = useExcelData();
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  const filteredData = useMemo(() => {
    if (data.length === 0) return [];
    if (selectedMonths.length === 0) return [];
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

  const popupData = useMemo(() => {
    if (!activePopup) return [];
    return filteredData.filter(row => {
      if (activePopup === 'notDue') return (row.NotDue || 0) > 0;
      if (activePopup === 'pending') return (row.Pending || 0) > 0;
      if (activePopup === 'completed') return (row.Completed || 0) > 0;
      return false;
    });
  }, [filteredData, activePopup]);

  const popupTitle = activePopup === 'notDue' ? 'Not Due' : activePopup === 'pending' ? 'Pending' : 'Completed';
  const maxValue = stats.total || 30;

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="text-lg font-semibold">Overall Compliance</h3>
      </div>
      <div className="flex justify-around items-center py-4 sm:py-6 px-1 sm:px-4 overflow-x-auto">
        <GaugeChart value={stats.notDue} maxValue={maxValue} label="Not Due" color="gray" onClick={() => setActivePopup('notDue')} percentage={stats.total > 0 ? (stats.notDue / stats.total) * 100 : 0} />
        <GaugeChart value={stats.pending} maxValue={maxValue} label="Pending" color="yellow" onClick={() => setActivePopup('pending')} percentage={stats.total > 0 ? (stats.pending / stats.total) * 100 : 0} />
        <GaugeChart value={stats.completed} maxValue={maxValue} label="Completed" color="cyan" onClick={() => setActivePopup('completed')} percentage={stats.total > 0 ? (stats.completed / stats.total) * 100 : 0} />
      </div>
      <div className="text-center pb-3 sm:pb-4">
        <span className="text-sm font-medium text-muted-foreground">Total Compliances: </span>
        <span className="text-sm font-bold text-foreground">{stats.total}</span>
      </div>
      <DataPopup
        open={activePopup !== null}
        onOpenChange={(open) => !open && setActivePopup(null)}
        title={`Compliance - ${popupTitle}`}
        columns={activePopup === 'pending' ? PENDING_COMPLIANCE_COLUMNS : COMPLIANCE_COLUMNS}
        data={popupData}
      />
    </div>
  );
};

export default ComplianceCard;
