import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'math'
})
export class MathPipe implements PipeTransform {
    transform(target: any, ...args: any[]): any {
        return Math[args.shift()](target, ...args);
    }
}
