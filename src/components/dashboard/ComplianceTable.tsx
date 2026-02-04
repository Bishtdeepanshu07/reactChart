import { useExcelData } from '@/contexts/ExcelContext';
import { FileSpreadsheet } from 'lucide-react';

const ComplianceTable = () => {
  const { data, isLoading } = useExcelData();

  if (isLoading) {
    return (
      <div className="dashboard-card h-full flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading data...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="dashboard-card h-full flex flex-col items-center justify-center min-h-[400px] gap-3">
        <FileSpreadsheet className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground text-center">
          No data loaded. Upload an Excel file to view compliance data.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard-card h-full overflow-hidden">
      <div className="overflow-x-auto max-h-[250px] sm:max-h-[400px]">
        <table className="data-table w-full">
          <thead className="sticky top-0 z-10 bg-card">
            <tr>
              <th>Act Name</th>
              <th>Activities</th>
              <th>Month</th>
              <th>Location</th>
              <th>State</th>
              <th>Task Cycle</th>
              <th>Due Date</th>
              <th>Date Completed</th>
              <th>Compliance Score</th>
              <th>Company Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="animate-fade-in" style={{ animationDelay: `${Math.min(index, 10) * 30}ms` }}>
                <td>{row.ActName}</td>
                <td>{row.ActivitiesName}</td>
                <td className="text-primary font-medium">{row.Month}</td>
                <td>{row.Location}</td>
                <td>{row.State}</td>
                <td>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    row.TaskCycle === 'YLY' ? 'bg-dashboard-cyan/20 text-dashboard-cyan' :
                    row.TaskCycle === 'MLY' ? 'bg-dashboard-yellow/20 text-dashboard-yellow' :
                    'bg-dashboard-purple/20 text-dashboard-purple'
                  }`}>
                    {row.TaskCycle}
                  </span>
                </td>
                <td className="text-muted-foreground">{row.DueDate}</td>
                <td>{row.DateOfTaskCompletion || '-'}</td>
                <td>{row.ComplianceScore || '-'}</td>
                <td>{row.CompanyName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceTable;
