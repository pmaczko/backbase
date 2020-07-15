import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState, SortType, Transaction} from '@core/models';
import * as fromTranslations from '@transactions/transactions.reducer';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-transactions-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
    private all$ = this.store.select(fromTranslations.selectTransactionsAll);
    private all: Transaction[] = [];
    private isReverseSort: boolean = true;
    private subscriptions: Subscription = new Subscription();
    filteredAll: Transaction[] = [];
    sortTypes: SortType[] = [
        {
            buttonText: 'Date',
            defaultSort: 'desc',
            sortBy: 'transactionDate',
            asNumber: false
        },
        {
            buttonText: 'Beneficiary',
            defaultSort: 'asc',
            sortBy: 'merchant',
            asNumber: false
        },
        {
            buttonText: 'Amount',
            defaultSort: 'asc',
            sortBy: 'amount',
            asNumber: true
        },
    ];
    activeSortType: SortType = this.sortTypes[0];
    filter: string = '';

    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.subscriptions.add(this.all$.subscribe((all: Transaction[]) => {
            this.all = all;
            this.reset();
        }));
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    sortBy(sortType: SortType): void {
        if (this.activeSortType.sortBy === sortType.sortBy) {
            this.isReverseSort = !this.isReverseSort;
        } else {
            this.activeSortType = sortType;
            this.isReverseSort = sortType.defaultSort === 'desc';
        }
        this.filteredAll.sort(this.dynamicSort(this.activeSortType));
    }

    dynamicSort(sortType: SortType) {
        const sortOrder = this.isReverseSort ? -1 : 1;
        return function (a, b) {
            const aV = sortType.asNumber ? +a[sortType.sortBy] : a[sortType.sortBy];
            const bV = sortType.asNumber ? +b[sortType.sortBy] : b[sortType.sortBy];
            return ((aV < bV) ? -1 : (aV >bV) ? 1 : 0) * sortOrder;
        }
    }

    resetFilter() {
        this.filter = '';
        this.reset();
    }

    private reset() {
        this.filterAll();
        this.filteredAll.sort(this.dynamicSort(this.activeSortType));
    }

    filterAll() {
        this.filteredAll = this.all.filter(o =>
            Object.keys(o).some(k => {
                if (typeof o[k] === 'string' && k !== 'merchantLogo')
                    return o[k].toLowerCase().includes(this.filter.toLowerCase());
            }));
    }

}
