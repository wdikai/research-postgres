import {
  Injectable
} from '@angular/core';
import {
  Http,
  Headers,
  Response,
  URLSearchParams
} from '@angular/http';

import {
  Observable
} from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';

import {
  DBService,
  PLACES_STORE_NAME,
  TransactionType
} from '../../services/db.servise';
import {
  BaseCRUD
} from '../../services/crud.service';
import {
  Country
} from './country.model';
import {
  Location
} from '../location/location.model';
import {
  Mode,
  Dictionary,
  LocationFilter,
  ResponseContainer
} from '../base.model';

@Injectable()
export class CountriesService extends BaseCRUD < Country, any, any > {
  constructor(http: Http) {
    super(http, "countries", "v1");
  }

  getAll(filters: LocationFilter): Observable < ResponseContainer < Country[] >> { 
      return super.getAll(filters);
  }

  getCurrent(location: Location) : Observable<ResponseContainer<Country>>{
    return super.getOne("current", location);
  }
}
