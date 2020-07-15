import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {MockDataService} from '@core/services';
import * as TransactionsActions from './transactions.actions';
import {Action} from '@ngrx/store';

@Injectable()
export class TransactionsEffects implements OnInitEffects {
    loadTransactions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TransactionsActions.load),
            mergeMap(() => this.mockDataService.getTransactions()
                .pipe(
                    map(({data}) => TransactionsActions.loaded({transactions: data})),
                    catchError(() => of(TransactionsActions.loadFailed({error: 'Error!!!'})))
                )
            )
        )
    );

    constructor(private actions$: Actions, private mockDataService: MockDataService) {
    }

    ngrxOnInitEffects(): Action {
        return TransactionsActions.load();
    }
}
