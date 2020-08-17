import{NgModule} from '@angular/core'
import{CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import{RouterModule,Routes} from '@angular/router'
import{MaterialModule} from 'src/app/material.module'
import{SharedModule} from '../shared/shared.module'
import{WorkoutsComponent} from './containers/workouts/workouts.component'
import{WorkoutComponent} from './containers/workout/workout.component'
import{WorkoutFormComponent} from './components/workout-form/workout-form.component'
import{WorkoutTypeComponent} from './components/workout-type/workout-type.component'

import{AuthGuard} from '../../auth/shared/guards/auth.guard'

const ROUTES:Routes=[
    {path:'workouts',canActivate:[AuthGuard],children:[
            {path:'',component:WorkoutsComponent},
            {path:'new',component:WorkoutComponent},
            {path:':id',component:WorkoutComponent}
        ],
    }
]

@NgModule({
    declarations:[
        WorkoutsComponent,
        WorkoutComponent,
        WorkoutFormComponent,
        WorkoutTypeComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        RouterModule.forChild(ROUTES),

    ],
    providers:[]
})

export class WorkoutsModule{

}