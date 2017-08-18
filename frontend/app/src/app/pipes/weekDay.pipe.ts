import { PipeTransform, Pipe } from "@angular/core";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] 

@Pipe({ name: "weekDay" })
export class WeekDayPipe implements PipeTransform {
    transform(dayNumber : number) {
        return days[dayNumber - 1] || "";
    }
}