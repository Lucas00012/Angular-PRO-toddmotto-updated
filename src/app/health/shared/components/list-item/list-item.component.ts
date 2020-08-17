import{Component, Input,Output,EventEmitter} from '@angular/core'

@Component({
    selector:'list-item',
    templateUrl:'list-item.component.html',
    styleUrls:['list-item.component.scss']
})

export class ListItemComponent{
    @Input() element:any;
    @Output() remove=new EventEmitter<any>();

    toggle:boolean=false;

    onRemove(){
        this.remove.emit(this.element);
    }
    onToggle(){
        this.toggle=!this.toggle;
    }
    getRoute(item:any){
        return[
            item.ingredients?'/meals':'/workouts',
            item.$key
        ]
    }
}