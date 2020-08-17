import {Component,OnInit,OnDestroy} from '@angular/core'
import{MealsService, Meal} from '../../../shared/services/meals/meals.service'
import { Observable, Subscription } from 'rxjs'
import { Store } from 'src/store';


@Component({
    selector:'app-meals',
    templateUrl:'meals.component.html',
    styleUrls:['meals.component.scss']
})

export class MealsComponent implements OnDestroy,OnInit{
    meals$:Observable<Meal[]>;
    subscription:Subscription;

    constructor(private mealsService:MealsService,private store:Store){}
    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
    ngOnInit(): void {
        this.subscription=this.mealsService.meals$.subscribe();
        this.meals$=this.store.select<Meal[]>('meals');
    }
    removeMeal(value:Meal){
        this.mealsService.removeMeal(value.$key);
    }
}