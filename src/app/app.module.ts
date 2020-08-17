import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import{Store} from '../store'

import {AppComponent} from './app.component';

import{AuthModule} from './auth/auth.module'
import{MaterialModule} from './material.module'
import{HealthModule} from './health/health.module'

import{HeaderComponent} from './components/header/header.component'
import{NavComponent} from './components/nav/nav.component'

import{LoggedGuard} from './auth/shared/guards/logged.guard'


export const ROUTES:Routes=[
  {path:'',pathMatch:'full',redirectTo:'schedule'}
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    MaterialModule,
    HealthModule
  ],
  providers: [
    Store
  ],
  exports:[
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

