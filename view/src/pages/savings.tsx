import React from 'react';
import {inject, observer} from 'mobx-react';
import { action, observable, computed } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { SavingsStore, ISavingsAccountDTO } from '../stores/SavingsStore';
import { BarDisplay } from '../components/bar-display/bar-display.component';
import { NumberFade } from '../components/number/number-fade.component';

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
        <BarDisplay
          showNumber={true}
          data={accounts.map(acc => {
            return {
              title: acc.name,
              value: Number(acc.latest_apy),
            };
          })}
        />,
      pending: () => <div>loading...</div>,
      rejected: (error) => <div>Error {error}</div>,
  });
  }

  public render() {
    return (
      <>
      <NumberFade value={0.8}/>
      {this.allAccounts}
      </>
    )
  }
}