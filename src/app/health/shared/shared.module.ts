import{NgModule,ModuleWithProviders} from '@angular/core'
import{CommonModule} from '@angular/common'
import{RouterModule} from '@angular/router'
import{MaterialModule} from 'src/app/material.module'
import{AngularFireDatabaseModule} from '@angular/fire/database'

import{ListItemComponent} from './components/list-item/list-item.component'

import{MealsService} from './services/meals/meals.service'
import {WorkoutsService} from './services/workouts/workouts.service'
import{ScheduleService} from './services/schedule/schedule.service'

import{JoinPipe} from './pipes/join.pipe'
import{WorkoutPipe} from './pipes/workout.pipe'

@NgModule({
    imports:[
        CommonModule,
        RouterModule,
        MaterialModule,
        AngularFireDatabaseModule
    ],
    declarations:[
        JoinPipe,
        WorkoutPipe,
        ListItemComponent,
    ],
    exports:[
        ListItemComponent,
        JoinPipe,
    ]
})

export class SharedModule{
    static forRoot():ModuleWithProviders<any>{
        return{
            ngModule:SharedModule,
            providers:[
                MealsService,
                WorkoutsService,
                ScheduleService
            ]
        }
    }
}