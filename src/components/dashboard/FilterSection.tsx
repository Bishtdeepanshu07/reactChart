import { RotateCcw, ChevronDown } from 'lucide-react';
import { useMemo } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useExcelData } from '@/contexts/ExcelContext';

const FilterSection = () => {
  const { data, selectedMonths, selectedActs, setSelectedActs, selectedActivities, setSelectedActivities, selectedLocations, setSelectedLocations } = useExcelData();
  const [openActs, setOpenActs] = useState(false);
  const [openActivities, setOpenActivities] = useState(false);
  const [openLocations, setOpenLocations] = useState(false);

  const monthFiltered = useMemo(() => {
    if (selectedMonths.length === 0) return data;
    return data.filter(row => selectedMonths.includes(row.Month));
  }, [data, selectedMonths]);

  const actOptions = useMemo(() => [...new Set(monthFiltered.map(r => r.ActName).filter(Boolean))].sort(), [monthFiltered]);
  const activityOptions = useMemo(() => [...new Set(monthFiltered.map(r => r.ActivitiesName).filter(Boolean))].sort(), [monthFiltered]);
  const locationOptions = useMemo(() => [...new Set(monthFiltered.map(r => r.Location).filter(Boolean))].sort(), [monthFiltered]);

  const handleToggle = (value: string, selected: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const handleReset = () => {
    setSelectedActs([]);
    setSelectedActivities([]);
    setSelectedLocations([]);
  };

  const CustomDropdown = ({ label, options, selected, onChange, open, setOpen }: {
    label: string; options: string[]; selected: string[];
    onChange: (val: string) => void; open: boolean; setOpen: (v: boolean) => void;
  }) => {
    const allSelected = options.length > 0 && selected.length === options.length;

    const handleSelectAll = () => {
      if (allSelected) {
        options.forEach(o => { if (selected.includes(o)) onChange(o); });
      } else {
        options.forEach(o => { if (!selected.includes(o)) onChange(o); });
      }
    };

    const selectAllLabel = allSelected ? 'Unselect All' : 'Select All';

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>{selected.length === 0 ? label : selected.length === 1 ? selected[0] : `${selected.length} selected`}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0 z-50 bg-popover">
          <div className="space-y-2 p-4 max-h-60 overflow-y-auto">
            <div className="flex items-center space-x-2 pb-2 border-b">
              <Checkbox id={`${label}-select-all`} checked={allSelected} onCheckedChange={handleSelectAll} />
              <label
                htmlFor={`${label}-select-all`}
                className="text-sm cursor-pointer font-medium inline-block transition-all duration-300 ease-in-out"
                key={selectAllLabel}
                style={{ animation: 'fadeSlide 0.3s ease-in-out' }}
              >
                {selectAllLabel}
              </label>
            </div>
            {options.map(option => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox id={`${label}-${option}`} checked={selected.includes(option)} onCheckedChange={() => onChange(option)} />
                <label htmlFor={`${label}-${option}`} className="text-sm cursor-pointer">{option}</label>
              </div>
            ))}
            {options.length === 0 && <p className="text-xs text-muted-foreground">No options available</p>}
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-sm text-muted-foreground mb-2 block">Select Act</label>
          <CustomDropdown label="Select Act" options={actOptions} selected={selectedActs} onChange={(v) => handleToggle(v, selectedActs, setSelectedActs)} open={openActs} setOpen={setOpenActs} />
        </div>
        <button onClick={handleReset} className="p-2 text-muted-foreground hover:text-foreground transition-colors mt-6">
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Select Activity</label>
          <CustomDropdown label="Select Activity" options={activityOptions} selected={selectedActivities} onChange={(v) => handleToggle(v, selectedActivities, setSelectedActivities)} open={openActivities} setOpen={setOpenActivities} />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Select Location</label>
          <CustomDropdown label="Select Location" options={locationOptions} selected={selectedLocations} onChange={(v) => handleToggle(v, selectedLocations, setSelectedLocations)} open={openLocations} setOpen={setOpenLocations} />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
