import {Component,Input,Output, EventEmitter} from '@angular/core'
import { ScheduleItem, ScheduleList } from 'src/app/health/shared/services/schedule/schedule.service';

@Component({
    selector:'schedule-calendar',
    styleUrls:['schedule-calendar.component.scss'],
    templateUrl:'schedule-calendar.component.html',
})

export class ScheduleCalendarComponent{

    dateNow:Date;

    sections=[
        {key:'morning',name:'Morning'},
        {key:'lunch',name:'Lunch'},
        {key:'evening',name:'Evening'},
        {key:'snacks',name:'Snacks and Drinks'}
    ]

    @Input() items:ScheduleList;

    getSection(name:string):ScheduleItem{
        if(this.items && this.items[name])
            return this.items[name]
        return {} as ScheduleItem;
    }

    selectSection({type,assigned,data}:any,section:string){
        const day=this.today;
        const year=this.dateNow.getFullYear();
        const month=this.dateNow.getMonth();
        console.log('selectSection-calendarComponent',{
            type,
            assigned,
            section,
            data
        })
        
        this.select.emit({
            type,
            assigned,
            section,
            year,
            month,
            day,
            data
        })
        
    }

    @Input()
    set date(value:Date){
        this.dateNow=new Date(value.getTime()) //atualiza data
    }

    @Output() change=new EventEmitter<Date>();
    @Output() select=new EventEmitter<any>();

    onChangeWeek(event:number){
        var mondayOffset=1-this.weekDay;

        this.dateNow.setDate(this.today+event*7+mondayOffset);
        this.change.emit(this.dateNow);
    }
    onChangeDay(event:number){
        var daysOffset=event-this.weekDay;
        this.dateNow.setDate(this.today+daysOffset);
        this.change.emit(this.dateNow);
    }
    get weekDay(){
        return this.dateNow.getDay();
    }
    get today(){
        return this.dateNow.getDate();
    }
}