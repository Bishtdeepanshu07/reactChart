import { useState } from 'react';
import { Check } from 'lucide-react';

const months = [
  { id: 'apr2025', label: 'Apr, 2025' },
  { id: 'may2025', label: 'May, 2025' },
  { id: 'jun2025', label: 'Jun, 2025' },
  { id: 'jul2025', label: 'Jul, 2025' },
  { id: 'aug2025', label: 'Aug, 2025' },
];

const MonthSelector = () => {
  const [selectedMonths, setSelectedMonths] = useState(['apr2025']);
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
    <div className="flex items-center gap-2">
      <button
        onClick={handleSelectAll}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
          selectAll ? 'bg-primary border-primary' : 'border-muted-foreground'
        }`}>
          {selectAll && <Check className="w-3 h-3 text-primary-foreground" />}
        </div>
        Select all
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
