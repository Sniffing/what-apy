import React from 'react';
import {inject, observer} from 'mobx-react';
import { action } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { SavingsStore, ISavingsAccountDTO } from '../stores/SavingsStore';
import { BarDisplay } from '../components/bar-display/bar-display.component';

interface IProps {
  savingsStore?: SavingsStore;
}

@inject('savingsStore')
@observer
export class Savings extends React.Component<IProps> {

  private savingsAccountsPromise: IPromiseBasedObservable<ISavingsAccountDTO[]> = fromPromise(Promise.resolve([]));

  @action.bound
  public componentDidMount() {
    if (!this.props.savingsStore)
      return

    this.savingsAccountsPromise = fromPromise(this.props.savingsStore.fetch());
  }

  public render() {
    return (
      this.savingsAccountsPromise.case({
        fulfilled: (accounts: ISavingsAccountDTO[]) =>
          <>
            <BarDisplay
              data={accounts.map(acc => {
                return {
                  title: acc.name,
                  value: Number(acc.apy),
                }
              })}
            />
          </> ,
        pending: () => <div>loading...</div>,
        rejected: (error) => <div>Error {error}</div>,
      })
    )
  }
}