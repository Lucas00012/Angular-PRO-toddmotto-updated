import {Component} from '@angular/core'
import { FormGroup } from '@angular/forms';

import{Router} from '@angular/router'

import{AuthService} from '../../../shared/services/auth/auth.service'

@Component({
    selector:'register',
    templateUrl:'register.component.html',
    styleUrls:['register.component.scss']
})

export class RegisterComponent{
    error:string;
    constructor(private service:AuthService,private router:Router){}

    async register(event:FormGroup){
        var fields=event.value;
        try{
            await this.service.createUser(fields.email,fields.password)
            this.router.navigate(['/'])
        }
        catch(err){
            this.error=err;
        }
    }
}