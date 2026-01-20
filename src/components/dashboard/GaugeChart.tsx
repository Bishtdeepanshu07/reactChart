import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  maxValue: number;
  label: string;
  color: 'cyan' | 'yellow' | 'gray';
}

const COLORS = {
  cyan: 'hsl(174 72% 56%)',
  yellow: 'hsl(45 93% 58%)',
  gray: 'hsl(230 20% 45%)',
};

const GaugeChart = ({ value, maxValue, label, color }: GaugeChartProps) => {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  const fillAngle = (percentage / 100) * 180;
  
  const data = [
    { name: 'filled', value: percentage },
    { name: 'empty', value: 100 - percentage },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-20">
        <ResponsiveContainer width="100%" height={80}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={45}
              outerRadius={60}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={COLORS[color]} />
              <Cell fill="hsl(230 25% 28%)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className="gauge-value" style={{ color: COLORS[color] }}>
            {value}
          </span>
        </div>
      </div>
      <p className="gauge-label mt-2 max-w-[120px]">{label}</p>
    </div>
  );
};

export default GaugeChart;
