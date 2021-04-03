import React, { useState } from 'react';
import { Line } from "react-chartjs-2";

function LineChart({lineChartData}) {
      const options = {
        responsive: true,
        title: {
          display: false
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {
                    'month': 'MMM YYYY',
                    'quarter': 'MMM YYYY',
                    'year': 'MMM YYYY',
                  }
                }
              },
              // {
              //   type: 'time',
              //   time: {
              //     displayFormats: {
              //       'month': 'MMM YYYY',
              //       'quarter': 'MMM YYYY',
              //       'year': 'MMM YYYY',
              //     }
              //   }
              // }
            ],
        },
      }

    return (
      <Line data={lineChartData} options={options}/>
    )
  };
  
  export default LineChart