import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

function Histogram({histogramData}) {
  return (
    <Paper>
      <Chart
        data={histogramData}
      >
        <ArgumentAxis />
        <ValueAxis max={7} />

        <BarSeries
          valueField="review_count"
          argumentField="employer"
        />
        <Title text="Top 5 Review Count" />
        <Animation />
      </Chart>
    </Paper>
  );
}

export default Histogram;
