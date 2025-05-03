import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BalanceChart = () => {
  const data = {
    labels: ['Chase Bank', 'Bank of America'],
    datasets: [
      {
        data: [2598.12, 100.00], // replace with real values
        backgroundColor: ['#0ea5e9', '#38bdf8'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ width: '200px', height: '200px', position: 'relative' }}>
      <Doughnut data={data} options={options} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontWeight: 'bold',
        textAlign: 'center',
      }}>
        <p style={{ margin: 0, fontSize: '18px' }}>2 Bank Accounts</p>
        <p style={{ margin: 0, fontSize: '20px', color: '#0ea5e9' }}>$2,698.12</p>
      </div>
    </div>
  );
};

export default BalanceChart;
