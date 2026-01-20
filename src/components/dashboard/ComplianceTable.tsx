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
    <div className="dashboard-card h-full overflow-hidden">
      <div className="overflow-auto max-h-[400px]">
        <table className="data-table">
          <thead className="sticky top-0 z-10">
            <tr>
              <th></th>
              <th>Location</th>
              <th>State</th>
              <th>Task Cycle</th>
              <th>Due Date</th>
              <th>Date C</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                <td className="text-primary font-medium">{row.year}</td>
                <td>{row.location}</td>
                <td>{row.state}</td>
                <td>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    row.taskCycle === 'YLY' ? 'bg-dashboard-cyan/20 text-dashboard-cyan' :
                    row.taskCycle === 'MLY' ? 'bg-dashboard-yellow/20 text-dashboard-yellow' :
                    'bg-dashboard-purple/20 text-dashboard-purple'
                  }`}>
                    {row.taskCycle}
                  </span>
                </td>
                <td className="text-muted-foreground">{row.dueDate}</td>
                <td>{row.dateCompleted || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceTable;
