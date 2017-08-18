import {
  Injectable
} from "@angular/core";
import {
  Http,
  Headers,
  Response,
  URLSearchParams
} from "@angular/http";

import {
  Observable
} from "rxjs";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/do";

import {
  DBService,
  PLACES_STORE_NAME,
  TransactionType
} from "../../services/db.servise";
import {
  BaseCRUD
} from "../../services/crud.service";
import {
  Place
} from "./place.model";
import {
  Location
} from "../location/location.model";
import {
  Mode,
  Dictionary,
  LocationFilter,
  ResponseContainer
} from "../base.model";

@Injectable()
export class PlaceService extends BaseCRUD < Place, any, any > {
  public mode: Mode = Mode.Online;

  constructor(http: Http) {
    super(http, "places", "v1");
  }

  setMode(mode: Mode) {
    this.mode = mode;
  }

  getAll(filters: LocationFilter): Observable < ResponseContainer < Place[] >> {
    if (this.mode === Mode.Online) {
      return super.getAll(filters)
        .do(response => response.data.forEach(this.cashePlace));
    }

    return Observable.fromPromise(this.getLocalPlaces(filters))
  }

  private getLocalPlaces(filters: LocationFilter): Promise < ResponseContainer<any> > {
    return DBService
      .open()
      .then((db: IDBDatabase) => {
        const transaction = db.transaction([PLACES_STORE_NAME], TransactionType.ReadOnly);

        return new Promise((resolve, reject) => {
          const result: Place[] = [];
          const request = transaction
            .objectStore(PLACES_STORE_NAME)
            .openCursor();

          request.onsuccess = () => {
            const cursor: IDBCursorWithValue = request.result;
            if (cursor) {
              const place: Place = cursor.value;
              place.distance = Location.getSphereDistance(filters, place.location);

              const nameFilterPassed = !filters.name || this.nameFilter(filters.name, cursor.value);
              const typeFilterPassed = !filters.type || this.typeFilter(filters.type, cursor.value);
              const distanceFilterPassed = place.distance < filters.distance;

              if (nameFilterPassed && typeFilterPassed && distanceFilterPassed) {
                result.push(place);
              }

              cursor.continue();
            } else {
              let limit = filters.limit > result.length ?  result.length: filters.limit;
              result.sort((a,b) => a.distance - b.distance);
              resolve(result.slice(0, limit));
            }
          }
          request.onerror = () => reject(request.error);
        })
      })
      .then(places => ({
        data: places
      }));
  }

  private cashePlace(place: Place): Promise < any > {
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

  private typeFilter(type: string, place: Place): boolean {
    return place.types.includes(type);
  }

  private nameFilter(name: string, place: Place) {
    return new RegExp(`.*${name}.*`).test(place.name);
  }
}
