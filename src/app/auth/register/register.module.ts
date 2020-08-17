import{NgModule} from '@angular/core'
import{CommonModule} from '@angular/common'
import{RouterModule,Routes} from '@angular/router'
import{MaterialModule} from '../../material.module'

import{RegisterComponent} from './containers/register/register.component'

import{SharedModule} from '../shared/shared.module'

const ROUTES:Routes=[
]

@NgModule({
    imports:[
        RouterModule.forChild(ROUTES),
        CommonModule,
        SharedModule,
        MaterialModule
    ],
    declarations:[
        RegisterComponent
    ],
    providers:[],
})

export class RegisterModule{

}