import React from 'react';
import { BarDisplay, IBar } from '../bar-display/bar-display.component';

import './bar-display-with-avg.scss';

interface IProps {
  average: number;
  days: number;
  value: IBar;
}

export class BarDisplayWithAverage extends React.Component<IProps> {
  public render() {
    const { average, days, value } = this.props;
    return (
      <div className="barDisplayWithAvg">
        <BarDisplay
          data={value}
          className='current'
        />

        <BarDisplay
          data={{
            title: '',
            value: average,
          }}
          showNumber={false}
          tooltip={<>
            <span>Average APY: {average}%</span>
            <br/>
            <span>Time observed: {days} days</span>
          </>}
          className='average'
        />
      </div>
    );
  }
}