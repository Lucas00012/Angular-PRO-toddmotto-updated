import{Pipe,PipeTransform} from '@angular/core'

@Pipe({
    name:'workout'
})

export class WorkoutPipe implements PipeTransform{

    transform(value: any, ...args: any[]) {
        if(value.type=="strength")
            return `Reps: ${value.strength.reps}, Sets: ${value.strength.sets}, Weigth: ${value.strength.weigth}kg`;
        return `Distance: ${value.endurance.distance}km, Duration: ${value.endurance.duration}min`
    }

}