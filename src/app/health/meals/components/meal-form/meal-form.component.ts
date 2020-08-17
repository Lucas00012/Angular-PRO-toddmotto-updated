import {Component,ChangeDetectionStrategy,EventEmitter, Output, Input,OnChanges, SimpleChanges} from '@angular/core'
import{FormArray,FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms'
import { Meal } from 'src/app/health/shared/services/meals/meals.service';
import { elementAt } from 'rxjs/operators';


@Component({
    changeDetection:ChangeDetectionStrategy.OnPush,
    selector:'meal-form',
    templateUrl:'meal-form.component.html',
    styleUrls:['meal-form.component.scss']
})

export class MealFormComponent implements OnChanges{
    constructor(private fb:FormBuilder){}

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['meal']){
            if(this.checkMeal){
                this.ingredients.clear();
                this.form.get('name').setValue(this.meal.name);
                this.meal.ingredients.forEach(element=>{
                    this.ingredients.push(this.fb.control(element,[Validators.required]))
                })
            }
        }
    }

    @Input() meal:Meal;
    @Output() submitted=new EventEmitter<Meal>();
    @Output() update=new EventEmitter<Meal>();
    @Output() remove=new EventEmitter();

    toggle:boolean=false;

    form=this.fb.group({
        name:['',Validators.required],
        ingredients:this.fb.array([
            this.fb.control('',[Validators.required])
        ])
    });

    get ingredients(){
        return this.form.get('ingredients') as FormArray
    }

    onToggle(){
        this.toggle=!this.toggle
    }

    updateMeal(){
        if(this.form.valid)
            this.update.emit(this.form.value)
    }

    get checkMeal(){
        if(!this.meal) return false;
        return Object.keys(this.meal).length>0;
    }

    onRemove(){
        this.remove.emit();
    }

    createMeal(){
        if(this.form.valid)
            this.submitted.emit(this.form.value);
    }
    addIngredient(){
        this.ingredients.push(new FormControl('',[Validators.required]))
    }

    removeIngredient(i){
        this.ingredients.removeAt(i);
    }

    hasError(field:string,error:string):boolean{
        var obj=this.form.get(field);
        return obj.hasError(error)
    }
    hasErrorIngredients(i:number,error:string):boolean{
        return this.ingredients.controls[i].hasError(error);
    }
}