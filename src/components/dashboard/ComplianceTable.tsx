const tableData = [
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'YLY', dueDate: 'Saturday, January 31, 2026', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'YLY', dueDate: 'Monday, September 01, 2025', dateCompleted: '' },
  { year: '2025', location: 'Hyderabad', state: 'Telangana', taskCycle: 'YLY', dueDate: 'Monday, September 01, 2025', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'MLY', dueDate: 'Tuesday, May 20, 2025', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'MLY', dueDate: 'Thursday, May 15, 2025', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'QLY', dueDate: 'Thursday, July 31, 2025', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'MLY', dueDate: 'Thursday, May 15, 2025', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'MLY', dueDate: 'Sunday, May 25, 2025', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'MLY', dueDate: 'Sunday, May 25, 2025', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'QLY', dueDate: 'Friday, May 30, 2025', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'YLY', dueDate: 'Wednesday, December 31, 2025', dateCompleted: '' },
  { year: '2025', location: 'Hyderabad', state: 'Telangana', taskCycle: 'YLY', dueDate: 'Wednesday, December 31, 2025', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'YLY', dueDate: 'Wednesday, May 28, 2025', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'MLY', dueDate: 'Thursday, May 15, 2025', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'MLY', dueDate: 'Thursday, May 15, 2025', dateCompleted: '' },
  { year: '2025', location: 'Gurugram', state: 'Haryana', taskCycle: 'MLY', dueDate: 'Thursday, May 15, 2025', dateCompleted: '' },
];

const ComplianceTable = () => {
  return (
    <div className="dashboard-card h-full overflow-hidden flex flex-col">
      {/* Fixed Header */}
      <table className="data-table">
        <thead>
          <tr>
            <th className="w-[60px]"></th>
            <th className="w-[100px]">Location</th>
            <th className="w-[100px]">State</th>
            <th className="w-[80px]">Task Cycle</th>
            <th className="w-[200px]">Due Date</th>
            <th className="w-[80px]">Date C</th>
          </tr>
        </thead>
      </table>
      
      {/* Scrollable Body */}
      <div className="overflow-auto flex-1 max-h-[350px]">
        <table className="data-table">
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                <td className="text-primary font-medium w-[60px]">{row.year}</td>
                <td className="w-[100px]">{row.location}</td>
                <td className="w-[100px]">{row.state}</td>
                <td className="w-[80px]">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    row.taskCycle === 'YLY' ? 'bg-dashboard-cyan/20 text-dashboard-cyan' :
                    row.taskCycle === 'MLY' ? 'bg-dashboard-yellow/20 text-dashboard-yellow' :
                    'bg-dashboard-purple/20 text-dashboard-purple'
                  }`}>
                    {row.taskCycle}
                  </span>
                </td>
                <td className="text-muted-foreground w-[200px]">{row.dueDate}</td>
                <td className="w-[80px]">{row.dateCompleted || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceTable;
