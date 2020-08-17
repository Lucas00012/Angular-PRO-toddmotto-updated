import{Component,Input,Output,EventEmitter,ChangeDetectionStrategy,OnChanges, SimpleChanges, ChangeDetectorRef, OnInit} from '@angular/core'
import { Meal } from 'src/app/health/shared/services/meals/meals.service';
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';
import{pipe} from 'rxjs'

@Component({
    selector:'schedule-assign',
    changeDetection:ChangeDetectionStrategy.Default,
    templateUrl:'schedule-assign.component.html',
    styleUrls:['schedule-assign.component.scss']
})

export class ScheduleAssignComponent implements OnInit{
    constructor(private cd:ChangeDetectorRef){
    }
    ngOnInit(): void {
        console.log('assign', this.section);
        this.selectedItems=this.section.assigned;
    }

    selectedItems:string[]=[];

    @Input() section:any;
    @Input() list:Meal[] | Workout[];
    @Output() close=new EventEmitter();
    @Output() update=new EventEmitter();

    get prop(){
        var isWorkout=this.section.type=="workouts";
        return {color: isWorkout ? "primary" : "warn", icon: isWorkout ? "fitness_center" : "favorite_border"}
    }

    getRoute(type:string){
        return [`../${type}/new`]
    }

    closeModal(){
        this.close.emit();
    }

    onSelect(name:string){
        if(this.exists(name)){
            this.selectedItems=this.selectedItems.filter((value)=>value!=name);
            return;
        }
        this.selectedItems.push(name);
    }

    updateAssign(){
        var item=this.section.data;
        item[this.section.type]=this.selectedItems;
        console.log("item",item);
        this.update.emit({
            item
        })
    }

    exists(name:string){
        return this.selectedItems.includes(name);
    }
}