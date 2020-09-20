import React from 'react';
import { ISavingsAccountDTO } from '../../stores/SavingsStore';
import { Table, Pagination } from 'antd';
import { ColumnType } from 'antd/lib/list';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { MetadataStore } from '../../stores/MetadataStore';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

interface IProps {
  metadataStore?: MetadataStore;
  data: ISavingsAccountDTO[];
  className?: string
}

@inject('metadataStore')
@observer
export class AccountTable extends React.Component<IProps> {

  public render() {
    const { data, className } = this.props
    const pagination: TablePaginationConfig = {
      pageSize: 10
    }
    return (
      <Table
        className={className}
        dataSource={data}
        columns={this.columns}
        size="small"
        pagination={pagination}
      />
    )
  }

  private averageApy({ entries, total_apy }: ISavingsAccountDTO): number {
    return (total_apy / entries)
  }

  @computed
  private get columns(): ColumnsType<ISavingsAccountDTO> {
    const { metadataStore } = this.props;
    return [
      {
        title: 'Bank',
        render: (bank: ISavingsAccountDTO) => <a href={metadataStore?.bankLinks[bank.bank]} target="_blank">{metadataStore?.bankLabels[bank.bank]}</a>,
        width: 150,
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
    ]
  }
}