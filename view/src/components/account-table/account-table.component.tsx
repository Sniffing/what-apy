import React from 'react';
import { ISavingsAccountDTO } from '../../stores/SavingsStore';
import { Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { MetadataStore } from '../../stores/MetadataStore';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import { createLinkClickEvent, TrackingStore } from '../../stores/TrackingStore';

interface IProps {
  metadataStore?: MetadataStore;
  trackingStore?: TrackingStore;
  data: ISavingsAccountDTO[];
  className?: string;
}

@inject('metadataStore', 'trackingStore')
@observer
export class AccountTable extends React.Component<IProps> {

  public render() {
    const { data, className } = this.props;
    const pagination: TablePaginationConfig = {
      pageSize: 10
    };
    return (
      <Table
        className={className}
        dataSource={data}
        columns={this.columns}
        size="small"
        pagination={pagination}
      />
    );
  }

  private averageApy({ entries, total_apy }: ISavingsAccountDTO): number {
    return (total_apy / entries);
  }

  private handleLinkClick = ({bank}: ISavingsAccountDTO) => {
    const {metadataStore} = this.props;
    if (!metadataStore) {
      return
    }

    this.props.trackingStore?.trackEvent(createLinkClickEvent('Table link click'));

    this.props.trackingStore?.trackNavigateAway({
      description: `Navigate to ${bank} website`,
      url: metadataStore.bankLinks[bank],
    })

    window.open(metadataStore?.bankLinks[bank], '_blank');
  }

  @computed
  private get columns(): ColumnsType<ISavingsAccountDTO> {
    const { metadataStore } = this.props;
    return [
      {
        title: 'Bank',
        render: (bank: ISavingsAccountDTO) => <a onClick={() => this.handleLinkClick(bank)}>{metadataStore?.bankLabels[bank.bank]}</a>,
        width: 200,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        ellipsis: true
      },
      {
        title: 'APY',
        dataIndex: 'latest_apy',
        render: (apy) => `${Number(apy).toFixed(2)}%`,
        width: 80,
        sorter: (a, b) => Number(a.latest_apy) - Number(b.latest_apy),
      },
      {
        title: 'Avg. APY',
        render: (dto: ISavingsAccountDTO) => `${this.averageApy(dto).toFixed(2)}%`,
        width: 100,
        sorter: (a, b) => this.averageApy(a) - this.averageApy(b),
      },
      {
        title: 'Days observed',
        dataIndex: 'entries',
        width: 100,
        sorter: (a, b) => a.entries - b.entries
      },
    ];
  }
}