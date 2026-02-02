import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { useExcelData } from '@/contexts/ExcelContext';
import { FileSpreadsheet } from 'lucide-react';

const COLORS = {
  completed: 'hsl(174 72% 56%)',
  notDue: 'hsl(230 20% 50%)',
  pending: 'hsl(45 93% 58%)',
};

const HorizontalBarChart = () => {
  const { data } = useExcelData();

  const chartData = useMemo(() => {
    if (data.length === 0) return [];

    // Group by Act Name and aggregate counts
    const grouped = data.reduce((acc, row) => {
      const actName = row.ActName || 'Unknown';
      if (!acc[actName]) {
        acc[actName] = { name: actName, completed: 0, notDue: 0, pending: 0 };
      }
      acc[actName].completed += row.Completed || 0;
      acc[actName].notDue += row.NotDue || 0;
      acc[actName].pending += row.Pending || 0;
      return acc;
    }, {} as Record<string, { name: string; completed: number; notDue: number; pending: number }>);

    // Convert to array and sort by total count
    return Object.values(grouped)
      .sort((a, b) => (b.completed + b.notDue + b.pending) - (a.completed + a.notDue + a.pending))
      .slice(0, 8) // Show top 8 acts
      .map(item => ({
        ...item,
        name: item.name.length > 15 ? item.name.substring(0, 12) + '...' : item.name,
      }));
  }, [data]);

  if (data.length === 0) {
    return (
      <div className="dashboard-card flex flex-col items-center justify-center min-h-[280px] gap-3">
        <FileSpreadsheet className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground text-center text-sm">
          No data available. Upload an Excel file to see chart.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              barCategoryGap="20%"
            >
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(215 20% 65%)', fontSize: 12 }}
                width={80}
              />
              <Bar dataKey="completed" stackId="a" fill={COLORS.completed} radius={[0, 0, 0, 0]}>
                <LabelList 
                  dataKey="completed" 
                  position="center" 
                  fill="white" 
                  fontSize={11}
                  formatter={(value: number) => value > 0 ? value : ''}
                />
              </Bar>
              <Bar dataKey="notDue" stackId="a" fill={COLORS.notDue} radius={[0, 0, 0, 0]}>
                <LabelList 
                  dataKey="notDue" 
                  position="center" 
                  fill="white" 
                  fontSize={11}
                  formatter={(value: number) => value > 0 ? value : ''}
                />
              </Bar>
              <Bar dataKey="pending" stackId="a" fill={COLORS.pending} radius={[0, 4, 4, 0]}>
                <LabelList 
                  dataKey="pending" 
                  position="center" 
                  fill="white" 
                  fontSize={11}
                  formatter={(value: number) => value > 0 ? value : ''}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-col gap-2 ml-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-dashboard-cyan"></span>
            <span className="text-muted-foreground">Completed Within TAT</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-dashboard-gray"></span>
            <span className="text-muted-foreground">Not Due</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-dashboard-yellow"></span>
            <span className="text-muted-foreground">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalBarChart;
