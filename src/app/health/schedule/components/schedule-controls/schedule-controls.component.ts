import {Component,Input,Output,EventEmitter} from '@angular/core'

@Component({
    selector:'schedule-controls',
    styleUrls:['schedule-controls.component.scss'],
    templateUrl:'schedule-controls.component.html',
})

export class ScheduleControlsComponent{
    @Input() date:Date;

    @Output() change=new EventEmitter<number>();

    offset(i:number){
        this.change.emit(i);
    }
}