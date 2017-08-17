import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";
import {NavigationComponent} from "./navigation.component";

@NgModule({
    declarations: [NavigationComponent],
    imports     : [BrowserModule, RouterModule, HttpModule],
    exports     : [NavigationComponent],
})

export class NavigationModule {}