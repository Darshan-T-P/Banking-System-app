// components/DoughnutChart.jsx
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }) => {
  const labels = accounts.map(acc => acc.bankName);
  const dataValues = accounts.map(acc => acc.balance);
  const backgroundColors = [
    '#0747b6', '#2265d8', '#2f91fa', '#6cb4ff', '#a1cfff', '#cce5ff' // Add more if needed
  ];
  console.log("Chart Labels:", labels);
  console.log("Chart Data:", dataValues);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors.slice(0, accounts.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: '60%',
        // plugins: {
        //   legend: {
        //     display: true,
        //     position: 'bottom',
        //   },
        // },
      }}
    />
  );
};

export default DoughnutChart;
