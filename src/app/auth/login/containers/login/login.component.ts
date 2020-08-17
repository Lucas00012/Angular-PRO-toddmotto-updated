import {Component} from '@angular/core'
import { FormGroup } from '@angular/forms';
import{Router} from '@angular/router'

import{AuthService} from '../../../shared/services/auth/auth.service'

@Component({
    selector:'login',
    templateUrl:'login.component.html',
    styleUrls:['login.component.scss']
})

export class LoginComponent{
    error:string
    constructor(private service:AuthService,private router:Router){}
    async login(event:FormGroup){
        var fields=event.value;
        try{
            await this.service.loginUser(fields.email,fields.password)
            this.router.navigate(['/'])
        }
        catch(err){
            this.error="This user doesn't exists in our system";
        }
    }
}