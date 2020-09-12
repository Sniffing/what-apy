import { MetadataStore } from './MetadataStore';
import { SavingsStore } from './SavingsStore';

class Stores {

  private savingsStore: SavingsStore;
  private metadataStore: MetadataStore;

  public constructor() {
    this.savingsStore = new SavingsStore();
    this.metadataStore = new MetadataStore();

    this.metadataStore.fetch();
  }
}

const stores = new Stores();
export default stores;