import { RotateCcw, Info, List, ExternalLink, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';

const FilterSection = () => {
  const [selectedActs, setSelectedActs] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [openActs, setOpenActs] = useState(false);
  const [openActivities, setOpenActivities] = useState(false);
  const [openLocations, setOpenLocations] = useState(false);  

  const actOptions = ['Bonus Act', 'Employement Exchange', 'Labour Welfare Fund', 'National Festival & Holiday', 'Payroll'];
  const activityOptions = ['Annual Return', 'Bonus Calculation', 'Bonus Return', 'Compliance Register', 'Eligibility Register'];
  const locationOptions = ['Gurugram', 'Hyderabad', 'Bangalore'];

  const handleActChange = (act: string) => {
    setSelectedActs(prev => prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]);
  };

  const handleActivityChange = (activity: string) => {
    setSelectedActivities(prev => prev.includes(activity) ? prev.filter(a => a !== activity) : [...prev, activity]);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocations(prev => prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]);
  };

  const handleReset = () => {
    setSelectedActs([]);
    setSelectedActivities([]);
    setSelectedLocations([]);
  };

  const CustomDropdown = ({ label, options, selected, onChange, open, setOpen }: any) => {
    const allSelected = options.length > 0 && selected.length === options.length;
    const someSelected = selected.length > 0 && selected.length < options.length;

    const handleSelectAll = () => {
      if (allSelected) {
        // Deselect all
        options.forEach(option => {
          if (selected.includes(option)) {
            onChange(option);
          }
        });
      } else {
        // Select all
        options.forEach(option => {
          if (!selected.includes(option)) {
            onChange(option);
          }
        });
      }
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>
              {selected.length === 0 
                ? label 
                : selected.length === 1 
                ? selected[0] 
                : `${selected.length} selected`}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0">
          <div className="space-y-2 p-4">
            <div className="flex items-center space-x-2 pb-2 border-b">
              <Checkbox 
                id={`${label}-select-all`}
                checked={allSelected}
                ref={(el: any) => {
                  if (el && someSelected) {
                    el.indeterminate = true;
                  }
                }}
                onCheckedChange={handleSelectAll}
              />
              <label htmlFor={`${label}-select-all`} className="text-sm cursor-pointer font-medium">Select All</label>
            </div>
            {options.map(option => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox 
                  id={`${label}-${option}`}
                  checked={selected.includes(option)}
                  onCheckedChange={() => onChange(option)}
                />
                <label htmlFor={`${label}-${option}`} className="text-sm cursor-pointer">{option}</label>
              </div>
            ))}
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
          <CustomDropdown 
            label="Select Act"
            options={actOptions}
            selected={selectedActs}
            onChange={handleActChange}
            open={openActs}
            setOpen={setOpenActs}
          />
        </div>
        <button onClick={handleReset} className="p-2 text-muted-foreground hover:text-foreground transition-colors mt-6">
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Select Activity</label>
          <CustomDropdown 
            label="Select Activity"
            options={activityOptions}
            selected={selectedActivities}
            onChange={handleActivityChange}
            open={openActivities}
            setOpen={setOpenActivities}
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Select Location</label>
          <CustomDropdown 
            label="Select Location"
            options={locationOptions}
            selected={selectedLocations}
            onChange={handleLocationChange}
            open={openLocations}
            setOpen={setOpenLocations}
          />
        </div>
      </div>

 
    </div>
  );
};

export default FilterSection;
