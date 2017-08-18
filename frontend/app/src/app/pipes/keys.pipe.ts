import { PipeTransform, Pipe } from "@angular/core";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] 

@Pipe({ name: 'keys',  pure: false })
export class KeysPipe implements PipeTransform {
    transform(value: any): any {
        return Object.keys(value || {});
    }
}