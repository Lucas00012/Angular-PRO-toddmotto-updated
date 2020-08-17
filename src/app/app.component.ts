import { Component,OnInit,OnDestroy } from '@angular/core';
import{Store} from '../store'
import{Router} from '@angular/router'
import{AuthService,User} from './auth/shared/services/auth/auth.service'
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  constructor(private store:Store,private service:AuthService,private route:Router){}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription=this.service.auth$.subscribe();
    this.user$=this.store.select<User>('user')
  }
  logoutUser(){
    this.service.logoutUser();
  }

  user$:Observable<User>;
  subscription:Subscription
}
