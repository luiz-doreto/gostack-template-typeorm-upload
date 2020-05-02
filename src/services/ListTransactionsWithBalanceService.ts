import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

class ListTransactionsWithBalanceService {
  public async execute(): Promise<Response> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const response: Response = {
      transactions: await transactionsRepository.find({
        relations: ['category'],
      }),
      balance: await transactionsRepository.getBalance(),
    };

    return response;
  }
}

export default ListTransactionsWithBalanceService;
