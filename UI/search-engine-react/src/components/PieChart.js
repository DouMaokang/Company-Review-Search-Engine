import React, { useState } from 'react';
import { Pie } from "react-chartjs-2";

function PieChart() {

    const [data, setData] = useState({
      labels: [
        'positive',
        'negative',
        'neutral'
      ],
      datasets: [
        {
          data: [12, 19, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });

    const option = {
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            let total = data.datasets[0].data.reduce((a, b) => a + b, 0)
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = parseFloat((currentValue/total*100).toFixed(1));
            return currentValue + ' (' + percentage + '%)';
          },
          title: function(tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          }
        }
      }
    }

    return (
      <Pie data={data} options={option}/>
    )
  };
  
  export default PieChart;
