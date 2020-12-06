import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable, computed } from 'mobx';
import { fromPromise, IPromiseBasedObservable, FULFILLED } from 'mobx-utils';
import { SavingsStore, ISavingsAccountDTO } from '../stores/SavingsStore';
import { NumberFade } from '../components/number/number-fade.component';

import './savings.scss';
import { BarDisplayWithAverage } from '../components/bar-display-with-avg/bar-display-with-avg.component';
import { AccountTable } from '../components/account-table/account-table.component';
import { Row, Col, Spin, Radio, Card } from 'antd';
import { sortAccounts } from '../Constants';
import { RadioChangeEvent } from 'antd/lib/radio';
import { MetadataStore } from '../stores/MetadataStore';
import { TrackingStore } from '../stores/TrackingStore';

interface IProps {
  savingsStore?: SavingsStore;
  metadataStore?: MetadataStore;
  trackingStore?: TrackingStore;
}

enum EAccountsView {
  TOP_ACCOUNTS_GRAPH = 'TOP_ACCOUNTS_GRAPH',
  ALL_ACCOUNTS_TABLE = 'ALL_ACCOUNTS_TABLE',
}

@inject('savingsStore', 'metadataStore', 'trackingStore')
@observer
export class SavingsPage extends React.Component<IProps> {
  private COUNT = 5;

  @observable
  private currentView: EAccountsView = EAccountsView.TOP_ACCOUNTS_GRAPH;

  @observable
  private savingsAccountsPromise: IPromiseBasedObservable<ISavingsAccountDTO[]> = fromPromise(Promise.resolve([]));

  @action.bound
  public componentDidMount() {
    const {savingsStore, trackingStore} = this.props;
    if (!savingsStore)
      return;

    this.savingsAccountsPromise = fromPromise(savingsStore.fetch());
    trackingStore?.trackPageView('/home');
  }

  @computed
  private get bestAccountDetails() {
    if (!this.allAccounts.length) {
      return <Spin />;
    }

    const { metadataStore } = this.props;
    const best: ISavingsAccountDTO = this.allAccounts[0];

    return (
      <Card className="savingsTopApy">
        <div>Current top APY</div>
        <NumberFade value={`${best.latest_apy.toFixed(2)}%`} seconds={2} style={{
          fontSize: '3rem',
        }} />
        <a href={metadataStore?.bankLinks[best.bank]} target="_blank" rel="noopener noreferrer">
          <div className="savingsTopBank">{metadataStore ? metadataStore.bankLabels[best.bank] : best.bank}</div>
        </a>
        <div className="savingsTopAccount">{best.name}</div>
      </Card>
    );
  }

  @computed
  private get topAccountsGraph() {
    const { metadataStore } = this.props;
    const accounts: ISavingsAccountDTO[] = this.savingsAccountsPromise.value;

    const top = [...accounts].sort(sortAccounts)
      .slice(0, this.COUNT);
    const maxCurr = top[0].latest_apy;
    const maxAvg = Math.max(...top.map(a => a.total_apy / a.entries));
    const max = Math.max(maxCurr, maxAvg);

    return <Row gutter={32}>
      {top.map((acc, index) =>
        <Col key={index}>
          <BarDisplayWithAverage
            account={{
              ...acc,
              bank: metadataStore?.bankLabels[acc.bank] ?? acc.bank,
            }}
            link={metadataStore?.bankLinks[acc.bank]}
            max={max}
          />
        </Col>
      )}
    </Row>;

  }

  @computed
  private get allAccounts(): ISavingsAccountDTO[] {
    const accounts = this.savingsAccountsPromise.value;
    return accounts ? [...accounts].sort(sortAccounts) : [];
  }

  @computed
  private get viewOptions() {
    return [
      { label: `Top ${this.COUNT}`, value: EAccountsView.TOP_ACCOUNTS_GRAPH },
      { label: 'All', value: EAccountsView.ALL_ACCOUNTS_TABLE }
    ];
  }

  @computed
  private get currentViewOption() {
    return this.currentView === EAccountsView.ALL_ACCOUNTS_TABLE ?
      <AccountTable className="savingsTable" data={this.allAccounts} /> :
      this.topAccountsGraph;
  }

  @action.bound
  private handleCurrentViewChange(event: RadioChangeEvent) {
    const {trackingStore} = this.props;

    this.currentView = EAccountsView[event.target.value as EAccountsView];

    trackingStore?.trackEvent({
      action: 'Switch data view',
      category: 'Button click',
      label: this.currentView
    });
  }

  public render() {
    const { metadataStore } = this.props;

    if (this.savingsAccountsPromise.state !== FULFILLED ||
      metadataStore?.fetchingMetadataPromise.state !== FULFILLED) {
      return <Spin/>;
    }

    return (
      <div className="savings">
        {this.bestAccountDetails}
        <div className="savingsRest">
          <Radio.Group
            options={this.viewOptions}
            onChange={this.handleCurrentViewChange}
            value={this.currentView}
            optionType="button"
            buttonStyle="solid"
            size="large"
            className="viewButtons"
          />
          <div className="viewOption">
            {this.currentViewOption}
          </div>
        </div>
      </div>
    );
  }
}