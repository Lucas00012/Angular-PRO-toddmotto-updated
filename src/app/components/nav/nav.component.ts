import{Component, ChangeDetectionStrategy,Input,Output,EventEmitter} from '@angular/core'
import { User } from 'src/app/auth/shared/services/auth/auth.service'

@Component({
    changeDetection:ChangeDetectionStrategy.OnPush,
    selector:'app-nav',
    templateUrl:'nav.component.html',
    styleUrls:['nav.component.scss']
})

export class NavComponent{
    @Input() user:User
    @Output() logout=new EventEmitter();

    onLogout(){
        this.logout.emit();
    }
}