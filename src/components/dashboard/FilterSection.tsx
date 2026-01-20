import { RotateCcw, Info, List, ExternalLink } from 'lucide-react';

const FilterSection = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-sm text-muted-foreground mb-1 block">Select Act</label>
          <select className="filter-select w-full">
            <option>All</option>
            <option>Payroll</option>
            <option>Bonus Act</option>
            <option>POSH</option>
          </select>
        </div>
        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors mt-6">
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Select Activity</label>
          <select className="filter-select w-full">
            <option>All</option>
            <option>Filing</option>
            <option>Payment</option>
            <option>Registration</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Select Location</label>
          <select className="filter-select w-full">
            <option>All</option>
            <option>Gurugram</option>
            <option>Hyderabad</option>
            <option>Bangalore</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
          <Info className="w-4 h-4" />
        </button>
        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
          <List className="w-4 h-4" />
        </button>
        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
