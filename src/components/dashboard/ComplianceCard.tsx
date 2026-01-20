import GaugeChart from './GaugeChart';

const ComplianceCard = () => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="text-lg font-semibold">Overall Compliance</h3>
      </div>
      <div className="flex justify-around items-start py-6 px-4">
        <GaugeChart
          value={8}
          maxValue={30}
          label="Not Due"
          color="gray"
        />
        <GaugeChart
          value={20}
          maxValue={30}
          label="Pending"
          color="yellow"
        />
        <GaugeChart
          value={3}
          maxValue={30}
          label="Completed"
          color="cyan"
        />
      </div>
    </div>
  );
};

export default ComplianceCard;
