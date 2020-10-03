import axios from 'axios';
import { action, computed, observable } from 'mobx';
import { ApiStoreProps } from './Stores';
import { TrackingStore } from './TrackingStore';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';

interface BankMetaData {
  name: string;
  displayName: string;
  link: string;
}

interface IMetadata {
  banks?: Record<string, BankMetaData>;
}

export class MetadataStore {
  private server: string;
  private trackingStore: TrackingStore;

  @observable
  private metaData: Record<string, BankMetaData> = {};

  @observable
  public fetchingMetadataPromise: IPromiseBasedObservable<IMetadata> = fromPromise(Promise.reject());

  public constructor({trackingStore, server}: ApiStoreProps) {
    this.trackingStore = trackingStore;
    this.server = server;
  }

  public async fetch(): Promise<void> {
    try {
      this.fetchingMetadataPromise = fromPromise(axios.get(this.server+'/metadata'));
      await this.fetchingMetadataPromise;
      this.setBankMeta(this.fetchingMetadataPromise.value.banks);
    } catch (error) {
      console.error('Error', error);
      this.trackingStore.trackError({
        error: 'Error loading site metadata',
        fatal: true,
      });
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