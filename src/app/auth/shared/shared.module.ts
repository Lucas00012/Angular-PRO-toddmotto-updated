import{NgModule, ModuleWithProviders} from '@angular/core'
import{CommonModule} from '@angular/common'
import {AuthFormComponent} from './components/auth-form/auth-form.component'
import{ReactiveFormsModule,FormsModule} from '@angular/forms'
import{MaterialModule} from '../../material.module'
import {AuthService} from './services/auth/auth.service'
import{AuthGuard} from './guards/auth.guard'
import{LoggedGuard} from './guards/logged.guard'

@NgModule({
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule
    ],
    declarations:[
        AuthFormComponent
    ],
    providers:[
        
    ],
    exports:[
        AuthFormComponent
    ]
})

export class SharedModule{
    static forRoot():ModuleWithProviders<any>{
        return{
            ngModule:SharedModule,
            providers:[
                AuthService,
                AuthGuard,
                LoggedGuard
            ]
        }
    }
}