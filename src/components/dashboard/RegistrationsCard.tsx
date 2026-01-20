import GaugeChart from './GaugeChart';

const RegistrationsCard = () => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="text-lg font-semibold">Registrations</h3>
      </div>
      <div className="flex justify-around items-start py-6 px-4">
        <GaugeChart
          value={0}
          maxValue={10}
          label="Required REGNs/Licenses"
          color="gray"
        />
        <GaugeChart
          value={2}
          maxValue={10}
          label="Active REGNs/Licenses"
          color="cyan"
        />
        <GaugeChart
          value={0}
          maxValue={10}
          label="Pending REGNs/Licenses"
          color="gray"
        />
      </div>
    </div>
  );
};

export default RegistrationsCard;
