import {Component,OnInit,OnDestroy} from '@angular/core'
import{WorkoutsService, Workout} from '../../../shared/services/workouts/workouts.service'
import { Observable, Subscription } from 'rxjs'
import { Store } from 'src/store';


@Component({
    templateUrl:'workouts.component.html',
    styleUrls:['workouts.component.scss']
})

export class WorkoutsComponent implements OnDestroy,OnInit{
    workouts$:Observable<Workout[]>;
    subscription:Subscription;

    constructor(private workoutService:WorkoutsService,private store:Store){}
    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
    ngOnInit(): void {
        this.subscription=this.workoutService.workouts$.subscribe();
        this.workouts$=this.store.select<Workout[]>('workouts');
    }
    removeWorkout(value:Workout){
        this.workoutService.removeWorkout(value.$key);
    }
}