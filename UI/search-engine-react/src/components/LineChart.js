import React, { useState } from 'react';
import { Line } from "react-chartjs-2";

const positivity = [
    { date: '2020-02-24', type: 'income', amount: 900 },
    { date: '2020-03-15', type: 'expense', amount: 100 },
    { date: '2020-03-20', type: 'expense', amount: 830 },
    { date: '2020-03-25', type: 'expense', amount: 50 },
    { date: '2020-03-28', type: 'expense', amount: 560 },
    { date: '2020-03-24', type: 'income', amount: 600 }
  ];

function LineChart() {
    const [data, setData] = useState({
        datasets: [
          {
            label: 'review trend',
            data: positivity.filter(o => o.type === 'expense').map(o => ({ x: o.date, y: o.amount })),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      });

      const options = {
        responsive: true,
        title: {
          display: false
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                  unit: 'day',
                  tooltipFormat: 'MMM DD'        
                }
              }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
      }

    return (
      <Line data={data} options={options}/>
    )
  };
  
  export default LineChart