import{NgModule} from '@angular/core'
import{CommonModule} from '@angular/common'
import{RouterModule,Routes} from '@angular/router'
import{LoginComponent} from './containers/login/login.component'
import{SharedModule} from '../shared/shared.module'
import{MaterialModule} from '../../material.module'

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
        LoginComponent
    ],
    providers:[],
})

export class LoginModule{

}