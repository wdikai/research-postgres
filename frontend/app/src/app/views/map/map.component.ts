import { Component, OnInit, AfterViewInit } from "@angular/core";
import * as moment from "moment";
import * as momentTz from "moment-timezone";

import { LocationData } from "../../models/location/location.model";
import { Country } from "../../models/countries/country.model";
import { Place } from "../../models/places/place.model";

import { Mode } from "../../models/base.model";

import { PlaceService } from "../../models/places/places.servise";
import { LocationService } from "../../models/location/location.servise";
import { CountriesService } from "../../models/countries/country.servise";
import { TypesService } from "../../services/types.servise";
import { GoogleMapsAPIWrapper, MarkerManager, LatLngLiteral } from "@agm/core";

@Component({
  selector: "app-map",
  templateUrl: "map.template.html",
  styleUrls: ["map.styles.css"]
})
export class MapComponent implements OnInit {
  timezones: string = momentTz.tz.names();

  date = {
    date: "",
    time: "",
    timezone: ""
  };

  mapSearchConfig = {
    latitude: 0,
    longitude: 0,
    distance: 10000
  };
  mapConfig = {
    clickableIcons: false,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoom: 15,
  };

  mode: Mode = Mode.Offline;
  toogleStatus: string;

  country: Country;
  places: Place[] = [];

  type: string = "";
  types: string[] = [];

  name: string = "";
  limit: number = 10;

  constructor(private placeService: PlaceService,
    private locationService: LocationService,
    private typesService: TypesService,
    private countriesService: CountriesService,
    private googleMapsAPIWrapper: GoogleMapsAPIWrapper,
    private markerManager: MarkerManager) {
      this.mode = this.placeService.mode;
    }

  public toogleMode() {
    switch(this.mode) {
      case Mode.Offline:
        this.mode = Mode.Online;
        this.toogleStatus = "Online";
        break;
      case Mode.Online:
        this.mode = Mode.Offline;
        this.toogleStatus = "Offline";
        break;
    }

    this.placeService.setMode(this.mode);
    this.loadPlaces();
  }

  public ngOnInit(): void {
    this.toogleMode();
    this.loadTapes();
    this.initLocation();
  }

  public initLocation(){
    this.locationService
      .getLocation()
      .then((location) => this.setMapPosition(location))
      .catch((error) => console.error(error));
  }

  public loadPlaces(): void {
    this.placeService
      .getAll(Object.assign({
        name: this.name,
        type: this.type,
        limit: this.limit,
      }, this.mapSearchConfig))
      .subscribe(response => this.places = response.data);
  }

  getPlaceDetail(place: Place){
    const date = momentTz(this.date.date + " " + this.date.time).tz(this.date.timezone)

    this.placeService.getOne(place.id, {date: date.unix()})
    .subscribe(detail => Object.assign(place, detail.data))
  }

  public onMapClick(event): void {
    this.setMapPosition({
      latitude: event.coords.lat,
      longitude: event.coords.lng
    });
  }

  private loadCountryInformation(location: LocationData) {
    this.countriesService
      .getCurrent(location)
      .subscribe(response => this.country = response.data);
  }

  private loadTapes(): void {
    this.typesService
      .getAll()
      .subscribe(response => this.types = response.data);
  }

  private setMapPosition(location: LocationData): void {
    this.mapSearchConfig.latitude = location.latitude;
    this.mapSearchConfig.longitude = location.longitude;
    this.loadPlaces();
    this.loadCountryInformation(location)
  }
}

