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
  ResponseContainer,
  Dictionary,
  Mode
} from "../models/base.model";

import {
  BaseCRUD
} from "./crud.service";

@Injectable()
export class TypesService extends BaseCRUD < string, any, any > {

  constructor(http: Http) {
    super(http, "types", "v1");
  }
  getAll(): Observable < ResponseContainer < string [] >> {
    return super.getAll();
  }
}
