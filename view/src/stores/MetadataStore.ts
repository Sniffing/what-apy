import axios from 'axios';
import { action, computed, observable } from 'mobx';

interface BankMetaData {
  name: string;
  displayName: string;
  link: string;
}

interface IMetadata {
  banks?: Record<string, BankMetaData>;
}

export class MetadataStore {
  @observable
  private metaData: Record<string, BankMetaData> = {};

  public async fetch(): Promise<IMetadata> {
    try {
      const response = await axios.get('/metadata');
      const meta = response.data as IMetadata;

      this.setBankMeat(meta.banks);
      return meta;
    } catch (error) {
      console.log('error', error);
      return {};
    }
  }

  @computed
  public get bankLabels(): Record<string,string> {
    return Object.entries(this.metaData)
      .reduce((acc: Record<string, string>, bm) => {
        const [name, {displayName}] = bm;
        acc[name] = displayName;
        return acc;
      }, {});
  }

  @computed
  public get bankLinks(): Record<string,string> {
    return Object.entries(this.metaData)
      .reduce((acc: Record<string, string>, bm) => {
        const [name, {link}] = bm;
        acc[name] = link;
        return acc;
      }, {});
  }

  @action.bound
  public setBankMeat(bankMeta: Record<string, BankMetaData> | undefined): void {
    if (!bankMeta) {
      return;
    }

    this.metaData = bankMeta;
  }
}