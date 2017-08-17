import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, Http, RequestOptions } from '@angular/http';
import { RouterModule, Router } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';

import { ROUTES } from "./app.routes";
import { AppComponent } from './app.component';

// App views
import { MapModule } from "./views/map/map.module";

// App modules/components
import { LayoutsModule } from "./components/common/layouts/layouts.module";

import { HttpInterceptor } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,

    // Views
    MapModule,
    // Modules
    LayoutsModule,

    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: Http,
      useFactory: HttpInterceptor.httpFactory,
      deps: [XHRBackend, RequestOptions, Router, Injector]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
