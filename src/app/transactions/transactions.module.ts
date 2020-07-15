import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewComponent} from './components/new/new.component';
import {ListComponent} from './components/list/list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ViewComponent} from './components/view/view.component';
import {SharedModule} from '@shared/shared.module';

@NgModule({
    declarations: [NewComponent, ListComponent, ViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [ViewComponent]
})
export class TransactionsModule {
}
