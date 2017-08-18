import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';

import { LocationData } from './location.model';

@Injectable()
export class LocationService {
    constructor() {    }

    getLocation(): Promise<LocationData> {
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
                reject(new Error("Api does not support"));
            }
        });
}
}