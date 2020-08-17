import{Injectable,OnInit} from '@angular/core'
import { Store } from 'src/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

export interface Workout{
    name:string,
    type:string,
    strength:any,
    endurance:any,
    timestamp:number,
    $key:string,
}

@Injectable()
export class WorkoutsService{
    constructor(private store:Store,private db:AngularFireDatabase,private authService:AuthService){
        this.authService.user.then(
            (value)=>{
                this.uid= value.uid;
                this.workouts$=this.db.list<Workout>(`workouts/${this.uid}`).snapshotChanges().pipe(
                    map((value)=>{
                        var vs:Workout[]=[];
                        value.forEach(element=>{
                            var acessor=element.payload.val();
                            vs.push({
                                $key:element.key,
                                strength:acessor.strength,
                                name:acessor.name,
                                endurance:acessor.endurance,
                                timestamp:acessor.timestamp,
                                type:acessor.type
                            })
                        })
                        return vs;
                    }),
                    tap((value)=>{
                        this.store.set('workouts',value)
                    })
                )
            }
        )
    }
    addWorkout(value:Workout){
        this.db.list(`workouts/${this.uid}`).push(value);
    }
    removeWorkout(value:string){
        this.db.list(`workouts/${this.uid}/${value}`).remove()
    }
    updateWorkout(value:Workout,key:string){
        this.db.object(`workouts/${this.uid}/${key}`).update(value)
    }

    getWorkout(key:string):Observable<Workout>{
        if(!key) {
            return of({} as Workout);
        }
        return this.store.select<Workout[]>('workouts').pipe(
            filter(Boolean),
            map((value:Workout[])=>{
                return value.find((element)=>{
                    return element.$key==key
                })
            })
        )
    }

    uid:string;
    workouts$:Observable<Workout[]>;
}