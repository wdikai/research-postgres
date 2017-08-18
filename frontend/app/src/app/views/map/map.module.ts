import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AgmCoreModule, AgmPolygon, GoogleMapsAPIWrapper, MarkerManager} from "@agm/core";

import {MapComponent} from "./map.component";
import {PlaceService} from "../../models/places/places.servise";
import {LocationService} from "../../models/location/location.servise";
import {CountriesService} from "../../models/countries/country.servise";

import {TypesService} from "../../services/types.servise";

import {KeysPipe} from "../../pipes/keys.pipe";
import {WeekDayPipe} from "../../pipes/weekDay.pipe";
import {WorkTimePipe} from "../../pipes/workTime.pipe";

@NgModule({
  declarations: [MapComponent, KeysPipe, WeekDayPipe, WorkTimePipe],
  imports: [FormsModule, CommonModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCUGT0IvnM-bUl6bCGzsqSO2OvxzJxBHFs"
    })
  ],
  providers: [PlaceService, LocationService, TypesService, CountriesService, GoogleMapsAPIWrapper, MarkerManager]
})

export class MapModule {}

