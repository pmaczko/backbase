import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import * as fromTranslations from '../../transactions.reducer';
import * as TransactionsActions from '../../transactions.actions';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@core/models';
import * as moment from 'moment';

@Component({
    selector: 'app-transactions-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit, OnDestroy {
    private balance$ = this.store.select(fromTranslations.selectTransactionBalance);
    private balance: number = 0;
    private limit$ = this.store.select(fromTranslations.selectTransactionsLimit);
    private limit: number = 0;
    private fromAccountPrefix: string = 'Free Checking(4692) | ';
    private subscriptions: Subscription = new Subscription();
    previewMode: boolean = false;
    form = this.fb.group({
        fromAccount: [this.fromAccount, Validators.required],
        toAccount: ['', Validators.required],
        amount: ['', [Validators.required, Validators.pattern('^[0-9]*(\.[0-9]{1,2})?$')]]
    });

    constructor(private fb: FormBuilder, private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.form.get('fromAccount').disable();
        this.subscriptions.add(this.balance$.subscribe((balance: number) => {
            this.balance = balance;
            this.form.get('fromAccount').setValue(this.fromAccount);
        }));
        this.subscriptions.add(this.limit$.subscribe((limit: number) => {
            this.limit = limit;
        }));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    get fromAccount(): string {
        return this.fromAccountPrefix + (this.balance < 0 ? '-' : '') + '$' + Math.abs(this.balance);
    }

    reset(): void {
        this.form.get('toAccount').reset();
        this.form.get('amount').reset();
        this.previewMode = false;
    }

    onSubmit(): void {
        if (!this.previewMode) {
            this.previewMode = true;
        } else if (this.balance - this.form.value.amount < this.limit) {
            alert(`You don't have enough cash to make a transfer. \r\nYour account limit is ${(this.limit < 0 ? '-' : '') + '$' + Math.abs(this.limit)}`);
        } else {
            const data = this.form.value;
            this.store.dispatch(TransactionsActions.add({
                transaction: {
                    amount: (0 - data.amount).toString(),
                    categoryCode: '#1180aa',
                    merchant: data.toAccount,
                    merchantLogo: '',
                    transactionDate: moment().valueOf(),
                    transactionType: 'Outbound transaction'
                }
            }));
            this.reset();
        }
    }
}
