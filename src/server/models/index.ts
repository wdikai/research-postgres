import {
    configs,
    DBConfig
} from '../config';
import {
    CountryAttributes,
    CountryInstance
} from './countries';
import {
    PlaceModel
} from './places';

import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from 'sequelize';
import {
    Sequelize
} from 'sequelize';

let database;

export interface SequelizeModels {
    countries: SequelizeStatic.Model < CountryInstance, CountryAttributes > ;
    places: PlaceModel ;
}

class Database {
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

    public getSequelize() {
        return this._sequelize;
    }
}

export default database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();