
import axios from 'axios';

export interface ISavingsAccountDTO {
  apy: string,
  name: string,
}

export class SavingsStore {

  public async fetch(): Promise<ISavingsAccountDTO[]> {
    console.log('fetchin')
    try {
      const response = await axios.get('/savings_accounts');
      return response.data as ISavingsAccountDTO[];
    } catch (error) {
      console.log('error', error);
      return [];
    }
  }
}