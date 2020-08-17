import {Component,EventEmitter,Output} from '@angular/core'
import{FormBuilder,FormGroup,Validators, AbstractControl} from '@angular/forms'

@Component({
    selector:'auth-form',
    templateUrl:'auth-form.component.html',
    styleUrls:['auth-form.component.scss']
})

export class AuthFormComponent{
    @Output() submitted=new EventEmitter<FormGroup>();

    form=this.fb.group({
        email:['',Validators.email],
        password:['',Validators.required]
    })

    constructor(private fb:FormBuilder){}

    onSubmit():void{
        if(this.form.valid) this.submitted.emit(this.form)
    }
    hasError(field:string,error:string):boolean{
        var control:AbstractControl=this.form.get(field)
        return control.hasError(error)
    }

}