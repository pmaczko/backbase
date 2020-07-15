import {Component, Input, OnInit} from '@angular/core';

type CardTypes = 'arrows' | 'briefcase';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    icons: {[type in CardTypes]: string} = {
        arrows: 'assets/icons/arrows.png',
        briefcase: 'assets/icons/briefcase.png'
    };

    @Input()
    type: CardTypes;

    @Input()
    title: string;

    @Input()
    bigHeader: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

}
