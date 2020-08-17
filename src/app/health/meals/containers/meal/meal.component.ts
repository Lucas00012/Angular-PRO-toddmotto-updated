import{Component,OnInit,OnDestroy} from '@angular/core'
import { Meal, MealsService } from 'src/app/health/shared/services/meals/meals.service';
import{Router,ActivatedRoute} from '@angular/router'
import { Observable, Subscription } from 'rxjs';
import { switchMap,map } from 'rxjs/operators'; 
import { Store } from 'src/store';

@Component({
    selector: 'app-meal',
    templateUrl:'meal.component.html',
    styleUrls:['meal.component.scss']
})

export class MealComponent implements OnInit,OnDestroy{
    constructor(private mealsService:MealsService,
        private router:Router,
        private actRoute:ActivatedRoute,
        private store:Store){}
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    meal$:Observable<Meal>;
    subscription:Subscription;
    id:string;
    ngOnInit() {
        this.subscription=this.mealsService.meals$.subscribe();
        this.id=this.actRoute.snapshot.paramMap.get('id');
        this.meal$=this.mealsService.getMeal(this.id); 
    }

    async updateMeal(value:Meal){
        await this.mealsService.updateMeal(value,this.id);
        this.router.navigate(['/meals'])
    }

    async removeMeal(){
        await this.mealsService.removeMeal(this.id)
        this.router.navigate(['/meals']);
    }

    async addMeal(value:Meal){
        await this.mealsService.addMeal(value);
        this.router.navigate(['/meals'])
    }
}