import { PipeTransform, Pipe } from "@angular/core";
import {WorkPeriod} from "../models/places/place.model"

@Pipe({ name: "workTime" })
export class WorkTimePipe implements PipeTransform {
    transform(workTime?: WorkPeriod) {
        if(!workTime) return "closed";
        return `${workTime.openAt} - ${workTime.closeAt}`;
    }
}