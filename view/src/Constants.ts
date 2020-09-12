import { ISavingsAccountDTO } from './stores/SavingsStore';

export const sortAccounts = (a: ISavingsAccountDTO, b: ISavingsAccountDTO) => {
  const aCurr = a.latest_apy;
  const bCurr = b.latest_apy;
  const aAvg = a.total_apy / a.entries;
  const bAvg = b.total_apy / b.entries;

  return aCurr === bCurr ? bAvg - aAvg : bCurr - aCurr;
}
