import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from 'recharts';

const data = [
  { name: 'Payroll', completed: 19, notDue: 0, pending: 0 },
  { name: 'Bonus Act', completed: 0, notDue: 2, pending: 0 },
  { name: 'National Festiv...', completed: 0, notDue: 2, pending: 0 },
  { name: 'POSH', completed: 0, notDue: 2, pending: 0 },
  { name: 'Professional tax', completed: 2, notDue: 0, pending: 0 },
  { name: 'S&CE', completed: 0, notDue: 1, pending: 1 },
  { name: 'Employment Ex...', completed: 0, notDue: 1, pending: 0 },
  { name: 'Labour Welfare...', completed: 0, notDue: 1, pending: 0 },
];

const COLORS = {
  completed: 'hsl(174 72% 56%)',
  notDue: 'hsl(230 20% 50%)',
  pending: 'hsl(45 93% 58%)',
};

const HorizontalBarChart = () => {
  return (
    <div className="dashboard-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              layout="vertical"
              data={data}
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
