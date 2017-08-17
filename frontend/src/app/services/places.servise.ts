import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';

import { ResponseContainer, Dictionary, Mode } from '../models/base.model';
import { Place } from '../models/place.model';

import { BaseCRUD } from './crud.service';
import { LocalPlaceService } from './local.places.servise';

@Injectable()
export class PlaceService extends BaseCRUD<Place, any, any> {
    private mode: Mode = Mode.Online;
    private localPlaceService: LocalPlaceService;

    constructor(http: Http, localPlaceService:LocalPlaceService) {
        super(http, "places", "v1");
        this.localPlaceService = localPlaceService;
    }

    setMode(mode: Mode) {
        this.mode = mode;
    }

    getAll(filters: Dictionary<any>): Observable<ResponseContainer<any>> {
        if(this.mode === Mode.Online) {
            return super.getAll(filters)
            .do(response => response.data.forEach(this.localPlaceService.add));
        }

        return Observable.fromPromise(this.localPlaceService.getAll(filters))
    }

    getMyLocation() {
        return new Promise((resolve, reject) => {
            if (window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation
                    .getCurrentPosition((result) => {
                            resolve({
                                latitude: result.coords.latitude,
                                longitude: result.coords.longitude
                            });
                        },
                        reject
                    );
            } else {
                reject();
            }
        });
}
}