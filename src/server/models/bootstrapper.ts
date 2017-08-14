import { configs, DBConfig } from '../config';

import { CountryModel } from './countries';
import { PlaceModel } from './places';
import { TypeModel } from './types';
import { TypesByPlacesModel } from './typesByPlaces';

import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from 'sequelize';
import { Sequelize } from 'sequelize';

export interface SequelizeModels {
    countries: CountryModel;
    places: PlaceModel;
    types: TypeModel;
    typesByPlaces: TypesByPlacesModel;
}

export class Bootsrapper {
    private _basename: string;
    private _models: SequelizeModels;
    private _sequelize: Sequelize;

    constructor() {
        this._basename = path.basename(module.filename);
        let dbConfig: DBConfig = configs.databaseConfig;

        this._models = ({} as any);
        this._sequelize = new SequelizeStatic(
            dbConfig.database,
            dbConfig.username,
            dbConfig.password,
            dbConfig
        );

        fs
            .readdirSync(__dirname)
            .filter((file: string) => fs
                .statSync(path.join(__dirname, file))
                .isDirectory()
            )
            .forEach((file: string) => {
                const pathToModel = path.join(__dirname, file);
                const methods = require(pathToModel + '/methods').methods;
                const schema = require(pathToModel + '/schema').schema;

                const model = this._sequelize.define(file, schema(this._sequelize, SequelizeStatic), methods);
                this._models[(model as any).name] = model;
            });

        Object
            .keys(this._models)
            .forEach((modelName: string) => {
                if (typeof this._models[modelName].associate === 'function') {
                    this._models[modelName].associate(this._models);
                }
            });
    }

    public getModels(): SequelizeModels {
        return this._models;
    }

    public getSequelize(): Sequelize {
        return this._sequelize;
    }
}