import{Component, forwardRef} from '@angular/core'
import{ControlValueAccessor,NG_VALUE_ACCESSOR} from '@angular/forms'

const ACESSOR={
    provide:NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WorkoutTypeComponent),
    multi: true 
}

@Component({
    providers:[ACESSOR],
    selector:'workout-type',
    templateUrl:'workout-type.component.html',
    styleUrls:['workout-type.component.scss']
})

export class WorkoutTypeComponent implements ControlValueAccessor{

    options=['strength','endurance']

    value:string;
    private onChange:Function;
    private onTouched:Function;

    writeValue(value:string): void {
        this.value=value;
    }
    registerOnChange(fn: Function): void {
        this.onChange=fn;
    }
    registerOnTouched(fn: Function): void {
        this.onTouched=fn;
    }
    setSelected(value:string){
        this.value=value
        this.onChange(this.value)
        this.onTouched();
    }





    setDisabledState?(isDisabled: boolean): void {
        //IGNORE
    }
    
}