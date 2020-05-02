import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    const initialValue: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    return transactions.reduce((acc, tr) => {
      acc[tr.type] += Number(tr.value);
      acc.total = acc.income - acc.outcome;
      return acc;
    }, initialValue);
  }
}

export default TransactionsRepository;
