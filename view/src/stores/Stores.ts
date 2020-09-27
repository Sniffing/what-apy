import { MetadataStore } from './MetadataStore';
import { SavingsStore } from './SavingsStore';
import { TrackingStore } from './TrackingStore';

export interface ApiStoreProps {
  trackingStore: TrackingStore;
}

class Stores {

  private savingsStore: SavingsStore;
  private metadataStore: MetadataStore;
  private trackingStore: TrackingStore;

  public constructor() {
    this.trackingStore = new TrackingStore({
      key: process.env.REACT_APP_GA_TRACKING_KEY,
      trackingVersion: process.env.REACT_APP_TRACKING_VERSION,
    });

    const apiStoreProps = {
      trackingStore: this.trackingStore
    }

    this.savingsStore = new SavingsStore(apiStoreProps);
    this.metadataStore = new MetadataStore(apiStoreProps);

    this.metadataStore.fetch();
  }
}

const stores = new Stores();
export default stores;