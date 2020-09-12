
import axios from 'axios';

export interface ISavingsAccountDTO {
  name: string,
  bank: string,
  entries: number,
  latest_apy: number,
  latest_date: number,
  total_apy: number
}

export class SavingsStore {

  public async fetch(): Promise<ISavingsAccountDTO[]> {
    try {
      const response = await axios.get('/savings_accounts');
      return response.data as ISavingsAccountDTO[];
    } catch (error) {
      console.log('error', error);
      return [];
    }
  }
}