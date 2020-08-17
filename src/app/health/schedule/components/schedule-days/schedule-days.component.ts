import {Component, Input, Output, EventEmitter} from '@angular/core'

@Component({
    selector:'schedule-days',
    styleUrls:['schedule-days.component.scss'],
    templateUrl:'schedule-days.component.html',
})

export class ScheduleDaysComponent{
    days=['S', 'M','T','W','T','F','S'];

    @Input() selected:number;

    @Output() select=new EventEmitter<number>();

    changeDay(i:number){
        this.select.emit(i);
    }
}