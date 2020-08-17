import{NgModule} from '@angular/core'
import{CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import{RouterModule,Routes} from '@angular/router'
import{MaterialModule} from 'src/app/material.module'
import{SharedModule} from '../shared/shared.module'


import{ScheduleComponent} from './containers/schedule/schedule.component'
import{ScheduleCalendarComponent} from './components/schedule-calendar/schedule-calendar.component'
import{ScheduleControlsComponent} from './components/schedule-controls/schedule-controls.component'
import{ScheduleDaysComponent} from './components/schedule-days/schedule-days.component'
import{ScheduleSectionComponent} from './components/schedule-section/schedule-section.component'
import{ScheduleAssignComponent} from './components/schedule-assign/schedule-assign.component'

import{AuthGuard} from '../../auth/shared/guards/auth.guard'

const ROUTES:Routes=[
    {path:'schedule',canActivate:[AuthGuard],component:ScheduleComponent}
]

@NgModule({
    declarations:[
        ScheduleComponent,
        ScheduleCalendarComponent,
        ScheduleControlsComponent,
        ScheduleDaysComponent,
        ScheduleAssignComponent,
        ScheduleSectionComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    providers:[]
})

export class ScheduleModule{

}