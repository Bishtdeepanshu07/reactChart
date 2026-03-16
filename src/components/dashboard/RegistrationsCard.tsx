import { useMemo, useState } from 'react';
import GaugeChart from './GaugeChart';
import DataPopup from './DataPopup';
import { useExcelData } from '@/contexts/ExcelContext';

const REGISTRATION_POPUP_COLUMNS = [
  { key: 'State', label: 'State' },
  { key: 'City', label: 'City' },
  { key: 'Address', label: 'Address' },
  { key: 'EmployerName', label: 'Employer Name' },
  { key: 'Type', label: 'Type' },
  { key: 'RCNo', label: 'RC No.' },
  { key: 'DateOfObtained', label: 'Date of Obtained' },
  { key: 'Validity', label: 'Validity' },
];

type PopupType = 'freshRequired' | 'active' | 'pending' | null;

const RegistrationsCard = () => {
  const { registrationData } = useExcelData();
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  const stats = useMemo(() => {
    if (registrationData.length === 0) {
      return { freshRequired: 0, active: 0, pending: 0, total: 0 };
    }
    const freshRequired = registrationData.reduce((sum, row) => sum + row.FreshRequired, 0);
    const active = registrationData.filter(row => row.Status === 'Active').length;
    const pending = registrationData.filter(row =>
      row.RenewalStatus === 'Pending' || row.AmendmentStatus === 'Pending'
    ).length;
    const total = registrationData.length;
    return { freshRequired, active, pending, total };
  }, [registrationData]);

  const popupData = useMemo(() => {
    if (!activePopup) return [];
    return registrationData.filter(row => {
      if (activePopup === 'freshRequired') return row.FreshRequired > 0;
      if (activePopup === 'active') return row.Status === 'Active';
      if (activePopup === 'pending') return row.RenewalStatus === 'Pending' || row.AmendmentStatus === 'Pending';
      return false;
    });
  }, [registrationData, activePopup]);

  const popupTitle = activePopup === 'freshRequired' ? 'Fresh Required' : activePopup === 'active' ? 'Active' : 'Pending';
  const maxValue = Math.max(stats.freshRequired, stats.active, stats.pending, stats.total) || 10;

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="text-lg font-semibold">Registrations</h3>
      </div>
      <div className="flex justify-around items-center py-4 sm:py-6 px-1 sm:px-4 overflow-x-auto">
        <GaugeChart value={stats.freshRequired} maxValue={maxValue} label="Fresh Required" color="gray" onClick={() => setActivePopup('freshRequired')} />
        <GaugeChart value={stats.active} maxValue={maxValue} label="Active" color="cyan" onClick={() => setActivePopup('active')} />
        <GaugeChart value={stats.pending} maxValue={maxValue} label="Pending" color="yellow" onClick={() => setActivePopup('pending')} />
      </div>
      <DataPopup
        open={activePopup !== null}
        onOpenChange={(open) => !open && setActivePopup(null)}
        title={`Registrations - ${popupTitle}`}
        columns={REGISTRATION_POPUP_COLUMNS}
        data={popupData}
      />
    </div>
  );
};

export default RegistrationsCard;
