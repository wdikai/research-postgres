
import { Injectable, Injector} from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { ToasterService } from 'angular2-toaster';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


import { environment } from "../../environments/environment";

@Injectable()
export class HttpInterceptor extends Http {
    public static httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router, toaster: ToasterService): Http {
        return new HttpInterceptor(xhrBackend, requestOptions, router, toaster);
    }

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
        private router: Router,
        private toaster: ToasterService) {
        super(backend, defaultOptions);
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options), options);
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.get(url, options), options);
    }

    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        options = this.getRequestOptionArgs(options);

        return this.intercept(super.post(url, body, options), options);
    }

    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        options = this.getRequestOptionArgs(options);

        return this.intercept(super.put(url, body, options), options);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return this.intercept(super.delete(url, options), options);
    }

    private updateUrl(req: string): string {
        return environment.origin + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }

        options.headers.append('Content-Type', 'application/json');
        return options;
    }

    private intercept(observable: Observable<Response>, options?: RequestOptionsArgs): Observable<Response> {
        return observable.catch((err: Response) => {
            const error = err.json();
            this.toaster.pop("error", "Error", error.message);

            return Observable.throw(err);
        });
    }
}