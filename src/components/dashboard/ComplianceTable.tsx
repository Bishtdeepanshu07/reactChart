const tableData = [
  { Acts:'S&CE',Activities:'Annual Return',Month:'Tuesday,April 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'YLY', dueDate: 'Saturday, January 31, 2026', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited' },
  { Acts:'S&CE',Activities:'Annual Return',Month:'Thursday,May 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'YLY', dueDate: 'Monday, September 01, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'S&CE',Activities:'Annual Return',Month:'Sunday,June 01,2025', Location: 'Hyderabad', State: 'Telangana', taskCycle: 'YLY', dueDate: 'Monday, September 01, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'Bonus Act',Activities:'Bonus Calculation',Month:'Thursday,May 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'MLY', dueDate: 'Tuesday, May 20, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'Bonus Act',Activities:'Bonus Calculation',Month:'Sunday,June 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'MLY', dueDate: 'Thursday, May 15, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'Bonus Act',Activities:'Bonus Calculation',Month:'Thursday,May 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'MLY', dueDate: 'Thursday, May 15, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'Bonus Act',Activities:'Bonus Calculation',Month:'Sunday,June 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'QLY', dueDate: 'Thursday, July 31, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'Bonus Act',Activities:'Bonus Return',Month:'Tuesday,April 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle:'MLY' , dueDate:'Thursday, May 15, 2025' , dateCompleted:'',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'Bonus Act',Activities:'Bonus Return',Month:'Thursday,May 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'MLY', dueDate: 'Sunday, May 25, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'Bonus Act',Activities:'Bonus Return',Month:'Sunday,June 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'MLY', dueDate: 'Sunday, May 25, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'Bonus Act',Activities:'Bonus Return',Month:'Tuesday,April 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'QLY', dueDate: 'Friday, May 30, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'Bonus Act',Activities:'Bonus Return',Month:'Thursday,May 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'YLY', dueDate: 'Wednesday, December 31, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'Bonus Act',Activities:'Bonus Return',Month:'Sunday,June 01,2025', Location: 'Hyderabad', State: 'Telangana', taskCycle: 'YLY', dueDate: 'Wednesday, December 31, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'Bonus Act',Activities:'Compliance Register',Month:'Tuesday,April 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'YLY', dueDate: 'Wednesday, May 28, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'S&CE',Activities:'Compliance Register',Month:'Thursday,May 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'MLY', dueDate: 'Thursday, May 15, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'S&CE',Activities:'Compliance Register',Month:'Sunday,June 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'MLY', dueDate: 'Thursday, May 15, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
  { Acts:'S&CE',Activities:'Eligibility Register',Month:'Tuesday,April 01,2025', Location: 'Gurugram', State: 'Haryana', taskCycle: 'MLY', dueDate: 'Thursday, May 15, 2025', dateCompleted: '',complianceScore:'',CompanyName:'Whale Cloud Technology India Private Limited'  },
];

const ComplianceTable = () => {
  return (
    <div className="dashboard-card h-full overflow-hidden flex flex-col">
      {/* Fixed Header */}
      <table className="data-table">
        <thead>
          <tr>
            <th className="w-[80px]">Acts</th>
            <th className="w-[140px]">Activities</th>
            <th className="w-[160px]">Month</th>
            <th className="w-[100px]">Location</th>
            <th className="w-[100px]">State</th>
            <th className="w-[80px]">Task Cycle</th>
            <th className="w-[180px]">Due Date</th>
            <th className="w-[120px]">Date Completed</th>
            <th className="w-[120px]">Compliance Score</th>
            <th className="w-[280px]">Company Name</th>
          </tr>
        </thead>
      </table>
      
      {/* Scrollable Body */}
      <div className="overflow-auto flex-1 max-h-[350px]">
        <table className="data-table">
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                <td className="w-[80px]">{row.Acts}</td>
                <td className="w-[140px]">{row.Activities}</td>
                <td className="text-primary font-medium w-[160px]">{row.Month}</td>
                <td className="w-[100px]">{row.Location}</td>
                <td className="w-[100px]">{row.State}</td>
                <td className="w-[80px]">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    row.taskCycle === 'YLY' ? 'bg-dashboard-cyan/20 text-dashboard-cyan' :
                    row.taskCycle === 'MLY' ? 'bg-dashboard-yellow/20 text-dashboard-yellow' :
                    'bg-dashboard-purple/20 text-dashboard-purple'
                  }`}>
                    {row.taskCycle}
                  </span>
                </td>
                <td className="text-muted-foreground w-[180px]">{row.dueDate}</td>
                <td className="w-[120px]">{row.dateCompleted || '-'}</td>
                <td className="w-[120px]">{row.complianceScore || '-'}</td>
                <td className="w-[280px]">{row.CompanyName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplianceTable;
