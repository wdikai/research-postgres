import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager} from '@agm/core';

import {MapComponent} from "./map.component";
import {PlaceService} from "../../services/places.servise";
import {LocalPlaceService} from "../../services/local.places.servise";

@NgModule({
  declarations: [MapComponent],
  imports: [FormsModule, CommonModule,

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUGT0IvnM-bUl6bCGzsqSO2OvxzJxBHFs'
    })
  ],
  providers: [PlaceService, LocalPlaceService, GoogleMapsAPIWrapper, MarkerManager]
})

export class MapModule {}

