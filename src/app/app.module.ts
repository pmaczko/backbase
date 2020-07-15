import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '@env';
import {EffectsModule} from '@ngrx/effects';
import {CoreModule} from '@core/core.module';
import {transactionsReducer} from '@transactions/transactions.reducer';
import {TransactionsEffects} from '@transactions/transactions.effects';
import {TransactionsModule} from '@transactions/transactions.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CoreModule,
        TransactionsModule,
        StoreModule.forRoot({transactions: transactionsReducer}),
        EffectsModule.forRoot([TransactionsEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
