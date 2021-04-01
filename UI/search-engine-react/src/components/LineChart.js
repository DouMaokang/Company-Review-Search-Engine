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
                    // 'millisecond': 'MMM YY',
                    // 'second': 'MMM YY',
                    // 'minute': 'MMM YY',
                    // 'hour': 'MMM YY',
                    // 'day': 'MMM YY',
                    // 'week': 'MMM YY',
                    'month': 'MMM YY',
                    'quarter': 'MMM YY',
                    'year': 'MMM YY',
                  }
                }
              },
              {
                type: 'time',
                time: {
                  displayFormats: {
                    // 'millisecond': 'MMM YY',
                    // 'second': 'MMM YY',
                    // 'minute': 'MMM YY',
                    // 'hour': 'MMM YY',
                    // 'day': 'MMM YY',
                    // 'week': 'MMM YY',
                    'month': 'MMM YY',
                    'quarter': 'MMM YY',
                    'year': 'MMM YY',
                  }
                }
              }],
        },
      }

    return (
      <Line data={lineChartData} options={options}/>
    )
  };
  
  export default LineChart