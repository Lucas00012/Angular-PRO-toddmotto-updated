import{Injectable} from '@angular/core'
import{Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import{AuthService} from '../services/auth/auth.service'
import { map,tap } from 'rxjs/operators'

@Injectable()
export class LoggedGuard implements CanActivate{
    constructor(private authService:AuthService, private router:Router){}
    
    canActivate(){
        return this.authService.authState.pipe(
            map((value)=>{
                if(value){
                    this.router.navigate(['/schedule']);
                    return false;
                }
                return true;
            })
        )
    }
}