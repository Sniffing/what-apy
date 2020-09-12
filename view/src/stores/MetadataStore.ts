import axios from 'axios';
import { action, computed, observable } from 'mobx';

interface IMetadata {
  banks?: Record<string, string>;
}

export class MetadataStore {
  @observable
  public bankLabels: Record<string, string> = {};

  public async fetch(): Promise<IMetadata> {
    try {
      const response = await axios.get('/metadata');
      const meta = response.data as IMetadata;

      this.setBankLabels(meta.banks)
      return meta;
    } catch (error) {
      console.log('error', error);
      return {};
    }
  }

  @action.bound
  public setBankLabels(bankLabels: Record<string, string> | undefined): void {
    if (!bankLabels) {
      return
    }

    this.bankLabels = bankLabels
  }
}