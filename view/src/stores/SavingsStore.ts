
import axios from 'axios';
import { ApiStoreProps } from './Stores';
import { TrackingStore } from './TrackingStore';

export interface ISavingsAccountDTO {
  name: string;
  bank: string;
  entries: number;
  latest_apy: number;
  latest_date: number;
  total_apy: number;
}

export class SavingsStore {
  private apiEndpoint: string;
  private trackingStore: TrackingStore;

  public constructor({trackingStore, apiEndpoint}: ApiStoreProps) {
    this.trackingStore = trackingStore;
    this.apiEndpoint = apiEndpoint;
  }

  public async fetch(): Promise<ISavingsAccountDTO[]> {
    try {
      const response = await axios.get(this.apiEndpoint+'/savings_accounts');
      return response.data as ISavingsAccountDTO[];
    } catch (error) {
      console.error('Error', error);
      this.trackingStore.trackError({
        error: 'Error loading bank data',
        fatal: true,
      });
      return [];
    }
  }
}