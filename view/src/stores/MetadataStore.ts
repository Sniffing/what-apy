import axios from 'axios';
import { action, computed, observable } from 'mobx';
import { ApiStoreProps } from './Stores';
import { TrackingStore } from './TrackingStore';

interface BankMetaData {
  name: string;
  displayName: string;
  link: string;
}

interface IMetadata {
  banks?: Record<string, BankMetaData>;
}

export class MetadataStore {
  private trackingStore: TrackingStore;

  public constructor({trackingStore}: ApiStoreProps) {
    this.trackingStore = trackingStore
  }

  @observable
  private metaData: Record<string, BankMetaData> = {};

  public async fetch(): Promise<IMetadata> {
    try {
      const response = await axios.get('/metadata');
      const meta = response.data as IMetadata;

      this.setBankMeta(meta.banks);
      return meta;
    } catch (error) {
      console.error('Error', error);
      this.trackingStore.trackError({
        error: 'Error loading site metadata',
        fatal: true,
      })
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
  public setBankMeta(bankMeta: Record<string, BankMetaData> | undefined): void {
    if (!bankMeta) {
      return;
    }

    this.metaData = bankMeta;
  }
}