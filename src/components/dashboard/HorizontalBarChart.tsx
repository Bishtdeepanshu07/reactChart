import { useMemo, useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { useExcelData } from '@/contexts/ExcelContext';
import { FileSpreadsheet } from 'lucide-react';
import DataPopup from './DataPopup';

const COLORS = {
  completed: 'hsl(174 72% 56%)',
  notDue: 'hsl(230 20% 50%)',
  pending: 'hsl(45 93% 58%)',
};

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
];

const PENDING_COLUMNS = [
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
];

type PopupInfo = { actName: string; status: 'completed' | 'notDue' | 'pending' } | null;

const HorizontalBarChart = () => {
  const { data, selectedMonths, selectedActs, selectedActivities, selectedLocations } = useExcelData();
  const [popupInfo, setPopupInfo] = useState<PopupInfo>(null);

  const filteredData = useMemo(() => {
    if (data.length === 0 || selectedMonths.length === 0) return [];
    let filtered = data.filter(row => selectedMonths.includes(row.Month));
    if (selectedActs.length > 0) filtered = filtered.filter(row => selectedActs.includes(row.ActName));
    if (selectedActivities.length > 0) filtered = filtered.filter(row => selectedActivities.includes(row.ActivitiesName));
    if (selectedLocations.length > 0) filtered = filtered.filter(row => selectedLocations.includes(row.Location));
    return filtered;
  }, [data, selectedMonths, selectedActs, selectedActivities, selectedLocations]);

  // Keep a map of truncated name -> full name for popup lookup
  const { chartData, nameMap } = useMemo(() => {
    if (filteredData.length === 0) return { chartData: [], nameMap: {} as Record<string, string> };

    const grouped = filteredData.reduce((acc, row) => {
      const actName = row.ActName || 'Unknown';
      if (!acc[actName]) {
        acc[actName] = { name: actName, completed: 0, notDue: 0, pending: 0 };
      }
      acc[actName].completed += row.Completed || 0;
      acc[actName].notDue += row.NotDue || 0;
      acc[actName].pending += row.Pending || 0;
      return acc;
    }, {} as Record<string, { name: string; completed: number; notDue: number; pending: number }>);

    const sorted = Object.values(grouped)
      .sort((a, b) => (b.completed + b.notDue + b.pending) - (a.completed + a.notDue + a.pending))
      .slice(0, 8);

    const map: Record<string, string> = {};
    const data = sorted.map(item => {
      const displayName = item.name.length > 15 ? item.name.substring(0, 12) + '...' : item.name;
      map[displayName] = item.name;
      return { ...item, name: displayName };
    });

    return { chartData: data, nameMap: map };
  }, [filteredData]);

  const handleBarClick = useCallback((dataKey: 'completed' | 'notDue' | 'pending') => {
    return (entry: any, index: number) => {
      const name = entry?.name || entry?.payload?.name || (chartData[index] && chartData[index].name);
      if (!name) return;
      const fullName = nameMap[name] || name;
      setPopupInfo({ actName: fullName, status: dataKey });
    };
  }, [nameMap, chartData]);

  const popupData = useMemo(() => {
    if (!popupInfo) return [];
    return filteredData.filter(row => {
      if (row.ActName !== popupInfo.actName) return false;
      if (popupInfo.status === 'completed') return (row.Completed || 0) > 0;
      if (popupInfo.status === 'notDue') return (row.NotDue || 0) > 0;
      if (popupInfo.status === 'pending') return (row.Pending || 0) > 0;
      return false;
    });
  }, [filteredData, popupInfo]);

  const popupTitle = popupInfo
    ? `${popupInfo.actName} - ${popupInfo.status === 'completed' ? 'Completed' : popupInfo.status === 'notDue' ? 'Not Due' : 'Pending'}`
    : '';

  if (filteredData.length === 0) {
    return (
      <div className="dashboard-card flex flex-col items-center justify-center min-h-[280px] gap-3">
        <FileSpreadsheet className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground text-center text-sm">
          {data.length === 0 ? 'No data available. Upload an Excel file to see chart.' : 'No data for selected months.'}
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-2 sm:gap-4 mb-4">
        <div className="flex-1 w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height={200} minWidth={300}>
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 5, right: 15, left: 60, bottom: 5 }}
              barCategoryGap="20%"
            >
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(215 20% 65%)', fontSize: 10 }}
                width={60}
              />
              <Bar dataKey="completed" stackId="a" fill={COLORS.completed} radius={[0, 0, 0, 0]} animationDuration={1200} animationEasing="ease-out" animationBegin={0} onClick={handleBarClick('completed')} className="cursor-pointer">
                <LabelList 
                  dataKey="completed" 
                  position="center" 
                  fill="white" 
                  fontSize={11}
                  formatter={(value: number) => value > 0 ? value : ''}
                />
              </Bar>
              <Bar dataKey="notDue" stackId="a" fill={COLORS.notDue} radius={[0, 0, 0, 0]} animationDuration={1200} animationEasing="ease-out" animationBegin={300} onClick={handleBarClick('notDue')} className="cursor-pointer">
                <LabelList 
                  dataKey="notDue" 
                  position="center" 
                  fill="white" 
                  fontSize={9}
                  formatter={(value: number) => value > 0 ? value : ''}
                />
              </Bar>
              <Bar dataKey="pending" stackId="a" fill={COLORS.pending} radius={[0, 4, 4, 0]} animationDuration={1200} animationEasing="ease-out" animationBegin={600} onClick={handleBarClick('pending')} className="cursor-pointer">
                <LabelList 
                  dataKey="pending" 
                  position="center" 
                  fill="white" 
                  fontSize={9}
                  formatter={(value: number) => value > 0 ? value : ''}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-row lg:flex-col gap-2 sm:gap-3 lg:ml-4 text-xs sm:text-sm flex-wrap lg:flex-nowrap w-full lg:w-auto justify-center lg:justify-start">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-dashboard-cyan flex-shrink-0"></span>
            <span className="text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-dashboard-gray flex-shrink-0"></span>
            <span className="text-muted-foreground">Not Due</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-dashboard-yellow flex-shrink-0"></span>
            <span className="text-muted-foreground">Pending</span>
          </div>
        </div>
      </div>
      <DataPopup
        open={popupInfo !== null}
        onOpenChange={(open) => !open && setPopupInfo(null)}
        title={popupTitle}
        columns={popupInfo?.status === 'pending' ? PENDING_COLUMNS : COMPLIANCE_COLUMNS}
        data={popupData}
      />
    </div>
  );
};

export default HorizontalBarChart;
