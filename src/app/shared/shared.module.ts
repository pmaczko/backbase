import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './components/card/card.component';
import {LodashPipe} from './pipes/lodash.pipe';
import {MathPipe} from './pipes/math.pipe';

@NgModule({
    declarations: [
        CardComponent,
        LodashPipe,
        MathPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CardComponent,
        LodashPipe,
        MathPipe
    ]
})
export class SharedModule {
}
