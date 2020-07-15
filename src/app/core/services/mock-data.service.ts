import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from '../models/transaction.model';

@Injectable({
    providedIn: 'root'
})
export class MockDataService {
    constructor(private httpClient: HttpClient) {
    }

    public getTransactions(): Observable<{ data: Transaction[] }> {
        return this.httpClient.get<{ data: Transaction[] }>('assets/data/transactions.json');
    }
}
