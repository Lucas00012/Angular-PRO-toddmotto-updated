import{ Injectable } from '@angular/core'
import { Store } from 'src/store'
import { tap, map, filter, switchMap,withLatestFrom } from 'rxjs/operators'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import{AngularFireDatabase, QueryFn} from '@angular/fire/database'
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';

export interface ScheduleItem{
    meals:string[],
    workouts:string[],
    section:string,
    creation:number,
    $key?:string,
}

export interface ScheduleList{
    morning?:ScheduleItem,
    lunch?:ScheduleItem,
    evening?:ScheduleItem,
    snacks?:ScheduleItem,
    [key:string]:any,
}

@Injectable()
export class ScheduleService{
    constructor(private store:Store,private authService:AuthService,private db:AngularFireDatabase){
        this.authService.user.then((value)=>{
            this.uid$=value.uid
        })

    }

    uid$:string;
    private date$=new BehaviorSubject(new Date());
    private section$=new Subject();
    private itemList$=new Subject();

    item$=this.itemList$.pipe(
        withLatestFrom(this.section$),
        map(([value,section]:any[])=>{
            const acessor=value.item;
            const id=section.data.$key;
            const payload={
                workouts:acessor.workouts?acessor.workouts:null,
                meals:acessor.meals?acessor.meals:null,
                section:section.section,
                creation:new Date(section.year,section.month,section.day).getTime(),
            }

            if(id)
                return this.updateSection(id,payload);
            else
                return this.createSection(payload)

        })
    )

    list$=this.section$.pipe(
        map((value:any)=>this.store.value[value.type]),
        tap((value:any)=>this.store.set('list',value))
    );

    selected$=this.section$.pipe(
        tap((value)=>this.store.set('selected',value))
    )

    schedule$:Observable<ScheduleItem[]>=this.date$.pipe(
        tap((value:any)=>{
            this.store.set('date',value)
        }),
        map((day:Date)=>{
            const startAt=(
                new Date(day.getFullYear(),day.getMonth(),day.getDate())
            ).getTime();
            const endAt=(
                new Date(day.getFullYear(),day.getMonth(),day.getDate()+1)
            ).getTime()-1;
            return {startAt,endAt}
        }),
        switchMap(({startAt,endAt}:any)=>{
            return this.getSchedule(startAt,endAt);
        }),
        map((data:any)=>{
            const mapped:ScheduleList={};

            for(const prop of data){
                if(!mapped[prop.section])
                    mapped[prop.section]=prop; //apesar do obj ser ScheduleList, o conteúdo é ScheduleItem(somente)!
            }
            return mapped
        }),
        tap((value:any)=>this.store.set('schedule',value))
    )

    updateDate(value:Date){
        this.date$.next(value);
    }

    updateItems(items:string[]){
        this.itemList$.next(items);
    }

    private createSection(payload:ScheduleItem){
        return this.db.list(`schedule/${this.uid$}`).push(payload);
    }

    private updateSection(key:string,payload:ScheduleItem){
        return this.db.object(`schedule/${this.uid$}/${key}`).update(payload);
    }

    selectSection(event:any){
        this.section$.next(event);
    }

    private getSchedule(startAt:number,endAt:number):Observable<ScheduleItem[]>{
        var query:QueryFn;
        query=query=>query.orderByChild('creation').startAt(startAt).endAt(endAt);

        return this.db.list<ScheduleItem>(`schedule/${this.uid$}`,query).snapshotChanges()
        .pipe(
            map((value)=>{
                var vs:ScheduleItem[]=[];
                value.forEach(element=>{
                    const acessor=element.payload.val();
                    vs.push({
                        $key:element.key,
                        meals:acessor.meals,
                        workouts:acessor.workouts,
                        creation:acessor.creation,
                        section:acessor.section
                    })
                })
                return vs;
            })
        );
    }

}
