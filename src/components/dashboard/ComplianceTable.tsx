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
    <div className="dashboard-card h-full overflow-hidden">
      <div className="overflow-auto max-h-[400px]">
        <table className="data-table w-full">
          <thead className="sticky top-0 z-10 bg-card">
            <tr>
              <th>Acts</th>
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
            {tableData.map((row, index) => (
              <tr key={index} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                <td>{row.Acts}</td>
                <td>{row.Activities}</td>
                <td className="text-primary font-medium">{row.Month}</td>
                <td>{row.Location}</td>
                <td>{row.State}</td>
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
                <td>{row.complianceScore || '-'}</td>
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
