import { useState, useEffect, useMemo } from 'react';
import { Check } from 'lucide-react';
import { useExcelData } from '@/contexts/ExcelContext';

const MonthSelector = () => {
  const { data, selectedMonths, setSelectedMonths } = useExcelData();

  // Extract unique months from the data
  const months = useMemo(() => {
    const uniqueMonths = [...new Set(data.map(row => row.Month).filter(Boolean))];
    return uniqueMonths.map(month => ({
      id: month,
      label: month,
    }));
  }, [data]);

  // Derive selectAll state from actual selection
  const selectAll = months.length > 0 && selectedMonths.length === months.length;

  // Auto-select all months when data is loaded
  useEffect(() => {
    if (months.length > 0 && selectedMonths.length === 0) {
      setSelectedMonths(months.map(m => m.id));
    }
  }, [months, selectedMonths.length, setSelectedMonths]);

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
  };

  if (months.length === 0) {
    return (
      <div className="flex items-center text-muted-foreground text-sm">
        No months available
      </div>
    );
  }

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
