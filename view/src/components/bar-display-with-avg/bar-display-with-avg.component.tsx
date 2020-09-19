import React from 'react';
import { ISavingsAccountDTO } from '../../stores/SavingsStore';
import { BarDisplay, IBar } from '../bar-display/bar-display.component';

import './bar-display-with-avg.scss';

interface IProps {
  account: ISavingsAccountDTO;
  tooltip?: React.ReactNode;
  max: number;
}

export class BarDisplayWithAverage extends React.Component<IProps> {
  public render() {
    const { account, max } = this.props;
    const avg = account.total_apy / account.entries

    return (
      <div className="barDisplayWithAvg">
        <BarDisplay
          data={{
            title: account.bank,
            value: account.latest_apy
          }}
          className='current'
          relativeHeight={max ? account.latest_apy * 100 / max : 100}
        />

        <BarDisplay
          data={{
            title: '',
            value: avg,
          }}
          showNumber={false}
          tooltip={<div style={{ fontSize: '16px' }}>
            <span>Average APY: {avg.toFixed(2)}%</span>
            <br />
            <span>Time observed: {account.entries} days</span>
          </div>}
          relativeHeight={max ? avg * 100 / max  : 100}
          className='average'
        />
      </div>
    );
  }
}