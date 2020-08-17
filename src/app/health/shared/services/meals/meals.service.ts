import{Injectable,OnInit} from '@angular/core'
import { Store } from 'src/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

export interface Meal{
    name:string,
    ingredients:string[],
    $key:string,
}

@Injectable()
export class MealsService{
    constructor(private store:Store,private db:AngularFireDatabase,private authService:AuthService){
        this.authService.user.then(
            (value)=>{
                this.uid= value.uid;
                this.meals$=this.db.list<Meal>(`meals/${this.uid}`).snapshotChanges().pipe(
                    map((value)=>{
                        var vs:Meal[]=[];
                        value.forEach(element=>{
                            vs.push({
                                $key:element.key,
                                ingredients:element.payload.val().ingredients,
                                name:element.payload.val().name,
                            })
                        })
                        return vs;
                    }),
                    tap((value)=>{
                        this.store.set('meals',value)
                    })
                )
            }
        )
    }
    addMeal(value:Meal){
        this.db.list(`meals/${this.uid}`).push(value);
    }
    removeMeal(value:string){
        this.db.list(`meals/${this.uid}/${value}`).remove()
    }
    updateMeal(value:Meal,key:string){
        this.db.object(`meals/${this.uid}/${key}`).update(value)
    }

    getMeal(key:string):Observable<Meal>{
        if(!key) {
            return of({} as Meal);
        }
        return this.store.select<Meal[]>('meals').pipe(
            filter(Boolean),
            map((value:Meal[])=>{
                return value.find((element)=>{
                    return element.$key==key
                })
            })
        )
    }

    uid:string;
    meals$:Observable<Meal[]>;
}