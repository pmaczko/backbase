import {Transaction} from './transaction.model';

export interface TransactionsState {
    all: Transaction[];
    loading: boolean;
    limit: number;
    error: string;
}
