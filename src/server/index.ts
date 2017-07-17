import 'reflect-metadata';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from "typedi";
import { Express } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";

useContainer(Container);

export default class Application {
    private _handler: Express;

    constructor() {
        let handler: Express = express();

        this._glabalConfigure(handler);
        this._handler = handler;

        useExpressServer(handler, {
            routePrefix: "/api",

            useClassTransformer: true,
            defaultErrorHandler: false,

            controllers: [__dirname + "/controllers/**/*.js"],
            // interceptors: [__dirname + "/interceptors/**/*.js"],
            // middlewares: [__dirname + "/middlewares/**/*.js"]
        });
    }

    public get handler() { return this._handler; }

    private _glabalConfigure(app: Express) {
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.raw({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({ extended: true }));
    }

}