import{NgModule} from '@angular/core'
import{MealsModule} from './meals/meals.module'
import{ScheduleModule} from './schedule/schedule.module'
import{WorkoutsModule} from './workouts/workouts.module'
import{SharedModule} from './shared/shared.module'


@NgModule({
    declarations:[],
    imports:[
        MealsModule,
        ScheduleModule,
        WorkoutsModule,
        SharedModule.forRoot()
    ],
    providers:[],
})

export class HealthModule{

}