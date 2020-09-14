import React from 'react';
import { ISavingsAccountDTO } from '../../stores/SavingsStore';
import { BarDisplay, IBar } from '../bar-display/bar-display.component';

import './bar-display-with-avg.scss';

interface IProps {
  account: ISavingsAccountDTO;
  tooltip?: React.ReactNode;
  maxHeight: number;
}

export class BarDisplayWithAverage extends React.Component<IProps> {
  public render() {
    const { account, maxHeight } = this.props;
    const avg = account.total_apy / account.entries

    const max = Math.max(account.latest_apy, avg)

    return (
      <div className="barDisplayWithAvg" style={{height: `${max*100 / maxHeight}%`}}>
        <BarDisplay
          data={{
            title: account.bank,
            value: account.latest_apy
          }}
          className='current'
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
          className='average'
        />
      </div>
    );
  }
}