import { Observable,BehaviorSubject } from 'rxjs';
import { distinctUntilChanged,pluck } from 'rxjs/operators';

import{User} from './app/auth/shared/services/auth/auth.service'
import { Meal } from './app/health/shared/services/meals/meals.service';
import { Workout } from './app/health/shared/services/workouts/workouts.service';
import { ScheduleItem } from './app/health/shared/services/schedule/schedule.service';
 
export interface State {
    user:User
    meals:Meal[]
    date:Date
    list:any
    selected:any
    workouts:Workout[]
    schedule:ScheduleItem[]
    [key: string]: any
  }
  
  const state: State = {
    user:undefined,
    list:undefined,
    selected:undefined,
    workouts:undefined,
    schedule:undefined,
    date:undefined,
    meals:undefined
  };
  
  export class Store {
  
    private subject = new BehaviorSubject<State>(state);
    private store = this.subject.asObservable().pipe(distinctUntilChanged());
  
    get value() {
      return this.subject.value;
    }
  
    select<T>(name: string): Observable<T> {
      return this.store.pipe(pluck(name));
    }
  
    set(name: string, state: any) {
      this.subject.next({ ...this.value, [name]: state });
    }
  
  }