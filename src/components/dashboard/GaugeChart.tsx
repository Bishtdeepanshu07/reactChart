import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  maxValue: number;
  label: string;
  color: 'cyan' | 'yellow' | 'gray';
  onClick?: () => void;
}

const COLORS = {
  cyan: 'hsl(174 72% 56%)',
  yellow: 'hsl(45 93% 58%)',
  gray: 'hsl(230 20% 45%)',
};

const GaugeChart = ({ value, maxValue, label, color, onClick }: GaugeChartProps) => {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  
  const data = [
    { name: 'filled', value: percentage },
    { name: 'empty', value: 100 - percentage },
  ];

  return (
    <div
      className={`flex flex-col items-center flex-shrink-0 w-24 sm:w-32 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="relative w-20 sm:w-32 h-12 sm:h-20">
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
          <span className="gauge-value text-2xl sm:text-4xl" style={{ color: COLORS[color] }}>
            {value}
          </span>
        </div>
      </div>
      <p className="gauge-label mt-1 sm:mt-2 max-w-[90px] sm:max-w-[120px] text-xs sm:text-sm">{label}</p>
    </div>
  );
};

export default GaugeChart;
