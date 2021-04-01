import React, { useState } from 'react';
import { Pie } from "react-chartjs-2";

function PieChart({pieChartData}) {
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
      <React.Fragment>
        <Pie data={pieChartData} options={option}/>
      </React.Fragment>
    )
  };
  
  export default PieChart;
