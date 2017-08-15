import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ResponseContainer, Dictionary } from '../models/base.model';

@Injectable()
export class BaseCRUD<BaseModel, CreateBody, UpdateBody> {
    protected http: Http;
    protected url: string;

    constructor(http: Http, resourse: string = '', version: string = 'v1') {
        this.http = http;
        this.url = `/api/${version}/${resourse}`;
    }

    getAll(filters: Dictionary<any>): Observable<ResponseContainer<BaseModel[]>> {
        return this.http
            .get(this.url, {params: filters})
            .map((response: Response) => response.json());
    }

    getOne(id: number, params: Dictionary<any>): Observable<ResponseContainer<BaseModel>> {
        return this.http
            .get(`${this.url}/${id}`, {params: params})
            .map((response: Response) => response.json());
    }

    add(body: CreateBody): Observable<ResponseContainer<BaseModel>> {
        return this.http
            .post(this.url, body)
            .map((response: Response) => response.json());
    }

    edit(id: number, body: UpdateBody): Observable<ResponseContainer<BaseModel>> {
        return this.http
            .put(`${this.url}/${id}`, body)
            .map((response: Response) => response.json());
    }

    remove(id): Observable<ResponseContainer<any>> {
        return this.http
            .delete(`${this.url}/${id}`)
            .map((response: Response) => response.json());
    }
}