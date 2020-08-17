import {Component,OnInit,OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core'
import { ScheduleService, ScheduleItem } from 'src/app/health/shared/services/schedule/schedule.service';
import { Store } from 'src/store';
import { Subscription, Observable } from 'rxjs';
import { Workout,WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';
import { Meal,MealsService } from 'src/app/health/shared/services/meals/meals.service';

@Component({
    selector:'app-schedule',
    templateUrl:'schedule.component.html',
    styleUrls:['schedule.component.scss']
})

export class ScheduleComponent implements OnInit,OnDestroy{
    constructor(private cd:ChangeDetectorRef, private scheduleService:ScheduleService, private store:Store, private mealsService:MealsService, private workoutsService:WorkoutsService){}

    open:boolean=false;

    subscriptions:Subscription[];
    date$:Observable<Date>;
    list$:Observable<Meal[] | Workout[]>;
    selected$:Observable<any>;
    schedule$:Observable<ScheduleItem[]>;

    changeSection(event:any){
        this.open=true;
        this.scheduleService.selectSection(event);
    }

    ngOnInit(): void {
        this.subscriptions=[
            this.scheduleService.schedule$.subscribe(),
            this.scheduleService.selected$.subscribe(),
            this.scheduleService.list$.subscribe(),
            this.scheduleService.item$.subscribe(),
            this.mealsService.meals$.subscribe(),
            this.workoutsService.workouts$.subscribe(),
        ]
        this.date$=this.store.select<Date>('date');
        this.list$=this.store.select('list');
        this.schedule$=this.store.select<ScheduleItem[]>('schedule'); //obs: é um obj ScheduleList, onde suas prop so possuem ScheduleItem, consequentemente virando uma lista de ScheduleItem
        this.selected$=this.store.select('selected');
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(element=>element.unsubscribe());
    }

    onChange(event:Date){
        this.scheduleService.updateDate(event);
    }

    onCloseModal(){
        this.open=false;
    }

    onUpdate(event:any){
        console.log('event',event)
        this.scheduleService.updateItems(event);
        this.onCloseModal();
    }
}