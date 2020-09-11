import React from 'react';
import {inject, observer} from 'mobx-react';
import { action, observable, computed } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { SavingsStore, ISavingsAccountDTO } from '../stores/SavingsStore';
import { BarDisplay } from '../components/bar-display/bar-display.component';
import { NumberFade } from '../components/number/number-fade.component';

import './savings.scss';
import { BarDisplayWithAverage } from '../components/bar-display-with-avg/bar-display-with-avg.component';
import { AccountTable } from '../components/account-table/account-table.component';
import { Row, Col } from 'antd';

interface IProps {
  savingsStore?: SavingsStore;
}

@inject('savingsStore')
@observer
export class SavingsPage extends React.Component<IProps> {
  private COUNT = 5;

  @observable
  private savingsAccountsPromise: IPromiseBasedObservable<ISavingsAccountDTO[]> = fromPromise(Promise.resolve([]));

  @action.bound
  public componentDidMount() {
    if (!this.props.savingsStore)
      return;

    this.savingsAccountsPromise = fromPromise(this.props.savingsStore.fetch());
  }

  @computed
  private get topAccounts() {
    return this.savingsAccountsPromise.case({
      fulfilled: (accounts: ISavingsAccountDTO[]) => {
        const top = [...accounts].sort((a,b) => b.latest_apy - a.latest_apy)
        .slice(0, this.COUNT);
        return <Row gutter={32}>
            {top.map((acc, index) =>
            <Col>
              <BarDisplay
                key={index}
                data={{
                  title: acc.name,
                  value: Number(acc.latest_apy),
                }}
              />
              </Col>
            )}
          </Row>
        },
      pending: () => <div>loading...</div>,
      rejected: (error) => <div>Error {error}</div>,
    });
  }

  @computed
  private get allAccounts(): ISavingsAccountDTO[] {
    const accounts = this.savingsAccountsPromise.value;
    return accounts ? [...accounts].sort((a,b) => b.latest_apy - a.latest_apy) : []
  }

  public render() {
    return (
      <div className="savings">
        <div className="savingsTopApy">
          <NumberFade value={0.8} style={{
            fontSize: '150px',
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold'
          }}/>
        </div>
        {this.topAccounts}
        <AccountTable className="savingsTable" data={this.allAccounts}/>
        <BarDisplay
          data={{
            title:'test',
            value: 1.5,
          }}
        />
        <BarDisplayWithAverage
          average={2}
          days={31}
          value={{
            title:'test3',
            value: 2.55,
          }}
        />
      </div>
    );
  }
}