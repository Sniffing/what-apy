import React from 'react';
import { BarDisplay, IBar } from '../bar-display/bar-display.component';
import ReactToolTip from 'react-tooltip';
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

        <a data-tip="React-tooltip">
          <BarDisplay
            data={{
              title: '',
              value: average,
            }}
            showNumber={false}
            className='average'
          />
        </a>
        <ReactToolTip className="tooltip">
          <span>Average APY: {average}%</span>
          <br/>
          <span>Time observed: {days} days</span>
        </ReactToolTip>
      </div>
    );
  }
}