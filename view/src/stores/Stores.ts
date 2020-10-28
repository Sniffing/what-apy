import { MetadataStore } from './MetadataStore';
import { SavingsStore } from './SavingsStore';
import { TrackingStore } from './TrackingStore';

export interface ApiStoreProps {
  server: string;
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
      debug: process.env.REACT_APP_GA_DEBUG === 'true',
    });

    const apiStoreProps = {
      server: process.env.REACT_APP_SERVER || '',
      trackingStore: this.trackingStore
    };

    this.savingsStore = new SavingsStore(apiStoreProps);
    this.metadataStore = new MetadataStore(apiStoreProps);

    this.metadataStore.fetch();
  }
}

const stores = new Stores();
export default stores;