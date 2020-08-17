import{Component,OnInit,OnDestroy} from '@angular/core'
import { Workout, WorkoutsService } from 'src/app/health/shared/services/workouts/workouts.service';
import{Router,ActivatedRoute} from '@angular/router'
import { Observable, Subscription } from 'rxjs';
import { switchMap,map } from 'rxjs/operators'; 
import { Store } from 'src/store';

@Component({
    selector: 'app-Workout',
    templateUrl:'Workout.component.html',
    styleUrls:['Workout.component.scss']
})

export class WorkoutComponent implements OnInit,OnDestroy{
    constructor(private WorkoutsService:WorkoutsService,
        private router:Router,
        private actRoute:ActivatedRoute,
        private store:Store){}
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    workout$:Observable<Workout>;
    subscription:Subscription;
    id:string;
    ngOnInit() {
        this.subscription=this.WorkoutsService.workouts$.subscribe();
        this.id=this.actRoute.snapshot.paramMap.get('id');
        this.workout$=this.WorkoutsService.getWorkout(this.id); 
    }

    async updateWorkout(value:Workout){
        await this.WorkoutsService.updateWorkout(value,this.id);
        this.router.navigate(['/workouts'])
    }

    async removeWorkout(){
        await this.WorkoutsService.removeWorkout(this.id)
        this.router.navigate(['/workouts']);
    }

    async addWorkout(value:Workout){
        console.log('oi')
        await this.WorkoutsService.addWorkout(value);
        this.router.navigate(['/workouts'])
    }
}