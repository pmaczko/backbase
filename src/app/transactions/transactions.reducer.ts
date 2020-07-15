import {createReducer, createSelector, on} from '@ngrx/store';
import {AppState, Transaction, TransactionsState} from '../core/models';
import {add, load, loaded, loadFailed} from './transactions.actions';
import * as moment from 'moment';

export const initialState: TransactionsState = {
    all: [],
    loading: false,
    limit: -500,
    error: null
};

const _transactionsReducer = createReducer(initialState,
    on(add, (state, {transaction}) => {
        return {
            ...state,
            all: [{
                ...transaction,
                transactionDateString: moment(transaction.transactionDate).format('MMM D YYYY')
            }, ...state.all]
        };
    }),
    on(load, state => {
        return {...state, loading: true, error: null};
    }),
    on(loaded, (state, {transactions}) => {
        return {
            ...state, loading: false, all: transactions.map((transaction: Transaction) => {
                return {
                    ...transaction,
                    transactionDateString: moment(transaction.transactionDate).format('MMM D YYYY')
                };
            })
        };
    }),
    on(loadFailed, (state, {error}) => {
        return {...state, loading: false, error};
    })
);

export function transactionsReducer(state, action) {
    return _transactionsReducer(state, action);
}

export const selectTransactions = (state: AppState) => state.transactions;
export const selectTransactionsAll = createSelector(selectTransactions, (state: TransactionsState) => state.all);
export const selectTransactionsLoading = createSelector(selectTransactions, (state: TransactionsState) => state.loading);
export const selectTransactionsLimit = createSelector(selectTransactions, (state: TransactionsState) => state.limit);
export const selectTransactionsError = createSelector(selectTransactions, (state: TransactionsState) => state.error);

export const selectTransactionBalance = createSelector(
    selectTransactionsAll,
    (all: Transaction[]) => {
        let balance: number = 0;
        all.forEach((transaction: Transaction) => {
            balance += +transaction.amount;
        });
        return Math.round(balance * 100) / 100;
    }
);
