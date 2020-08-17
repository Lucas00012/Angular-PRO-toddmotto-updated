import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule,Routes} from '@angular/router'

import {RegisterModule} from './register/register.module'
import{LoginModule} from './login/login.module'
import{MaterialModule} from '../material.module'
import{SharedModule} from './shared/shared.module'

import{AngularFireModule,FirebaseAppConfig} from '@angular/fire';
import{AngularFireAuthModule} from '@angular/fire/auth'
import{AngularFireDatabaseModule} from '@angular/fire/database'

import {LoginComponent} from './login/containers/login/login.component'
import{RegisterComponent} from './register/containers/register/register.component'

import{LoggedGuard} from './shared/guards/logged.guard'

const ROUTES:Routes=[
    {
        path:'auth',canActivate:[LoggedGuard],
        children:[
            {path:'',pathMatch:'full',redirectTo:'login'},
            {path:'login',component:LoginComponent},
            {path:'register',component:RegisterComponent}
        ]
    }
]

const firebaseConfig:FirebaseAppConfig = {
    
    apiKey: "AIzaSyB9XRg-FSKBqEr0ip_auSJbqLcpSKyk__4",
    authDomain: "fitness-app-6e31d.firebaseapp.com",
    databaseURL: "https://fitness-app-6e31d.firebaseio.com",
    projectId: "fitness-app-6e31d",
    storageBucket: "fitness-app-6e31d.appspot.com",
    messagingSenderId: "522827311905",
    appId: "1:522827311905:web:034b5d37437198d4e8ec60",
    measurementId: "G-1J51SCSFG4"
};

@NgModule({
    imports:[
        CommonModule,
        RouterModule.forChild(ROUTES),
        RegisterModule,
        LoginModule,
        MaterialModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        SharedModule.forRoot()
    ],
    declarations:[],
    providers:[]
})

export class AuthModule{

}