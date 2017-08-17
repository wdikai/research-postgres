import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ResponseContainer, Dictionary, Mode } from '../models/base.model';
import { Place, Location } from '../models/place.model';
import { DBService, PLACES_STORE_NAME , TransactionType} from './db.servise';

@Injectable()
export class LocalPlaceService {
    private mode: Mode = Mode.Online;
    constructor() {
    }

    getAll(filters: Dictionary<any>): Promise<any> {
        return DBService
            .open()
            .then((db: IDBDatabase) => {
                const transaction = db.transaction([PLACES_STORE_NAME], TransactionType.ReadOnly);

                return new Promise((resolve, reject) => {
                    const result = [];
                    const request = transaction
                        .objectStore(PLACES_STORE_NAME)
                        .openCursor();

                    request.onsuccess = () => {                          
                        const cursor = request.result;
                        if(cursor) {
                            const nameFilterPassed = !filters.name || this.nameFilter(filters.name, cursor.value);
                            const typeFilterPassed = !filters.type || this.typeFilter(filters.type, cursor.value);
                            const distanceFilterPassed = !filters.latitude ||
                             !filters.longitude ||
                             this.distanceFilter(filters.latitude, filters.longitude, cursor.value, filters.distance);

                             if(nameFilterPassed && typeFilterPassed && distanceFilterPassed) {
                                 result.push(cursor.value);
                             }

                             cursor.continue();
                        } else {
                            resolve(result);
                        }
                    }
                    request.onerror = () => reject(request.error);
                })
            })
            .then(places => ({data: places}));
    }

    add(place: Place): Promise<any> {
        return DBService
            .open()
            .then((db: IDBDatabase) => {
                const transaction = db.transaction([PLACES_STORE_NAME], TransactionType.ReadWrite);

                return new Promise((resolve, reject) => {
                    const request = transaction
                        .objectStore(PLACES_STORE_NAME)
                        .put(place);

                    request.onsuccess = () => resolve(place);
                    request.onerror = () => reject(request.error);
                })
            });
    }

    private typeFilter(type, place) {
        return place.types.includes(type);
    }

    private nameFilter(name, place) {
        return new RegExp(`.*${name}.*`).test(place.name);
    }

    private distanceFilter(latitude: number, longitude: number, place: Place, distance: number = 10000) {
        let x = Math.sin(latitude * Math.PI / 180) * Math.sin(place.location.latitude * Math.PI / 180) +
            Math.cos(latitude * Math.PI / 180) * Math.cos(place.location.latitude * Math.PI / 180) * Math.cos((place.location.longitude * Math.PI / 180) - (longitude * Math.PI / 180));
        x = Math.atan((Math.sqrt(1 - Math.pow(x, 2))) / x);
        return (1.852 * 60.0 * ((x / Math.PI) * 180)) * 1000 <= distance;
    }
}