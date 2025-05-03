// components/DoughnutChart.jsx
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }) => {
  const data = {
    datasets: [
      {
        labels: 'Banks',
        data: [1250, 2340, 4500],
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'],
      },
    ],
    labels: ['Bank A', 'Bank B', 'Bank C'],
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: '60%',
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;