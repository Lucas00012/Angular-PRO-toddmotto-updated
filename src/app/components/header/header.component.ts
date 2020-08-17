import{Component, ChangeDetectionStrategy} from '@angular/core'

@Component({
    changeDetection:ChangeDetectionStrategy.OnPush,
    selector:'app-header',
    templateUrl:'header.component.html',
    styleUrls:['header.component.scss']
})

export class HeaderComponent{

}