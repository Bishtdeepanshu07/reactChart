import { useState } from 'react';
import { Check } from 'lucide-react';

const months = [
  { id: 'jan2025', label: 'Jan, 2025' },
  { id: 'feb2025', label: 'Feb, 2025' },
  { id: 'april2025', label: 'April, 2025' },
  { id: 'may2025', label: 'May, 2025' },
  { id: 'jun2025', label: 'Jun, 2025' },
];

const MonthSelector = () => {
  const [selectedMonths, setSelectedMonths] = useState(['jan2025']);
  const [selectAll, setSelectAll] = useState(false);

  const toggleMonth = (monthId: string) => {
    setSelectedMonths((prev) =>
      prev.includes(monthId)
        ? prev.filter((id) => id !== monthId)
        : [...prev, monthId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMonths([]);
    } else {
      setSelectedMonths(months.map((m) => m.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 sm:gap-2 w-full">
      <button
        onClick={handleSelectAll}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded border flex items-center justify-center flex-shrink-0 ${
          selectAll ? 'bg-primary border-primary' : 'border-muted-foreground'
        }`}>
          {selectAll && <Check className="w-2 h-2 sm:w-3 sm:h-3 text-primary-foreground" />}
        </div>
        <span className="hidden sm:inline">Select all</span>
      </button>
      
      {months.map((month) => (
        <button
          key={month.id}
          onClick={() => toggleMonth(month.id)}
          className={`month-pill ${
            selectedMonths.includes(month.id) ? 'month-pill-active' : 'month-pill-inactive'
          }`}
        >
          {month.label}
        </button>
      ))}
    </div>
  );
};

export default MonthSelector;
