import {DBConfig, dbConfig} from './databaseConfig';

class Configs {
    private _databaseConfig: DBConfig;

    constructor() {
        this._databaseConfig = dbConfig;
    }

    public get databaseConfig(): DBConfig {
        return this._databaseConfig;
    }
}

export const configs = new Configs();

export {DBConfig};
