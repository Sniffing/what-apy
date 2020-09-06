import React from 'react';
import {inject, observer} from 'mobx-react';
import { action, observable, computed } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { SavingsStore, ISavingsAccountDTO } from '../stores/SavingsStore';
import { BarDisplay } from '../components/bar-display/bar-display.component';
import { NumberFade } from '../components/number/number-fade.component';

import './savings.scss';
import { BarDisplayWithAverage } from '../components/bar-display-with-avg/bar-display-with-avg.component';

interface IProps {
  savingsStore?: SavingsStore;
}

@inject('savingsStore')
@observer
export class SavingsPage extends React.Component<IProps> {

  @observable
  private savingsAccountsPromise: IPromiseBasedObservable<ISavingsAccountDTO[]> = fromPromise(Promise.resolve([]));

  @action.bound
  public componentDidMount() {
    if (!this.props.savingsStore)
      return;

    this.savingsAccountsPromise = fromPromise(this.props.savingsStore.fetch());
  }

  @computed
  private get allAccounts() {
    return this.savingsAccountsPromise.case({
      fulfilled: (accounts: ISavingsAccountDTO[]) =>
        (
          <>
            {accounts.map((acc, index) =>
              <BarDisplay
                key={index}
                data={{
                  title: acc.name,
                  value: Number(acc.latest_apy),
                }}
              />
            )}
          </>
        ),
      pending: () => <div>loading...</div>,
      rejected: (error) => <div>Error {error}</div>,
    });
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
        {/* {this.allAccounts} */}
        <BarDisplay
          data={{
            title:'test',
            value: 2.5,
          }}
        />
        <BarDisplayWithAverage
          average={1.9}
          days={31}
          value={{
            title:'test',
            value: 2.5,
          }}
        />
      </div>
    );
  }
}