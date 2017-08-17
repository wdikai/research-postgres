import {
  Component,
  OnInit,
  AfterViewInit
} from "@angular/core";
import {
  PlaceService
} from "../../services/places.servise";
import {
  GoogleMapsAPIWrapper,
  MarkerManager
} from '@agm/core';

declare var MarkerClusterer: any;

@Component({
  selector: "app-map",
  templateUrl: "map.template.html",
  styleUrls: ["map.styles.css"]
})
export class MapComponent implements OnInit, AfterViewInit {
  mapSearchConfig = {
    latitude: 0,
    longitude: 0,
    distance: 100000
  };
  mapConfig = {
    clickableIcons: false,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoom: 15,
  };
  places: any[] = [];
  name: string = '';
  type: string = '';

  clusterer: any;

  constructor(private placeService: PlaceService,
    private googleMapsAPIWrapper: GoogleMapsAPIWrapper,
    private markerManager: MarkerManager) {}

  ngOnInit(): void {
    this.placeService
      .getMyLocation()
      .then((location) => this.setMapPosition(location))
      .catch(() => console.error("Not summort geo location"));
  }

  ngAfterViewInit(): void {
    this.googleMapsAPIWrapper.getNativeMap()
      .then(map => {
        this.clusterer = new MarkerClusterer(map, ( < any > this.markerManager)._markers, {
          imagePath: 'assets/img/pin',
          imageExtension: 'png',
        });
      });
  }

  loadPlaces() {
    this.placeService
      .getAll(Object.assign({
        name: this.name,
        type: this.type,
        limit: 1000
      }, this.mapSearchConfig))
      .subscribe(response => this.places = response.data);
  }

  public onMapClick(event): void {
    this.setMapPosition({
      latitude: event.coords.lat,
      longitude: event.coords.lng
    });
  }

  zoomChange(event) {
    console.log(event);
  }

  setMapPosition(location) {
    this.mapSearchConfig.latitude = location.latitude;
    this.mapSearchConfig.longitude = location.longitude;
    this.loadPlaces();
  }
}
