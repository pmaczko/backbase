import {createAction, props} from '@ngrx/store';
import {Transaction} from '../core/models';

export const load = createAction('[Transactions] Load');
export const loaded = createAction('[Transactions] Loaded', props<{ transactions: Transaction[] }>());
export const loadFailed = createAction('[Transactions] Load failed', props<{ error: string }>());
export const add = createAction('[Transactions] Add', props<{ transaction: Transaction }>());
