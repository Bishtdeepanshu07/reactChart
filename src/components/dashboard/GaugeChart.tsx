import { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeChartProps {
  value: number;
  maxValue: number;
  label: string;
  color: 'cyan' | 'yellow' | 'gray';
  onClick?: () => void;
  percentage?: number;
}

const COLORS = {
  cyan: 'hsl(174 72% 56%)',
  yellow: 'hsl(45 93% 58%)',
  gray: 'hsl(230 20% 45%)',
};

const GaugeChart = ({ value, maxValue, label, color, onClick, percentage }: GaugeChartProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const targetPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
    const startPercentage = animatedPercentage;
    const startValue = displayValue;
    const duration = 1000;
    const startTime = performance.now();

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedPercentage(startPercentage + (targetPercentage - startPercentage) * eased);
      setDisplayValue(Math.round(startValue + (value - startValue) * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // Only re-run when value/maxValue changes, not on animated state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, maxValue]);

  const data = [
    { name: 'filled', value: animatedPercentage },
    { name: 'empty', value: 100 - animatedPercentage },
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
              isAnimationActive={false}
            >
              <Cell fill={COLORS[color]} />
              <Cell fill="hsl(230 25% 28%)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className="gauge-value text-2xl sm:text-4xl transition-colors duration-500" style={{ color: COLORS[color] }}>
            {displayValue}
          </span>
        </div>
      </div>
      <p className="gauge-label mt-1 sm:mt-2 max-w-[90px] sm:max-w-[120px] text-xs sm:text-sm">{label}</p>
      {percentage !== undefined && (
        <p className="text-[10px] sm:text-xs text-muted-foreground font-medium" style={{ color: COLORS[color] }}>
          {percentage.toFixed(1)}%
        </p>
      )}
    </div>
  );
};

export default GaugeChart;
