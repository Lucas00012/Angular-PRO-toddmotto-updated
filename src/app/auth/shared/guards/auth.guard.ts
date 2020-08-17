import{Injectable} from '@angular/core'
import{Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import{AuthService} from '../services/auth/auth.service'
import { map,tap } from 'rxjs/operators'

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router:Router,private service:AuthService){}

    canActivate(){
        return this.service.authState.pipe(
            map((value)=>{
                if(!value){
                    this.router.navigate(['/auth/login'])
                    return false;
                }
                return true
            }
            )
        )
    }
}