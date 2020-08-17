import {Component,ChangeDetectionStrategy,EventEmitter, Output, Input,OnChanges, SimpleChanges} from '@angular/core'
import{FormArray,FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms'
import { Workout } from 'src/app/health/shared/services/Workouts/Workouts.service';
import { elementAt } from 'rxjs/operators';


@Component({
    changeDetection:ChangeDetectionStrategy.OnPush,
    selector:'workout-form',
    templateUrl:'workout-form.component.html',
    styleUrls:['workout-form.component.scss']
})

export class WorkoutFormComponent implements OnChanges{
    constructor(private fb:FormBuilder){}

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['workout']){
            if(this.checkWorkout){
                this.form.patchValue(this.workout)
            }
        }
    }

    @Input() workout:Workout;
    @Output() submitted=new EventEmitter<Workout>();
    @Output() update=new EventEmitter<Workout>();
    @Output() remove=new EventEmitter();

    toggle:boolean=false;

    form=this.fb.group({
        name:['',Validators.required],
        type:'strength',
        strength:this.fb.group({
            reps:0,
            sets:0,
            weigth:0
        }),
        endurance:this.fb.group({
            distance:0,
            duration:0
        })
    });

    onToggle(){
        this.toggle=!this.toggle
    }

    updateWorkout(){
        if(this.form.valid)
            this.update.emit(this.form.value)
    }

    get checkWorkout(){
        if(!this.workout) return false;
        return Object.keys(this.workout).length>0;
    }

    onRemove(){
        this.remove.emit();
    }

    createWorkout(){
        if(this.form.valid)
            this.submitted.emit(this.form.value);
    }

    hasError(field:string,error:string):boolean{
        var obj=this.form.get(field);
        return obj.hasError(error)
    }
}