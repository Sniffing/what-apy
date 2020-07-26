import { SavingsStore } from './SavingsStore';

class Stores {

  private savingsStore: SavingsStore;

  public constructor() {
    this.savingsStore = new SavingsStore();
  }
}

const stores = new Stores();
export default stores;