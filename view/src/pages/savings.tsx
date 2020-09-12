import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable, computed } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { SavingsStore, ISavingsAccountDTO } from '../stores/SavingsStore';
import { NumberFade } from '../components/number/number-fade.component';

import './savings.scss';
import { BarDisplayWithAverage } from '../components/bar-display-with-avg/bar-display-with-avg.component';
import { AccountTable } from '../components/account-table/account-table.component';
import { Row, Col, Spin, Radio } from 'antd';
import { sortAccounts } from '../Constants';
import { RadioChangeEvent } from 'antd/lib/radio';
import { MetadataStore } from '../stores/MetadataStore';

interface IProps {
  savingsStore?: SavingsStore;
  metadataStore?: MetadataStore;
}

enum EAccountsView {
  TOP_ACCOUNTS_GRAPH = 'TOP_ACCOUNTS_GRAPH',
  ALL_ACCOUNTS_TABLE = 'ALL_ACCOUNTS_TABLE',
}

@inject('savingsStore', 'metadataStore')
@observer
export class SavingsPage extends React.Component<IProps> {
  private COUNT = 5;

  @observable
  private currentView: EAccountsView = EAccountsView.TOP_ACCOUNTS_GRAPH;

  @observable
  private savingsAccountsPromise: IPromiseBasedObservable<ISavingsAccountDTO[]> = fromPromise(Promise.resolve([]));

  @action.bound
  public componentDidMount() {
    if (!this.props.savingsStore)
      return;

    this.savingsAccountsPromise = fromPromise(this.props.savingsStore.fetch());
  }

  @computed
  private get bestAccountDetails() {
    if (!this.allAccounts.length) {
      return <Spin />
    }

    const { metadataStore } = this.props;
    const best = this.allAccounts[0];

    return <div className="savingsTopApy">
      <div>Current top APY</div>
      <NumberFade value={`${best.latest_apy.toFixed(2)}%`} style={{
        fontSize: '150px',
      }} />
      <div>{metadataStore? metadataStore.bankLabels[best.bank] : best.bank}</div>
      <div>{best.name}</div>
    </div>
  }

  @computed
  private get topAccountsGraph() {
    const { metadataStore } = this.props;
    return this.savingsAccountsPromise.case({
      fulfilled: (accounts: ISavingsAccountDTO[]) => {
        const top = [...accounts].sort(sortAccounts)
          .slice(0, this.COUNT);
        return <Row gutter={32}>
          {top.map((acc, index) =>
            <Col>
              <BarDisplayWithAverage
                key={index}
                account={{
                  ...acc,
                  bank: metadataStore? metadataStore.bankLabels[acc.bank] : acc.bank
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
    const { metadataStore } = this.props;
    const accounts = this.savingsAccountsPromise.value;
    return accounts ? [...accounts].sort(sortAccounts).map(acc => {
      return {
        ...acc,
        bank: metadataStore? metadataStore.bankLabels[acc.bank] : acc.bank
      }
    }) : []
  }

  @computed
  private get viewOptions() {
    return [
      { label: `Top ${this.COUNT}`, value: EAccountsView.TOP_ACCOUNTS_GRAPH },
      { label: 'All', value: EAccountsView.ALL_ACCOUNTS_TABLE }
    ]
  }

  @computed
  private get currentViewOption() {
    return this.currentView === EAccountsView.ALL_ACCOUNTS_TABLE ?
      <AccountTable className="savingsTable" data={this.allAccounts} /> :
      this.topAccountsGraph
  }

  @action.bound
  private handleCurrentViewChange(event: RadioChangeEvent) {
    this.currentView = EAccountsView[event.target.value as EAccountsView]
  }

  public render() {
    return (
      <div className="savings">
        {this.bestAccountDetails}
        <Radio.Group
          options={this.viewOptions}
          onChange={this.handleCurrentViewChange}
          value={this.currentView}
          optionType="button"
          buttonStyle="solid"
          size="large"
          className="viewButtons"
        />
        {this.currentViewOption}
      </div>
    );
  }
}